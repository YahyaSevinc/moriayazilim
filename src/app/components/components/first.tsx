import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocalePrefix } from "@/app/utils/locale";

interface FirstMainProps {
  isVisible: boolean; 
}

export default function FirstMain({ isVisible }: FirstMainProps) {
    const pathname = usePathname();
    const locale = getLocaleFromPathname(pathname);

    const aboutHref = withLocalePrefix("/about", locale);
    const ctaText = locale === "en" ? "Learn more" : "Daha fazla bilgi edinin";

    return (
        <>
            <div className={`text-center mb-12 transform transition-all px-2 md:mt-0 mt-6 duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center bg-white/70 backdrop-blur-sm rounded-full justify-between px-6 py-3  md:w-auto gap-2 flex-nowrap text-nowrap shadow-lg border border-white/20 hover:shadow-xl transition-all duration-300">
            <Zap className="w-5 h-5 text-blue-600 md:mr-2" />
            <span className="text-gray-700 font-medium md:text-md text-sm">Moria Yazılım</span>
            <Link href={aboutHref}
              className="ml-3 text-blue-600 hover:text-blue-700 font-semibold md:text-sm text-xs transition-colors flex items-center justify-center"
            >
              {ctaText}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
        </>
    );
}
