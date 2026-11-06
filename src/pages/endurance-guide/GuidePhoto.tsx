import { ArrowUpRight } from "lucide-react";

export type GuidePhotoProps = {
  src: string;
  alt: string;
  caption?: string;
  sourceUrl?: string;
  sourceLabel?: string;
  priority?: boolean;
};

export function GuidePhoto({
  src,
  alt,
  caption,
  sourceUrl,
  sourceLabel,
  priority,
}: GuidePhotoProps) {
  return (
    <figure className="guide-photo">
      <img
        src={src}
        alt={alt}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
      {(caption || sourceUrl) && (
        <figcaption>
          {caption}
          {sourceUrl && (
            <a href={sourceUrl} target="_blank" rel="noopener noreferrer">
              {sourceLabel ?? "View source"}
              <ArrowUpRight size={12} />
            </a>
          )}
        </figcaption>
      )}
    </figure>
  );
}
