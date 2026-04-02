"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, stripEnPrefix } from "@/app/utils/locale";

type Props = {
  className?: string;
  textClassName?: string;
  separatorClassName?: string;
};

export default function LanguageToggle({
  className,
  textClassName = "text-xs font-semibold",
  separatorClassName = "opacity-60",
}: Props) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);

  const trHref = stripEnPrefix(pathname || "/");
  const enHref = "/en";

  const isTrActive = locale === "tr";
  const isEnActive = locale === "en";

  return (
    <div className={className}>
      <Link
        href={trHref}
        className={`${textClassName} ${isTrActive ? "opacity-100" : "opacity-60 hover:opacity-90"} transition-opacity`}
      >
        TR
      </Link>
      <span className={`mx-2 ${textClassName} ${separatorClassName}`}>|</span>
      <Link
        href={enHref}
        className={`${textClassName} ${isEnActive ? "opacity-100" : "opacity-60 hover:opacity-90"} transition-opacity`}
      >
        EN
      </Link>
    </div>
  );
}

