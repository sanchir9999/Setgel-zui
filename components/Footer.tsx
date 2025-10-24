import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full mt-12">
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
        <p>© {new Date().getFullYear()} Setgel‑Zui</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="hover:underline">Нууцлал</Link>
          <Link href="/terms" className="hover:underline">Үйлчилгээ</Link>
        </div>
      </div>
    </footer>
  );
}
