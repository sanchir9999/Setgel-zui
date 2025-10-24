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
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-lg font-semibold mb-4">Судалгааны форм</h1>
            <form onSubmit={onSubmit} className="space-y-4">
                <div className="flex flex-col">
                    <label htmlFor="email" className="text-sm text-gray-600 dark:text-gray-400">Имэйл</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="mt-2 border border-gray-200 dark:border-zinc-700 rounded-md px-3 py-2 text-sm bg-white dark:bg-zinc-900"
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500">Стресс</label>
                        <input type="number" value={answers.stress} onChange={(e) => setAnswers({ ...answers, stress: +e.target.value })} min={0} max={4} className="mt-2 px-2 py-1 border rounded-md text-sm" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500">Сэтгэл ханамж</label>
                        <input type="number" value={answers.happiness} onChange={(e) => setAnswers({ ...answers, happiness: +e.target.value })} min={1} max={7} className="mt-2 px-2 py-1 border rounded-md text-sm" />
                    </div>
                    <div className="flex flex-col">
                        <label className="text-xs text-gray-500">EQ</label>
                        <input type="number" value={answers.eq} onChange={(e) => setAnswers({ ...answers, eq: +e.target.value })} min={1} max={5} className="mt-2 px-2 py-1 border rounded-md text-sm" />
                    </div>
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="btn-primary text-sm px-4 py-2">Тайлан илгээх</button>
                </div>
            </form>
        </div>
    );
};

export default SurveyForm;
