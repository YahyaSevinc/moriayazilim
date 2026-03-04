"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function CustomProjectSection() {
  const router = useRouter();
  
  const handleCustomProjectClick = () => {
    const subject = "Özel Proje Teklifi";
    const message = "Merhaba, özel bir proje için teklif almak istiyorum.";
    const params = new URLSearchParams({ subject, message });
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, }}
      viewport={{ once: true }}
      className="text-center mt-16"
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0px 20px 40px rgba(37, 99, 235, 0.1)'
        }}
        transition={{ 
          duration: 0.6, 
          hover: { duration: 0.2, type: 'spring', stiffness: 300 }
        }}
        viewport={{ once: true }}
        className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto"
      >
        <motion.h3 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-2xl font-bold text-gray-900 mb-4"
        >
          Özel Projeler İçin
        </motion.h3>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4}}
          viewport={{ once: true }}
          className="text-gray-600 mb-6"
        >
          Standart paketlerimiz dışında özel ihtiyaçlarınız için özel çözümler sunuyoruz. 
          Bizimle iletişime geçin, projenizi birlikte planlayalım.
        </motion.p>
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          whileHover={{ 
            scale: 1.05, 
            y: -3,
            boxShadow: '0px 10px 25px rgba(37, 99, 235, 0.3)'
          }}
          whileTap={{ scale: 0.98 }}
          transition={{ 
            duration: 0.4,  
            hover: { duration: 0.15, type: 'spring', stiffness: 400 }
          }}
          viewport={{ once: true }}
          className="bg-gradient-to-r cursor-pointer from-blue-600 to-blue-700 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl"
          onClick={handleCustomProjectClick}
        >
          Özel Teklif Al
        </motion.button>
      </motion.div>
    </motion.div>
  );
} 