import type { Metadata } from "next";
import { hreflangAlternatesEn } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "About | Moria Yazılım",
  description: "Our team, approach, and values at Moria Yazılım.",
  alternates: hreflangAlternatesEn("/about"),
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}

