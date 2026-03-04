"use client";

import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MissionVisionSection() {
  const [activeTab, setActiveTab] = useState<'mission' | 'vision'>('mission');

  return (
    <section className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="flex flex-col md:flex-row gap-8 justify-center items-stretch"
      >
        <motion.button
          onClick={() => setActiveTab('mission')}
          whileHover={{ scale: 1.04, boxShadow: '0px 8px 32px #2563eb55' }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className={`flex-1 min-w-[250px] max-w-md p-8 rounded-2xl border-2 shadow-lg cursor-pointer text-left ${
            activeTab === 'mission' 
              ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold' 
              : 'bg-gray-50 border-gray-200 text-gray-700 font-semibold'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-2xl md:text-3xl mb-4">Misyonumuz</h2>
            <p className="text-base md:text-lg leading-relaxed">Müşterilerimize en yüksek kalitede hizmet sunarak, teknoloji ve inovasyonu bir araya getiriyoruz. Her projemizde sürdürülebilirlik ve müşteri memnuniyetini ön planda tutuyoruz.</p>
            {activeTab === 'mission' && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-1 bg-blue-700 rounded-full mt-6" 
              />
            )}
          </motion.div>
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('vision')}
          whileHover={{ scale: 1.04, boxShadow: '0px 8px 32px #2563eb55' }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          className={`flex-1 min-w-[220px] max-w-md p-8 rounded-2xl border-2 shadow-lg cursor-pointer text-left ${
            activeTab === 'vision' 
              ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold' 
              : 'bg-gray-50 border-gray-200 text-gray-700 font-semibold'
          }`}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h2 className="text-2xl md:text-3xl mb-4">Vizyonumuz</h2>
            <p className="text-base md:text-lg leading-relaxed">Sektörde öncü, yenilikçi ve güvenilir bir marka olarak, dijital dönüşümde ilham kaynağı olmayı hedefliyoruz. Teknolojiyi insan odaklı çözümlerle buluşturarak, sürdürülebilir başarıya ulaşmak vizyonumuzdur.</p>
            {activeTab === 'vision' && (
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 64 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="h-1 bg-blue-700 rounded-full mt-6" 
              />
            )}
          </motion.div>
        </motion.button>
      </motion.div>
    </section>
  );
} 