import { site } from "@/lib/site";
import { NewsletterForm } from "./newsletter-form";

export function NewsletterCta({ source = "landing" }: { source?: string }) {
  return (
    <section className="section newsletter-section" id="newsletter">
      <div className="wrap">
        <div className="newsletter-card">
          <div>
            <p className="eyebrow">{site.newsletter.eyebrow}</p>
            <h2>{site.newsletter.title}</h2>
            <p>{site.newsletter.description}</p>
          </div>
          <div>
            <NewsletterForm source={source} buttonLabel={site.newsletter.cta} />
            <p className="newsletter-fine">{site.newsletter.fine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
