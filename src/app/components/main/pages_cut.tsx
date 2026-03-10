"use client";

import Image from 'next/image';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FiArrowRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Portfolio() {
  const [currentPage, setCurrentPage] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'next' | 'prev' | null>(null);
  const totalPages = 3;

  const handlePageChange = (dir: 'prev' | 'next') => {
    if (animating) return; // Animasyon sırasında tekrar tetiklenmesin
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    if (dir === 'next' && currentPage < totalPages) {
      if (isMobile) {
        setDirection('next');
        setAnimating(true);
        setTimeout(() => {
          setCurrentPage((prev) => prev + 1);
          setAnimating(false);
          setDirection(null);
        }, 400); // animasyon süresiyle uyumlu olmalı
      } else {
        setCurrentPage((prev) => prev + 1);
      }
    } else if (dir === 'prev' && currentPage > 1) {
      if (isMobile) {
        setDirection('prev');
        setAnimating(true);
        setTimeout(() => {
          setCurrentPage((prev) => prev - 1);
          setAnimating(false);
          setDirection(null);
        }, 400);
      } else {
        setCurrentPage((prev) => prev - 1);
      }
    }
  };

  const pageContent = [
    {
      title: "Hakkımızda",
      description: "Hayal gücünü kodla buluşturan genç ve dinamik bir ekibiz. Modern teknolojilerle yazılım çözümleri geliştiriyor, her projeye tutkuyla yaklaşıyoruz. Moria Yazılım, fikirlerin gerçeğe dönüştüğü yerdir.",
      buttonText: "Bizi Tanıyın",
      image: "/our_work.jpg",
      href: '/about'
    },
    // {
    //   title: "Bloglarımız",
    //   description: "Web tasarım, SEO, yazılım geliştirme ve kullanıcı deneyimi üzerine dopdolu içerikler şimdi blog sayfamızda. Takipte kal, dijital dünyayı kaçırma!",
    //   buttonText: "Blogları Keşfet",
    //   image: "/blogs.jpg",
    //   href:'/blog'
    // },
    {
      title: "Portfolyomuz",
      description: "Her biri özenle planlanmış projelerimiz, kullanıcı deneyimi ve estetiği ön planda tutarak geliştirildi. Web'den mobil uygulamalara kadar geniş bir yelpazede, yenilikçi ve güvenilir çözümler sunuyoruz.",
      buttonText: "Çalışmalarımız",
      image: "/calismalarimiz.jpg",
      href: '/portfolio'
    },
    {
      title: "İletişim",
      description: "Fikriniz mi var? Haydi konuşalım! Size en uygun dijital çözümleri birlikte belirleyelim. Moria Yazılım ekibi, her zaman bir mesaj uzağınızda.",
      buttonText: "Bize Ulaşın",
      image: "/contact2.jpg",
      href: '/contact'
    }
  ];

  // Mobil animasyon class'ı
  const getMobileSlideClass = (index: number) => {
    if (typeof window === 'undefined' || window.innerWidth >= 640) return '';
    if (index !== currentPage - 1) return 'hidden';
    if (!animating) return 'transition-transform duration-400';
    if (direction === 'next') return 'transition-transform duration-400 transform -translate-x-full';
    if (direction === 'prev') return 'transition-transform duration-400 transform translate-x-full';
    return '';
  };

  return (
    <div className="relative max-w-full h-full overflow-hidden mt-10 mb-0 sm:mb-0">
      <div 
        className={`transition-transform duration-500 ease-in-out w-full ${typeof window !== 'undefined' && window.innerWidth < 640 ? 'flex flex-col' : 'flex'}`}
        style={typeof window !== 'undefined' && window.innerWidth < 640
          ? { width: '100%', transform: 'none' }
          : { width: `${totalPages * 100}%`, transform: `translateX(-${(currentPage - 1) * (100 / totalPages)}%)` }}
      >
        {pageContent.map((page, index) => (
          <div
            key={index}
            className={`w-full flex flex-col sm:flex-col-reverse md:flex-col-reverse lg:flex-row p-2 ${typeof window !== 'undefined' && window.innerWidth < 640 ? getMobileSlideClass(index) : ''}`}
            style={typeof window !== 'undefined' && window.innerWidth < 640
              ? { width: '100%' }
              : { width: `${100 / totalPages}%` }}
          >
            {/* Mobilde görsel üstte, masaüstünde sağda */}
            <div className="block sm:hidden w-full mb-4">
              <Image 
                src={page.image} 
                width={800} 
                height={220} 
                className="w-full h-[220px] md:rounden-3xl rounded-xl shadow-md object-cover shadow-gray-500" 
                alt={page.title} 
                sizes="(max-width: 640px) 100vw, 800px"
                priority={index === 0}
              />
            </div>
            <AnimatePresence mode="wait">
            {currentPage - 1 === index && (
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.85, ease: 'easeOut' }}
                className="flex flex-col justify-between lg:p-10 md:p-10 sm:p-10 w-full lg:w-1/2 md:w-full sm:w-full lg:h-full md:h-1/2 sm:h-1/2 items-center"
              >
                <div className="flex-col justify-between w-full">
                 <h1 className="lg:text-7xl md:text-3xl sm:text-2xl text-xl leading-tight font-bold mb-2 text-center sm:self-start sm:text-left break-words">
  {page.title}
</h1>
                 <h1 className="lg:text-xl md:text-lg sm:text-base text-base self-center text-center mb-4 sm:self-start sm:text-left">{page.description}</h1>
                 <a href={page.href} className="flex w-full justify-center sm:justify-start">
                   <button
                     className="flex w-full max-w-xs sm:w-auto bg-blue-700 text-white rounded-md hover:bg-blue-800 transition shadow-sm shadow-gray-700 text-lg sm:text-xl px-6 py-2 mt-0 self-center sm:self-start justify-center items-center"
                   >
                     {page.buttonText} <span className="ml-2 flex items-center text-md">
                      <FiArrowRight />
                    </span>
                   </button>
                 </a>
                </div>

                {/* Masaüstü ve tablet: sayfa sayısı ve çizgi göster, mobilde gizle */}
                <div className="hidden sm:flex justify-between items-center w-full mt-4">
                  <div className="flex items-center">
                    <h1 className="text-gray-400">{index + 1}/</h1>
                    <h1>{totalPages}</h1>
                  </div>
                  <div className="flex-1 h-[2px] bg-gray-300 mx-4 relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-gray-900 transition-all duration-500"
                    style={{ width: `${(currentPage / totalPages) * 100}%` }}
                  ></div>
                </div>
                <div className="flex space-x-2">
  <button 
    className={`${currentPage > 1 ? 'bg-gray-900' : 'bg-gray-500'} text-white p-6 rounded-full aspect-square cursor-pointer`}
    onClick={() => handlePageChange('prev')}
    disabled={currentPage === 1 || animating}
    aria-label="Önceki Slayt" // EKLENEN KISIM
  >
    <FaArrowLeft size={30}/>
  </button>
  <button 
    className={`${currentPage < totalPages ? 'bg-gray-900' : 'bg-gray-500'} text-white p-6 rounded-full aspect-square cursor-pointer`}
    onClick={() => handlePageChange('next')}
    disabled={currentPage === totalPages || animating}
    aria-label="Sonraki Slayt" // EKLENEN KISIM
  >
    <FaArrowRight size={30}/>
  </button>
</div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
            {/* Masaüstü: görsel sağda, mobilde yukarıda zaten gösterildiği için burada sadece sm ve üstü için göster */}
            <div className="hidden sm:block lg:w-1/2 md:w-full sm:w-full lg:h-full md:h-1/2 sm:h-1/2">
              <Image 
                src={page.image} 
                width={800} 
                height={600} 
                className="w-full h-full rounded-md md:rounded-3xl shadow-md object-cover shadow-gray-500" 
                alt={page.title} 
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px"
                priority={index === 0}
              />
            </div>
            {/* Mobilde oklar en altta ve ortalanmış */}
            <div className="sm:hidden w-full flex justify-center mt-6">
              <div className="flex space-x-6">
                <button 
                  className={`${currentPage > 1 ? 'bg-gray-900' : 'bg-gray-500'} text-white w-14 h-14 flex items-center justify-center rounded-full cursor-pointer transition`}
                  onClick={() => handlePageChange('prev')}
                  disabled={currentPage === 1 || animating}
                >
                  <FaArrowLeft size={24}/>
                </button>
                <button 
                  className={`${currentPage < totalPages ? 'bg-gray-900' : 'bg-gray-500'} text-white w-14 h-14 flex items-center justify-center rounded-full cursor-pointer transition`}
                  onClick={() => handlePageChange('next')}
                  disabled={currentPage === totalPages || animating}
                >
                  <FaArrowRight size={24}/>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}