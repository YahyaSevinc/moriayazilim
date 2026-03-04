import Link from "next/link"; 
import Image from "next/image";
import SocialMediaIcons from './SocialMediaIcons';
import { navigationItems } from '@/app/data/navigation';
export default function Footer() {
  return (
    <>
    
    <footer className="w-full md:h-[10lvh] items-center justify-center md:p-4 mt-8">
      <div className="container mx-auto py-10 px-6 border-t border-black/43 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="w-full md:w-auto flex md:block justify-start md:justify-start mb-4 md:mb-0 items-center">
          <Link href="/">
            <Image 
              src="/logo.png" 
              alt="Logo"
              width={48}
              height={48}
              className="h-12 w-12 hover:scale-110 transition-all duration-300"
            />
          </Link>
          <span className="ml-3 text-xl font-medium md:hidden">Moria Yazılım</span>
        </div>

        <nav className="w-full md:w-auto flex flex-col xl:absolute xl:left-1/2 xl:-translate-x-1/2 xl:justify-center md:flex md:flex-row md:space-x-6 text-gray-700 font-medium md:items-center items-start">
          {navigationItems.map(({ name, path }) => {
            return (
              <Link 
                key={path}
                className="text-lg md:text-xl hover:scale-110 transition-all duration-300 mb-2 md:mb-0"
                href={path}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        <a className="md:hidden pt-8 pb-4 text-gray-700 w-full text-center">Sosyal Medyada Biz</a>

        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <SocialMediaIcons className="text-2xl" iconSize="text-2xl" textColor="text-black" />
        </div>
      </div>

      {/* Sadece mobilde gözükecek copyright satırı */}
      <div className="block md:hidden w-full text-center text-xs text-gray-600 pb-4">
        © Copyright 2025 Moria Yazılım A.Ş.
      </div>
    </footer>

    
    </>
    


  );
}
