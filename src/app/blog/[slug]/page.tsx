import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, MessageSquareQuote } from "lucide-react";
import { getPostBySlug, getAllPostSlugs, formatDate } from "@/lib/posts";
import { ReadingProgressBar } from "@/components/ReadingProgressBar";
import { ShareButtons } from "@/components/ShareButtons";
import type { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Artículo no encontrado",
    };
  }

  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      type: "article",
      publishedTime: post.date,
      authors: [post.author || "Lean"],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const formattedDate = formatDate(post.date);

  return (
    <div className="space-y-10">
      {/* Barra de progreso de lectura superior */}
      <ReadingProgressBar />

      {/* Botón Volver */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors group"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          <span>Volver a todos los artículos</span>
        </Link>
      </div>

      {/* Encabezado del Artículo */}
      <header className="space-y-4 pb-6 border-b border-zinc-200/80 dark:border-zinc-800/80">
        {/* Metadatos: fecha y tiempo */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
          <span className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <time dateTime={post.date}>{formattedDate}</time>
          </span>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime}</span>
          </span>
          {post.author && (
            <>
              <span>•</span>
              <span>Por {post.author}</span>
            </>
          )}
        </div>

        {/* Título principal */}
        <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-zinc-900 dark:text-zinc-50 font-serif leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Resumen / Subtítulo */}
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
          {post.summary}
        </p>

        {/* Tags y Compartir */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-1.5">
            {post.tags?.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium tracking-wide uppercase px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/50"
              >
                {tag}
              </span>
            ))}
          </div>

          <ShareButtons title={post.title} slug={post.slug} />
        </div>
      </header>

      {/* Cuerpo del Artículo (Estilo Medium / Substack) */}
      <article
        className="prose prose-zinc dark:prose-invert max-w-none 
          prose-headings:font-serif prose-headings:font-semibold prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
          prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[17px] prose-p:leading-[1.8] prose-p:text-zinc-700 dark:prose-p:text-zinc-300
          prose-li:text-[16px] prose-li:leading-[1.7]
          prose-blockquote:border-l-2 prose-blockquote:border-zinc-900 dark:prose-blockquote:border-zinc-100 prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-zinc-800 dark:prose-blockquote:text-zinc-200
          prose-code:bg-zinc-100 dark:prose-code:bg-zinc-800/60 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-[0.9em] prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-zinc-900 dark:prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800 prose-pre:rounded-xl"
        dangerouslySetInnerHTML={{ __html: post.htmlContent || "" }}
      />

      {/* Bloque inferior: Feedback y reflexión */}
      <div className="mt-14 pt-8 border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="rounded-2xl p-6 bg-zinc-50 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2 text-sm">
              <MessageSquareQuote className="w-4 h-4 text-zinc-500" />
              ¿Qué opinas sobre este tema?
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Tus reflexiones, correcciones o sugerencias son bienvenidas y llegan directo a mi correo.
            </p>
          </div>

          <Link
            href="/feedback"
            className="shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-medium hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-xs"
          >
            Dejar feedback privado
          </Link>
        </div>
      </div>
    </div>
  );
}
