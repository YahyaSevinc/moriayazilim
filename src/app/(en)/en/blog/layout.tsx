import type { Metadata } from "next";
import { hreflangAlternatesEn } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Blog | Moria Yazılım",
  description: "Blog posts on website design, software development and digital marketing.",
  alternates: hreflangAlternatesEn("/blog"),
  openGraph: {
    title: "Blog | Moria Yazılım",
    description: "Blog posts on website design, software development and digital marketing.",
    url: "https://www.moriayazilim.com/en/blog",
    locale: "en_US",
    type: "website",
  },
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}

