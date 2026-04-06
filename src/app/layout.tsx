import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fixteam Studio | Wedding & Elopement Photographer",
  description: "Fixteam Studio is a premium cinematic wedding and elopement photography studio based in Vietnam.",
  icons: {
    icon: "https://fixteamstudio.com/wp-content/uploads/2023/11/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
      suppressHydrationWarning={true}
    >
      <body
        className="min-h-full flex flex-col bg-black text-white font-inter"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
