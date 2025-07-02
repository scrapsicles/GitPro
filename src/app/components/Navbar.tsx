"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "../../components/modern-ui/resizable-Navbar";
import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { useTheme } from "next-themes";
import { Moon, Sun, Star } from "lucide-react";
export function NavbarMain() {
  const navItems = [
    {
      name: "Connect",
      link: "#connect",
    },
    {
      name: "How It Works",
      link: "#howitworks",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Benefits",
      link: "#benefits",
    },
    {
      name: "About",
      link: "#about",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const handleThemeToggle = (): void => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  const handleStarRepo = () => {
    window.open("https://github.com/vastavikadi/GitPro", "_blank");
  };
  return (
    <div className="relative w-full">
      <Navbar>
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThemeToggle}
              className="w-full relative group p-3 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-black/20"
              aria-label="Toggle theme"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              {theme === "dark" ? (
                <span className="relative z-10 flex items-center justify-center gap-2 text-slate-800 dark:text-white font-medium">
                  <Sun className="h-5 w-5 text-amber-500" />
                </span>
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2 text-slate-800 dark:text-white font-medium">
                  <Moon className="h-5 w-5 text-slate-600" />
                </span>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStarRepo}
              className="w-full relative group p-3 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-black/20"
              aria-label="Star GitPro on GitHub"
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 dark:from-purple-400/20 dark:to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <span className="relative z-10 flex items-center justify-center gap-2 text-slate-800 dark:text-white font-medium">
                <Star className="h-5 w-5 text-yellow-500" />
                GitPro
              </span>
            </motion.button>
          </div>
        </NavBody>

        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleThemeToggle}
                className="w-full relative group p-3 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-black/20"
                aria-label="Toggle theme"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400/20 to-orange-400/20 dark:from-blue-400/20 dark:to-purple-400/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {theme === "dark" ? (
                  <span className="relative z-10 flex items-center justify-center gap-2 text-slate-800 dark:text-white font-medium">
                    <Sun className="h-5 w-5 text-amber-500" />
                    Light
                  </span>
                ) : (
                  <span className="relative z-10 flex items-center justify-center gap-2 text-slate-800 dark:text-white font-medium">
                    <Moon className="h-5 w-5 text-slate-600" />
                    Dark
                  </span>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStarRepo}
                className="w-full relative group p-3 rounded-full bg-white/60 dark:bg-slate-800/60 backdrop-blur-md border border-white/20 dark:border-slate-700/30 hover:bg-white/80 dark:hover:bg-slate-800/80 transition-all duration-300 shadow-lg shadow-black/5 dark:shadow-black/20"
                aria-label="Star GitPro on GitHub"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400/20 to-amber-500/20 dark:from-purple-400/20 dark:to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative z-10 flex items-center justify-center gap-2 text-slate-800 dark:text-white font-medium">
                  <Star className="h-5 w-5 text-yellow-500" />
                  Star GitPro
                </span>
              </motion.button>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}
