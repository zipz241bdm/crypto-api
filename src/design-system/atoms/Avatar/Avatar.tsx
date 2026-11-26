import { cx } from "../../utils/cx";

export type AvatarSize = "sm" | "md" | "lg";

export interface AvatarProps {
  /** Image source URL. */
  src: string;
  /** Alternative text for the image (empty string for decorative avatars). */
  alt?: string;
  /** Avatar diameter token. */
  size?: AvatarSize;
}

const SIZES: Record<AvatarSize, { className: string; pixels: number }> = {
  sm: { className: "size-6", pixels: 24 },
  md: { className: "size-8", pixels: 32 },
  lg: { className: "size-16", pixels: 64 },
};

export function Avatar({ src, alt = "", size = "md" }: AvatarProps) {
  const { className, pixels } = SIZES[size];
  return (
    <img
      src={src}
      alt={alt}
      width={pixels}
      height={pixels}
      loading="lazy"
      className={cx("shrink-0 rounded-full bg-surface-muted object-cover", className)}
    />
  );
}
