'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header_Short() {

  const pathname= usePathname();

  const pageTitles: { [key: string]: string } = {
    "/about": "Hakkımızda",
    "/contact": "İletişim",
    "/portfolio": "Portfolyomuz",
    // "/blog": "Blog",
    "/our-packages": "Paketlerimiz",
  };

      const isBlogSlug = pathname.startsWith('/blog/') && pathname !== '/blogs';
      
      let title;
      if (isBlogSlug) {
        title = "Blog";
      } else {
        title = pageTitles[pathname];
      }

  
    return (
      <div style={{ backgroundImage: `url('/header.jpg')` }} className="relative w-full h-56 object-cover bg-cover bg-center flex items-center pt-20 md:pt-0">
        <div className="flex text w-full h-full items-end text-white px-4">
          <div className="px-5 py-8 md:ml-4">
            <div className="flex">
              <Link href="/" className="text-xs text-gray-300">Anasayfa </Link>
              <h1 className="text-xs text-gray-300 font-semibold"> / {title}</h1>
            </div>
            <h1 className="text-xl text-white font-semibold">{title}</h1>
          </div>
        </div>
      </div>
    );
  }
  