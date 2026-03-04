'use client';

import React, { useState, useEffect, useMemo } from 'react';
import SecondMain from "./second";
import FirstMain from "./first";

export default function Header_Short() {
  const rotatingTexts = useMemo(
    () => [
      "modern web siteleriyle geliştiriyoruz",
      "SEO uyumlu hale getiriyoruz",
      "hızlı ve güvenli yapıyoruz",
      "tasarımıyla fark yaratıyoruz",
      "mobil uyumlu sunuyoruz",
    ],
    []
  );

  const [displayedText, setDisplayedText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const currentText = rotatingTexts[currentTextIndex];
    let timeout: NodeJS.Timeout;

    if (!isDeleting) {
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + currentText.charAt(charIndex));
          setCharIndex(charIndex + 1);
        }, 75);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1500);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev.slice(0, -1));
          setCharIndex(charIndex - 1);
        }, 50);
      } else {
        setIsDeleting(false);
        setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, currentTextIndex, rotatingTexts]);

  return (
    <div className="relative z-10 container mx-auto md:pt-[150px] pt-[80px] py-16 h-screen">
      <FirstMain isVisible={isVisible} />
      <SecondMain isVisible={isVisible} displayedText={displayedText} />

      <div className="absolute bottom-0 left-1/2 aspect-square -translate-x-1/2 w-full md:w-[1400px] h-[500px] bg-gradient-to-r from-[#60a5fa] via-[#2563eb] to-[#1e40af] rounded-full blur-[120px] opacity-30 pointer-events-none shadow-2xl" />
      <div className="md:flex hidden absolute top-0 right-0 aspect-square -translate-x-1 w-full md:w-[400px] h-[200px] bg-gradient-to-r from-[#60a5fa] via-[#2563eb] to-[#1e40af] rounded-full blur-[120px] opacity-40 pointer-events-none shadow-2xl" />
      <div className="absolute top-0 left-0 aspect-square -translate-x-1/2 w-full md:w-[400px] h-[200px] bg-gradient-to-r from-[#60a5fa] via-[#2563eb] to-[#1e40af] rounded-full blur-[120px] opacity-40 pointer-events-none shadow-2xl" />
    </div>
  );
}