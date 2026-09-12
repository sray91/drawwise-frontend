import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-top flex min-h-screen flex-col items-center justify-center bg-forest px-6 py-32 text-center text-offwhite">
      <p className="eyebrow">404</p>
      <h1 className="font-display text-[clamp(3.4rem,8vw,7rem)] font-extrabold uppercase leading-[.85] tracking-[-.03em]">
        Off the map.
      </h1>
      <p className="mt-6 max-w-md text-offwhite/65">
        The page you&apos;re looking for doesn&apos;t exist or may have moved.
      </p>
      <Link href="/" className="button button-primary button-arrow mt-8">
        Back home
      </Link>
    </main>
  );
}
