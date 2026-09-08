import Link from "next/link";
import { Clock, Calendar, ArrowUpRight } from "lucide-react";
import { formatDate } from "@/lib/posts";
import { PostMetadata } from "@/types/post";

interface PostCardProps {
  post: PostMetadata & { slug: string };
}

export function PostCard({ post }: PostCardProps) {
  const formattedDate = formatDate(post.date);

  return (
    <article className="group relative py-6 border-b border-zinc-100 dark:border-zinc-800/80 last:border-b-0 transition-all">
      <Link href={`/blog/${post.slug}`} className="block focus:outline-none">
        {/* Metadatos superiores: Fecha y tiempo de lectura */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-zinc-500 dark:text-zinc-400 mb-2">
          <time dateTime={post.date} className="flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formattedDate}</span>
          </time>
          <span>•</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{post.readingTime || "3 min de lectura"}</span>
          </span>
        </div>

        {/* Título con micro-interacción */}
        <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-600 dark:group-hover:text-zinc-300 transition-colors flex items-baseline justify-between gap-2">
          <span>{post.title}</span>
          <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all text-zinc-400 dark:text-zinc-500 shrink-0" />
        </h2>

        {/* Resumen */}
        <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 line-clamp-2">
          {post.summary}
        </p>

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="mt-3.5 flex flex-wrap gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-medium tracking-wide uppercase px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800/70 text-zinc-600 dark:text-zinc-400 border border-zinc-200/50 dark:border-zinc-700/40"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Link>
    </article>
  );
}
