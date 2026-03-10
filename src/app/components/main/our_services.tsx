'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Header_Short() {
  const [isHovered, setIsHovered] = useState(false);

  // Manuel preload useEffect kaldırıldı. Next.js priority prop'u ile bunu halleder.

  return (
    <div className="w-full h-[70vh] md:h-screen items-center justify-center flex ">
      {/* Resimlerin ve İçeriğin Ana Konteyneri (relative olmalı) */}
      <div
        className="relative w-full md:h-[90lvh] h-[65vh] overflow-hidden transition-all duration-700 ease-in-out flex md:flex-row flex-col "
      >
        {/* Optimize Edilmiş Arkaplan Resimleri */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/code.png"
            alt="Web Tasarım Arkaplan"
            fill
            className={`object-cover object-center transition-opacity duration-700 ease-in-out ${!isHovered ? 'opacity-100' : 'opacity-0'}`}
            priority // İlk ekran görseli olduğu için en yüksek öncelik
            sizes="100vw"
          />
          <Image
            src="/logodesign.jpg"
            alt="Logo Tasarım Arkaplan"
            fill
            className={`object-cover object-center transition-opacity duration-700 ease-in-out ${isHovered ? 'opacity-100' : 'opacity-0'}`}
            priority={false} // Bu resim hover ile geldiği için önceliği düşük
            sizes="100vw"
          />
        </div>

        {/* Sol Taraf (Web Tasarım) - Z-index ile resmin üstüne alıyoruz */}
        <div
          className={`relative z-10 h-1/2 w-full md:h-full md:w-1/2 flex justify-center flex-col px-6 md:px-14 py-4 md:py-10 md:gap-4 gap-1 transition-all duration-700 ease-in-out ${!isHovered ? 'translate-y-[-20px]' : ''}`}
        >
          <div className="w-full flex items-start transition-all duration-700 ease-in-out">
            <span className={`text-base md:text-8xl text-white font-bold transition-all duration-700 ${!isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>01</span>
          </div>
          <div className="w-full flex items-start transition-all duration-700 ease-in-out">
            {/* Sayfanın Ana Başlığı */}
            <h1 className={`text-base md:text-4xl text-white font-bold transition-all duration-700 ${!isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>Web Tasarım</h1>
          </div>
          <div className="w-full flex items-start transition-all duration-700 ease-in-out">
            <p className={`text-sm md:text-xl text-white leading-snug break-words transition-all duration-700 ${!isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>
              Modern ve kullanıcı dostu web tasarımı ile markanızı dijital dünyada öne çıkarıyoruz. Responsive tasarım, SEO uyumlu yapı ve hızlı yükleme süreleri ile müşterilerinize en iyi deneyimi sunuyoruz.
            </p>
          </div>
        </div>

        {/* Sağ Taraf (Logo Tasarım) - Etkileşim alanı */}
        <div
          className={`relative z-10 h-1/2 w-full md:h-full md:w-1/2 md:border-l border-t border-white flex justify-center flex-col px-6 md:px-14 py-4 md:py-10 md:gap-4 gap-1 transition-all duration-700 ease-in-out ${isHovered ? 'translate-y-[-20px]' : ''}`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
        >
          <div className="w-full flex items-start transition-all duration-700 ease-in-out">
            <span className={`text-base md:text-8xl text-white font-bold transition-all duration-700 ${isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>02</span>
          </div>
          <div className="w-full flex items-start transition-all duration-700 ease-in-out">
            <h2 className={`text-base md:text-4xl text-white font-bold transition-all duration-700 ${isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>Logo Tasarım</h2>
          </div>
          <div className="w-full flex items-start transition-all duration-700 ease-in-out">
            <p className={`text-sm md:text-xl text-white leading-snug break-words transition-all duration-700 ${isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>
              Markanızın kimliğini yansıtan, akılda kalıcı ve profesyonel logo tasarımları oluşturuyoruz. Her logo, markanızın değerlerini ve hedef kitlenizi yansıtacak şekilde özenle tasarlanır.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}