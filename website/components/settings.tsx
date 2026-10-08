"use client";
import { cn } from "@/lib/utils";
import { IconCheck, IconSettingsFilled } from "@tabler/icons-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { DottedSeparator } from "./separator";

type FontOption = "inter" | "schibsted" | "geist";
type ColorOption = "regular" | "rose" | "emerald" | "blue" | "amber" | "violet";

const FONTS: { id: FontOption; label: string; variable: string }[] = [
  {
    id: "schibsted",
    label: "Schibsted",
    variable: "var(--font-schibsted-grotesk)",
  },
  { id: "inter", label: "Inter", variable: "var(--font-inter)" },
  { id: "geist", label: "Geist", variable: "var(--font-geist-sans)" },
];

const COLORS: {
  id: ColorOption;
  label: string;
  swatch: string;
  bg: string;
  primary: string;
  foreground: string;
  gradientFrom: string;
  gradientTo: string;
  ringOffset: string;
  activeRing: string;
}[] = [
  {
    id: "regular",
    label: "Paper",
    swatch: "bg-stone-500",
    bg: "var(--color-stone-50)",
    primary: "var(--color-stone-800)",
    foreground: "var(--color-stone-600)",
    gradientFrom: "from-stone-500",
    gradientTo: "to-neutral-800",
    ringOffset: "ring-offset-stone-600",
    activeRing: "ring-stone-600",
  },
  {
    id: "rose",
    label: "Bloom",
    swatch: "bg-fuchsia-500",
    bg: "var(--color-rose-50)",
    primary: "var(--color-rose-900)",
    foreground: "var(--color-rose-600)",
    gradientFrom: "from-rose-400",
    gradientTo: "to-fuchsia-700",
    ringOffset: "ring-offset-fuchsia-500",
    activeRing: "ring-fuchsia-500",
  },
  {
    id: "emerald",
    label: "Lagoon",
    swatch: "bg-teal-500",
    bg: "var(--color-teal-50)",
    primary: "var(--color-teal-900)",
    foreground: "var(--color-teal-600)",
    gradientFrom: "from-teal-400",
    gradientTo: "to-cyan-700",
    ringOffset: "ring-offset-teal-500",
    activeRing: "ring-teal-500",
  },
  {
    id: "blue",
    label: "Nocturne",
    swatch: "bg-indigo-500",
    bg: "var(--color-indigo-50)",
    primary: "var(--color-indigo-950)",
    foreground: "var(--color-indigo-600)",
    gradientFrom: "from-indigo-400",
    gradientTo: "to-violet-700",
    ringOffset: "ring-offset-indigo-500",
    activeRing: "ring-indigo-500",
  },
  {
    id: "amber",
    label: "Honey",
    swatch: "bg-amber-500",
    bg: "var(--color-amber-50)",
    primary: "var(--color-amber-950)",
    foreground: "var(--color-amber-700)",
    gradientFrom: "from-amber-400",
    gradientTo: "to-orange-600",
    ringOffset: "ring-offset-amber-500",
    activeRing: "ring-amber-500",
  },
  {
    id: "violet",
    label: "Lilac",
    swatch: "bg-violet-500",
    bg: "var(--color-violet-50)",
    primary: "var(--color-violet-950)",
    foreground: "var(--color-violet-600)",
    gradientFrom: "from-violet-400",
    gradientTo: "to-purple-700",
    ringOffset: "ring-offset-violet-500",
    activeRing: "ring-violet-500",
  },
];

const STORAGE_KEY = "site-settings";
const DEFAULT_SETTINGS = {
  font: "geist" as FontOption,
  color: "regular" as ColorOption,
};
let settingsSnapshot = DEFAULT_SETTINGS;
const settingsListeners = new Set<() => void>();

function subscribeToSettings(listener: () => void) {
  settingsListeners.add(listener);
  return () => settingsListeners.delete(listener);
}

function getSettingsSnapshot() {
  return settingsSnapshot;
}

function getServerSettingsSnapshot() {
  return DEFAULT_SETTINGS;
}

function isColorOption(value: unknown): value is ColorOption {
  return typeof value === "string" && COLORS.some((c) => c.id === value);
}

function loadSettings(): { font: FontOption; color: ColorOption } {
  if (typeof window === "undefined")
    return { font: "geist", color: "regular" };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as {
        font?: FontOption;
        color?: unknown;
      };
      const color = isColorOption(parsed.color) ? parsed.color : "regular";
      const font =
        parsed.font && FONTS.some((f) => f.id === parsed.font)
          ? parsed.font
          : "geist";
      return { font, color };
    }
  } catch {}
  return { font: "geist", color: "regular" };
}

function saveSettings(font: FontOption, color: ColorOption) {
  settingsSnapshot = { font, color };
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ font, color }));
  document.cookie = `site-color=${color}; path=/; max-age=31536000; samesite=lax`;
  settingsListeners.forEach((listener) => listener());
}

function applySettings(font: FontOption, color: ColorOption) {
  const root = document.documentElement;
  const fontConfig = FONTS.find((f) => f.id === font)!;
  const colorConfig = COLORS.find((c) => c.id === color)!;

  root.style.setProperty("--primary-font", fontConfig.variable);
  root.style.setProperty("--theme-bg", colorConfig.bg);
  root.style.setProperty("--primary", colorConfig.primary);
  root.style.setProperty("--foreground", colorConfig.foreground);
}

export const Settings = () => {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const settings = useSyncExternalStore(
    subscribeToSettings,
    getSettingsSnapshot,
    getServerSettingsSnapshot,
  );
  const { font, color } = settings;

  useEffect(() => {
    const saved = loadSettings();
    settingsSnapshot = saved;
    applySettings(saved.font, saved.color);
    settingsListeners.forEach((listener) => listener());
  }, []);

  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const handleFont = (f: FontOption) => {
    applySettings(f, color);
    saveSettings(f, color);
  };

  const handleColor = (c: ColorOption) => {
    applySettings(font, c);
    saveSettings(font, c);
  };

  const colorConfig = COLORS.find((c) => c.id === color)!;

  return (
    <div
      ref={containerRef}
      className="absolute top-3 right-3 z-50 flex flex-col items-end"
    >
      <AnimatePresence mode="wait">
        {!open ? (
          <motion.button
            key="trigger"
            layoutId="settings-container"
            onClick={() => setOpen(true)}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "flex aspect-square size-8 items-center justify-center rounded-lg bg-linear-to-b align-middle ring-1 ring-white/20 ring-offset-2 ring-inset",
              colorConfig.gradientFrom,
              colorConfig.gradientTo,
              colorConfig.ringOffset,
            )}
          >
            <IconSettingsFilled className="size-4 shrink-0 text-white drop-shadow-xl drop-shadow-black/40" />
          </motion.button>
        ) : (
          <motion.div
            key="panel"
            layoutId="settings-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute top-0 right-0 w-52 overflow-hidden rounded-xl border border-white/35 bg-linear-to-br p-2.5 text-white shadow-[0_14px_35px_rgb(0,0,0,0.18)] ring-1 ring-white/35 backdrop-blur-2xl dark:border-white/15 dark:shadow-black/40",
              colorConfig.gradientFrom,
              colorConfig.gradientTo,
            )}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.15 }}
            >
              <div className="mb-4">
                <div className="mb-3 flex items-center justify-between">
                  <div className="sr-only">
                    <p className="text-foreground text-sm font-semibold">
                      Appearance
                    </p>
                    <p className="text-foreground/55 mt-0.5 text-[11px]">
                      Customize your Oneko experience
                    </p>
                  </div>
                  <span className="sr-only">
                    Settings
                  </span>
                </div>
                <p className="sr-only">Font</p>
                <div className="grid grid-cols-3 gap-0.5">
                  {FONTS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      onClick={() => handleFont(f.id)}
                      style={{ fontFamily: f.variable }}
                      className={cn(
                        "flex min-w-0 cursor-pointer items-center justify-center rounded-md border border-white/15 px-1 py-1.5 text-[10px] leading-none font-medium whitespace-nowrap text-white/90 transition-all duration-200 hover:bg-white/15",
                        font === f.id
                          ? "bg-white/25 text-white shadow-sm"
                          : "",
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>
              <DottedSeparator
                className="my-2"
                svgClassName="text-white/70"
              />
              <div>
                <p className="sr-only">Color theme: {colorConfig.label}</p>
                <div className="flex items-center justify-between gap-1 px-0.5">
                  {COLORS.map((c) => (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => handleColor(c.id)}
                      aria-label={`Use ${c.label} color theme`}
                      aria-pressed={color === c.id}
                      className={cn(
                        "group flex size-6 cursor-pointer items-center justify-center rounded-full outline-none transition-all focus:ring-0 focus-visible:ring-1 focus-visible:ring-white focus-visible:ring-offset-0 focus-visible:outline-none",
                        color === c.id
                          ? "ring-1 ring-white"
                          : "hover:scale-110",
                      )}
                    >
                      <div
                        className={cn(
                          "relative size-5 rounded-full border border-white/80 shadow-inner transition-all",
                          c.swatch,
                        )}
                      >
                        {color === c.id ? (
                          <IconCheck className="absolute inset-0 m-auto size-3 text-white drop-shadow-md" />
                        ) : null}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
