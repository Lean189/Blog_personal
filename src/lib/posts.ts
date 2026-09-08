import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import { Post, PostMetadata } from "@/types/post";

const postsDirectory = path.join(process.cwd(), "content", "posts");

/**
 * Calcula el tiempo estimado de lectura en español
 */
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${minutes} min de lectura`;
}

/**
 * Formatea una fecha ISO a formato legible en español
 * Ejemplo: "2026-09-05" -> "5 de septiembre, 2026"
 */
export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const parts = dateString.split("-");
  if (parts.length !== 3) return dateString;

  const [year, month, day] = parts;
  const monthIndex = parseInt(month, 10) - 1;

  const months = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  const parsedDay = parseInt(day, 10);
  return `${parsedDay} de ${months[monthIndex] || month}, ${year}`;
}

/**
 * Obtiene todos los artículos ordenados por fecha descendente
 */
export function getAllPosts(): (PostMetadata & { slug: string })[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");

      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title || slug,
        date: data.date || new Date().toISOString().split("T")[0],
        summary: data.summary || "",
        tags: data.tags || [],
        author: data.author || "Lean",
        readingTime: calculateReadingTime(content),
      };
    });

  // Ordenar por fecha descendente
  return allPosts.sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Obtiene todos los slugs de los posts (útil para generateStaticParams)
 */
export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => fileName.replace(/\.md$/, ""));
}

/**
 * Obtiene el contenido completo y parseado a HTML de un artículo específico
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);

  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  // Convertir Markdown a HTML
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  return {
    slug,
    title: data.title || slug,
    date: data.date || new Date().toISOString().split("T")[0],
    summary: data.summary || "",
    tags: data.tags || [],
    author: data.author || "Lean",
    readingTime: calculateReadingTime(content),
    content,
    htmlContent,
  };
}
