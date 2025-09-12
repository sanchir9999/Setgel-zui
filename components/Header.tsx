export default function Header() {
  return (
    <header className="w-full py-4 px-4 bg-white dark:bg-zinc-900 shadow flex items-center justify-between">
      <span className="text-xl font-bold text-blue-700 dark:text-blue-300">Setgel-Zui</span>
      <nav className="space-x-4">
        <a href="/" className="text-gray-700 dark:text-gray-200 hover:underline">Нүүр</a>
        <a href="/survey" className="text-gray-700 dark:text-gray-200 hover:underline">Тест</a>
      </nav>
    </header>
  );
}
