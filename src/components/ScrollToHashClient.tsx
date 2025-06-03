"use client";
import { useEffect } from "react";

export default function ScrollToHashClient() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      setTimeout(() => {
        const el = document.querySelector(hash);
        if (el) {
          (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  }, []);

  return null;
}
