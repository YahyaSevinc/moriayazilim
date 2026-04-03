import type { Metadata } from "next";
import { hreflangAlternatesEn } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Packages | Moria Yazılım",
  description: "Service packages for corporate websites, e-commerce, and custom software.",
  alternates: hreflangAlternatesEn("/our-packages"),
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

