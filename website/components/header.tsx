import React from "react";
import { InlineCode } from "./code";

export const Header = () => {
  return (
    <header className="relative mt-6 overflow-hidden rounded-3xl border border-white/70 bg-white/45 p-6 shadow-[0_18px_55px_rgb(0,0,0,0.08)] backdrop-blur-xl md:p-9 dark:border-white/10 dark:bg-white/8 dark:shadow-black/20">
      <div className="bg-primary/20 pointer-events-none absolute -top-20 -right-12 size-56 rounded-full blur-3xl" />
      <div className="relative max-w-2xl">
        <p className="text-primary text-[11px] font-bold tracking-[0.2em] uppercase">
          A tiny companion for the web
        </p>
        <h2 className="text-foreground mt-4 text-3xl leading-tight font-semibold tracking-tight text-pretty md:text-4xl">
          Bring a little <InlineCode className="text-[0.85em]">neko</InlineCode>{" "}
          (cat) to your website!
        </h2>
        <p className="text-foreground/80 mt-5 max-w-xl text-base leading-7 text-pretty">
          Oneko is a tiny cat that follows your cursor around the screen. This
          web-based version is lightweight, easy to customize, and ready to add
          a little personality to your project.
        </p>
        <p className="text-foreground/60 mt-3 max-w-xl text-sm leading-6 text-pretty">
          Try different skins in the playground, then download the files and
          add Oneko to your own website.
        </p>
      </div>
    </header>
  );
};
