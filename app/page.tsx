"use client";

import Link from "next/link";

const TESTS = [
  {
    title: "Амьдралын стрессийн түвшин",
    description: "Өдөр тутмын стресс, сэтгэлзүйн ачааллаа үнэлэх тест.",
    href: "/survey",
    color: "from-blue-500 to-blue-400",
  },
  {
    title: "Сэтгэл ханамжийн тест",
    description: "Амьдралдаа хэр сэтгэл хангалуун байгаагаа тодорхойлох.",
    href: "#soon",
    color: "from-green-500 to-green-400",
  },
  {
    title: "EQ (Сэтгэл хөдлөлийн оюун ухаан)",
    description: "Сэтгэл хөдлөлөө удирдах чадвараа шалгах тест.",
    href: "#soon",
    color: "from-pink-500 to-pink-400",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-white dark:from-zinc-900 dark:via-purple-900/20 dark:to-zinc-900 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-2000"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center py-16 px-4 max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-16 space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="gradient-text">Мэргэжлийн</span>
            <br />
            <span className="text-gray-800 dark:text-gray-200">сэтгэлзүйн тестүүд</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Өөрийн сэтгэлзүйн төлөв, стресс, сэтгэл ханамж, EQ зэрэг олон төрлийн тестүүдийг бөглөж,
            <span className="font-semibold text-blue-600 dark:text-blue-400"> мэргэжлийн зөвлөгөө</span> аваарай.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Link
              href="/survey"
              className="btn-primary inline-flex items-center space-x-2 text-lg"
            >
              <span>🎯</span>
              <span>Тест эхлүүлэх</span>
            </Link>
            <Link
              href="/tests"
              className="btn-secondary inline-flex items-center space-x-2 text-lg"
            >
              <span>📊</span>
              <span>Бүх тестүүд</span>
            </Link>
          </div>
        </div>

        {/* Test Cards */}
        <div className="w-full max-w-6xl">
          <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
            Боломжтой тестүүд
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTS.map((test, index) => (
              <Link key={test.title} href={test.href} className="group">
                <div
                  className={`relative rounded-3xl shadow-xl bg-gradient-to-br ${test.color} p-8 h-full flex flex-col justify-between transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl cursor-pointer overflow-hidden`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Card background pattern */}
                  <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                  <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -mr-10 -mt-10"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/10 rounded-full -ml-8 -mb-8"></div>

                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <span className="text-2xl">
                          {index === 0 ? '🧘' : index === 1 ? '😊' : '🧠'}
                        </span>
                      </div>
                      {test.href === "#soon" && (
                        <span className="px-3 py-1 bg-white/30 text-white text-xs font-semibold rounded-full backdrop-blur-sm">
                          Тун удахгүй
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 drop-shadow-md">{test.title}</h3>
                    <p className="text-white/90 text-sm mb-6 min-h-[48px] leading-relaxed">{test.description}</p>
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex items-center space-x-2 px-6 py-3 bg-white/90 hover:bg-white text-gray-800 font-semibold rounded-xl transition-all duration-300 group-hover:shadow-lg">
                      <span>{test.href === "#soon" ? "⏳" : "🚀"}</span>
                      <span>{test.href === "#soon" ? "Тун удахгүй" : "Тест өгөх"}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full max-w-6xl mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Хурдан үр дүн</h3>
              <p className="text-gray-600 dark:text-gray-300">5-10 минутын дотор дүгнэлт авах боломжтой</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Мэргэжлийн зөвлөгөө</h3>
              <p className="text-gray-600 dark:text-gray-300">Сэтгэлзүйч нарын боловсруулсан зөвлөмж</p>
            </div>

            <div className="text-center space-y-4 group">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Нууцлал хамгаалагдсан</h3>
              <p className="text-gray-600 dark:text-gray-300">Таны хувийн мэдээлэл аюулгүй хадгалагдана</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
