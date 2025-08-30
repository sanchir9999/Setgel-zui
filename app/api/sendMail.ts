// app/api/sendMail.ts
import { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Хариултуудын төрөл
interface Answers {
    stress: number;
    happiness: number;
    eq: number;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, answers }: { email: string; answers: Answers } = req.body;  // Тодорхой төрөл ашиглаж байна

        // Хэрэв answers байхгүй бол алдаа гаргана
        if (!answers) {
            return res.status(400).json({ message: "Answers are missing" });
        }

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

        try {
            await transporter.sendMail(mailOptions);
            return res.status(200).json({ message: "Email sent successfully" });
        } catch (error: unknown) {  // error-ийн төрөл `unknown` гэж тодорхойлсон
            console.error("Error occurred while sending email:", error);

            // error-ийг тодорхойлоод message авах
            const errorMessage = (error as { message: string }).message || String(error);

            return res.status(500).json({
                message: "Error occurred while sending email",
                error: errorMessage,
            });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
