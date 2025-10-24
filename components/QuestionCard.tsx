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
        // Стрессийн түвшин 0–4
        return {
            0: "Огт үгүй 😌",
            1: "Хааяа 🙂",
            2: "Заримдаа 😐",
            3: "Ихэвчлэн 😟",
            4: "Маш олонтоо 😰",
        };
    }
    if (q.id.startsWith("H")) {
        // Сэтгэл ханамжийн түвшин 1–7
        return {
            1: "Огт үгүй 😔",
            2: "Бараг үгүй 😕",
            3: "Бага зэрэг 😐",
            4: "Дунд зэрэг 🙂",
            5: "Нэлээд их 😊",
            6: "Их 😄",
            7: "Маш их 😍",
        };
    }
    // Эмоционал оюун ухааны түвшин 1–5
    return {
        1: "Огт үгүй 😞",
        2: "Бага зэрэг 😐",
        3: "Дунд зэрэг 🙂",
        4: "Их 😊",
        5: "Маш их 😄",
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

    return (
        <div className="p-4">
            {/* Асуултын текст */}
            <div className="text-center">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{q.text}</h2>
            </div>

            {/* Хариултын хэсэг */}
            <div className="mt-4">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                    <span>Бага</span>
                    <span>Их</span>
                </div>

                <div className="flex gap-2 justify-center">
                    {options.map((v) => {
                        const selected = value === v;
                        return (
                            <button
                                key={v}
                                type="button"
                                onClick={() => onChange(v)}
                                aria-label={`${v}: ${labels[v] ?? ""}`}
                                className={
                                    "h-10 w-10 rounded-full flex items-center justify-center text-sm font-medium transition-transform " +
                                    (selected
                                        ? "bg-black text-white dark:bg-white dark:text-black border-0"
                                        : "bg-white border border-gray-200 text-gray-700 dark:bg-zinc-900 dark:border-zinc-700 dark:text-gray-300")
                                }
                            >
                                {v}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                    {value !== undefined ? labels[value] : "Хариултаа сонгоно уу"}
                </div>
            </div>
        </div>
    );
}
