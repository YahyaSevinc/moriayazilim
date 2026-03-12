export interface NavigationItem {
  name: string;
  path: string;
  description?: string;
}

export const navigationItems: NavigationItem[] = [
  {
    name: "Anasayfa",
    path: "/",
    description: "Ana sayfa"
  },
  {
    name: "Hakkımızda",
    path: "/about",
    description: "Şirket hakkında bilgiler"
  },
  {
    name: "Portfolyomuz",
    path: "/portfolio",
    description: "Tamamlanan projeler"
  },
  // {
  //   name: "Blog",
  //   path: "/blog",
  //   description: "Bloglarımız"
  // },
  {
    name: "Paketlerimiz",
    path: "/our-packages",
    description: "Paketlerimiz"
  },
  {
    name: "İletişim",
    path: "/contact",
    description: "İletişim bilgileri"
  }
];

export const socialMediaLinks = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/moriayazilim",
    icon: "FaInstagram",
    color: "hover:text-pink-600"
  },
  {
    name: "E-Posta",
    url: "mailto:moriayazilim@gmail.com",
    icon: "MdEmail",
    color: "hover:text-black"
  },
  {
    name: "Linkedin",
    url: "https://www.linkedin.com/company/moria-yaz%C4%B1l%C4%B1m",
    icon: "FaLinkedin",
    color: "hover:text-blue-500"
  },
  
];

export const contactInfo = {
  phone: "0551 966 78 36",
  email: "moriayazilim@gmail.com",
  address: "İstanbul, Türkiye",
  workingHours: "Pazartesi - Cuma: 09:00 - 18:00"
}; 