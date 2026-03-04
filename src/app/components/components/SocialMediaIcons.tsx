import { FaInstagram, FaYoutube, FaXTwitter, FaWhatsapp,FaLinkedin } from 'react-icons/fa6';
import { MdEmail } from 'react-icons/md';
import { socialMediaLinks } from '@/app/data/navigation';

interface SocialMediaIconsProps {
  className?: string;
  iconSize?: string;
  textColor?: string;
  exclude?: string[];
}

export default function SocialMediaIcons({ className = "", iconSize = "text-xl", textColor = "text-gray-700", exclude = [] }: SocialMediaIconsProps) {
  const iconMap = {
    FaInstagram: FaInstagram,
    FaYoutube: FaYoutube,
    FaXTwitter: FaXTwitter,
    FaWhatsapp: FaWhatsapp,
    FaLinkedin: FaLinkedin,
    MdEmail:MdEmail
  };

  const socialLinks = socialMediaLinks
    .filter(social => !(exclude && exclude.includes(social.icon)))
    .map(social => ({
      icon: iconMap[social.icon as keyof typeof iconMap],
      href: social.url,
      label: social.name,
      color: social.color
    }));

  return (
    <div className={`flex flex-row items-center gap-4 ${className}`}>
      {socialLinks.map((social, index) => {
        const IconComponent = social.icon;
        const isMailto = social.href.startsWith('mailto:');
        const handleClick = isMailto ? (e: React.MouseEvent<HTMLAnchorElement>) => {
          e.preventDefault();
          console.log('Mailto icon clicked - opening email client:', social.href);
          window.location.href = social.href;
        } : undefined;

        return (
          <a
            key={index}
            href={social.href}
            onClick={handleClick}
            {...(isMailto ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            aria-label={social.label}
            className={`cursor-pointer ${iconSize} ${textColor} hover:scale-125 transition-all duration-300 ${social.color}`}
          >
            <IconComponent />
          </a>
        );
      })}
    </div>
  );
} 