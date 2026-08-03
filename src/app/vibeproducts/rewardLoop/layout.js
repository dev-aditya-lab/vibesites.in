import { Sora, Inter } from "next/font/google";
import "./rewardloop-theme.css";
import RLHeader from "@/components/rewardloop/RLHeader";
import RLFooter from "@/components/rewardloop/RLFooter";
import RLContactFab from "@/components/rewardloop/RLContactFab";
import { rewardLoopConfig } from "@/data/rewardloop";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(rewardLoopConfig.parentUrl),
  title: {
    default: `${rewardLoopConfig.name} — Turn First-Time Guests Into Loyal Regulars`,
    template: `%s | ${rewardLoopConfig.name}`,
  },
  description: rewardLoopConfig.description,
  keywords: [
    "restaurant loyalty program",
    "QR code loyalty",
    "restaurant rewards app",
    "customer retention for restaurants",
    "digital punch card",
  ],
  openGraph: {
    type: "website",
    url: rewardLoopConfig.url,
    siteName: rewardLoopConfig.name,
    title: `${rewardLoopConfig.name} — Turn First-Time Guests Into Loyal Regulars`,
    description: rewardLoopConfig.description,
    images: [{ url: "/rewardloop/rewardloop-hero.jpg", width: 1920, height: 1080, alt: rewardLoopConfig.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${rewardLoopConfig.name} — Turn First-Time Guests Into Loyal Regulars`,
    description: rewardLoopConfig.description,
    images: ["/rewardloop/rewardloop-hero.jpg"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

export const viewport = {
  themeColor: "#fffaf9",
  width: "device-width",
  initialScale: 1,
};

export default function RewardLoopLayout({ children }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable}`}>
      <body className="rl-root flex min-h-dvh flex-col antialiased">
        <RLHeader />
        <main className="flex-1">{children}</main>
        <RLFooter />
        <RLContactFab />
      </body>
    </html>
  );
}
