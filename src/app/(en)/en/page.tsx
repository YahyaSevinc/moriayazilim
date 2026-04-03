import type { Metadata } from "next";
import { hreflangAlternatesEn } from "@/app/_shared/seo";
import DreamSection from "@/app/components/main/DreamSection";
import Portfolio_Cut from "@/app/components/main/pages_cut";
import Our_Services from "@/app/components/main/our_services";
import ScrollVelocity from "@/app/utils/ScrollVelocity/ScrollVelocity";

export const metadata: Metadata = {
  title: "Moria Yazılım | Corporate Website & Web Agency",
  description:
    "Moria Yazılım is a web agency providing corporate website design, custom software development, e-commerce solutions, and SEO services.",
  alternates: hreflangAlternatesEn("/"),
};

export default function EnHomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-white text-gray-900 justify-between max-w-full overflow-hidden">
      <DreamSection />
      <Portfolio_Cut />
      <Our_Services />

      <ScrollVelocity
        texts={["WEB DESIGN WEB DEVELOPMENT SEO", "DIGITAL MARKETING SOFTWARE DEVELOPMENT"]}
        velocity={100}
        className="custom-scroll-text"
      />

      <meta name="google-adsense-account" content="ca-pub-3295280319586761" />
    </div>
  );
}

