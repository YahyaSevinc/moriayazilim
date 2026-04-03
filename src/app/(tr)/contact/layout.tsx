import type { Metadata } from "next";
import { hreflangAlternates } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "İletişim | Moria Yazılım",
  description: "Web ajansı Moria Yazılım ile iletişime geçin.",
  alternates: hreflangAlternates("/contact"),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

