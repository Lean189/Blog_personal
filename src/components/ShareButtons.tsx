"use client";

import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icons";

interface ShareButtonsProps {
  title: string;
  slug: string;
}

export function ShareButtons({ title, slug }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.origin}/blog/${slug}`;
    }
    return `https://tu-blog.com/blog/${slug}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareTwitter = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(`"${title}" vía Lean`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareWhatsApp = () => {
    const url = encodeURIComponent(getUrl());
    const text = encodeURIComponent(`Te comparto esta lectura: "${title}" ${getUrl()}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  const shareLinkedIn = () => {
    const url = encodeURIComponent(getUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  return (
    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 text-xs">
      <span className="font-medium mr-1">Compartir:</span>
      <button
        onClick={shareWhatsApp}
        type="button"
        title="Compartir en WhatsApp"
        aria-label="Compartir en WhatsApp"
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        <WhatsAppIcon className="w-3.5 h-3.5" />
        <span>WhatsApp</span>
      </button>

      <button
        onClick={handleCopy}
        type="button"
        title="Copiar enlace"
        aria-label="Copiar enlace"
        className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-500 font-medium">Copiado</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5" />
            <span>Copiar link</span>
          </>
        )}
      </button>
    </div>
  );
}
