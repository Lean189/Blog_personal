import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acerca de mí",
  description: "Un rincón personal donde escribo sobre lo que pienso, siento y voy viviendo.",
};

export default function AboutPage() {
  return (
    <div className="space-y-10 sm:space-y-12 max-w-2xl">
      {/* Encabezado simple */}
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 font-serif tracking-tight">
          Acerca de mí
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
          Un espacio propio para ordenar lo que pienso y siento.
        </p>
      </header>

      {/* Texto personal y sincero */}
      <div className="space-y-6 text-base sm:text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
        <p>
          Hola, soy <strong>Lean</strong>.
        </p>

        <p>
          Creé este blog simplemente como un hobby. Un lugar donde sentarme a escribir sobre lo que voy pensando, lo que siento.
        </p>

        <p>
          No busco dar lecciones de nada ni tener verdades absolutas. Escribir es mi forma de bajar un cambio, hacer una pausa entre tanto ruido y mirar con un poco más de claridad lo que me pasa por dentro y a mi alrededor.
        </p>

        <p>
          Cuento mi proceso,mi avance con la psicologia y mis pensamientos mas intimos. No es profesional,ni tiene un gran formato pero es lo que me sale.
        </p>

        <p>
          Si alguna de estas lecturas te acompaña un ratito, te hace reflexionar o te resuena de alguna forma, para mí ya tiene sentido haberla compartido.
        </p>
      </div>

      {/* Despedida y enlace a feedback */}
      <div className="pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 space-y-4">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Si en algún momento te dan ganas de decirme algo, compartir tu perspectiva o simplemente saludar:
        </p>

        <Link
          href="/feedback"
          className="inline-flex items-center gap-2 text-sm font-medium text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4 group"
        >
          <span>Escríbeme por el buzón privado</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
