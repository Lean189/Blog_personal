import { getAllPosts } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HomePage() {
  const posts = getAllPosts();

  return (
    <div className="space-y-12 sm:space-y-16">
      {/* Cabecera / Bio Hero */}
      <section className="space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-xs font-medium border border-zinc-200/60 dark:border-zinc-700/60">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          <span>Notas personales & reflexiones</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 font-serif">
          Hola, soy Lean.
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-2xl">
          Un espacio personal donde escribo sobre lo que pienso, lo que siento y las cosas que voy aprendiendo en el camino. Sin algoritmos, sin prisas y lejos del ruido de las redes.
        </p>

        <div className="pt-2 flex items-center gap-4 text-sm font-medium">
          <Link
            href="/acerca-de"
            className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 hover:underline underline-offset-4"
          >
            <span>Conoce más acerca de mí</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <Link
            href="/feedback"
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
          >
            Dejar un comentario
          </Link>
        </div>
      </section>

      {/* Listado de Artículos */}
      <section className="space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-200/80 dark:border-zinc-800">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Escritos recientes
          </h2>
          <span className="text-xs text-zinc-400 dark:text-zinc-500">
            {posts.length} {posts.length === 1 ? "artículo" : "artículos"}
          </span>
        </div>

        <div className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}
