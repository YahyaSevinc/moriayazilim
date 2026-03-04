'use client';

import { useState, useEffect } from 'react';

export default function Header_Short() {
  const [imageSrc, setImageSrc] = useState('/code.png');
  const [isHovered, setIsHovered] = useState(false);

  // Görselleri önceden yükle
  useEffect(() => {
    const images = ['/code.png', '/logodesign.jpg'];
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
      <div className="w-full h-[70vh] md:h-screen items-center justify-center flex ">
        <div
          style={{ backgroundImage: `url('${imageSrc}')` }}
          className="relative w-full md:h-[90lvh] h-[65vh] overflow-hidden  bg-cover bg-center transition-all duration-700 ease-in-out flex md:flex-row flex-col "
        >
          <div
            className={`h-1/2 w-full md:h-full md:w-1/2 flex justify-center flex-col px-6 md:px-14 py-4 md:py-10 md:gap-4 gap-1 transition-all duration-700 ease-in-out  ${
              !isHovered ? 'translate-y-[-20px]' : ''
            }`}>
            <div className="w-full flex items-start transition-all duration-700 ease-in-out">
              <h1
                className={`text-base md:text-8xl text-white transition-all duration-700 ${!isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>01</h1>
            </div>
            <div className="w-full flex items-start transition-all duration-700 ease-in-out">
              <h1
                className={`text-base md:text-4xl text-white transition-all duration-700 ${!isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>Web Tasarım</h1>
            </div>
            <div className="w-full flex items-start transition-all duration-700 ease-in-out">
              <h1
                className={`text-sm md:text-xl text-white leading-snug break-words transition-all duration-700 ${!isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}
              >
                Modern ve kullanıcı dostu web tasarımı ile markanızı dijital dünyada öne çıkarıyoruz. Responsive tasarım, SEO uyumlu yapı ve hızlı yükleme süreleri ile müşterilerinize en iyi deneyimi sunuyoruz.
              </h1>
            </div>
          </div>

          <div
            className={`h-1/2 w-full md:h-full md:w-1/2 md:border-l border-t border-white flex justify-center flex-col px-6 md:px-14 py-4 md:py-10 md:gap-4 gap-1 transition-all duration-700 ease-in-out ${
              isHovered ? 'translate-y-[-20px]' : ''
            }`}
            onMouseEnter={() => {
              setImageSrc('/logodesign.jpg');
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setImageSrc('/code.png');
              setIsHovered(false);
            }}
            onTouchStart={() => {
              setImageSrc('/logodesign.jpg');
              setIsHovered(true);
            }}
            onTouchEnd={() => {
              setImageSrc('/code.png');
              setIsHovered(false);
            }}
          >
            <div className="w-full flex items-start transition-all duration-700 ease-in-out">
              <h1
                className={`text-base md:text-8xl text-white transition-all duration-700 ${isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>02</h1>
            </div>
            <div className="w-full flex items-start transition-all duration-700 ease-in-out">
              <h1
                className={`text-base md:text-4xl text-white transition-all duration-700 ${isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}>Logo Tasarım </h1>
            </div>
            <div className="w-full flex items-start transition-all duration-700 ease-in-out">
              <h1
                className={`text-sm md:text-xl text-white leading-snug break-words transition-all duration-700 ${isHovered ? 'translate-y-[-10px] opacity-100' : 'opacity-50'}`}
              >
                Markanızın kimliğini yansıtan, akılda kalıcı ve profesyonel logo tasarımları oluşturuyoruz. Her logo, markanızın değerlerini ve hedef kitlenizi yansıtacak şekilde özenle tasarlanır.
              </h1>
            </div>
          </div>
        </div>


      </div>
 
  );
}
