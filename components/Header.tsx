import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="w-full bg-transparent backdrop-blur-sm border-b border-gray-100/60 dark:border-zinc-800/60 sticky top-0 z-40">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 bg-slate-900 dark:bg-white/10 text-white rounded-full grid place-items-center">
            <span className="text-sm">🧠</span>
          </div>
          <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">Setgel‑Zui</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-gray-700 dark:text-gray-200">
          <Link href="/" className="hover:underline">Нүүр</Link>
          <Link href="/survey" className="hover:underline">Тест</Link>
          <Link href="/tests" className="px-3 py-1 rounded-md border border-gray-200 dark:border-zinc-700 text-sm">Бүх тест</Link>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <div className="md:hidden">
            <button aria-label="menu" className="p-2 text-gray-700 dark:text-gray-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
