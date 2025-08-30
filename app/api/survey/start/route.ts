import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
    try {
        // JSON өгөгдлийг авна
        const { email, answers } = await req.json();

        // Хэрэв answers утга байхгүй бол алдаа гаргана
        if (!answers) {
            return NextResponse.json(
                { message: "Answers are missing or empty" },
                { status: 400 }
            );
        }

        // Nodemailer тохиргоо
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER, // Таны Gmail хаяг
                pass: process.env.GMAIL_APP_PASSWORD, // App Password
            },
        });

        // Имэйлийн агуулга
        const mailOptions = {
            from: process.env.GMAIL_USER, // Таны Gmail хаяг
            to: email, // Хэрэглэгчийн мэйл хаяг
            subject: "Таны судалгааны тайлан",
            html: `
        <h1>Таны судалгааны тайлан</h1>
        <p>Стрессын дүн: ${answers.stress}</p>
        <p>Сэтгэл ханамжийн дүн: ${answers.happiness}</p>
        <p>Эмоционал Интеллект: ${answers.eq}</p>
      `,
        };

        // Мэйл илгээх
        await transporter.sendMail(mailOptions);

        // Амжилттай мэйл илгээгдсэн тохиолдолд хариу буцаах
        return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });

    } catch (error: any) {
        console.error("Error occurred while sending email:", error);

        // Алдаа гарсан тохиолдолд дэлгэрэнгүй мэдээлэлтэй хариу буцаах
        return NextResponse.json(
            { message: "Error occurred while sending email", error: error.message || String(error) },
            { status: 500 }
        );
    }
}
