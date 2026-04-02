"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/app/utils/locale";

export default function PricingHeader() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
        className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
      >
        {locale === "en" ? "Our packages" : "Paketlerimiz"}
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
        className="text-xl text-gray-600 max-w-3xl mx-auto"
      >
        {locale === "en"
          ? "Choose the package that fits your needs. All of our plans provide professional website solutions."
          : "İhtiyaçlarınıza uygun paketimizi seçin. Tüm paketlerimiz profesyonel web sitesi çözümleri sunar."}
      </motion.p>
    </motion.div>
  );
} 