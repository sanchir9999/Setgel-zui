// app/api/survey/start/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";



export async function POST(req: Request) {
    try {
        const { email, totalScore, maxScore, answers, advice } = await req.json();

        // Development орчинд мэйл илгээхгүй
        if (process.env.NODE_ENV !== "production") {
            console.log("Development орчинд мэйл илгээхгүй байна");
            console.log("Email:", email);
            console.log("Total Score:", totalScore);
            console.log("Answers:", answers);
            return NextResponse.json({ message: "Development орчинд тест хийгдлээ" });
        }

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        // Хариултуудын жагсаалт үүсгэх
        const answersList = answers.map((answer: number, index: number) =>
            `<li>Асуулт ${index + 1}: ${answer} оноо</li>`
        ).join('');

        // Хувь тооцоолох
        const percentage = Math.round((totalScore / maxScore) * 100);

        const mailOptions = {
            from: process.env.GMAIL_USER,
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

        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: "Email sent successfully" });
    } catch (error) {
        console.error("Error occurred while sending email:", error);
        return NextResponse.json(
            {
                message: "Error occurred while sending email",
                error: typeof error === "object" && error !== null && "message" in error
                    ? (error as { message: string }).message
                    : String(error)
            },
            { status: 500 }
        );
    }
}
