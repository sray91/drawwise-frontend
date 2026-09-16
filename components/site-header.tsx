"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import logoOnDark from "@/public/brand/logo-on-dark.png";
import { OfferCta } from "./landing/offer-cta";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("nav-open", open);
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("nav-open");
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header className="site-header">
      <div className="wrap header-inner">
        <Link className="brand" href="/" onClick={close}>
          <Image src={logoOnDark} alt={site.name} priority sizes="262px" className="brand-logo" />
        </Link>
        <nav
          className={`nav${open ? " is-open" : ""}`}
          id="site-nav"
          aria-label="Primary navigation"
        >
          {site.nav.map((item) => (
            <Link key={item.href} href={item.href} onClick={close}>
              {item.label}
            </Link>
          ))}
          <a className="sign-in nav-sign-in" href={site.app.signin} onClick={close}>
            Sign in
          </a>
          <OfferCta className="mobile-cta" onClick={close} />
        </nav>
        <div className="header-actions">
          <a className="sign-in" href={site.app.signin}>
            Sign in
          </a>
          <OfferCta />
        </div>
        <button
          className="menu-toggle"
          type="button"
          aria-controls="site-nav"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>
    </header>
  );
}
