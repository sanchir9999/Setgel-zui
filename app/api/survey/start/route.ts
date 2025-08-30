// app/api/survey/start/route.ts
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Хариултуудын төрөл
interface Answers {
    stress: number;
    happiness: number;
    eq: number;
}

export async function POST(req: Request) {
    try {
        const { email, answers }: { email: string; answers: Answers } = await req.json(); // Тодорхой төрөл ашиглаж байна

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_APP_PASSWORD,
            },
        });

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: email,
            subject: "Таны судалгааны тайлан",
            html: `
        <h1>Таны судалгааны тайлан</h1>
        <p>Стрессын дүн: ${answers.stress}</p>
        <p>Сэтгэл ханамжийн дүн: ${answers.happiness}</p>
        <p>Эмоционал Интеллект: ${answers.eq}</p>
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
