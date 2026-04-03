import type { Metadata } from "next";
import { hreflangAlternatesEn } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Portfolio | Moria Yazılım",
  description: "Selected corporate website and software projects we delivered.",
  alternates: hreflangAlternatesEn("/portfolio"),
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

