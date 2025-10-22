// app/api/survey/start/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";



export async function POST(req: Request) {
    try {
        const { email, totalScore, maxScore, answers, advice } = await req.json();

        // Gmail тохиргоо шалгах
        console.log("=== GMAIL ТОХИРГОО ШАЛГАЛТ ===");
        console.log("NODE_ENV:", process.env.NODE_ENV);
        console.log("GMAIL_USER:", process.env.GMAIL_USER || "ТОХИРУУЛААГҮЙ");
        console.log("GMAIL_APP_PASSWORD length:", process.env.GMAIL_APP_PASSWORD?.length || 0);
        console.log("GMAIL_APP_PASSWORD байгаа эсэх:", !!process.env.GMAIL_APP_PASSWORD);
        console.log("================================");

        if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
            console.log("❌ Gmail тохиргоо дутуу байна");
            return NextResponse.json({
                message: "Тест амжилттай хийгдлээ! (Мэйл тохиргоо дутуу байгаа тул илгээгдсэнгүй)",
                debug: {
                    hasGmailUser: !!process.env.GMAIL_USER,
                    hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
                    nodeEnv: process.env.NODE_ENV
                }
            });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false
            }
        });

        // Холболтыг шалгах
        try {
            console.log("Gmail холболтыг шалгаж байна...");
            await transporter.verify();
            console.log("✅ Gmail холболт амжилттай");
        } catch (verifyError: unknown) {
            const error = verifyError as Error;
            console.error("❌ Gmail холболт амжилтгүй:", error.message);
            return NextResponse.json({
                message: "Тест амжилттай хийгдлээ! (Gmail холболт амжилтгүй)",
                error: error.message
            });
        }

        // Хариултуудын жагсаалт үүсгэх
        const answersList = answers.map((answer: number, index: number) =>
            `<li>Асуулт ${index + 1}: ${answer} оноо</li>`
        ).join('');

        // Хувь тооцоолох
        const percentage = Math.round((totalScore / maxScore) * 100);

        const mailOptions = {
            from: `"Setgel-Zui - Сэтгэлзүйн Тест" <${process.env.GMAIL_USER}>`,
            to: email,
            subject: "Таны амьдралын стрессийн түвшний тайлан",
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h1 style="color: #4f46e5; text-align: center; border-bottom: 3px solid #4f46e5; padding-bottom: 10px;">
                        🧠 Таны амьдралын стрессийн түвшний тайлан
                    </h1>
                    
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 10px; text-align: center; margin: 20px 0;">
                        <h2 style="margin: 0; font-size: 24px;">Таны нийт оноо</h2>
                        <p style="font-size: 36px; font-weight: bold; margin: 10px 0;">${totalScore}/${maxScore}</p>
                        <p style="font-size: 18px; margin: 0;">(${percentage}%)</p>
                    </div>

                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 10px; margin: 20px 0;">
                        <h3 style="color: #495057; margin-top: 0;">📊 Таны хариултууд:</h3>
                        <ul style="list-style-type: none; padding: 0;">
                            ${answersList}
                        </ul>
                    </div>

                    <div style="background-color: #e3f2fd; padding: 20px; border-radius: 10px; border-left: 5px solid #2196f3; margin: 20px 0;">
                        <h3 style="color: #1565c0; margin-top: 0;">💡 Зөвлөгөө:</h3>
                        <div style="color: #424242; line-height: 1.6;">
                            ${advice}
                        </div>
                    </div>

                    <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f5f5f5; border-radius: 10px;">
                        <p style="color: #666; font-size: 14px; margin: 0;">
                            Энэхүү тайлан таны хувийн мэдээлэл бөгөөд зөвхөн танд зориулагдсан болно.
                        </p>
                        <p style="color: #666; font-size: 12px; margin: 10px 0 0 0;">
                            © ${new Date().getFullYear()} Setgel-Zui - Сэтгэлзүйн тест систем
                        </p>
                    </div>
                </div>
            `,
        };

        try {
            console.log("Мэйл илгээж байна...");
            console.log("From:", mailOptions.from);
            console.log("To:", email);

            await transporter.sendMail(mailOptions);
            console.log("Мэйл амжилттай илгээгдлээ:", email);
            return NextResponse.json({ message: "Тайлан амжилттай имэйлээр илгээгдлээ!" });
        } catch (mailError: unknown) {
            const error = mailError as Error & { name?: string; code?: string };
            console.error("=== МЭЙЛ АЛДАА ===");
            console.error("Алдааны төрөл:", error.name);
            console.error("Алдааны мессеж:", error.message);
            console.error("Алдааны код:", error.code);
            console.error("Бүрэн алдаа:", error);
            console.error("==================");

            // Мэйл илгээгдээгүй ч тест үр дүн нь ажилласан тул success буцаах
            return NextResponse.json({
                message: "Тест амжилттай хийгдлээ! (Мэйл илгээхэд алдаа гарсан тул имэйл илгээгдсэнгүй)",
                warning: "Мэйл тохиргоонд алдаа байна",
                errorDetails: {
                    name: error.name,
                    message: error.message,
                    code: error.code
                }
            });
        }

    } catch (error) {
        console.error("API алдаа:", error);
        return NextResponse.json(
            {
                message: "Серверт алдаа гарлаа",
                error: typeof error === "object" && error !== null && "message" in error
                    ? (error as { message: string }).message
                    : String(error)
            },
            { status: 500 }
        );
    }
}
