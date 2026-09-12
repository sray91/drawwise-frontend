import Image, { type ImageProps } from "next/image";
import { urlFor } from "@/sanity/lib/image";
import type { SanityImage as SanityImageType } from "@/sanity/lib/types";

type Props = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  image: SanityImageType | null | undefined;
  width: number;
  height: number;
  alt?: string;
};

export function SanityImage({ image, width, height, alt, ...rest }: Props) {
  if (!image?.asset) return null;
  const src = urlFor(image).width(width).height(height).url();
  return (
    <Image
      src={src}
      alt={alt ?? image.alt ?? ""}
      width={width}
      height={height}
      {...rest}
    />
  );
}
