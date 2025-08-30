import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";

// Мэйл илгээх
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { email, answers, stressResults, happinessResults, eqResults } = req.body;

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
        <h3>Стрессын дүн:</h3>
        <p>Дундаж: ${stressResults.avg}</p>
        <p>Мин: ${stressResults.min}</p>
        <p>Макс: ${stressResults.max}</p>

        <h3>Сэтгэл ханамжийн дүн:</h3>
        <p>Дундаж: ${happinessResults.avg}</p>
        <p>Мин: ${happinessResults.min}</p>
        <p>Макс: ${happinessResults.max}</p>

        <h3>Эмоционал Интеллектийн дүн:</h3>
        <p>Дундаж: ${eqResults.avg}</p>
        <p>Мин: ${eqResults.min}</p>
        <p>Макс: ${eqResults.max}</p>

        <h3>Зөвлөгөө:</h3>
        <p>Таны стрессын түвшин дунд зэрэг байна. Амралт, анхаарал төвлөрүүлэх техникүүдийг ашиглан стрессээ бууруулж болох юм.</p>
      `,
        };

        try {
            await transporter.sendMail(mailOptions);
            res.status(200).json({ message: "Email sent successfully" });
        } catch (error: any) {
            console.error("Error occurred while sending email:", error);
            res.status(500).json({
                message: "Error occurred while sending email",
                error: error.message || JSON.stringify(error),
            });
        }
    } else {
        res.status(405).json({ message: "Method Not Allowed" });
    }
}
