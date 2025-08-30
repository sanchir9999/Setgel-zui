// app/layout.tsx
import "./globals.css";
import { Rubik } from "next/font/google";

const rubik = Rubik({
  subsets: ["latin", "cyrillic"], // Монгол кирилл дэмжихийн тул
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-rubik", // CSS variable болгон зарлаж өгнө
});

export const metadata = {
  title: "Survey",
  description: "Rubik font everywhere",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="mn">
      <body className={rubik.variable}>{children}</body>
    </html>
  );
}
