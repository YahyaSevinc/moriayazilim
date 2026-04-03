export const SITE_URL = "https://www.moriayazilim.com" as const;

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${normalized}`;
}

export function hreflangAlternates(pathTr: string) {
  // TR route is the canonical "base" route (no /tr prefix).
  const trPath = pathTr.startsWith("/") ? pathTr : `/${pathTr}`;
  const enPath = trPath === "/" ? "/en" : `/en${trPath}`;

  return {
    canonical: absoluteUrl(trPath),
    languages: {
      "tr-TR": absoluteUrl(trPath),
      "en-US": absoluteUrl(enPath),
      "x-default": absoluteUrl(trPath),
    },
  } as const;
}

export function hreflangAlternatesEn(pathTr: string) {
  const trPath = pathTr.startsWith("/") ? pathTr : `/${pathTr}`;
  const enPath = trPath === "/" ? "/en" : `/en${trPath}`;

  return {
    canonical: absoluteUrl(enPath),
    languages: {
      "tr-TR": absoluteUrl(trPath),
      "en-US": absoluteUrl(enPath),
      "x-default": absoluteUrl(trPath),
    },
  } as const;
}

