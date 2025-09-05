"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";

const links = [
  { href: "/", label: "Home" },
  { href: "/job-board", label: "Job Board" },
  { href: "/interview-questions", label: "Interview Qs" },
  { href: "/companies", label: "Companies" },
  { href: "/hotlist", label: "Hotlist" },
  { href: "/guides", label: "Guides" },
  { href: "/careers", label: "Work with Us" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("theme");
      if (stored) {
        document.documentElement.classList.toggle("dark", stored === "dark");
        setDark(stored === "dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = dark ? "light" : "dark";
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setDark(!dark);
  };

  return (
    <nav className="fixed top-0 inset-x-0 h-16 bg-white/90 dark:bg-gray-900/90 backdrop-blur border-b z-50">
      <div className="container-app h-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="AeronyxTech logo" width={32} height={32} priority />
          <span className="font-semibold text-lg dark:text-white">AeronyxTech</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          {links.map(l => <Link key={l.href} className="hover:text-brand-600 dark:hover:text-brand-400 dark:text-gray-200" href={l.href}>{l.label}</Link>)}
        </div>
        <div className="flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg border dark:border-gray-700" aria-label="Toggle theme">
            {dark ? <Sun className="h-5 w-5 text-yellow-400" /> : <Moon className="h-5 w-5 text-gray-700" />}
          </button>
          <button className="md:hidden p-2 rounded-lg border dark:border-gray-700" onClick={() => setOpen(v => !v)} aria-label="Toggle menu">
            <Menu className="h-5 w-5 dark:text-white" />
          </button>
        </div>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white dark:bg-gray-900 dark:border-gray-700">
          <div className="container-app py-3 grid gap-3">
            {links.map(l => <Link key={l.href} className="py-1 dark:text-gray-200" href={l.href}>{l.label}</Link>)}
          </div>
        </div>
      )}
    </nav>
  );
}
