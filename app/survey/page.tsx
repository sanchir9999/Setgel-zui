"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useState as useClientState } from "react";

// User type
interface UserData {
  userId: string;
  phone: string;
  email: string;
}
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
  const [showAuth, setShowAuth] = useClientState(false);
  const [authMode, setAuthMode] = useClientState<'login' | 'register'>('login');
  const [user, setUser] = useClientState<UserData | null>(null);
  const total = QUESTIONS.length;

  // Хуудас ачаалагдах үед хэрэглэгчийн мэдээллийг шалгах
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, [setUser]);

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

  // Хэрэглэгч нэвтэрсэн үед тестийн үр дүнг хадгалах
  const saveTestResult = useCallback(async () => {
    if (!user || !result) return;

    try {
      await fetch('/api/test-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.userId,
          totalScore: result,
          maxScore,
          answers,
          advice: getAdviceForEmail(result, maxScore),
        }),
      });
    } catch (error) {
      console.error('Тестийн үр дүн хадгалахад алдаа:', error);
    }
  }, [user, result, maxScore, answers]);

  // Тест дуусах үед хэрэглэгч нэвтэрсэн бол үр дүнг хадгалах
  useEffect(() => {
    if (result && user) {
      saveTestResult();
    }
  }, [result, user, saveTestResult]);

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
        // Хэрэв анхааруулга байвал харуулах
        if (data.warning) {
          setError(`✅ ${data.message}`);
        }
      } else {
        setError(data.message || "Мэйл илгээхэд алдаа гарлаа.");
      }
    } catch (err) {
      console.error("Мэйл илгээх алдаа:", err);
      setError("Мэйл илгээхэд алдаа гарлаа. Сүлжээний холболтоо шалгана уу.");
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

            {/* Score display - зөвхөн нэвтэрсэн хэрэглэгчид */}
            {user ? (
              <>
                <div className="mb-8 p-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl text-white shadow-xl">
                  <div className="text-xs opacity-80 mb-1">Тест №{Date.now().toString().slice(-4)}</div>
                  <div className="text-sm opacity-90 mb-2">Таны нийт оноо</div>
                  <div className="text-4xl sm:text-5xl font-extrabold mb-2">{result}</div>
                  <div className="text-sm opacity-90">
                    {maxScore} оноогоос ({Math.round(((result || 0) / maxScore) * 100)}%)
                  </div>
                  <div className="text-xs opacity-80 mt-2">
                    {new Date().toLocaleDateString('mn-MN')} | {new Date().toLocaleTimeString('mn-MN', { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Advice section */}
                {result !== null && (
                  <div className="mb-8">
                    {getAdvice(result, maxScore)}
                  </div>
                )}
              </>
            ) : (
              /* Нэвтрээгүй хэрэглэгчид зөвхөн мэдээлэл */
              <div className="mb-8 p-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl border border-gray-300">
                <div className="text-center">
                  <div className="text-4xl mb-4">🔒</div>
                  <h3 className="text-lg font-bold text-gray-800 mb-2">Үр дүн харахын тулд нэвтрэнэ үү</h3>
                  <p className="text-gray-600 text-sm">
                    Тестийн үр дүн, зөвлөгөө болон өөрийн прогресс харахын тулд нэвтрэх шаардлагатай
                  </p>
                </div>
              </div>
            )}

            {/* User status display */}
            {user ? (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
                  <div className="text-center">
                    <div className="text-2xl mb-2">✅</div>
                    <h3 className="text-lg font-bold text-gray-800 mb-2">Тавтай морил, {user.phone}!</h3>
                    <p className="text-gray-600 text-sm mb-3">
                      Таны тестийн үр дүн автоматаар хадгалагдлаа
                    </p>
                    <div className="flex gap-3 mt-4">
                      <button
                        onClick={() => {
                          localStorage.removeItem('user');
                          setUser(null);
                        }}
                        className="flex-1 text-red-600 hover:text-red-800 text-sm font-medium py-2 px-4 rounded-lg border border-red-200 hover:bg-red-50 transition-all"
                      >
                        🚪 Гарах
                      </button>
                      <button
                        className="flex-1 text-blue-600 hover:text-blue-800 text-sm font-medium py-2 px-4 rounded-lg border border-blue-200 hover:bg-blue-50 transition-all"
                        onClick={() => {
                          // TODO: Тестийн түүх харах
                          alert('Тестийн түүх харах функц удахгүй нэмэгдэнэ!');
                        }}
                      >
                        📊 Тестийн түүх
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="mb-6">
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-6 border border-purple-200">
                  <div className="text-center mb-4">
                    <h3 className="text-xl font-bold text-gray-800 mb-2">🔐 Нэвтэрч үр дүн харах</h3>
                    <p className="text-gray-600 text-sm">
                      Тестийн үр дүн, зөвлөгөө болон тестийн түүх харахын тулд нэвтрэх шаардлагатай
                    </p>
                  </div>
                  <div className="flex gap-3">
                    <button
                      className="flex-1 bg-white border-2 border-purple-300 text-purple-700 font-semibold py-3 px-4 rounded-xl hover:bg-purple-50 transition-all"
                      onClick={() => { setShowAuth(true); setAuthMode('login'); }}
                    >
                      🔑 Нэвтрэх
                    </button>
                    <button
                      className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-xl hover:from-purple-700 hover:to-blue-700 transition-all"
                      onClick={() => { setShowAuth(true); setAuthMode('register'); }}
                    >
                      📝 Бүртгүүлэх
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Email section - зөвхөн нэвтэрсэн хэрэглэгчид */}
            {user && !sent && !showAuth ? (
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">📧 Имэйлээр дэлгэрэнгүй тайлан авах</h3>
                  <p className="text-gray-600 text-sm">
                    Таны тестийн үр дүн болон зөвлөгөөг имэйлээр дэлгэрэнгүй илгээж өгөх болно
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

            {/* Auth Modal */}
            {showAuth && (
              <div className="bg-white rounded-2xl p-6 border-2 border-purple-200 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">
                    {authMode === 'login' ? '🔑 Нэвтрэх' : '📝 Бүртгүүлэх'}
                  </h3>
                  <button
                    onClick={() => setShowAuth(false)}
                    className="text-gray-400 hover:text-gray-600 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {authMode === 'register' ? (
                  <RegisterForm onSuccess={() => setShowAuth(false)} />
                ) : (
                  <LoginForm onSuccess={() => setShowAuth(false)} />
                )}

                <div className="text-center mt-4">
                  <button
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-purple-600 hover:text-purple-800 text-sm font-medium"
                  >
                    {authMode === 'login'
                      ? 'Бүртгэл байхгүй юу? Бүртгүүлэх'
                      : 'Бүртгэл байгаа уу? Нэвтрэх'}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

// Login Form Component
function LoginForm({ onSuccess }: { onSuccess: () => void }) {
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!phone) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });

      const data = await response.json();

      if (data.success) {
        // Хэрэглэгчийн мэдээллийг localStorage-д хадгалах
        localStorage.setItem('user', JSON.stringify(data.data));
        // Хуудсыг дахин ачаалж хэрэглэгчийн төлөв шинэчлэх
        window.location.reload();
        onSuccess();
      } else {
        setError(data.message);
      }
    } catch {
      setError('Сүлжээний алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Утасны дугаар
        </label>
        <input
          type="tel"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
          placeholder="99112233"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <button
        onClick={handleLogin}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-60"
        disabled={loading || !phone}
      >
        {loading ? "Нэвтэрч байна..." : "Нэвтрэх"}
      </button>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}

// Register Form Component
function RegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<'info' | 'verify'>('info');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (!phone || !email) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email })
      });

      const data = await response.json();

      if (data.success) {
        setStep('verify');
      } else {
        setError(data.message);
      }
    } catch {
      setError('Сүлжээний алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch('/api/auth/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email, code: verificationCode })
      });

      const data = await response.json();

      if (data.success) {
        // Хэрэглэгчийн мэдээллийг localStorage-д хадгалах
        localStorage.setItem('user', JSON.stringify(data.data));
        // Хуудсыг дахин ачаалж хэрэглэгчийн төлөв шинэчлэх
        window.location.reload();
        onSuccess();
      } else {
        setError(data.message);
      }
    } catch {
      setError('Сүлжээний алдаа гарлаа');
    } finally {
      setLoading(false);
    }
  };

  if (step === 'verify') {
    return (
      <div className="space-y-4">
        <div className="text-center">
          <div className="text-4xl mb-2">📱</div>
          <p className="text-gray-600 text-sm">
            <span className="font-medium">{phone}</span> дугаарт баталгаажуулах код илгээлээ
          </p>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Баталгаажуулах код
          </label>
          <input
            type="text"
            className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 text-center text-2xl tracking-widest focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
            placeholder="000000"
            maxLength={6}
            value={verificationCode}
            onChange={e => setVerificationCode(e.target.value.replace(/\D/g, ''))}
          />
        </div>
        <button
          onClick={handleVerify}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-green-700 hover:to-blue-700 disabled:opacity-60"
          disabled={loading || verificationCode.length !== 6}
        >
          {loading ? "Баталгаажуулж байна..." : "Баталгаажуулах"}
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setStep('info')}
            className="flex-1 text-purple-600 hover:text-purple-800 text-sm"
          >
            ← Буцах
          </button>
          <button
            onClick={async () => {
              try {
                const response = await fetch(`/api/dev/sms-codes?phone=${phone}`);
                const data = await response.json();
                if (data.success) {
                  setVerificationCode(data.data.code);
                  alert(`🔍 Хөгжүүлэлтийн код: ${data.data.code}`);
                } else {
                  alert('SMS код олдсонгүй');
                }
              } catch {
                alert('SMS код авахад алдаа гарлаа');
              }
            }}
            className="flex-1 text-blue-600 hover:text-blue-800 text-sm"
          >
            🔍 SMS код харах
          </button>
        </div>
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
            {error}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Утасны дугаар *
        </label>
        <input
          type="tel"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
          placeholder="99112233"
          value={phone}
          onChange={e => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Имэйл хаяг *
        </label>
        <input
          type="email"
          className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400"
          placeholder="example@gmail.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </div>
      <button
        onClick={handleRegister}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-blue-700 disabled:opacity-60"
        disabled={loading || !phone || !email}
      >
        {loading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
      </button>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-lg text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
