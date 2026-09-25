import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Layout";

export const metadata: Metadata = {
  metadataBase: new URL("https://oxidescheme.vercel.app"),
  title: {
    template: "%s | oxide",
    default: "oxide",
  },
  description: "A dark-only colorscheme for editors, terminals, and the web.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen flex flex-col">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
