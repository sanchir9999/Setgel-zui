import { NextRequest, NextResponse } from 'next/server';
import { db, sendSMS, generateVerificationCode } from '@/lib/database';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { phone, email } = body;

        // Гүйцэтгэх өгөгдөл шалгах
        if (!phone || !email) {
            return NextResponse.json(
                { success: false, message: 'Утасны дугаар болон имэйл хаяг шаардлагатай' },
                { status: 400 }
            );
        }

        // Утасны дугаарын формат шалгах (Монголын дугаар)
        const phoneRegex = /^[0-9]{8}$/;
        if (!phoneRegex.test(phone)) {
            return NextResponse.json(
                { success: false, message: 'Утасны дугаарын формат буруу байна (8 орон)' },
                { status: 400 }
            );
        }

        // Имэйлын формат шалгах
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { success: false, message: 'Имэйлын формат буруу байна' },
                { status: 400 }
            );
        }

        // Хэрэглэгч өмнө бүртгүүлсэн эсэхийг шалгах
        const existingUserByPhone = await db.users.findByPhone(phone);
        if (existingUserByPhone) {
            return NextResponse.json(
                { success: false, message: 'Энэ утасны дугаараар өмнө бүртгүүлсэн байна' },
                { status: 409 }
            );
        }

        const existingUserByEmail = await db.users.findByEmail(email);
        if (existingUserByEmail) {
            return NextResponse.json(
                { success: false, message: 'Энэ имэйл хаягаар өмнө бүртгүүлсэн байна' },
                { status: 409 }
            );
        }

        // Twilio Verify Service ашиглаж SMS илгээх
        const smsSent = await sendSMS(phone, 'Verify Service код илгээж байна...');

        // Fallback зорилгоор локал код үүсгэх
        const verificationCode = generateVerificationCode();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 минут

        await db.verificationCodes.create({
            phone,
            code: verificationCode,
            expiresAt,
            isUsed: false,
        });

        if (!smsSent) {
            return NextResponse.json(
                { success: false, message: 'SMS илгээхэд алдаа гарлаа. Дахин оролдоно уу.' },
                { status: 500 }
            );
        }

        return NextResponse.json({
            success: true,
            message: 'Баталгаажуулах код амжилттай илгээгдлээ',
            data: {
                phone,
                email,
                expiresIn: 5 * 60 // секундээр
            }
        });

    } catch (error) {
        console.error('Бүртгүүлэх API алдаа:', error);
        return NextResponse.json(
            { success: false, message: 'Серверийн алдаа гарлаа' },
            { status: 500 }
        );
    }
}