'use client';

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/app/utils/locale";

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
  const match = value.trim().match(/^(\d+)\s*(\+|%)?$/);
  const number = match ? parseInt(match[1], 10) : 0;
  const suffix = match?.[2] ?? "";
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
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const DREAM_DATA =
    locale === "en"
      ? {
          title: {
            subtitle: "How we started",
            mainTitle: "A dream, passion, and\ncode:\nThe birth of Moria",
          },
          description: {
            mobile:
              "Our journey started with a dream and passion. As a small team, we built our first projects with huge excitement — and we still work with the same drive today.",
            desktop:
              "Moria Software was born from the passion and dreams of a few young developers. For us, writing code was never “just work” — it was a way of life. In a small room, with old computers, we built our first projects. Our resources were limited, but our curiosity and desire to learn were endless. We coded at night and researched by day; we learned a lot, made mistakes, and never gave up. Every attempt made us better. Over time, we took on small jobs and our first clients trusted us. With that trust, we grew our team. Our goal has always been to deliver quality and speed. In every line of code, we turn an idea into reality. We still work with the excitement of day one. We took the name “Moria” from our imagination — we’re not just building software, we’re building a vision. We learned that with patience and determination, anything is possible. Today we’re stronger: a team, a family. And we know our best projects are still ahead.",
          },
          image: {
            src: "/about_us.jpg",
            alt: "The founding story of Moria Software",
          },
          stats: [
            { value: "5+", label: "Years of experience" },
            { value: "20+", label: "Completed projects" },
            { value: "100%", label: "Customer Satisfaction" },
            { value: "5", label: "Team members" },
          ],
        }
      : {
          title: {
            subtitle: "Nasıl Başladık?",
            mainTitle: "Hayal, Tutku ve \nKodlarla \nMoria'nın Doğuşu",
          },
          description: {
            mobile:
              "Hayal ve tutku ile başlayan yolculuğumuzda, küçük bir ekip olarak ilk projelerimizi büyük bir heyecanla geliştirdik. Bugün hâlâ aynı tutkuyla çalışıyoruz.",
            desktop:
              "Moria Yazılım, birkaç gencin yazılıma duyduğu tutku ve hayallerle doğdu.Kod yazmak bizim için sadece iş değil, bir yaşam biçimiydi. Küçük bir odada, eski bilgisayarlarla ilk projelerimizi geliştirdik. İmkânlarımız kısıtlıydı ama heyecanımız ve öğrenme isteğimiz sonsuzdu. Geceleri kod yazar, gündüzleri araştırırdık; çok şey öğrendik, hatalar yaptık ama yılmadık. Her deneme bizi geliştirdi. Zamanla küçük işler aldık, ilk müşterilerimiz bize güvendi. Bu güvenle ekibimizi büyüttük. Amacımız hep kaliteli ve hızlı çözümler sunmaktı. Her satır kodda bir hayali gerçeğe dönüştürüyoruz. Bugün hâlâ ilk günkü heyecanla çalışıyoruz. Moria ismini hayal gücümüzden aldık. Sadece yazılım değil, bir vizyon kuruyoruz. Sabır ve azimle her şeyin mümkün olduğunu öğrendik. Artık daha güçlüyüz; bir ekip, bir aileyiz. Ve biliyoruz ki en güzel projelerimiz henüz gelmedi.",
          },
          image: {
            src: "/about_us.jpg",
            alt: "Moria Yazılım'ın Kuruluş Hikayesi",
          },
          stats: [
            { value: "5+", label: "Yıllık Tecrübe" },
            { value: "20+", label: "Tamamlanan Proje" },
            { value: "100%", label: "Müşteri Memnuniyeti" },
            { value: "5", label: "Kişilik Ekip" },
          ],
        };

  // Sayaç grid için görünürlük kontrolü
  const [statsRef, statsInView] = useInView({ threshold: 0.3 });

  return (
    <div className="w-full p-4 md:p-8">
      <div className="flex flex-col lg:flex-row gap-6 ">
        {/* Sol: Başlık ve Açıklama */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex-1 bg-white shadow-lg border border-gray-200 rounded-2xl p-8 md:min-h-[70vh] flex flex-col h-full"
        >
          <div>
            <span className="text-blue-500 text-xl mb-3 block">{DREAM_DATA.title.subtitle}</span>
            {/* Erişilebilirlik için Ana Başlık etiketi */}
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight whitespace-pre-line">
              {DREAM_DATA.title.mainTitle}
            </h1>
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
          {/* Üst: Görsel Konteyneri */}
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
              className="object-cover"
              fill
              priority={true}
              // EN KRİTİK DÜZELTME: Tarayıcıya resmin boyutunu söylüyoruz.
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 600px"
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