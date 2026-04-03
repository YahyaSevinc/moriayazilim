import type { Metadata } from "next";
import { hreflangAlternates } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Paketler | Moria Yazılım",
  description: "Kurumsal web sitesi, e-ticaret ve yazılım hizmet paketleri.",
  alternates: hreflangAlternates("/our-packages"),
};

export default function PackagesLayout({ children }: { children: React.ReactNode }) {
  return children;
}

