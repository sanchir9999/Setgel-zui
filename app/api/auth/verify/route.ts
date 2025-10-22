import { NextRequest, NextResponse } from 'next/server';
import { db, verifyTwilioCode } from '@/lib/database';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phone, email, code } = body;

        // Гүйцэтгэх өгөгдөл шалгах
        if (!phone || !email || !code) {
            return NextResponse.json(
                { success: false, message: 'Бүх талбарыг бөглөнө үү' },
                { status: 400 }
            );
        }

        // Эхлээд Twilio Verify Service-ээр баталгаажуулах оролдох
        const twilioResult = await verifyTwilioCode(phone, code);

        if (twilioResult.success) {
            // Twilio Verify амжилттай бол хэрэглэгч үүсгэх
            const user = await db.users.create({
                phone,
                email,
                isVerified: true,
            });

            return NextResponse.json({
                success: true,
                message: 'Twilio Verify баталгаажуулалт амжилттай! Бүртгэл үүслээ.',
                data: {
                    userId: user.id,
                    phone: user.phone,
                    email: user.email,
                    verificationMethod: 'twilio'
                }
            });
        }

        // Twilio амжилтгүй бол локал баталгаажуулах кодыг шалгах (fallback)

        const verificationCode = await db.verificationCodes.findValidCode(phone, code);

        if (!verificationCode) {
            return NextResponse.json(
                { success: false, message: 'Баталгаажуулах код буруу эсвэл хугацаа дууссан байна' },
                { status: 400 }
            );
        }

        // Локал код зөв бол хэрэглэгч үүсгэх
        const user = await db.users.create({
            phone,
            email,
            isVerified: true,
        });

        // Баталгаажуулах кодыг ашигласан гэж тэмдэглэх
        await db.verificationCodes.markAsUsed(verificationCode.id);

        return NextResponse.json({
            success: true,
            message: 'Локал баталгаажуулалт амжилттай! Бүртгэл үүслээ.',
            data: {
                userId: user.id,
                phone: user.phone,
                email: user.email,
                verificationMethod: 'local'
            }
        });

    } catch (error) {
        console.error('Баталгаажуулах API алдаа:', error);
        return NextResponse.json(
            { success: false, message: 'Серверийн алдаа гарлаа' },
            { status: 500 }
        );
    }
}