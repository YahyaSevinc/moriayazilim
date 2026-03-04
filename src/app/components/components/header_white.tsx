import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";  
import Image from "next/image";
import { navigationItems } from '@/app/data/navigation';

interface HeaderWhiteProps {
  setShowWhiteHeader: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeaderWhite: React.FC<HeaderWhiteProps> = ({ setShowWhiteHeader }) => {
  const pathname = usePathname();
  const [hovered, setHovered] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      if (scrollY < lastScrollY.current && scrollY > 0) {
        setShowWhiteHeader(true);
      } else {
        setShowWhiteHeader(false);
      }
      lastScrollY.current = scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setShowWhiteHeader]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  // <header className="justify-center items-center py-4 md:py-6  fixed top-0 left-0 w-full z-50 shadow-sm rounded-b-2xl bg-neutral-300/20 backdrop-blur-[1px] border border-neutral-400/20">
    

  return (
    <header className="justify-center items-center py-4 md:py-6  fixed top-0 left-0 w-full z-50  rounded-b-2xl bg-neutral-300/20 backdrop-blur-[1px] border border-neutral-400/20">
      <div className="flex justify-between items-center px-4 md:px-20">
        <div className="text-2xl md:text-4xl font-bold ">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={48} height={48} className=" h-14 w-14 hover:scale-110 transition-all duration-300" />
          </Link>
        </div>
        {/* Hamburger icon (mobile) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 z-50 relative"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Menüyü Aç/Kapat"
        >
          <span className={`block w-7 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-7 h-0.5 bg-gray-700 my-1 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-7 h-0.5 bg-gray-700 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
        {/* Desktop menu */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 lg:space-x-14 text-base md:text-xl font-semibold">
            {navigationItems.map(({ name, path }) => (
              <li
                key={path}
                className="relative group"
                onMouseEnter={() => setHovered(path)}
                onMouseLeave={() => setHovered(null)}
              >
                <Link href={path} className="text-gray-900 transition-all duration-300 lg:text-2xl md:text-lg">
                  {name}
                </Link>
                <span
                  className={`absolute left-0 bottom-0 w-full h-[2px] bg-gray-900 transition-transform duration-500 scale-x-0 
                  ${hovered === path ? "scale-x-100" : pathname === path && !hovered ? "scale-x-100" : ""}`}
                />
              </li>
            ))}
          </ul>
        </nav>
        {/* Mobile menu */}
        <nav
          className={`fixed top-0 left-0 w-full h-full bg-white/95 flex flex-col items-center justify-center gap-10 text-2xl font-semibold transition-transform duration-300 md:hidden z-40 ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`}
        >
          <ul className="flex flex-col gap-8 items-center">
            {navigationItems.map(({ name, path }) => (
              <li key={path} onClick={() => setMenuOpen(false)}>
                <Link href={path} className={`text-gray-700 ${pathname === path ? 'font-bold underline' : ''}`}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="text-2xl md:text-4xl font-bold ">
          <Link href="/">
            <Image src="/logo_white.png" alt="Logo" width={48} height={48} className="h-10 md:h-14 opacity-0" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default HeaderWhite;
