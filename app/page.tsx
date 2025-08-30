// app/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import QuestionCard from "../components/QuestionCard";
import ProgressBar from "../components/ProgressBar";
import { QUESTIONS, GROUPS } from "../lib/questions";

// Хариултуудын төрөл
interface Answers {
  [key: string]: number;
}

export default function Page() {
  const [email, setEmail] = useState("");
  const [answers, setAnswers] = useState<Answers>({
    stress: 0,
    happiness: 0,
    eq: 0,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  const total = QUESTIONS.length;
  const current = QUESTIONS[currentIndex];

  const answeredCount = useMemo(() => Object.keys(answers).length, [answers]);
  const percent = useMemo(() => {
    if (total === 0) return 0;
    const p = Math.round((answeredCount / total) * 100);
    return Math.max(0, Math.min(100, p));
  }, [answeredCount, total]);

  const handleChange = (id: string, val: number) =>
    setAnswers((prev) => ({ ...prev, [id]: val }));

  const canGoPrev = currentIndex > 0;
  const isAnswered = answers[current.id] !== undefined;
  const isLast = currentIndex === total - 1;

  const goPrev = () => {
    if (canGoPrev) setCurrentIndex((i) => i - 1);
  };

  const goNext = () => {
    if (!isAnswered) return;
    if (!isLast) {
      setCurrentIndex((i) => i + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const submit = async () => {
    if (!email || Object.keys(answers).length < total) {
      alert("Бүх асуулт хариулсан эсэхийг шалгана уу.");
      return;
    }

    // Имэйл хаягийг шалгах
    const isValidEmail = /\S+@\S+\.\S+/.test(email);
    if (!isValidEmail) {
      alert("Зөв имэйл хаяг оруулна уу.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/survey/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answers }),  // Хэрэглэгчийн имэйл, хариулт
      });

      const result = await response.json();  // Хариуг JSON болгох
      console.log("API response:", result);  // Хариуг шалгах

      if (result.message === "Email sent successfully") {
        setDone(true);
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        alert("Тайлан илгээхэд алдаа гарлаа.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message: string }).message
          : String(error);
      alert("Алдаа гарлаа. Дахин оролдоно уу. Алдаа: " + errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen font-sans bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 text-gray-900">
      <div className="sticky top-0 z-10 backdrop-blur bg-white/40 border-b border-white/40">
        <div className="max-w-3xl mx-auto px-5 py-3 flex items-center justify-end">
          <div className="w-56">
            <ProgressBar percent={percent} showLabel />
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-5 py-8">
        <div className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-xl p-5 sm:p-8">
          {done && (
            <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/30 backdrop-blur-sm">
              <div className="rounded-2xl bg-white p-6 shadow-2xl">
                <div className="mx-auto h-14 w-14 rounded-full bg-green-100 flex items-center justify-center">
                  <Check className="h-7 w-7 text-green-600" />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <QuestionCard
              key={current.id}
              q={current}
              value={answers[current.id]}  // Тухайн id-г ашиглах
              onChange={(v) => handleChange(current.id, v)}
            />

            {isLast && (
              <div className="rounded-2xl border border-black/10 bg-white/70 backdrop-blur p-3">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="name@company.mn"
                  className="w-full border rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black/40"
                  aria-label="Email"
                />
                <p className="text-xs text-gray-500 mt-2">
                  **Тайлбар**: Энэ имэйл рүү таны асуулгын **тогтмол үр дүнгийн тайлан** илгээгдэнэ.
                </p>
              </div>
            )}

            {done && (
              <div className="mt-5">
                <h3 className="text-xl font-semibold text-gray-800">Таны үр дүн:</h3>
                <div className="mt-3">
                  <div>
                    <strong>Стресс:</strong> {answers.stress} (Дундаж)
                  </div>
                  <div>
                    <strong>Сэтгэл ханамж:</strong> {answers.happiness} (Дундаж)
                  </div>
                  <div>
                    <strong>Эмоционал Интеллект:</strong> {answers.eq} (Дундаж)
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center justify-between">
              <button
                onClick={goPrev}
                disabled={!canGoPrev}
                className="h-11 w-24 rounded-2xl border border-black/10 bg-white/70 backdrop-blur flex items-center justify-center hover:bg-white disabled:opacity-40 shadow-sm text-sm"
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Өмнөх
              </button>

              {!isLast ? (
                <button
                  onClick={goNext}
                  disabled={!isAnswered}
                  className="h-11 w-24 rounded-2xl bg-black text-white flex items-center justify-center hover:opacity-90 disabled:opacity-50 shadow text-sm"
                >
                  Дараах
                  <ChevronRight className="h-4 w-4 ml-1" />
                </button>
              ) : (
                <button
                  onClick={submit}
                  disabled={submitting || !email || done}
                  className="h-11 w-28 rounded-2xl bg-green-600 text-white flex items-center justify-center hover:bg-green-700 disabled:opacity-50 shadow text-sm"
                >
                  Дуусгах
                  <Check className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>

            <div className="sm:hidden">
              <div className="mt-4">
                <ProgressBar percent={percent} showLabel />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
