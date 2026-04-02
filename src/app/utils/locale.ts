export type AppLocale = "tr" | "en";

export function getLocaleFromPathname(pathname: string | null | undefined): AppLocale {
  if (!pathname) return "tr";
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "tr";
}

export function stripEnPrefix(pathname: string): string {
  if (pathname === "/en") return "/";
  if (pathname.startsWith("/en/")) return pathname.slice(3);
  return pathname;
}

export function withLocalePrefix(path: string, locale: AppLocale): string {
  if (!path.startsWith("/")) return path;
  if (locale === "en") {
    if (path === "/") return "/en";
    if (path.startsWith("/en/") || path === "/en") return path;
    return `/en${path}`;
  }
  // tr
  return stripEnPrefix(path);
}

