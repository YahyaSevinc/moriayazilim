"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaBars, FaTimes, FaEnvelope } from 'react-icons/fa';
import { usePathname } from "next/navigation";
import SocialMediaIcons from './SocialMediaIcons';
import { navigationItems, contactInfo } from '@/app/data/navigation';
import { createPortal } from "react-dom";
import LanguageToggle from "./LanguageToggle";
import { getLocaleFromPathname, withLocalePrefix } from "@/app/utils/locale";


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMobileHeader, setShowMobileHeader] = useState(true);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/en";
  const locale = getLocaleFromPathname(pathname);
  const [hovered, setHovered] = useState<string | null>(null);

  const nav =
    locale === "en"
      ? [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Portfolio", path: "/portfolio" },
          { name: "Packages", path: "/our-packages" },
          { name: "Contact", path: "/contact" },
        ]
      : navigationItems;

  // Scroll lock for mobile menu
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
      document.documentElement.style.overflow = 'hidden';
      document.documentElement.style.touchAction = 'none';
    } else {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.touchAction = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.body.style.touchAction = '';
      document.documentElement.style.overflow = '';
      document.documentElement.style.touchAction = '';
    };
  }, [isMenuOpen]);

  // Mobilde scroll yönüne göre header göster/gizle
  useEffect(() => {
    if (typeof window === 'undefined') return;
    let lastY = window.scrollY;
    const threshold = 40;
    const handleScroll = () => {
      if (isMenuOpen) return;
      const currentY = window.scrollY;
      let nextShow;
      if (currentY <= threshold) {
        nextShow = true;
      } else if (currentY < lastY) {
        nextShow = true;
      } else if (currentY > lastY) {
        nextShow = false;
      }
      if (typeof nextShow !== 'undefined') {
        setShowMobileHeader(nextShow);
        console.log('scroll', { lastY, currentY, nextShow });
      }
      lastY = currentY;
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen]);

  return (
    < >
    <header className="px-3 py-2 md:flex hidden flex-col"> 
      <div className="flex justify-between items-center">
        <div className="flex space-x-3">
          
          <a
            href="mailto:moriayazilim@gmail.com"
            onClick={(e) => {
              e.preventDefault();
              console.log('Mailto clicked - opening email client');
              window.location.href = 'mailto:moriayazilim@gmail.com';
            }}
            className={`flex items-center space-x-1 text-xs ${isHome ? "text-black/80" : "text-white" } hover:underline cursor-pointer`}
          >
            <FaEnvelope />
            <span>{contactInfo.email}</span>
          </a>
        </div>

        <div className="flex items-center gap-4">
          <LanguageToggle
            className="flex items-center"
            textClassName={`text-xs font-semibold ${isHome ? "text-black" : "text-white" }`}
            separatorClassName={`${isHome ? "text-black" : "text-white" } opacity-60`}
          />
          <SocialMediaIcons className="text-xs" iconSize="text-sm" textColor={`${isHome ? "text-black" : "text-white" }`} exclude={['FaWhatsapp','MdEmail']} />
        </div>
      </div>
 
      <div className="flex justify-between items-center mt-6 px-20"> 
        <div className="text-4xl font-bold ">
          <Link href={withLocalePrefix("/", locale)}>
            <Image src={`${isHome ? "/logo.png" : "/logo_white.png" }`} alt="Logo" width={64} height={64} className="h-14 w-14 hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
 
        <nav>
          <ul className="flex space-x-14 text-xl font-semibold">
            {nav.map(({ name, path }) => {
              const href = withLocalePrefix(path, locale);
              return (
              <li
                key={href}
                className="relative group"
                onMouseEnter={() => setHovered(href)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link href={href} className={`${isHome ? "text-black/70" : "text-white" } transition-all duration-300 lg:text-2xl md:text-lg`}>
                  {name}
                </Link>
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] ${isHome ? "bg-black/50" : "bg-white" } transition-transform duration-500 scale-x-0 
                  ${hovered === href ? "scale-x-100" : pathname === href && !hovered ? "scale-x-100" : ""}`}
                />
              </li>
            )})}
          </ul>
        </nav>
        <div className="text-4xl font-bold ">
          <Link href={withLocalePrefix("/", locale)}>
            <Image src="/logo_white.png" alt="Logo" width={64} height={64} className="h-14 opacity-0" />
          </Link>
        </div>
      </div>
    </header>

    <header className={`fixed top-0 left-0 right-0 z-[9999] bg-white shadow-lg shadow-black/20 md:hidden transition-transform duration-300 h-16 ${showMobileHeader ? 'translate-y-0' : '-translate-y-full'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between items-center py-4 h-full">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={withLocalePrefix("/", locale)}>
              <Image 
                src="/logo.png" 
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10 "
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-fuchsia-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <FaTimes className="h-6 w-6" />
              ) : (
                <FaBars className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && typeof window !== "undefined" && createPortal(
        <div className="fixed min-h-screen inset-0 z-[9999] bg-white flex flex-col h-full w-full mb-10 md:hidden">
          <div className="flex flex-row justify-between items-center py-4 px-4">
            <Link href={withLocalePrefix("/", locale)}>
              <Image 
                src="/logo.png" 
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </Link>
             
            <button onClick={toggleMenu} aria-label="Menüyü Kapat" className="items-center justify-center text-4xl"><FaTimes/></button>
             
          </div>
          <hr className="my-2 border-gray-300" />
          <div className="px-6 mt-4">
            <LanguageToggle
              className="flex items-center justify-start"
              textClassName="text-sm font-semibold text-gray-800"
              separatorClassName="text-gray-800 opacity-50"
            />
          </div>
          <nav className="flex-1 flex flex-col justify-start px-6 gap-6 mt-4">
            {nav.map(({ name, path }) => (
              <Link 
                key={path}
                href={withLocalePrefix(path, locale)} 
                className="text-2xl font-normal" 
                onClick={() => setIsMenuOpen(false)}
              >
                {name}
              </Link>
            ))}
          </nav>
          <div className="mt-auto w-full">
            <hr className="mb-2 border-gray-300" />
            <div className="flex flex-col gap-2 px-6 pb-4 mb-11 mt-4">
              <div className="flex flex-col items-start text-base gap-4">
                <SocialMediaIcons className="text-xl" iconSize="text-xl" exclude={['FaWhatsapp','MdEmail']} />
                <a 
                  href="mailto:moriayazilim@gmail.com"
                  onClick={(e) => {
                    e.preventDefault();
                    console.log('Mailto clicked (mobile) - opening email client');
                    window.location.href = 'mailto:moriayazilim@gmail.com';
                  }}
                  className="flex items-center gap-2 text-base cursor-pointer"
                >
                  <FaEnvelope />
                  <span>{contactInfo.email}</span>
                </a>
              </div>
             
            </div>
          </div>
        </div>,
        document.body
      )}
    </header>
    </ >
    
  );
}
