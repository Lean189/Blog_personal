import Link from "next/link";
import { Mail } from "lucide-react";
import { InstagramIcon } from "@/components/Icons";

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

        {/* Enlaces a Instagram y Feedback */}
        <div className="flex items-center gap-4">
          <a
            href="https://www.instagram.com/leandro.orsenigo/?hl=es-la"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="Instagram @leandro.orsenigo"
          >
            <InstagramIcon className="w-4 h-4" />
            <span className="font-medium">Instagram</span>
          </a>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <Link
            href="/feedback"
            className="flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            title="Enviar feedback"
          >
            <Mail className="w-4 h-4" />
            <span className="font-medium">Feedback</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}

