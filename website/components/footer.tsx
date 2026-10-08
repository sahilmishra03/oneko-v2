"use client";
import React from "react";
import Container from "./container";
import { LinkPreview } from "./link-preview";
import { site } from "@/lib/site";

export const Footer = () => {
  return (
    <Container className="pb-10">
      <footer className="my-8 flex flex-col items-center gap-4">
        <div className="flex w-full max-w-xl flex-col items-center gap-2.5">
          <div className="text-foreground/70 text-center text-sm leading-6 text-balance">
            Open source, MIT licensed. Here&apos;s the{" "}
            <LinkPreview url={site.github}>code</LinkPreview>.
          </div>
          <div className="text-foreground/65 mt-2 text-center text-xs leading-5 text-balance">
            <p className="text-foreground font-semibold">Credits</p>
            <p className="mt-1">
              Original Oneko concept and assets are credited to their respective
              authors.
            </p>
            <p className="mt-1">
              References:{" "}
              <LinkPreview url="https://github.com/glreno/oneko">
                glreno/oneko
              </LinkPreview>{" "}
              and{" "}
              <LinkPreview url="https://www.raycast.com/miklw/oneko">
                Raycast Oneko
              </LinkPreview>
              .
            </p>
          </div>
          <div className="mt-3 flex items-center gap-2 rounded-md border border-white/60 bg-neutral-950 px-3 py-1.5 text-[10px] font-semibold tracking-tight text-white shadow-sm dark:border-white/15">
            <span className="flex size-4 items-center justify-center rounded-full bg-orange-500 text-[9px] font-bold text-white">
              Y
            </span>
            <span>Not Backed by Y Combinator</span>
          </div>
        </div>
      </footer>
    </Container>
  );
};
