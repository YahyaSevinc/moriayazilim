"use client";

import Image from 'next/image';
import { motion } from 'framer-motion';
import { usePathname } from "next/navigation";
import { getLocaleFromPathname } from "@/app/utils/locale";

export default function TeamSection() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const teamMembers = [
    {
      name: "Volkan Gümüş",
      role: "Full-Stack Developer",
      image: "/logo.png",
      description:
        locale === "en"
          ? "Brings designs to life with modern web technologies and builds interfaces that work flawlessly across devices."
          : "Tasarımı modern web teknolojileriyle hayata geçirerek tüm cihazlarda sorunsuz çalışan arayüzler sunuyor.",
      href: "mailto:volkan@moriayazilim.com",
    },
    {
      name: "Yahya Emin Sevinç",
      role: locale === "en" ? "Frontend Developer" : "Frontend Geliştirici",
      image: "/logo.png",
      description:
        locale === "en"
          ? "Builds user-focused modern interfaces. Delivers mobile-friendly, SEO-ready and functional web experiences with React and Next.js."
          : "Kullanıcı odaklı, modern arayüzler geliştiriyor. React ve Next.js ile mobil uyumlu, SEO dostu ve işlevsel web tasarımları sunuyor.",
      href: "mailto:yahya@moriayazilim.com",
    },
    {
      name: "Efe Mert Cabaoğlu",
      role: locale === "en" ? "Backend Developer" : "Backend Geliştirici",
      image: "/logo.png",
      description:
        locale === "en"
          ? "Builds strong, scalable backends with a focus on data security and system performance."
          : "Veri güvenliği ve sistem performansını ön planda tutarak güçlü ve ölçeklenebilir altyapılar geliştiriyor.",
      href: "mailto:efe@moriayazilim.com",
    },
    {
      name: "Meriç Ege Kızılsu",
      role: "UI UX Designer",
      image: "/logo.png",
      description:
        locale === "en"
          ? "Designs intuitive, accessible digital experiences optimized through user research and experience analysis."
          : "Kullanıcı araştırmaları ve deneyim analiziyle optimize edilmiş, sezgisel ve erişilebilir dijital deneyimler tasarlıyor.",
      href: "mailto:meric@moriayazilim.com",
    },
    {
      name: "Salim Öztürk",
      role: locale === "en" ? "Graphic Designer" : "Grafik Tasarımcı",
      image: "/logo.png",
      description:
        locale === "en"
          ? "Adds aesthetic value by producing creative visuals and original designs that reflect brand identity."
          : "Marka kimliğini yansıtan yaratıcı görseller ve özgün tasarımlar üreterek projelere estetik değer katıyor.",
      href: "mailto:salim@moriayazilim.com",
    }
  ];

  return (
    <section className="py-20">
      <div className="w-full mx-auto px-4 md:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-center mb-16 text-black"
        >
          {locale === "en" ? "Our team" : "Ekibimiz"}
        </motion.h2>

        <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
          {teamMembers.map((member, index) => (
            <a
            key={index}
            href={member.href}
            onClick={(e) => {
              e.preventDefault();
              console.log('Team member mailto clicked - opening email client:', member.href);
              window.location.href = member.href;
            }}
            className="block w-[95%] md:w-[calc(50%-1rem)] lg:w-[320px]"
          >
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0px 20px 40px #2563eb55",
                }}
                transition={{
                  duration: 0.6,
                  type: "spring",
                  stiffness: 100,
                  y: { duration: 0.15, type: "spring", stiffness: 400 },
                  scale: { duration: 0.15, type: "spring", stiffness: 400 },
                }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg overflow-hidden cursor-pointer"
              >
                <motion.div
                  className="relative h-[400px] md:h-80 group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover grayscale opacity-80 p-4 group-hover:grayscale-0 scale-100 group-hover:scale-105 shadow-none group-hover:shadow-xl transition-all duration-300"
                  />
                </motion.div>
                <motion.div
                  className="p-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-xl font-bold mb-2 text-black">
                    {member.name}
                  </h3>
                  <p className="text-[#1c398e] font-semibold mb-4">
                    {member.role}
                  </p>
                  <p className="text-gray-600">{member.description}</p>
                </motion.div>
              </motion.div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}