import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Ali Waqas — AI Engineer",
  description:
    "Portfolio of Muhammad Ali Waqas, an AI Engineer from Lahore, Pakistan. RAG and LLM backend work first: CryptoInsight (RAG over 827+ articles), University Policy Q&A, FinWise AI, SupportPearlz — plus TruthLens fake-news detection (98.7% accuracy), his one classic ML project. Browse it like a terminal, or switch to the Simple View.",
  openGraph: {
    title: "Muhammad Ali Waqas — AI Engineer",
    description:
      "AI Engineer building RAG and LLM backends: CryptoInsight, University Policy Q&A, FinWise AI, SupportPearlz, and TruthLens (98.7% accuracy).",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#070b12] text-[#e6edf7]">
        {children}
      </body>
    </html>
  );
}
