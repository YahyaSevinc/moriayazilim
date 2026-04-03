import type { Metadata } from "next";
import RootShell from "@/app/_shared/RootShell";

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.moriayazilim.com"),
  title: "Moria Yazılım",
  description:
    "Moria Yazılım is a web agency providing corporate website design, custom software development, e-commerce solutions, SEO, and digital marketing services.",
  icons: "/moria_blue.jpg",
  keywords: [
    "web agency",
    "corporate website",
    "website design",
    "software development",
    "ecommerce",
    "seo services",
    "digital marketing",
  ],
  authors: [{ name: "Moria Yazılım" }],
  creator: "Moria Yazılım",
  publisher: "Moria Yazılım",
  openGraph: {
    title: "Moria Yazılım",
    description:
      "A web agency providing corporate website design, custom software development, e-commerce solutions, SEO, and digital marketing services.",
    url: "https://www.moriayazilim.com/en",
    siteName: "Moria Yazılım",
    images: [
      {
        url: "/moria_blue.jpg",
        width: 1200,
        height: 630,
        alt: "Moria Yazılım - Web Agency & Software Development",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moria Yazılım",
    description:
      "Corporate websites, custom software, e-commerce solutions, SEO, and digital marketing.",
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
};

export default function EnRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <RootShell>{children}</RootShell>
    </html>
  );
}

