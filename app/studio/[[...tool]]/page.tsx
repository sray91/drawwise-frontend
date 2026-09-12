import Image from "next/image";
import { NextStudio } from "next-sanity/studio";
import config from "../../../sanity.config";
import { isSanityConfigured } from "../../../sanity/env";
import logoOnLight from "../../../public/brand/logo-on-light.png";

export { metadata, viewport } from "next-sanity/studio";

export default function StudioPage() {
  if (!isSanityConfigured) {
    // Inline styles on purpose: Sanity's stylesheet loads on this route and
    // overrides utility classes.
    return (
      <main
        style={{
          maxWidth: 560,
          minHeight: "100vh",
          margin: "0 auto",
          padding: "96px 24px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 16,
          color: "#1e211e",
          fontFamily: "var(--font-inter), Arial, sans-serif",
        }}
      >
        <Image src={logoOnLight} alt="DrawWise" sizes="240px" style={{ width: 240, height: "auto" }} />
        <h1 style={{ margin: "8px 0 0", fontSize: 24, fontWeight: 600 }}>
          Sanity Studio isn&apos;t configured yet
        </h1>
        <p style={{ margin: 0, color: "#666a64", lineHeight: 1.6 }}>
          The env var <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code> is missing. Install the
          Sanity integration on Vercel, then run:
        </p>
        <pre
          style={{
            margin: 0,
            padding: 16,
            borderRadius: 6,
            color: "#fffdf7",
            background: "#0b1712",
            fontSize: 14,
            overflowX: "auto",
          }}
        >
          vercel integration add sanity/project{"\n"}vercel env pull
        </pre>
        <p style={{ margin: 0, color: "#666a64", fontSize: 14 }}>Restart the dev server afterwards.</p>
      </main>
    );
  }
  return <NextStudio config={config} />;
}
