import type { Metadata } from "next";
import { hreflangAlternatesEn } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Contact | Moria Yazılım",
  description: "Get in touch with Moria Yazılım web agency.",
  alternates: hreflangAlternatesEn("/contact"),
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}

