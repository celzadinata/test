import type { Metadata } from "next";
import { Bokor, Lora } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import AdSense from "@/components/core/Adsense";
import Footer from "@/components/layout/Footer";

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
  auth,
}: Readonly<{
  children: React.ReactNode;
  auth: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdSense pId={adsenseClientId!} />
      </head>
      <body className={`${lora.variable} ${bokor.variable} antialiased`}>
        <NavbarWrapper />
        <div className="container mx-auto">
          {auth}
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
