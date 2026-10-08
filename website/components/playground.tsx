"use client";

import React, { useRef, useState } from "react";
import Script from "next/script";
import { Subheading } from "./subheading";

declare global {
  interface Window {
    onekoChangeSkin?: () => void;
    onekoDisable?: () => void;
    onekoEnable?: () => void;
  }
}

export const Playground = () => {
  const [isActive, setIsActive] = useState(false);
  const isActiveRef = useRef(false);

  const spawnOneko = () => {
    isActiveRef.current = true;
    if (typeof window !== "undefined" && window.onekoEnable) {
      window.onekoEnable();
    }
    setIsActive(true);
  };

  const disableOneko = () => {
    isActiveRef.current = false;
    if (typeof window !== "undefined" && window.onekoDisable) {
      window.onekoDisable();
    }
    document.getElementById("oneko")?.remove();
    setIsActive(false);
  };

  const changeSkin = () => {
    if (typeof window !== "undefined" && window.onekoChangeSkin) {
      window.onekoChangeSkin();
    }
  };

  return (
    <section id="playground" className="scroll-mt-8">
      <Subheading>Playground</Subheading>
      <div className="mt-4 rounded-2xl border border-white/70 bg-white/35 p-4 shadow-[0_14px_40px_rgb(0,0,0,0.06)] backdrop-blur-xl sm:p-5 dark:border-white/10 dark:bg-white/8 dark:shadow-black/20">
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-foreground text-base font-semibold tracking-tight">
              Try Oneko in your browser
            </p>
            <p className="text-foreground/65 mt-1 max-w-2xl text-sm leading-6 text-pretty">
              Bring the cat to life, change its skin, and move your cursor
              around the page.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-foreground/55 mr-auto text-xs font-medium">
              {isActive ? "Oneko is following your cursor" : "Ready to start"}
            </span>
            <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={spawnOneko}
              disabled={isActive}
              className="bg-primary text-primary-foreground hover:bg-primary/90 w-fit cursor-pointer rounded-lg border border-white/20 px-4 py-2 text-sm font-semibold shadow-[0_6px_18px_rgb(0,0,0,0.12)] backdrop-blur-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isActive ? "Oneko is Active!" : "Spawn Oneko"}
            </button>

            {isActive && (
              <>
                <button
                  type="button"
                  onClick={changeSkin}
                  className="border-border/70 bg-secondary/55 text-secondary-foreground hover:bg-secondary/80 w-fit cursor-pointer rounded-lg border px-3.5 py-2 text-sm font-semibold shadow-sm backdrop-blur-md transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none"
                >
                  Change Skin
                </button>
                <span
                  aria-hidden="true"
                  className="mx-1 hidden h-6 w-px bg-border/70 sm:block"
                />
                <button
                  type="button"
                  onClick={disableOneko}
                  className="w-fit cursor-pointer rounded-lg border border-red-500/35 bg-red-500/10 px-3.5 py-2 text-sm font-semibold text-red-600 shadow-sm backdrop-blur-md transition-colors hover:bg-red-500/20 focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:outline-none dark:border-red-400/35 dark:bg-red-400/10 dark:text-red-300 dark:hover:bg-red-400/20"
                >
                  Disable Oneko
                </button>
              </>
            )}
            </div>
          </div>
        </div>
      </div>
      {isActive && (
        <Script
          src="/js/oneko.js"
          data-skins-path="/runtime-skins/"
          strategy="afterInteractive"
          onLoad={() => {
            if (!isActiveRef.current) {
              window.onekoDisable?.();
              document.getElementById("oneko")?.remove();
            }
          }}
        />
      )}
    </section>
  );
};
