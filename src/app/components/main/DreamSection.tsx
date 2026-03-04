'use client';

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Intersection Observer tabanlı görünürlük kontrolü
function useInView(options = { threshold: 0.3 }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      options
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, inView] as const;
}

// Sayaç animasyonu için yardımcı hook
function useCountUp(to: number, duration = 600, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    const startVal = 0;
    const startTime = performance.now();
    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * (to - startVal) + startVal);
      setCount(current);
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(to);
      }
    }
    requestAnimationFrame(animate);
    // Temizlik
    return () => setCount(to);
  }, [to, duration, start]);
  return count;
}

type StatCardProps = {
  value: string;
  label: string;
  index: number;
  statsInView: boolean;
};

function StatCard({ value, label, index, statsInView }: StatCardProps) {
  const match = value.match(/(\d+)(\+?)/);
  const number = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const animated = useCountUp(number, 600 + index * 100, statsInView);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
      }}
      className="flex flex-col items-center justify-center bg-white rounded-xl shadow-lg border border-gray-200 p-6 text-center h-full transition-transform duration-300 hover:scale-105 hover:shadow-xl"
    >
      <span className="text-xl md:text-3xl font-bold flex items-baseline">
        {animated}
        <span className="text-orange-500 text-lg md:text-2xl ml-1">{suffix}</span>
      </span>
      <span className="text-gray-600 mt-2 text-md md:text-xl">{label}</span>
    </motion.div>
  );
}

const DreamSection: React.FC = () => {
  const DREAM_DATA = {
    title: {
      subtitle: "Nasıl Başladık?",
      mainTitle: "Hayal, Tutku ve \nKodlarla \nMoria'nın Doğuşu"
    },
    description: {
      mobile: "Hayal ve tutku ile başlayan yolculuğumuzda, küçük bir ekip olarak ilk projelerimizi büyük bir heyecanla geliştirdik. Bugün hâlâ aynı tutkuyla çalışıyoruz.",
      desktop: "Moria Yazılım, birkaç gencin yazılıma duyduğu tutku ve hayallerle doğdu.Kod yazmak bizim için sadece iş değil, bir yaşam biçimiydi. Küçük bir odada, eski bilgisayarlarla ilk projelerimizi geliştirdik. İmkânlarımız kısıtlıydı ama heyecanımız ve öğrenme isteğimiz sonsuzdu. Geceleri kod yazar, gündüzleri araştırırdık; çok şey öğrendik, hatalar yaptık ama yılmadık. Her deneme bizi geliştirdi. Zamanla küçük işler aldık, ilk müşterilerimiz bize güvendi. Bu güvenle ekibimizi büyüttük. Amacımız hep kaliteli ve hızlı çözümler sunmaktı. Her satır kodda bir hayali gerçeğe dönüştürüyoruz. Bugün hâlâ ilk günkü heyecanla çalışıyoruz. Moria ismini hayal gücümüzden aldık. Sadece yazılım değil, bir vizyon kuruyoruz. Sabır ve azimle her şeyin mümkün olduğunu öğrendik. Artık daha güçlüyüz; bir ekip, bir aileyiz. Ve biliyoruz ki en güzel projelerimiz henüz gelmedi."
    },
    image: {
      src: "/about_us.jpg",
      alt: "Dream Section Görseli"
    },
    stats: [
      { value: "5+", label: "Yıllık Tecrübe" },
      { value: "20+", label: "Tamamlanan Proje" },
      { value: "10+", label: "Mutlu Müşteri" },
      { value: "5", label: "Kişilik Ekip" },
    ]
  };

  // Sayaç grid için görünürlük kontrolü
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  return (
    <div className="w-full  p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6 ">
        {/* Sol: Başlık ve Açıklama */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 bg-white shadow-lg border border-gray-200 rounded-2xl p-8  md:min-h-[70vh] flex flex-col h-full"
        >
          <div>
            <div className="text-orange-500 text-xl mb-3">{DREAM_DATA.title.subtitle}</div>
            <div className="text-4xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
              {DREAM_DATA.title.mainTitle}
            </div>
          </div>
          <p className="text-gray-700 text-base md:text-lg mt-auto whitespace-pre-line">
            <span className="block md:hidden">{DREAM_DATA.description.mobile}</span>
            <span className="hidden md:block">{DREAM_DATA.description.desktop}</span>
          </p>
        </motion.div>

        {/* Sağ: Görsel + 2x2 Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.1 }}
          className="flex-1 flex flex-col gap-6 md:min-h-[70vh] bg-white shadow-lg border border-gray-200 rounded-2xl p-2"
        >
          {/* Üst: Görsel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
            className="relative w-full h-48 sm:h-64 md:h-80 lg:h-1/2 shadow-lg border border-gray-200 rounded-2xl overflow-hidden "
          >
            <Image
              src={DREAM_DATA.image.src}
              alt={DREAM_DATA.image.alt}
              className="w-full h-full object-cover"
              fill
              priority
            />
          </motion.div>

          {/* Alt: 2x2 Grid */}
          <motion.div
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.1,
                },
              },
            }}
            className="grid grid-cols-2 gap-4 h-1/2"
          >
            {DREAM_DATA.stats.map((card, index) => (
              <StatCard
                key={index}
                value={card.value}
                label={card.label}
                index={index}
                statsInView={statsInView}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DreamSection;
