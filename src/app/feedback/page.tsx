import { FeedbackForm } from "@/components/FeedbackForm";
import { MessageSquare, ShieldCheck, Mail, Sparkles } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feedback y Contacto",
  description: "Envía tus comentarios, sugerencias o impresiones directamente a mi correo de forma 100% privada.",
};

export default function FeedbackPage() {
  return (
    <div className="space-y-10 sm:space-y-12">
      {/* Encabezado */}
      <header className="space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Buzón Privado</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-zinc-50 font-serif tracking-tight">
          Feedback & Contacto
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          ¿Tienes alguna sugerencia para un artículo, encontraste una errata o simplemente quieres compartir tu perspectiva? Me encantaría leerte.
        </p>
      </header>

      {/* Tarjetas de tranquilidad / Privacidad */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
          <ShieldCheck className="w-5 h-5 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">100% Privado</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Tus comentarios no se publican en el blog. Llegan exclusivamente a mi casilla de correo personal.
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30">
          <Mail className="w-5 h-5 text-zinc-700 dark:text-zinc-300 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h2 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">Respuesta garantizada</h2>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Si dejas tu dirección de email, te responderé personalmente a la brevedad.
            </p>
          </div>
        </div>
      </div>

      {/* Formulario */}
      <div className="p-6 sm:p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950/40 shadow-xs">
        <div className="flex items-center gap-2 mb-6 text-zinc-900 dark:text-zinc-100 font-semibold text-sm">
          <MessageSquare className="w-4 h-4 text-zinc-500" />
          <span>Escribe tu mensaje</span>
        </div>
        <FeedbackForm />
      </div>
    </div>
  );
}
