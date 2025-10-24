// app/layout.tsx

import "./globals.css";
import { Rubik } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ThemeToggle from "../components/ThemeToggle";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik",
});

export const metadata = {
  title: "Survey",
  description: "Rubik font everywhere",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="mn" suppressHydrationWarning>
      <body className={rubik.variable + " bg-white dark:bg-zinc-950 min-h-screen flex flex-col antialiased"}>
        <Header />
        <ThemeToggle />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
