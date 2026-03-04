"use client";

import { IoCheckmarkCircle, IoCloseSharp } from "react-icons/io5";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// Define the Plan type
interface Plan {
  name: string;
  //price: string;
  description: string;
  recommended: boolean;
  features: string[];
  included: boolean[];
}

export default function PricingCards() {
  const router = useRouter();
  
  const plans: Plan[] = [
    {
      name: "Basit Plan",
      description: "Düşük bütçe için önerilen paketimizdir.",
      recommended: false,
      features: [
        "Web sitesi tasarımı",
        "Responsive tasarım",
        "4 Sayfa sayısı",
        "2 Revize",
        "Hosting, Domain kurulum desteği",
        "Google Search Console entegrasyonu desteği",
        "E-ticaret entegrasyonu",
        "Admin paneli",
        "7/24 destek",
        "Blog sistemi"
      ],
      included: [true, true, true, true, true, true, false, false, false],
    },
    {
      name: "Orta Plan",
      description: "Orta ölçekli işletmeler için ideal paket.",
      recommended: true,
      features: [
        "Web sitesi tasarımı",
        "Responsive tasarım",
        "Sınırsız sayfa",
        "Blog sistemi",
        "Sınırsız revize",
        "Admin paneli",
        "Hosting, Domain kurulum desteği",
        "Google Search Console entegrasyonu desteği",
        "7/24 destek",
        "E-ticaret entegrasyonu"
      ],
      included: [true, true, true, true, true, true, true, true, false, false],
    },
    {
      name: "Yüksek Plan",
      description: "Büyük ölçekli projeler için kapsamlı çözüm.",
      recommended: false,
      features: [
        "Web sitesi tasarımı",
        "Responsive tasarım",
        "Sınırsız sayfa",
        "Blog sistemi",      
        "Sınırsız revize",
        "Admin paneli",
        "Hosting, Domain kurulum desteği",
        "Google Search Console entegrasyonu desteği",
        "7/24 destek",
        "E-ticaret entegrasyonu"
      ],
      included: [true, true, true, true, true, true, true, true, true, true],
    },
  ];

  const handlePackageSelect = (plan: Plan) => {
    const subject = `${plan.name} Paketi Hakkında Bilgi`;
    const message = `Merhaba,\n\n${plan.name} paketi hakkında detaylı bilgi almak istiyorum.\n\nLütfen bu paket hakkında daha detaylı bilgi verebilir misiniz?`;
    
    const params = new URLSearchParams({
      subject: subject,
      message: message
    });
    
    router.push(`/contact?${params.toString()}`);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      viewport={{ once: true }}
      className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 max-w-6xl mx-auto"
    >
      {plans.map((plan, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          whileHover={{ 
            y: -10, 
            scale: 1.02,
            boxShadow: '0px 20px 40px rgba(37, 99, 235, 0.15)'
          }}
          transition={{ 
            duration: 0.6, 
            delay: index * 0.2,
            type: 'spring',
            stiffness: 100,
            y: { duration: 0.15, type: 'spring', stiffness: 400 },
            scale: { duration: 0.15, type: 'spring', stiffness: 400 }
          }}
          viewport={{ once: true }}
          className={`relative bg-white rounded-2xl shadow-xl border-2 ${
            plan.recommended 
              ? 'border-blue-500 shadow-blue-100' 
              : 'border-gray-200'
          }`}
        >
          {plan.recommended && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.3 }}
              viewport={{ once: true }}
              className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg"
            >
              En Popüler
            </motion.div>
          )}
          
          <div className="p-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.1 }}
              viewport={{ once: true }}
              className="text-center mb-8"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h2>
              <p className="text-gray-600 mb-4">
                {plan.description}
              </p>
              {/* <motion.div 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.2 + 0.2 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-blue-600 mb-2"
              >
                {plan.price}
              </motion.div>
              <p className="text-gray-500 text-sm">Tek seferlik ödeme</p> */}
            </motion.div>

            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ 
                duration: 0.4, 
                delay: index * 0.2 + 0.3,
                type: 'spring',
                stiffness: 400
              }}
              viewport={{ once: true }}
              onClick={() => handlePackageSelect(plan)}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-lg transition-all duration-300 mb-8 cursor-pointer ${
                plan.recommended
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Paketi Seç
            </motion.button>

            <hr className="border-gray-200 mb-6" />

            <motion.ul 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.2 + 0.4 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {plan.features.map((feature, idx) => (
                <motion.li 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.2 + 0.4 + idx * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3"
                >
                  {plan.included[idx] ? (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.4 + idx * 0.05 + 0.1 }}
                      viewport={{ once: true }}
                    >
                      <IoCheckmarkCircle 
                        className="text-green-500 text-xl flex-shrink-0 mt-0.5" 
                      />
                    </motion.div>
                  ) : (
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: index * 0.2 + 0.4 + idx * 0.05 + 0.1 }}
                      viewport={{ once: true }}
                    >
                      <IoCloseSharp 
                        className="text-gray-400 text-xl flex-shrink-0 mt-0.5" 
                      />
                    </motion.div>
                  )}
                  <span className={`text-sm md:text-base ${
                    plan.included[idx] ? 'text-gray-700' : 'text-gray-400'
                  }`}>
                    {feature}
                  </span>
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
} 
