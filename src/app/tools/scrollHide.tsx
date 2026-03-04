"use client";
import { useEffect } from "react";

export default function HideScrollbar() {
  useEffect(() => {
    const html = document.documentElement;
    html.style.overflow = "auto";  
    html.style.scrollbarWidth = "none"; 
 
    const style = document.createElement("style");
    style.innerHTML = `::-webkit-scrollbar { display: none; }`;
    document.head.appendChild(style);

    return () => {
      html.style.overflow = "";
      html.style.scrollbarWidth = ""; 
      document.head.removeChild(style);
    };
  }, []);

  return null;  
}
