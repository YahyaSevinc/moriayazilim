import PricingHeader from "../components/pricing/PricingHeader";
import PricingCards from "../components/pricing/PricingCards";
import CustomProjectSection from "../components/pricing/CustomProjectSection";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <PricingHeader />
        <PricingCards />
        <CustomProjectSection />
      </div>
    </div>
  );
} 