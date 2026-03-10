import "./globals.css";
import { poppins } from "@/app/ui/fonts";
import ClientLayoutWrapper from "@/app/ClientLayout";
import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Moria Yazılım",
  description:
    "Moria Yazılım, profesyonel web tasarım, yazılım geliştirme, e-ticaret çözümleri, SEO hizmetleri ve dijital pazarlama alanlarında yenilikçi çözümler sunan web ajansı.",
  icons: "/moria_blue.jpg",
  keywords: [
    "web tasarım",
    "yazılım geliştirme",
    "e-ticaret",
    "SEO",
    "dijital pazarlama",
    "web ajansı",
  ],
  authors: [{ name: "Moria Yazılım" }],
  creator: "Moria Yazılım",
  publisher: "Moria Yazılım",

  // Open Graph
  openGraph: {
    title: "Moria Yazılım",
    description:
      "Profesyonel web tasarım, yazılım geliştirme, e-ticaret çözümleri, SEO hizmetleri ve dijital pazarlama alanlarında yenilikçi çözümler sunan web ajansı.",
    url: "https://www.moriayazilim.com",
    siteName: "Moria Yazılım",
    images: [
      {
        url: "/moria_blue.jpg",
        width: 1200,
        height: 630,
        alt: "Moria Yazılım - Web Tasarım ve Yazılım Geliştirme",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Moria Yazılım",
    description:
      "Profesyonel web tasarım, yazılım geliştirme, e-ticaret çözümleri, SEO hizmetleri ve dijital pazarlama alanlarında yenilikçi çözümler sunan web ajansı.",
    images: ["/moria_blue.jpg"],
    creator: "@moriayazilim",
    site: "@moriayazilim",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      

      <body className={`${poppins.className} antialiased bg-black text-white`}>
        <ClientLayoutWrapper>{children}</ClientLayoutWrapper>
      </body>
    </html>
  );
}
