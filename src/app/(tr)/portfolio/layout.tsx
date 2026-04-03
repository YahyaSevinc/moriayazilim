import type { Metadata } from "next";
import { hreflangAlternates } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Portfolyo | Moria Yazılım",
  description: "Kurumsal web sitesi ve yazılım projelerimizden seçkiler.",
  alternates: hreflangAlternates("/portfolio"),
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}

