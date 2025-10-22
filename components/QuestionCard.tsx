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

    // const minLabel = labels[q.scaleMin] ?? "Бага";
    // const maxLabel = labels[q.scaleMax] ?? "Их";

    return (
        <div className="space-y-8 p-6">
            {/* Асуултын текст - илүү том, тод */}
            <div className="text-center space-y-3">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-800 leading-relaxed px-4">
                    {q.text}
                </h2>
            </div>

            {/* Хариултын хэсэг */}
            <div className="space-y-6">
                {/* Scale зааварчилгаа */}
                <div className="flex justify-between items-center text-xs text-gray-500 px-2">
                    <span>{q.id.startsWith("S") ? "Бага" : q.id.startsWith("H") ? "Огт үгүй" : "Огт үгүй"}</span>
                    <span>{q.id.startsWith("S") ? "Их" : q.id.startsWith("H") ? "Маш их" : "Маш их"}</span>
                </div>

                {/* Товчлуурын хэсэг - илүү том, илүү тод */}
                <div className="flex flex-wrap gap-3 justify-center px-2">
                    {options.map((v) => {
                        const selected = value === v;
                        return (
                            <button
                                key={v}
                                type="button"
                                onClick={() => onChange(v)}
                                aria-label={`${v}: ${labels[v] ?? ""}`}
                                className={[
                                    "h-14 w-14 sm:h-16 sm:w-16 rounded-2xl border-2 transition-all duration-300",
                                    "flex items-center justify-center text-lg sm:text-xl font-bold focus:outline-none focus:ring-4",
                                    "transform hover:scale-110 active:scale-95",
                                    selected
                                        ? "bg-gradient-to-br from-blue-600 to-purple-600 text-white border-blue-600 shadow-xl scale-110 focus:ring-blue-300"
                                        : "bg-white text-gray-700 border-gray-300 shadow-lg hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:border-blue-400 focus:ring-blue-200",
                                ].join(" ")}
                            >
                                {v}
                            </button>
                        );
                    })}
                </div>

                {/* Сонгосон хариултын тайлбар - илүү том, илүү анхаарал татахуйц */}
                <div className="flex justify-center mt-6">
                    <div className={[
                        "px-6 py-3 rounded-2xl border-2 text-center min-h-[60px] flex items-center justify-center transition-all duration-300",
                        value !== undefined
                            ? "bg-gradient-to-r from-blue-100 to-purple-100 border-blue-300 text-blue-800 shadow-lg"
                            : "bg-gray-50 border-gray-200 text-gray-500"
                    ].join(" ")}>
                        <span className="text-base sm:text-lg font-semibold">
                            {value !== undefined ? labels[value] : "👆 Хариултаа сонгоно уу"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
