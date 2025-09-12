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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center py-10 px-2">
      <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-6 text-center drop-shadow">Мэргэжлийн сэтгэлзүйн тестүүд</h1>
      <p className="text-gray-600 mb-10 text-center max-w-xl">Өөрийн сэтгэлзүйн төлөв, стресс, сэтгэл ханамж, EQ зэрэг олон төрлийн тестүүдийг бөглөж, хувь хүний зөвлөгөө аваарай.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {TESTS.map((test, idx) => (
          <Link key={test.title} href={test.href} className="group">
            <div
              className={`rounded-2xl shadow-lg bg-gradient-to-br ${test.color} p-6 h-full flex flex-col justify-between transition-transform duration-200 group-hover:scale-105 cursor-pointer`}
            >
              <div>
                <h2 className="text-xl font-bold text-white mb-2 drop-shadow">{test.title}</h2>
                <p className="text-white/90 text-sm mb-4 min-h-[48px]">{test.description}</p>
              </div>
              <span className="inline-block mt-auto px-4 py-2 bg-white/90 text-blue-700 font-semibold rounded-lg text-sm shadow hover:bg-white transition">{test.href === "#soon" ? "Тун удахгүй" : "Тест өгөх"}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
