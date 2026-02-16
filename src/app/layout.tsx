import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oxide - Where Function Meets Form",
  description: "A minimalist colorscheme ecosystem for terminals and editors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
