'use client';

import { useState } from "react"; 
import ScrollHide from "./tools/scrollHide"; 
import { usePathname } from "next/navigation";

import Header_Short from "./components/components/header_short";
import Header_Long from "./components/components/header_long";
import HeaderWhite from "./components/components/header_white";

import Footer from "./components/components/footer"; 
import Header from "./components/components/header";
import React from "react";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [showWhiteHeader, setShowWhiteHeader] = useState(false);

  // Scroll dinleyici: 80px'den fazla scroll olursa sticky header göster (sadece md ve üstü için)
  React.useEffect(() => {
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      if (window.matchMedia('(min-width: 768px)').matches) {
        const currentScrollY = window.scrollY;
  
        if (currentScrollY < lastScrollY && currentScrollY > 80) {
          // Yukarı kaydırılıyor
          setShowWhiteHeader(true);
        } else {
          // Aşağı kaydırılıyor
          setShowWhiteHeader(false);
        }
  
        lastScrollY = currentScrollY;
      } else {
        setShowWhiteHeader(false);
      }
    };
  
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);
    handleScroll();
  
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);
  

  return (
    <>
      {/* Sticky beyaz header - sadece anasayfa için */}
      {showWhiteHeader && (
        <div
          className="fixed top-0 left-0 right-0 z-[100] w-full transition-all duration-500 ease-out transform animate-fade-in-custom"
        >
          <HeaderWhite setShowWhiteHeader={() => {}} />
        </div>
      )}
      {/* Diğer headerlar */}
      <div className="w-full z-50">
        <div className="absolute w-full z-40">
          <Header />
        </div>
        {pathname === '/' ? <Header_Long /> : <Header_Short />}
      </div>
      <div>
        {children}
        <Footer/>
        <ScrollHide />
      </div>
    </>
  );
}
