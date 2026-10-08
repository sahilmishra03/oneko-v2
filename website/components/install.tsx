"use client";

import React, { useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import {
  IconCheck,
  IconBrandHtml5,
  IconBrandJavascript,
  IconCopy,
  IconFileCode,
  IconFolder,
} from "@tabler/icons-react";
import { SPRING_CONFIG } from "@/lib/motion-config";
import { cn } from "@/lib/utils";
import { Subheading } from "./subheading";

type InstallOption = "html" | "vite" | "next" | "angular" | "wordpress";

const installOptions: {
  id: InstallOption;
  label: string;
  description: string;
  structure: string;
  code: string;
  steps: string[];
}[] = [
  {
    id: "html",
    label: "Static HTML",
    description:
      "For a plain HTML website or files hosted without a build tool.",
    structure: `site/
  index.html
  js/oneko.js
  skins/`,
    code: `<script src="./js/oneko.js"></script>`,
    steps: [
      "Copy the js/ and skins/ folders beside your HTML file.",
      "Add the script before the closing </body> tag.",
      "Open the page through a web server so the script and sprites can load.",
    ],
  },
  {
    id: "vite",
    label: "Vite / React / Vue",
    description:
      "For Vite projects and client-side React, Vue, or Svelte apps.",
    structure: `public/
  js/oneko.js
  skins/`,
    code: `<script src="/js/oneko.js"></script>`,
    steps: [
      "Copy the js/ and skins/ folders into public/.",
      "Add the script once to index.html, not inside a component.",
      "Start your development server or build the app as usual.",
    ],
  },
  {
    id: "next",
    label: "Next.js",
    description: "For Next.js App Router and Pages Router projects.",
    structure: `public/
  js/oneko.js
  skins/`,
    code: `import Script from "next/script";

<Script src="/js/oneko.js" strategy="afterInteractive" />`,
    steps: [
      "Copy the js/ and skins/ folders into public/.",
      "Add the Script component once inside app/layout.tsx or pages/_document.tsx.",
      "Do not add it to each page or route.",
    ],
  },
  {
    id: "angular",
    label: "Angular",
    description:
      "For Angular CLI projects using the default assets configuration.",
    structure: `src/
  js/oneko.js
  skins/`,
    code: `<script src="js/oneko.js"></script>`,
    steps: [
      "Copy the js/ and skins/ folders into src/.",
      "Make sure both folders are included in the angular.json assets list.",
      "Add the script to src/index.html.",
    ],
  },
  {
    id: "wordpress",
    label: "WordPress / CMS",
    description: "For WordPress themes and other content-management systems.",
    structure: `your-theme/
  js/oneko.js
  skins/`,
    code: `<script src="/wp-content/themes/your-theme/js/oneko.js"></script>`,
    steps: [
      "Upload js/ and skins/ to a publicly accessible theme or assets folder.",
      "Add the script to your site footer or enqueue it once from the theme.",
      "Keep skins/ beside js/ at the same public URL level.",
    ],
  },
];

export const Install = () => {
  const [copied, setCopied] = useState(false);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
  const [selectedOption, setSelectedOption] = useState<InstallOption>("html");
  const selectedInstall = installOptions.find(
    (option) => option.id === selectedOption,
  )!;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(selectedInstall.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch (error) {
      console.error("Failed to copy install command", error);
    }
  };

  const toast = (
    <AnimatePresence mode="wait">
      {copied ? <CopyAnimation key="copy-command-toast" /> : null}
    </AnimatePresence>
  );

  return (
    <section id="install" className="scroll-mt-8">
      <Subheading>Install</Subheading>
      {mounted ? createPortal(toast, document.body) : null}
      <div className="mt-5 mb-2 flex items-center justify-between gap-3">
        <p className="text-foreground text-sm font-semibold">
          Choose your technology
        </p>
        <span className="text-foreground/60 text-xs">
          Select an option to view the steps
        </span>
      </div>
      <div
        role="tablist"
        aria-label="Choose your technology"
        className="inline-flex max-w-full gap-1 overflow-x-auto rounded-xl border border-white/70 bg-white/45 p-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] backdrop-blur-xl dark:border-white/10 dark:bg-white/8 dark:shadow-black/20"
      >
        {installOptions.map((option) => (
          <button
            key={option.id}
            type="button"
            role="tab"
            id={`install-tab-${option.id}`}
            aria-controls={`install-panel-${option.id}`}
            aria-selected={selectedOption === option.id}
            onClick={() => {
              setSelectedOption(option.id);
              setCopied(false);
            }}
            className={cn(
              "min-h-9 shrink-0 cursor-pointer rounded-lg px-3.5 py-2 text-center text-xs font-medium whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:focus-visible:ring-blue-400",
              selectedOption === option.id
                ? "text-foreground border border-white/80 bg-white/75 shadow-[0_4px_14px_rgb(0,0,0,0.12)] backdrop-blur-md dark:border-white/20 dark:bg-white/15 dark:shadow-black/20"
                : "text-foreground/65 hover:text-foreground hover:bg-white/40 dark:hover:bg-white/10",
            )}
          >
            {option.label}
          </button>
        ))}
      </div>
      {installOptions.map((option) =>
        selectedOption === option.id ? (
          <div
            key={option.id}
            role="tabpanel"
            id={`install-panel-${option.id}`}
            aria-labelledby={`install-tab-${option.id}`}
            className="mt-4 rounded-xl border border-white/70 bg-white/45 p-4 shadow-[0_12px_40px_rgb(0,0,0,0.08)] backdrop-blur-xl sm:p-5 dark:border-white/10 dark:bg-white/8 dark:shadow-black/20"
          >
            <h3 className="text-foreground text-base font-semibold">
              {option.label}
            </h3>
            <p className="text-foreground/70 mt-1 text-sm">
              {option.description}
            </p>
            <ol className="text-foreground/80 mt-4 list-inside list-decimal space-y-2 text-sm text-pretty">
              {option.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <StructurePreview structure={option.structure} />
            <button
              type="button"
              onClick={handleCopy}
              aria-label={
                copied
                  ? `${option.label} code copied`
                  : `Copy ${option.label} install code`
              }
              className="group mt-3 flex w-full cursor-pointer flex-col overflow-hidden rounded-lg border border-white/70 bg-white/55 text-left shadow-sm backdrop-blur-md transition-colors hover:border-white hover:bg-white/75 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none dark:border-white/10 dark:bg-white/8 dark:hover:border-white/20 dark:hover:bg-white/15"
            >
              <span className="flex w-full items-center justify-between border-b border-white/60 bg-white/35 px-3 py-2 dark:border-white/10 dark:bg-white/5">
                <span className="text-foreground/65 text-[10px] font-semibold tracking-[0.14em] uppercase">
                  Code snippet
                </span>
                <span className="flex items-center gap-1.5">
                  {copied ? (
                    <>
                      <span className="text-xs font-semibold text-green-700 dark:text-green-300">
                        Code copied
                      </span>
                      <IconCheck className="size-4 text-green-600 dark:text-green-400" />
                    </>
                  ) : (
                    <>
                      <span className="text-foreground/50 text-[10px] font-medium">
                        Copy
                      </span>
                      <IconCopy className="text-foreground/50 group-hover:text-foreground size-4 transition-colors" />
                    </>
                  )}
                </span>
              </span>
              <code className="block min-w-0 px-3 py-3 text-xs leading-6 whitespace-pre-wrap text-neutral-900 dark:text-neutral-100">
                {option.code}
              </code>
            </button>
          </div>
        ) : null,
      )}
      <p className="text-foreground/70 mt-6 text-sm text-pretty">
        You can download the files directly as a{" "}
        <Link
          href="/downloads/oneko-v2.zip"
          download
          className="text-foreground font-semibold underline decoration-neutral-400 decoration-dotted underline-offset-[0.2em]"
        >
          ZIP file
        </Link>
        .
      </p>
    </section>
  );
};

const StructurePreview = ({ structure }: { structure: string }) => {
  const lines = structure.split("\n");

  return (
    <div className="mt-4 overflow-hidden rounded-lg border border-white/60 bg-white/45 shadow-inner backdrop-blur-md dark:border-white/10 dark:bg-black/20">
      <div className="border-b border-white/60 bg-white/35 px-3 py-2 dark:border-white/10 dark:bg-white/5">
        <span className="text-foreground/65 text-[10px] font-semibold tracking-[0.14em] uppercase">
          Project structure
        </span>
      </div>
      <div className="space-y-1 px-3 py-3 font-mono text-xs">
        {lines.map((line) => {
          const trimmedLine = line.trim();
          const depth = Math.floor((line.length - trimmedLine.length) / 2);
          const isFolder = trimmedLine.endsWith("/");

          return (
            <div
              key={line}
              className="text-foreground/75 flex items-center gap-2"
              style={{ paddingLeft: `${depth * 1.25}rem` }}
            >
              {isFolder ? (
                <IconFolder className="text-primary size-4 shrink-0" />
              ) : trimmedLine.endsWith(".html") ? (
                <IconBrandHtml5 className="size-4 shrink-0 text-blue-600 dark:text-blue-300" />
              ) : trimmedLine.endsWith(".js") ? (
                <IconBrandJavascript className="size-4 shrink-0 text-amber-600 dark:text-amber-300" />
              ) : (
                <IconFileCode className="text-foreground/55 size-4 shrink-0" />
              )}
              <span>{trimmedLine}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CopyAnimation = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
      }}
      exit={{
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
      }}
      transition={SPRING_CONFIG}
      className={cn(
        "bg-primary text-primary-foreground border-primary/70 pointer-events-none fixed inset-x-4 bottom-6 z-200 mx-auto flex w-fit max-w-[calc(100vw-2rem)] items-center justify-center gap-2 rounded-xl border px-4 py-3 text-center text-sm font-semibold shadow-[0_12px_35px_rgb(0,0,0,0.2)] ring-1 ring-white/30 backdrop-blur-xl sm:bottom-8 sm:px-5",
      )}
    >
      <TerminalIcon /> Code copied to clipboard
    </motion.div>
  );
};

const TerminalIcon = () => {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 perspective-distant"
      initial={{
        scale: 0.8,
      }}
      animate={{
        scale: [0.8, 1, 1.2, 1],
      }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
    >
      <motion.path
        d="M5 7l5 5l-5 5"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
      />
      <motion.path
        d="M13 17l6 0"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.3, delay: 0.6 }}
      />
    </motion.svg>
  );
};
