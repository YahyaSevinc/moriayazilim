import DreamSection from "@/app/components/main/DreamSection";
import Portfolio_Cut from "@/app/components/main/pages_cut";
import Our_Services from "@/app/components/main/our_services";
import ScrollVelocity from "@/app/utils/ScrollVelocity/ScrollVelocity";
import type { Metadata } from "next";
import { hreflangAlternates } from "@/app/_shared/seo";

export const metadata: Metadata = {
  title: "Moria Yazılım | Kurumsal Web Sitesi & Web Ajansı",
  description:
    "Kurumsal web sitesi, web tasarım, yazılım geliştirme, e-ticaret ve SEO hizmetleri sunan Moria Yazılım web ajansı.",
  alternates: hreflangAlternates("/"),
};

export default function IndexPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 justify-between max-w-full overflow-hidden">
      <DreamSection />
      <Portfolio_Cut />
      <Our_Services />

      <ScrollVelocity
        texts={["WEB TASARIM WEB GELİŞTİRME SEO", "DİJİTAL PAZARLAMA YAZILIM GELİŞTİRME"]}
        velocity={100}
        className="custom-scroll-text"
      />

      <meta name="google-adsense-account" content="ca-pub-3295280319586761" />
    </div>
  );
}

