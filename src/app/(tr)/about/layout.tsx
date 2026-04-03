import type { Metadata } from "next";
import { hreflangAlternates } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Hakkımızda | Moria Yazılım",
  description: "Moria Yazılım ekibi, yaklaşımı ve değerleri.",
  alternates: hreflangAlternates("/about"),
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

