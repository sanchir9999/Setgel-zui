"use client";

import { useState, useMemo } from "react";
import { useState as useClientState } from "react";
// Онооны үр дүнгээс зөвлөгөө өгөх функц (UI үзүүлэхэд)
function getAdvice(score: number, maxScore: number) {
  const percent = (score / maxScore) * 100;

  if (percent <= 25) {
    return (
      <div className="p-6 bg-white border-l-4 border-green-500 rounded-lg shadow-lg ring-1 ring-green-200">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">😌</span>
          <h3 className="font-bold text-gray-800 text-lg">Сайн байна! Стресс багатай байна</h3>
        </div>
        <p className="text-gray-700 mb-4">Та сэтгэлийн тэнцвэрээ сайн хадгалж чадаж байна. Энэ эерэг байдлаа үргэлжлүүлэхийн тулд:</p>
        <div className="space-y-2 text-sm">
          <div className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-800"><strong>Биеийн тамир:</strong> Өдөрт 30 минут алхах, дасгал хийх</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-800"><strong>Хобби:</strong> Дуртай зүйлдээ цаг гаргах, шинэ сонирхол эзэмшүүлэх</span>
          </div>
          <div className="flex items-start">
            <span className="text-green-600 mr-2">✓</span>
            <span className="text-gray-800"><strong>Харилцаа:</strong> Найз дүүстэйгээ тогтмол уулзах, ярилцах</span>
          </div>
        </div>
      </div>
    );
  } else if (percent <= 50) {
    return (
      <div className="p-6 bg-white border-l-4 border-yellow-500 rounded-lg shadow-lg ring-1 ring-yellow-200">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">😐</span>
          <h3 className="font-bold text-gray-800 text-lg">Дунд зэрэг стресстэй байна</h3>
        </div>
        <p className="text-gray-700 mb-4">Зарим үед ачаалал их мэдрэгддэг байна. Стрессээ багасгахын тулд эдгээр арга хэмжээг туршина уу:</p>
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <span className="text-yellow-600 mr-2">💨</span>
            <span className="text-gray-800"><strong>Амьсгалын дасгал:</strong> Өдөрт 3 удаа 5 минут гүнзгий амьсгал авах</span>
          </div>
          <div className="flex items-start">
            <span className="text-yellow-600 mr-2">🛌</span>
            <span className="text-gray-800"><strong>Унтлагын дэглэм:</strong> 7-8 цаг тогтмол унтах, утас харахгүй байх</span>
          </div>
          <div className="flex items-start">
            <span className="text-yellow-600 mr-2">👥</span>
            <span className="text-gray-800"><strong>Дэмжлэг авах:</strong> Итгэлтэй хүнтэй сэтгэлээ хуваалцах</span>
          </div>
          <div className="flex items-start">
            <span className="text-yellow-600 mr-2">⏰</span>
            <span className="text-gray-800"><strong>Цаг удирдлага:</strong> Ажлын ачааллыг хуваарилах, завсарлага авах</span>
          </div>
        </div>
      </div>
    );
  } else if (percent <= 75) {
    return (
      <div className="p-6 bg-white border-l-4 border-orange-500 rounded-lg shadow-lg ring-1 ring-orange-200">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">😰</span>
          <h3 className="font-bold text-gray-800 text-lg">Их стресстэй байна - Анхаарах хэрэгтэй</h3>
        </div>
        <p className="text-gray-700 mb-4">Стрессийн түвшин өндөр байна. Яаралтай арга хэмжээ авах шаардлагатай:</p>
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <span className="text-orange-600 mr-2">🚨</span>
            <span className="text-gray-800"><strong>Яаралтай амралт:</strong> Энэ долоо хоногт амралтын цаг нэмэгдүүлэх</span>
          </div>
          <div className="flex items-start">
            <span className="text-orange-600 mr-2">🧘</span>
            <span className="text-gray-800"><strong>Тайвшрах:</strong> Медитаци, бясалгал, хөгжим сонсох</span>
          </div>
          <div className="flex items-start">
            <span className="text-orange-600 mr-2">🥗</span>
            <span className="text-gray-800"><strong>Эрүүл хооллолт:</strong> Кофе, архи багасгах, ундрах усаа нэмэгдүүлэх</span>
          </div>
          <div className="flex items-start">
            <span className="text-orange-600 mr-2">📞</span>
            <span className="text-gray-800"><strong>Тусламж хүсэх:</strong> Ажлын ачааллыг хуваарилах, дэмжлэг авах</span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-orange-50 rounded-lg border border-orange-200">
          <p className="text-gray-800 text-sm font-medium">⚠️ Хэрэв 2 долоо хоногоос удаан үргэлжилбэл эмч, сэтгэлзүйчтэй зөвлөлдөөрэй.</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className="p-6 bg-white border-l-4 border-red-500 rounded-lg shadow-lg ring-1 ring-red-200">
        <div className="flex items-center mb-3">
          <span className="text-2xl mr-2">😱</span>
          <h3 className="font-bold text-gray-800 text-lg">Маш өндөр стресстэй - Яаралтай арга хэмжээ</h3>
        </div>
        <p className="text-gray-700 mb-4">Стрессийн түвшин хэт өндөр байна. Эрүүл мэндэд сөрөг нөлөө үзүүлж болзошгүй:</p>
        <div className="space-y-3 text-sm">
          <div className="flex items-start">
            <span className="text-red-600 mr-2">🛑</span>
            <span className="text-gray-800"><strong>Яаралтай завсарлага:</strong> Хэрэгтэй бол ажлаасаа амралт авах</span>
          </div>
          <div className="flex items-start">
            <span className="text-red-600 mr-2">🏥</span>
            <span className="text-gray-800"><strong>Эмнэлэгт хандах:</strong> Эмч, сэтгэлзүйчтэй уулзах товлох</span>
          </div>
          <div className="flex items-start">
            <span className="text-red-600 mr-2">💊</span>
            <span className="text-gray-800"><strong>Эрүүл мэнд:</strong> Биеийн үзлэг хийлгэх, цусны шинжилгээ</span>
          </div>
          <div className="flex items-start">
            <span className="text-red-600 mr-2">👨‍👩‍👧‍👦</span>
            <span className="text-gray-800"><strong>Гэр бүлийн дэмжлэг:</strong> Ойрын хүмүүстээ нөхцөл байдлаа мэдэгдэх</span>
          </div>
        </div>
        <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
          <p className="text-gray-800 font-bold text-sm mb-2">🚨 Яаралтай холбогдох утас:</p>
          <p className="text-gray-700 text-sm">Сэтгэцийн эрүүл мэндийн төв: 70110911</p>
          <p className="text-gray-700 text-sm">Ослын тусламж: 103</p>
        </div>
      </div>
    );
  }
}

// Мэйлд илгээх зөвлөгөө (HTML string)
function getAdviceForEmail(score: number, maxScore: number): string {
  const percent = (score / maxScore) * 100;

  if (percent <= 25) {
    return `
      <div style="padding: 20px; background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border-left: 4px solid #22c55e; border-radius: 8px;">
        <h3 style="color: #166534; font-size: 18px; margin-bottom: 10px;">😌 Сайн байна! Стресс багатай байна</h3>
        <p style="color: #166534; margin-bottom: 15px;">Та сэтгэлийн тэнцвэрээ сайн хадгалж чадаж байна. Энэ эерэг байдлаа үргэлжлүүлэхийн тулд:</p>
        <ul style="color: #166534;">
          <li><strong>Биеийн тамир:</strong> Өдөрт 30 минут алхах, дасгал хийх</li>
          <li><strong>Хобби:</strong> Дуртай зүйлдээ цаг гаргах, шинэ сонирхол эзэмшүүлэх</li>
          <li><strong>Харилцаа:</strong> Найз дүүстэйгээ тогтмол уулзах, ярилцах</li>
        </ul>
      </div>
    `;
  } else if (percent <= 50) {
    return `
      <div style="padding: 20px; background: linear-gradient(135deg, #fffbeb, #fef3c7); border-left: 4px solid #f59e0b; border-radius: 8px;">
        <h3 style="color: #92400e; font-size: 18px; margin-bottom: 10px;">😐 Дунд зэрэг стресстэй байна</h3>
        <p style="color: #92400e; margin-bottom: 15px;">Зарим үед ачаалал их мэдрэгддэг байна. Стрессээ багасгахын тулд эдгээр арга хэмжээг туршина уу:</p>
        <ul style="color: #92400e;">
          <li><strong>💨 Амьсгалын дасгал:</strong> Өдөрт 3 удаа 5 минут гүнзгий амьсгал авах</li>
          <li><strong>🛌 Унтлагын дэглэм:</strong> 7-8 цаг тогтмол унтах, утас харахгүй байх</li>
          <li><strong>👥 Дэмжлэг авах:</strong> Итгэлтэй хүнтэй сэтгэлээ хуваалцах</li>
          <li><strong>⏰ Цаг удирдлага:</strong> Ажлын ачааллыг хуваарилах, завсарлага авах</li>
        </ul>
      </div>
    `;
  } else if (percent <= 75) {
    return `
      <div style="padding: 20px; background: linear-gradient(135deg, #fef2f2, #fecaca); border-left: 4px solid #f97316; border-radius: 8px;">
        <h3 style="color: #9a3412; font-size: 18px; margin-bottom: 10px;">😰 Их стресстэй байна - Анхаарах хэрэгтэй</h3>
        <p style="color: #9a3412; margin-bottom: 15px;">Стрессийн түвшин өндөр байна. Яаралтай арга хэмжээ авах шаардлагатай:</p>
        <ul style="color: #9a3412;">
          <li><strong>🚨 Яаралтай амралт:</strong> Энэ долоо хоногт амралтын цаг нэмэгдүүлэх</li>
          <li><strong>🧘 Тайвшрах:</strong> Медитаци, бясалгал, хөгжим сонсох</li>
          <li><strong>🥗 Эрүүл хооллолт:</strong> Кофе, архи багасгах, ундрах усаа нэмэгдүүлэх</li>
          <li><strong>📞 Тусламж хүсэх:</strong> Ажлын ачааллыг хуваалцах, дэмжлэг авах</li>
        </ul>
        <div style="margin-top: 15px; padding: 10px; background: #fed7aa; border-radius: 5px;">
          <p style="color: #9a3412; font-weight: bold;">⚠️ Хэрэв 2 долоо хоногоос удаан үргэлжилбэл эмч, сэтгэлзүйчтэй зөвлөлдөөрэй.</p>
        </div>
      </div>
    `;
  } else {
    return `
      <div style="padding: 20px; background: linear-gradient(135deg, #fef2f2, #fecaca); border-left: 4px solid #dc2626; border-radius: 8px;">
        <h3 style="color: #991b1b; font-size: 18px; margin-bottom: 10px;">😱 Маш өндөр стресстэй - Яаралтай арга хэмжээ</h3>
        <p style="color: #991b1b; margin-bottom: 15px;">Стрессийн түвшин хэт өндөр байна. Эрүүл мэндэд сөрөг нөлөө үзүүлж болзошгүй:</p>
        <ul style="color: #991b1b;">
          <li><strong>🛑 Яаралтай завсарлага:</strong> Хэрэгтэй бол ажлаасаа амралт авах</li>
          <li><strong>🏥 Эмнэлэгт хандах:</strong> Эмч, сэтгэлзүйчтэй уулзах товлох</li>
          <li><strong>💊 Эрүүл мэнд:</strong> Биеийн үзлэг хийлгэх, цусны шинжилгээ</li>
          <li><strong>👨‍👩‍👧‍👦 Гэр бүлийн дэмжлэг:</strong> Ойрын хүмүүстээ нөхцөл байдлаа мэдэгдэх</li>
        </ul>
        <div style="margin-top: 15px; padding: 15px; background: #fecaca; border: 1px solid #f87171; border-radius: 5px;">
          <p style="color: #991b1b; font-weight: bold; margin-bottom: 5px;">🚨 Яаралтай холбогдох утас:</p>
          <p style="color: #991b1b;">Сэтгэцийн эрүүл мэндийн төв: 70110911</p>
          <p style="color: #991b1b;">Ослын тусламж: 103</p>
        </div>
      </div>
    `;
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
      const res = await fetch("/api/survey/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          totalScore: result,
          maxScore,
          answers,
          advice: getAdviceForEmail(result || 0, maxScore),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setSent(true);
      } else {
        setError(data.message || "Мэйл илгээхэд алдаа гарлаа.");
      }
    } catch {
      setError("Мэйл илгээхэд алдаа гарлаа.");
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      {/* Header секц */}
      <div className="w-full max-w-2xl mb-8 text-center">
        <div className="inline-block mb-4">
          <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
            Сэтгэлзүйн үнэлгээ
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          🧠 Амьдралын стрессийн түвшний тест
        </h1>
        <p className="text-gray-600 text-lg max-w-lg mx-auto">
          15 асуултын тусламжтайгаар таны сэтгэлийн эрүүл мэндийг үнэлж, хувийн зөвлөгөө өгөх болно.
        </p>
      </div>

      {/* Progress хэсэг */}
      <div className="w-full max-w-lg mb-8 px-4">
        <ProgressBar percent={percent} />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>Асуулт {current + 1}/{total}</span>
          <span>{total - current} асуулт үлдсэн</span>
        </div>
      </div>

      {/* Гол контент */}
      <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 w-full max-w-2xl overflow-hidden">
        {current < total ? (
          <div className="relative">
            {/* Question number indicator */}
            <div className="absolute top-6 right-6 bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">
              {current + 1}/{total}
            </div>
            <QuestionCard
              q={QUESTIONS[current]}
              onChange={handleAnswer}
            />
          </div>
        ) : (
          <div className="p-8 text-center">
            {/* Completion celebration */}
            <div className="mb-8">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Тест амжилттай дууслаа!
              </h2>
              <p className="text-gray-600">Таны үр дүнг дэлгэрэнгүй харж болно</p>
            </div>

            {/* Score display */}
            <div className="mb-8 p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white shadow-xl">
              <div className="text-sm opacity-90 mb-2">Таны нийт оноо</div>
              <div className="text-4xl sm:text-5xl font-extrabold mb-2">{result}</div>
              <div className="text-sm opacity-90">
                {maxScore} оноогоос ({Math.round(((result || 0) / maxScore) * 100)}%)
              </div>
            </div>

            {/* Advice section */}
            {result !== null && (
              <div className="mb-8">
                {getAdvice(result, maxScore)}
              </div>
            )}

            {/* Email section */}
            {!sent ? (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">📧 Дэлгэрэнгүй тайлан авах</h3>
                  <p className="text-gray-600 text-sm">
                    Таны хариултууд болон зөвлөгөөг имэйлээр илгээж өгөх болно
                  </p>
                </div>
                <div className="space-y-3">
                  <input
                    type="email"
                    className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                    placeholder="example@gmail.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    disabled={sending}
                    required
                  />
                  <button
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-60 disabled:transform-none shadow-lg"
                    onClick={handleSendMail}
                    disabled={sending || !email}
                  >
                    {sending ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Илгээж байна...
                      </span>
                    ) : (
                      "📨 Тайланг имэйлээр авах"
                    )}
                  </button>
                  {error && (
                    <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                      {error}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-2xl">
                <div className="text-2xl mb-2">✅</div>
                <p className="font-semibold">Тайлан амжилттай илгээгдлээ!</p>
                <p className="text-sm text-green-600">Имэйлээ шалгаарай</p>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
