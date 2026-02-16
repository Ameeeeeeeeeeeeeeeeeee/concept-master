import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "ConceptMaster - AI-Powered Learning for Ethiopian Students",
  description:
    "Master your high school subjects with AI-powered explanations, practice quizzes, and personalized learning. Covering English, Physics, Chemistry, and Biology for Grades 9-12.",
  keywords: [
    "Ethiopian education",
    "high school",
    "AI learning",
    "physics",
    "chemistry",
    "biology",
    "english",
    "grade 9",
    "grade 10",
    "grade 11",
    "grade 12",
  ],
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0f1e" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen flex flex-col">
        <ThemeProvider defaultTheme="system">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
