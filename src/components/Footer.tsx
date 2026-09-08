import Link from "next/link";
import { Mail } from "lucide-react";
import { GithubIcon, XTwitterIcon, LinkedinIcon } from "@/components/Icons";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-zinc-200/60 dark:border-zinc-800/60 mt-auto py-10 transition-colors">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
        <div className="flex flex-col sm:flex-row items-center gap-2 text-center sm:text-left">
          <span>© {currentYear} Lean. Todos los derechos reservados.</span>
          <span className="hidden sm:inline">•</span>
          <span className="text-zinc-400 dark:text-zinc-500">Hecho con simplicidad y propósito.</span>
        </div>

        {/* Enlaces a Redes Sociales */}
        <div className="flex items-center gap-4">
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <XTwitterIcon className="w-4 h-4" />
          </a>
          <a
            href="https://github.com/Lean189"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <GithubIcon className="w-4 h-4" />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>
          <Link
            href="/feedback"
            aria-label="Contacto / Feedback"
            className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="Escríbeme"
          >
            <Mail className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
