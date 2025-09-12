"use client";
import { useState, useEffect } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isDark = localStorage.getItem("theme") === "dark";
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, []);

  const toggleTheme = () => {
    const newDark = !dark;
    setDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-full p-2 shadow hover:scale-105 transition"
      aria-label="Өдөр/Шөнийн горим солих"
    >
      {dark ? (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="#fbbf24"/></svg>
      ) : (
        <svg width="24" height="24" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5" fill="#2563eb"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="#2563eb" strokeWidth="2" strokeLinecap="round"/></svg>
      )}
    </button>
  );
}
