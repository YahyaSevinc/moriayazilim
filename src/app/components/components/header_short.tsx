'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image"; // Image bileşenini ekledik

export default function Header_Short() {

  const pathname= usePathname();

  const pageTitles: { [key: string]: string } = {
    "/about": "Hakkımızda",
    "/contact": "İletişim",
    "/portfolio": "Portfolyomuz",
    // "/blog": "Blog",
    "/our-packages": "Paketlerimiz",
  };

  const isBlogSlug = pathname.startsWith('/blog/') && pathname !== '/blogs';
  
  let title;
  if (isBlogSlug) {
    title = "Blog";
  } else {
    title = pageTitles[pathname] || "Sayfa"; // Ne olur ne olmaz fallback
  }

  return (
    // background-image silindi, overflow-hidden eklendi
    <div className="relative w-full h-56 flex items-center pt-20 md:pt-0 overflow-hidden">
      
      {/* Arkaya Gömülü, Optimize Edilmiş WebP/AVIF Resim */}
      <Image 
        src="/header.jpg"
        alt={`${title} Sayfası Arkaplanı`}
        fill
        priority
        fetchPriority="high"
        className="object-cover object-center -z-10" // -z-10 ile yazının arkasına atıyoruz
        sizes="100vw"
      />

      {/* İçerik Kısmı - z-10 ile resmin üstüne çıkartıyoruz */}
      <div className="relative z-10 flex text w-full h-full items-end text-white px-4">
        <div className="px-5 py-8 md:ml-4">
          <div className="flex items-center">
            <Link href="/" className="text-xs text-gray-300 hover:text-white transition-colors">Anasayfa</Link>
            <span className="text-xs text-gray-300 font-semibold mx-1"> / </span>
            {/* H1 yerine span kullandık (Erişilebilirlik için) */}
            <span className="text-xs text-gray-300 font-semibold">{title}</span>
          </div>
          {/* Asıl Sayfa Başlığı (Tek H1) */}
          <h1 className="text-xl text-white font-semibold mt-1">{title}</h1>
        </div>
      </div>
    </div>
  );
}