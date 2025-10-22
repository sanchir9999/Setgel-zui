import { NextResponse } from 'next/server';
import { sendSMS } from '@/lib/database';
import nodemailer from 'nodemailer';

export async function GET() {
    const results = {
        gmail: { configured: false, tested: false, error: null as string | null },
        twilio: { configured: false, tested: false, error: null as string | null },
        environment: process.env.NODE_ENV
    };

    // Gmail тохиргоо шалгах
    const gmailUser = process.env.GMAIL_USER;
    const gmailPassword = process.env.GMAIL_APP_PASSWORD;

    if (gmailUser && gmailPassword) {
        results.gmail.configured = true;

        try {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser,
                    pass: gmailPassword,
                },
            });

            await transporter.verify();
            results.gmail.tested = true;
        } catch (error) {
            results.gmail.error = error instanceof Error ? error.message : 'Gmail тохиргооны алдаа';
        }
    }

    // Twilio тохиргоо шалгах
    const twilioSid = process.env.TWILIO_ACCOUNT_SID;
    const twilioToken = process.env.TWILIO_AUTH_TOKEN;
    const twilioVerifySid = process.env.TWILIO_VERIFY_SERVICE_SID;

    if (twilioSid && twilioToken && twilioVerifySid) {
        results.twilio.configured = true;

        try {
            // Twilio client тест
            const twilio = await import('twilio');
            const client = twilio.default(twilioSid, twilioToken);

            // Service-ийг шалгах
            await client.verify.v2.services(twilioVerifySid).fetch();
            results.twilio.tested = true;
        } catch (error) {
            results.twilio.error = error instanceof Error ? error.message : 'Twilio тохиргооны алдаа';
        }
    }

    return NextResponse.json({
        success: true,
        message: 'Тохиргооны шалгалт',
        data: results
    });
}

// POST тест имэйл илгээх
export async function POST(request: Request) {
    try {
        const { email, phone, action } = await request.json();

        if (action === 'test-email' && email) {
            const gmailUser = process.env.GMAIL_USER;
            const gmailPassword = process.env.GMAIL_APP_PASSWORD;

            if (!gmailUser || !gmailPassword) {
                return NextResponse.json({
                    success: false,
                    message: 'Gmail тохиргоо дутуу байна'
                });
            }

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: gmailUser,
                    pass: gmailPassword,
                },
            });

            const mailOptions = {
                from: `"Setgel-Zui Test" <${gmailUser}>`,
                to: email,
                subject: '📧 Тест Имэйл - Setgel-Zui',
                html: `
                    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                        <h2>🎯 Тест Имэйл Амжилттай!</h2>
                        <p>Энэ нь Gmail тохиргооны тест имэйл юм.</p>
                        <p><strong>Хугацаа:</strong> ${new Date().toLocaleString('mn-MN')}</p>
                        <p><strong>Системийн төлөв:</strong> Хэвийн ажиллаж байна ✅</p>
                    </div>
                `
            };

            await transporter.sendMail(mailOptions);

            return NextResponse.json({
                success: true,
                message: 'Тест имэйл амжилттай илгээгдлээ!'
            });
        }

        if (action === 'test-sms' && phone) {
            const success = await sendSMS(phone, 'Тест SMS - Setgel-Zui системийн шалгалт');

            return NextResponse.json({
                success,
                message: success ? 'Тест SMS илгээгдлээ!' : 'SMS илгээхэд алдаа гарлаа'
            });
        }

        return NextResponse.json({
            success: false,
            message: 'Буруу параметр'
        });

    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Алдаа гарлаа: ' + (error instanceof Error ? error.message : 'Тодорхойгүй алдаа')
        });
    }
}