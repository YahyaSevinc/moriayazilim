"use client";

import { motion } from 'framer-motion';

export default function ValuesSection() {
  const values = [
    {
      title: "Yenilikçilik",
      description: "Sürekli gelişim ve yenilikçi çözümler üretiyoruz.",
      icon: (
        <svg className="mx-auto mb-4 h-12 w-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414m12.728 0l-1.414-1.414M6.05 6.05L4.636 4.636M12 7a5 5 0 100 10 5 5 0 000-10z" /></svg>
      )
    },
    {
      title: "Kalite",
      description: "Her projede en yüksek kalite standartlarını hedefliyoruz.",
      icon: (
        <svg className="mx-auto mb-4 h-12 w-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a1.5 1.5 0 012.04 0l1.518 1.36a1.5 1.5 0 001.06.44h1.8a1.5 1.5 0 011.5 1.5v1.8a1.5 1.5 0 00.44 1.06l1.36 1.518a1.5 1.5 0 010 2.04l-1.36 1.518a1.5 1.5 0 00-.44 1.06v1.8a1.5 1.5 0 01-1.5 1.5h-1.8a1.5 1.5 0 00-1.06.44l-1.518 1.36a1.5 1.5 0 01-2.04 0l-1.518-1.36a1.5 1.5 0 00-1.06-.44h-1.8a1.5 1.5 0 01-1.5-1.5v-1.8a1.5 1.5 0 00-.44-1.06l-1.36-1.518a1.5 1.5 0 010-2.04l1.36-1.518a1.5 1.5 0 00.44-1.06v-1.8a1.5 1.5 0 011.5-1.5h1.8a1.5 1.5 0 001.06-.44l1.518-1.36z" /></svg>
      )
    },
    {
      title: "Güven",
      description: "Müşterilerimizle güvene dayalı ilişkiler kuruyoruz.",
      icon: (
        <svg className="mx-auto mb-4 h-12 w-12 text-blue-600" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v1c0 1.657 1.343 3 3 3zm6 2v5a2 2 0 01-2 2H8a2 2 0 01-2-2v-5a6 6 0 1112 0z" /></svg>
      )
    }
  ];

  return (
    <section className="py-20 px-4 md:px-8 max-w-7xl mx-auto">
      <motion.h2 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-4xl font-extrabold text-center mb-16 tracking-tight text-black drop-shadow-lg"
      >
        Değerlerimiz
      </motion.h2>
      <motion.div 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-10"
      >
        {values.map((value) => (
          <motion.div
            key={value.title}
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  whileHover={{ 
                    y: -10, 
                    scale: 1.02,
                    boxShadow: '0px 20px 40px #2563eb55'
                  }}
                  transition={{ 
                    duration: 0.6, 
                    type: 'spring',
                    stiffness: 100,
                    y: { duration: 0.15, type: 'spring', stiffness: 400 },
                    scale: { duration: 0.15, type: 'spring', stiffness: 400 }
                  }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl overflow-hidden cursor-pointer text-center p-8 bg-gradient-to-br from-blue-50 to-white shadow-xl border border-blue-100 "
                
              // className="text-center p-8  rounded-2xl bg-gradient-to-br from-blue-50 to-white shadow-xl transition-all duration-300 border border-blue-100 overflow-hidden cursor-pointer"
            >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.6,  
                type: 'spring',
                stiffness: 200
              }}
              viewport={{ once: true }}
            >
              {value.icon}
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4,  }}
              viewport={{ once: true }}
              className="text-2xl font-extrabold mb-3 text-blue-800 tracking-tight drop-shadow-sm"
            >
              {value.title}
            </motion.h3>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4,  }}
              viewport={{ once: true }}
              className="text-gray-700 text-lg leading-relaxed"
            >
              {value.description}
            </motion.p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
} 