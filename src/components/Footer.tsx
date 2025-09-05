import { Github, Linkedin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t bg-white dark:bg-gray-900 dark:border-gray-700">
      <div className="container-app py-8 text-sm text-gray-500 dark:text-gray-400 flex flex-col sm:flex-row items-center justify-between gap-3">
        <p>© {new Date().getFullYear()} AeronyxTech. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <a href="/privacy" className="hover:underline">Privacy Policy</a>
          <a href="/terms" className="hover:underline">Terms</a>
          <a href="https://github.com" target="_blank"><Github className="h-4 w-4"/></a>
          <a href="https://linkedin.com" target="_blank"><Linkedin className="h-4 w-4"/></a>
        </div>
      </div>
    </footer>
  );
}
