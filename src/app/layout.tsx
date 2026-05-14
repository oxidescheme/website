import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Layout";

export const metadata: Metadata = {
  title: {
    template: "%s | oxide",
    default: "oxide",
  },
  description: "A minimalist colorscheme ecosystem for terminals and editors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-base flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
