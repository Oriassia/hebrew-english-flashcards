import type { Metadata } from "next";
import { Assistant, Frank_Ruhl_Libre } from "next/font/google";
import "./globals.css";

const assistant = Assistant({
  variable: "--font-sans",
  subsets: ["latin", "hebrew"],
  display: "swap",
});

// Frank Ruhl Libre stands in for Fedra as the Hebrew serif display face.
const frankRuhl = Frank_Ruhl_Libre({
  variable: "--font-display",
  subsets: ["latin", "hebrew"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hebrew Flashcards",
  description:
    "Study modern Hebrew with flashcards, organised by tier, level, and type.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${assistant.variable} ${frankRuhl.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
