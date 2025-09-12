"use client";

import * as React from "react";
import type { Question } from "../lib/questions";

type Props = {
    q: Question;
    value?: number;
    onChange: (v: number) => void;
};

// Асуултын бүлгээр тайлбарууд
function getLabels(q: Question): Record<number, string> {
    if (q.id.startsWith("S")) {
        // Стресс 0–4
        return {
            0: "Огт үгүй",
            1: "Хааяа",
            2: "Заримдаа",
            3: "Ихэвчлэн",
            4: "Маш олонтоо",
        };
    }
    if (q.id.startsWith("H")) {
        // Сэтгэл ханамж 1–7 (Likert)
        return {
            1: "Огт санал нийлэхгүй",
            2: "Бараг санал нийлэхгүй",
            3: "Жаахан санал нийлэхгүй",
            4: "Дунд зэрэг",
            5: "Жаахан санал нийлнэ",
            6: "Их санал нийлнэ",
            7: "Маш их санал нийлнэ",
        };
    }
    // EQ 1–5 (Likert)
    return {
        1: "Огт санал нийлэхгүй",
        2: "Жаахан санал нийлэхгүй",
        3: "Дунд зэрэг",
        4: "Их санал нийлнэ",
        5: "Маш их санал нийлнэ",
    };
}

export default function QuestionCard({ q, value, onChange }: Props) {
    const labels = getLabels(q);

    // scaleMin..scaleMax бүх утгууд
    const options = React.useMemo(() => {
        const arr: number[] = [];
        for (let v = q.scaleMin; v <= q.scaleMax; v++) arr.push(v);
        return arr;
    }, [q.scaleMin, q.scaleMax]);

    // const minLabel = labels[q.scaleMin] ?? "Бага";
    // const maxLabel = labels[q.scaleMax] ?? "Их";

    return (
        <div className="space-y-6">
            {/* Асуултын текст */}
            <p className="text-lg sm:text-xl font-semibold text-gray-800 text-center mb-2">{q.text}</p>

            {/* Товчлуурын хэсэг */}
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-center">
                    {options.map((v) => {
                        const selected = value === v;
                        return (
                            <button
                                key={v}
                                type="button"
                                onClick={() => onChange(v)}
                                aria-label={`${v}: ${labels[v] ?? ""}`}
                                className={[
                                    "h-10 w-10 sm:h-12 sm:w-12 rounded-full border transition-all duration-200",
                                    "flex items-center justify-center text-base font-semibold focus:outline-none",
                                    selected
                                        ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                                        : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100 hover:border-blue-400",
                                ].join(" ")}
                            >
                                {v}
                            </button>
                        );
                    })}
                </div>

                {/* Сонгосон хариултын тайлбар */}
                <div className="flex justify-center text-sm text-gray-700 mt-2 min-h-[28px]">
                    <span className="px-3 py-1 rounded-lg bg-blue-100 text-blue-800 font-medium">
                        {value !== undefined ? (labels[value] ?? value) : "Сонгоно уу"}
                    </span>
                </div>
            </div>
        </div>
    );
}
