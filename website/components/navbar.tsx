"use client";
import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { DottedUnderline } from "./dotted-underline";

const links = [
  { title: "Playground", href: "/#playground" },
  { title: "Install", href: "/#install" },
  { title: "Skins", href: "/skins" },
  { title: "GitHub", href: site.github, external: true },
];

export const Navbar = () => {
  return (
    <nav className="navbar relative mx-auto flex max-w-2xl flex-col items-start gap-3 px-4 pt-4 md:gap-4 md:pt-8">
      <div className="flex w-full items-center justify-between gap-4 rounded-2xl border border-white/70 bg-white/45 px-4 py-3 pr-16 shadow-[0_10px_35px_rgb(0,0,0,0.06)] backdrop-blur-xl sm:pr-4 dark:border-white/10 dark:bg-white/8 dark:shadow-black/20">
        <div className="flex min-w-0 items-center gap-2 perspective-distant">
          <h1 className="text-foreground min-w-0 truncate text-lg font-semibold tracking-tight md:text-xl">
            {site.name}
            <span className="text-foreground/45 ml-2 hidden font-normal sm:inline">
              — a cat that follows your mouse pointer
            </span>
          </h1>
        </div>
      </div>
      <div className="navbar-links flex w-full max-w-full items-center justify-start gap-0.5 overflow-x-auto rounded-full border border-white/60 bg-white/35 p-1.5 shadow-sm backdrop-blur-md sm:w-fit sm:gap-1 dark:border-white/10 dark:bg-white/5">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            {...(link.external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            className={cn(
              "group text-foreground/70 hover:text-primary relative shrink-0 rounded-full px-2 py-1.5 text-xs transition-colors hover:bg-white/50 sm:px-3 sm:text-sm dark:hover:bg-white/10",
            )}
          >
            {link.title}
            <DottedUnderline className="mask-x-from-90% opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        ))}
      </div>
    </nav>
  );
};
