import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import logoOnDark from "@/public/brand/logo-on-dark.png";
import { CopyrightYear } from "./copyright-year";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-logo">
            <Image src={logoOnDark} alt={site.name} sizes="240px" className="brand-logo" />
          </div>
          <p className="footer-message">
            <strong>
              {site.name}™ · {site.tagline}
            </strong>
            <br />
            {site.patent}
          </p>
          <div className="footer-links">
            {site.footerLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
            <a href={site.app.login}>Sign in</a>
          </div>
        </div>
        <p className="footer-disclaimer">{site.disclaimer}</p>
        <div className="footer-bottom">
          <span>
            © <CopyrightYear /> {site.name}. All rights reserved.
          </span>
          <span>Official evidence. Visible reasoning.</span>
        </div>
      </div>
    </footer>
  );
}
