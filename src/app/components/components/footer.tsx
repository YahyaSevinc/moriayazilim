import Link from "next/link"; 
import Image from "next/image";
import SocialMediaIcons from './SocialMediaIcons';
import { navigationItems } from '@/app/data/navigation';
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocalePrefix } from "@/app/utils/locale";
export default function Footer() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const nav =
    locale === "en"
      ? [
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
          { name: "Portfolio", path: "/portfolio" },
          { name: "Packages", path: "/our-packages" },
          { name: "Contact", path: "/contact" },
        ]
      : navigationItems;
  return (
    <>
    
    <footer className="w-full md:h-[10lvh] items-center justify-center md:p-4 mt-8">
      <div className="container mx-auto py-10 px-6 border-t border-black/43 flex flex-col md:flex-row md:justify-between md:items-center">
        <div className="w-full md:w-auto flex md:block justify-start md:justify-start mb-4 md:mb-0 items-center">
          <Link href={withLocalePrefix("/", locale)}>
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
          {nav.map(({ name, path }) => {
            const href = withLocalePrefix(path, locale);
            return (
              <Link 
                key={href}
                className="text-lg md:text-xl hover:scale-110 transition-all duration-300 mb-2 md:mb-0"
                href={href}
              >
                {name}
              </Link>
            );
          })}
        </nav>

        <a className="md:hidden pt-8 pb-4 text-gray-700 w-full text-center">
          {locale === "en" ? "Follow us" : "Sosyal Medyada Biz"}
        </a>

        <div className="w-full md:w-auto flex justify-center md:justify-start">
          <SocialMediaIcons className="text-2xl" iconSize="text-2xl" textColor="text-black" />
        </div>
      </div>

      {/* Sadece mobilde gözükecek copyright satırı */}
      <div className="block md:hidden w-full text-center text-xs text-gray-600 pb-4">
        © {new Date().getFullYear()} Moria Yazılım A.Ş.
      </div>
    </footer>

    
    </>
    


  );
}
