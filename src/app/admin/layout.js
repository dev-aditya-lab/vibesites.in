import { Manrope } from "next/font/google";
import "../globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata = {
  title: { default: "Admin | Vibesites", template: "%s | Vibesites Admin" },
  robots: { index: false, follow: false },
};

/**
 * Independent root layout for /admin — deliberately plain. No Header/Footer,
 * no Lenis, no GSAP/Framer entrance choreography; this is an internal tool,
 * not the marketing site.
 */
export default function AdminRootLayout({ children }) {
  return (
    <html lang="en" className={manrope.variable}>
      <body className="min-h-dvh bg-cream-100 font-sans text-ink-900 antialiased">{children}</body>
    </html>
  );
}
