// components/SurveyForm.tsx

import { useState } from "react";

interface Answers {
    stress: number;
    happiness: number;
    eq: number;
}

const SurveyForm = () => {
    const [email, setEmail] = useState<string>("");
    const [answers, setAnswers] = useState<Answers>({
        stress: 0,
        happiness: 0,
        eq: 0,
    });

    // Мэйл илгээх функц
    const sendMail = async (answers: Answers, email: string) => {
        const response = await fetch("/api/sendMail", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                subject: "Таны судалгааны тайлан",
                htmlContent: `<h1>Таны судалгааны тайлан</h1>
                      <p>Стрессын дүн: ${answers.stress}</p>
                      <p>Сэтгэл ханамжийн дүн: ${answers.happiness}</p>
                      <p>Эмоционал Интеллект: ${answers.eq}</p>`,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            // Мэйл амжилттай илгээгдлээ
        } else {
            console.error("Мэйл илгээхэд алдаа гарлаа", data);
        }
    };

    const onSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const answers = { stress: 3, happiness: 5, eq: 4 }; // Жишээ хариулт
        await sendMail(answers, email);
    };

    return (
        <div>
            <h1>Судалгааны Форм</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="email">Имэйл хаяг:</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                {/* Стресс */}
                <div>
                    <label>Стрессын түвшин:</label>
                    <input
                        type="number"
                        value={answers.stress}
                        onChange={(e) => setAnswers({ ...answers, stress: +e.target.value })}
                        min="0"
                        max="4"
                    />
                </div>

                {/* Сэтгэл ханамж */}
                <div>
                    <label>Сэтгэл ханамжийн түвшин:</label>
                    <input
                        type="number"
                        value={answers.happiness}
                        onChange={(e) => setAnswers({ ...answers, happiness: +e.target.value })}
                        min="1"
                        max="7"
                    />
                </div>

                {/* Эмоционал Интеллект */}
                <div>
                    <label>Эмоционал Интеллектийн түвшин:</label>
                    <input
                        type="number"
                        value={answers.eq}
                        onChange={(e) => setAnswers({ ...answers, eq: +e.target.value })}
                        min="1"
                        max="5"
                    />
                </div>

                <button type="submit">Тайлан илгээх</button>
            </form>
        </div>
    );
};

export default SurveyForm;
