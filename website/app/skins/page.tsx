import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Container from "@/components/container";
import { DottedSeparator } from "@/components/separator";

const skins = [
  "ace.png",
  "black.png",
  "bsd.png",
  "bunny.png",
  "calico.png",
  "cat.png",
  "catppuccin.png",
  "dog.png",
  "eevee.png",
  "esmeralda.png",
  "fox.png",
  "ghost.png",
  "gray.png",
  "jess.png",
  "kina.png",
  "lucy.png",
  "maia.png",
  "maria.png",
  "mike.png",
  "oneko.png",
  "sakura.png",
  "silver.png",
  "silversky.png",
  "spirit.png",
  "tomoyo.png",
  "tora-x11.png",
  "valentine.png",
  "vaporwave.png",
] as const;

export const metadata: Metadata = {
  title: "Skins",
  description: "Browse every Oneko skin available for your website.",
  alternates: {
    canonical: "/skins",
  },
};

function skinLabel(filename: string) {
  return filename
    .replace(/\.(png|gif)$/, "")
    .replace(/-/g, " ")
    .replace(/\b\w/g, (character) => character.toUpperCase());
}

export default function SkinsPage() {
  return (
    <Container>
      <div className="pt-6">
        <Link
          href="/"
          className="text-foreground/65 hover:text-foreground text-sm transition-colors"
        >
          ← Back to Oneko
        </Link>
        <h1 className="text-foreground mt-6 text-2xl font-semibold tracking-tight">
          Oneko skins
        </h1>
        <p className="text-foreground/70 mt-2 text-sm leading-6">
          Browse all available skins and choose the one that fits your website.
          Oneko can randomly select from these files when it starts.
        </p>
      </div>

      <DottedSeparator className="my-8" />

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
        {skins.map((skin) => (
          <div
            key={skin}
            className="flex min-h-32 flex-col items-center justify-center rounded-xl border border-white/70 bg-white/45 p-4 shadow-[0_8px_30px_rgb(0,0,0,0.06)] backdrop-blur-xl transition-transform hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/8"
          >
            <div className="flex size-16 items-center justify-center rounded-lg border border-white/60 bg-white/45 shadow-inner dark:border-white/10 dark:bg-black/15">
              <Image
                src={`/skin-previews/${skin}`}
                alt={`${skinLabel(skin)} Oneko skin sprite sheet`}
                width={128}
                height={128}
                className="size-20 object-contain [image-rendering:pixelated]"
              />
            </div>
            <span className="text-foreground/75 mt-3 text-center text-xs font-medium">
              {skinLabel(skin)}
            </span>
          </div>
        ))}
      </div>

      <p className="text-foreground/60 mt-8 pb-8 text-center text-xs">
        {skins.length} skins available ·{" "}
        <Link href="/#playground" className="underline underline-offset-4">
          Try them in the playground
        </Link>
      </p>
    </Container>
  );
}
