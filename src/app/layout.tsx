import type { Metadata } from "next";
import { IBM_Plex_Sans, DM_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex",
  display: "swap",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-dm",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Axiom Pulse | Token Discovery",
  description:
    "Pixel-perfect replica of Axiom Trade Pulse discovery table with live data treatments.",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${plexSans.variable} ${dmMono.variable} bg-pulse-background`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
