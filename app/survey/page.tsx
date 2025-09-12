"use client";

import { useState, useMemo } from "react";
import { useState as useClientState } from "react";
// Онооны үр дүнгээс зөвлөгөө өгөх функц
function getAdvice(score: number, maxScore: number) {
  const percent = (score / maxScore) * 100;
  if (percent < 33) {
    return (
      <>
        <span className="font-semibold text-green-700">Таны стрессийн түвшин бага байна.</span> Та өдөр тутмын амьдралдаа сэтгэл санаагаа тогтвортой байлгаж, өөртөө анхаарал тавьж чаддаг байна. Энэ байдлаа хадгалахын тулд:
        <ul className="list-disc list-inside mt-2 text-left">
          <li>Эерэг харилцаагаа үргэлжлүүлээрэй</li>
          <li>Хобби, сонирхолдоо цаг гаргаарай</li>
          <li>Биеийн хөдөлгөөн, дасгал хийж хэвшээрэй</li>
        </ul>
      </>
    );
  } else if (percent < 66) {
    return (
      <>
        <span className="font-semibold text-yellow-700">Дунд зэргийн стресс илэрч байна.</span> Зарим үед сэтгэл санаа тогтворгүй, ядрах мэдрэмж төрж болзошгүй. Тайвшрах, өөрийгөө дэмжих аргуудыг хэрэглээрэй:
        <ul className="list-disc list-inside mt-2 text-left">
          <li>Гүнзгий амьсгал, бясалгал хийх</li>
          <li>Найз нөхөд, гэр бүлтэйгээ ярилцах</li>
          <li>Өөртөө амралт өгөх, ажлын ачааллаа багасгах</li>
        </ul>
        Хэрвээ энэ байдал удаан үргэлжилбэл мэргэжлийн зөвлөгөө аваарай.
      </>
    );
  } else {
    return (
      <>
        <span className="font-semibold text-red-700">Их хэмжээний стресс илэрч байна.</span> Сэтгэл санааны хямрал, ядралт, бухимдал их мэдрэгдэж байна. Та дараах алхмуудыг туршаад үзээрэй:
        <ul className="list-disc list-inside mt-2 text-left">
          <li>Өдөр бүр өөртөө амралт өгөх, унтах цагтаа анхаарах</li>
          <li>Сэтгэлээ хуваалцах итгэлтэй хүнтэй ярилцах</li>
          <li>Биеийн болон сэтгэлийн эрүүл мэнддээ анхаарах</li>
        </ul>
        Хэрвээ стресс, сэтгэл гутрал удаан үргэлжилбэл <span className="underline">мэргэжлийн сэтгэлзүйчид</span> хандахыг зөвлөж байна.
      </>
    );
  }
}
import QuestionCard from "../../components/QuestionCard";
import ProgressBar from "../../components/ProgressBar";
import { QUESTIONS } from "../../lib/questions";

export default function SurveyPage() {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [email, setEmail] = useClientState("");
  const [sending, setSending] = useClientState(false);
  const [sent, setSent] = useClientState(false);
  const [error, setError] = useClientState("");
  const total = QUESTIONS.length;

  const handleAnswer = (score: number) => {
    setAnswers((prev) => [...prev, score]);
    setCurrent((prev) => prev + 1);
  };

  const result = useMemo(() => {
    if (answers.length === total) {
      const sum = answers.reduce((a, b) => a + b, 0);
      return sum;
    }
    return null;
  }, [answers, total]);

  const maxScore = useMemo(() => {
    return QUESTIONS.reduce((acc, q) => acc + (q.scaleMax ?? 0), 0);
  }, []);

  const percent = Math.round((current / total) * 100);

  // Мэйл илгээх функц
  const handleSendMail = async () => {
    setSending(true);
    setError("");
    try {
      const res = await fetch("/api/sendMail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          answers: { stress: result },
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        setError(data.message || "Мэйл илгээхэд алдаа гарлаа.");
      }
    } catch (e) {
      setError("Мэйл илгээхэд алдаа гарлаа.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-6 px-2 sm:px-0">
      <h1
        className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center px-6 py-3 rounded-xl shadow-lg"
        style={{
          background: "linear-gradient(90deg, #4f46e5 0%, #38bdf8 100%)",
          color: "#fff",
          letterSpacing: "0.03em",
          textShadow: "0 2px 8px rgba(0,0,0,0.10)",
        }}
      >
        Амьдралын тест
      </h1>
      <div className="w-full max-w-md mb-4 sm:mb-6 px-0 sm:px-2">
        <ProgressBar percent={percent} />
      </div>
      <div className="bg-white rounded-lg shadow p-4 sm:p-8 flex flex-col items-center w-full max-w-md">
        {current < total ? (
          <QuestionCard
            q={QUESTIONS[current]}
            onChange={handleAnswer}
          />
        ) : (
          <div className="mt-6 sm:mt-8 text-center w-full">
            <div className="inline-block px-6 py-4 rounded-2xl shadow-lg bg-gradient-to-br from-blue-600 to-blue-400 text-white font-extrabold text-xl sm:text-2xl mb-4 border-2 border-blue-700">
              Таны оноо: {result}
            </div>
            {result !== null && (
              <div className="mt-4 text-sm sm:text-base text-gray-700 mb-6">
                {getAdvice(result, maxScore)}
              </div>
            )}
            {!sent ? (
              <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
                <input
                  type="email"
                  className="border rounded px-3 py-2 w-full text-base focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Имэйл хаягаа оруулна уу"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={sending}
                  required
                />
                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded transition disabled:opacity-60"
                  onClick={handleSendMail}
                  disabled={sending || !email}
                >
                  {sending ? "Илгээж байна..." : "Тайланг имэйлээр авах"}
                </button>
                {error && <div className="text-red-600 text-sm mt-1">{error}</div>}
              </div>
            ) : (
              <div className="text-green-700 font-semibold mt-4">Тайлан амжилттай илгээгдлээ!</div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
