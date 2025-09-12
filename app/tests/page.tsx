import Link from "next/link";

export default function TestsPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-50 py-12">
      <h1 className="text-3xl font-bold mb-8">Сэтгэлзүйн тестүүд</h1>
      <Link href="/" className="mb-4 text-blue-500 underline">Нүүр хуудас руу буцах</Link>
      <div className="bg-white rounded-lg shadow p-8 flex flex-col items-center">
        <h2 className="text-xl font-semibold mb-4">Амьдралын тест</h2>
        <Link href="/survey" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Амьдралын тест өгөх</Link>
      </div>
    </main>
  );
}
