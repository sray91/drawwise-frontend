import { cacheLife } from "next/cache";
import { OfferProvider } from "@/components/landing/offer-context";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { automaticSeason } from "@/lib/offers";

/** Cached so the seasonal default stays in the static shell and refreshes daily. */
async function getAutomaticSeason() {
  "use cache";
  cacheLife("days");
  return automaticSeason(new Date().getMonth());
}

export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const season = await getAutomaticSeason();

  return (
    <OfferProvider initialSeason={season}>
      <a className="skip-link" href="#main">
        Skip to main content
      </a>
      <SiteHeader />
      <main id="main">{children}</main>
      <SiteFooter />
    </OfferProvider>
  );
}
