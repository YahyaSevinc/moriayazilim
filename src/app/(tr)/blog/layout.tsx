import type { Metadata } from "next";
import { hreflangAlternates } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Blog | Moria Yazılım",
  description: "Web tasarım, yazılım ve dijital pazarlama üzerine blog yazıları.",
  alternates: hreflangAlternates("/blog"),
  openGraph: {
    title: "Blog | Moria Yazılım",
    description: "Web tasarım, yazılım ve dijital pazarlama üzerine blog yazıları.",
    url: "https://www.moriayazilim.com/blog",
    locale: "tr_TR",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

