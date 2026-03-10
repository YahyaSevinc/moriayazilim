'use client';

import { useState, useEffect, Suspense } from "react";
import emailjs from "emailjs-com"; 
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MdEmail } from "react-icons/md";
import { FaInstagram } from 'react-icons/fa6';

// Contact information data
const contactDetails = [
  {
    icon: MdEmail,
    title: "E-posta",
    value: "iletisim@moriayazilim.com",
    href: "mailto:iletisim@moriayazilim.com"
  },
  {
    icon: FaInstagram,
    title: "Instagram",
    value: "@moriayazilim",
    href: "https://www.instagram.com/moriayazilim"
  },
];

// useSearchParams kullandığımız için içeriği Suspense ile sarmalamalıyız (Next.js kuralı)
function ContactFormContent() {
  const searchParams = useSearchParams();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Pre-fill form with URL parameters
  useEffect(() => {
    const subject = searchParams.get('subject');
    const message = searchParams.get('message');
    
    if (subject || message) {
      setFormData(prev => ({
        ...prev,
        subject: subject || "",
        message: message || ""
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus('idle');

    try {
      await emailjs.send(
        "service_wzzfpoy",
        "template_qnj5aojfyeyeupj",
        { 
          title: formData.subject,
          name: formData.name,
          time: new Date().toLocaleString(),
          message: formData.message,
          email: formData.email,
        },
        "WQppF9Gcp5D3Lu2aF"
      );
      
      setSubmissionStatus('success');
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      console.error("Mesaj gönderme hatası:", error);
      setSubmissionStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto min-h-[80vh] flex flex-col justify-start"> {/* Zıplamayı önleyen min-h */}
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
          Bize Ulaşın
        </h1>
        <p className="md:text-xl text-gray-600 max-w-2xl mx-auto">
          Projeleriniz için bizimle iletişime geçin. Size en kısa sürede dönüş yapacağız.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-4 items-start flex-1">
        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 w-full"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Mesaj Gönderin</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6 flex flex-col">
            <div className="grid md:grid-cols-2 gap-6 w-full">
              <div>
                <label htmlFor="name" className="block text-sm text-gray-700 mb-2">
                  Adınız
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm text-gray-700 mb-2">
                  E-posta
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="w-full">
              <label htmlFor="subject" className="block text-sm text-gray-700 mb-2">
                Konu
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white"
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="message" className="block text-sm text-gray-700 mb-2">
                Mesajınız
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-all duration-300 bg-gray-50 focus:bg-white resize-none"
                required
              />
            </div>

            {/* Status Messages */}
            {submissionStatus === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
              >
                Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.
              </motion.div>
            )}

            {submissionStatus === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
              >
                 Mesaj gönderilirken bir hata oluştu. Lütfen tekrar deneyin.
              </motion.div>
            )}

            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`md:w-full self-center w-full py-3 px-8 rounded-xl font-semibold text-lg transition-all duration-300 ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg hover:shadow-xl'
              }`}
            >
              {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
            </motion.button>
          </form>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-8 h-full"
        >
          {/* Contact Details */}
          <div className="bg-white rounded-2xl shadow-xl p-8 h-full">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">İletişim Bilgileri</h3>
            
            <div className="space-y-6">
              {contactDetails.map((contact, index) => {
                const IconComponent = contact.icon;
                return (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{contact.title}</p>
                      {contact.href ? (
                        <a 
                          href={contact.href}
                          target={contact.href.startsWith('mailto:') ? "_self" : "_blank"}
                          rel={contact.href.startsWith('mailto:') ? "" : "noopener noreferrer"}
                          className="text-blue-600 hover:text-blue-800 transition-colors md:text-base text-sm block"
                        >
                          {contact.value}
                        </a>
                      ) : (
                        <p className="text-gray-600 md:text-base text-sm">{contact.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-10 px-4">
      <Suspense fallback={<div className="min-h-[80vh] flex items-center justify-center">Yükleniyor...</div>}>
        <ContactFormContent />
      </Suspense>
    </div>
  );
}