import type { Metadata } from "next";
import { Bokor, Lora } from "next/font/google";
import "./globals.css";

import AdSense from "@/components/core/Adsense";
import LayoutContent from "@/components/layout/LayoutContent";

const bokor = Bokor({
  variable: "--font-bokor",
  subsets: ["khmer", "latin"],
  weight: ["400"],
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Warung Jurnalis",
  description: "A News Portal Website",
};

const adsenseClientId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_CLIENT_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdSense pId={adsenseClientId!} />
      </head>
      <body
        className={`${lora.variable} ${bokor.variable} font-[var(--font-lora)] antialiased `}
      >
        <LayoutContent>{children}</LayoutContent>
      </body>
    </html>
  );
}
