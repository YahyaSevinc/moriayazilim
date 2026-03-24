import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface SecondMainProps {
  isVisible: boolean;
  displayedText: string;
}

export default function SecondMain({ isVisible, displayedText }: SecondMainProps) {
    return (
        <div className="text-center mx-auto mb-4">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Dijital iş süreçlerinizi
                <br />
                <span className="inline-block min-h-[60px] md:min-h-[90px]">
                    <span className="text-4xl md:text-6xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {displayedText}
                    </span>
                    <span className="border-r-2 border-blue-500 animate-pulse ml-1 inline-block h-[35px] md:h-[50px] align-middle" />
                </span>
            </h1>

            <p className={`md:text-xl text-md px-6 text-gray-600 my-8 max-w-2xl mx-auto transform transition-all duration-1000 delay-100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                Markanıza özel <strong>modern web siteleri</strong>, <strong>SEO uyumlu çözümler</strong> ve <strong>hızlı performans</strong> ile dijital varlığınızı güçlendiriyoruz.
            </p>

            <div className={`flex flex-col sm:flex-row gap-4 justify-center items-center transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <Link href="/our-packages" className="bg-blue-600 hover:bg-blue-700 text-white md:px-8 md:py-3 px-6 py-2 rounded-lg md:text-xl text-md transition-all duration-300 transform hover:scale-105 hover:shadow-xl items-center group flex cursor-pointer">
                    Teklif Al
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </div>
    );
}