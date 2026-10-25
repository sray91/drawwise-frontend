import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Hero } from "@/components/landing/hero";
import { Membership } from "@/components/landing/membership";
import { OfferCta } from "@/components/landing/offer-cta";
import { Questions } from "@/components/landing/questions";
import { ReasoningDemo } from "@/components/landing/reasoning-demo";
import { Reveal } from "@/components/landing/reveal";
import { Starter } from "@/components/landing/starter";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PostCard } from "@/components/post-card";
import { site } from "@/lib/site";
import myPlan from "@/public/landing/my-plan.jpg";
import rutCounty from "@/public/landing/rut-county.jpg";
import scoutAntelope from "@/public/landing/scout-antelope.webp";
import waterfowl from "@/public/landing/waterfowl.png";
import { getRecentPosts } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Draw odds, rut timing and buck scores",
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Questions />
      <Points />
      <Scoring />
      <Timing />
      <Plan />
      <Starter />
      <Membership />
      <Suspense fallback={null}>
        <LatestPosts />
      </Suspense>
      <NewsletterCta source="landing" />
    </>
  );
}

const POINT_PAINS = [
  [
    "The line keeps moving.",
    "You had the points for a sure thing and still didn't draw. See where your exact hunt drew out last year, for your residency and pool, and how fast it's creeping.",
  ],
  [
    "Burn them or keep building?",
    "Get a straight answer for your points: apply, hold, or switch hunts. Every answer names the best alternative and what would change it.",
  ],
  [
    "Paying every year with no tag in sight.",
    "See which points are moving you toward a hunt and which ones only get more expensive to hold.",
  ],
] as const;

function Points() {
  return (
    <section className="reasoning-wrap" id="points">
      <div className="section wrap">
        <Reveal className="pain-split">
          <header className="section-head">
            <p className="eyebrow">Preference &amp; bonus points</p>
            <h2>Stuck in no man&rsquo;s land?</h2>
            <p>
              Point creep moves the line every year. Waiting costs money, and burning points
              on the wrong hunt costs years. DrawWise ranks Western tags against your points,
              budget, time, access and the animals you&rsquo;ve already taken, then tells you
              why.
            </p>
          </header>
          <div className="pain-list">
            {POINT_PAINS.map(([title, copy]) => (
              <article key={title} className="pain-row">
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal as="header" className="demo-head">
          <p className="eyebrow">Try it on a real draw</p>
          <h3>Move the points. Watch the answer change.</h3>
          <p>
            This uses the published 2026 Wyoming nonresident regular preference draw for
            antelope Area 001, Type 1. Every number in DrawWise shows its source and date, and
            the state agency&rsquo;s rules always have the final say.
          </p>
        </Reveal>
        <Reveal>
          <ReasoningDemo />
        </Reveal>
      </div>
    </section>
  );
}

const SCORING_POINTS = [
  [
    "One estimate, not a comment thread.",
    "Upload up to four photos of the same animal. Get a gross score range, a maturity read and how he stacks up to your target.",
  ],
  [
    "It says when it can't tell.",
    "If the angle hides a tine, ScoreWise tells you which view it needs instead of guessing.",
  ],
  [
    "Shooter or pass, before the shot.",
    "Compare him with your target and the animals you've already taken, then decide.",
  ],
] as const;

function Scoring() {
  return (
    <section className="scoring-section" id="scoring">
      <div className="section wrap scoring-grid">
        <Reveal className="scoring-copy">
          <p className="eyebrow">ScoreWise photo scoring</p>
          <h2>Ten hunters, ten guesses.</h2>
          <p className="scoring-lede">
            Post a trail-cam buck online and the guesses can run from 115 to 130. Age calls
            swing between 2.5 and 3.5. Photos make him look bigger, the angle hides tines,
            and a wrong call shows up as ground shrinkage.
          </p>
          <div className="scoring-points">
            {SCORING_POINTS.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <div className="section-actions">
            <OfferCta href={site.app.score} label="Score a photo free" />
          </div>
          <p className="scoring-fine">
            Photo scores are estimates, not official measurements.
          </p>
        </Reveal>
        <Reveal className="scoring-visual">
          <Image
            src={scoutAntelope}
            alt="A pronghorn buck standing in sagebrush, photographed by a trail camera"
            fill
            sizes="(min-width: 1080px) 45vw, 100vw"
            className="scoring-photo"
          />
          <p className="scoring-caption">Score him before you decide, not after.</p>
        </Reveal>
      </div>
    </section>
  );
}

function Timing() {
  return (
    <section className="timing-section" id="timing">
      <div className="section wrap">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">Timing &amp; maps</p>
          <h2>Pick the week. Then pick the spot.</h2>
        </Reveal>
        <Reveal className="timing-grid">
          <article className="timing-card" id="rut">
            <div className="timing-pic">
              <Image
                src={rutCounty}
                alt="DrawWise county rut map of Ohio"
                fill
                sizes="(min-width: 1080px) 45vw, 100vw"
              />
            </div>
            <div className="timing-text">
              <p className="eyebrow">Whitetail rut timing</p>
              <h3>Hunt the week that matters in your county.</h3>
              <p>
                Buck movement and peak breeding don&rsquo;t peak on the same days, and one
                statewide date doesn&rsquo;t fit every county. See both windows for the county
                you hunt, then plan your days off around them.
              </p>
            </div>
          </article>
          <article className="timing-card" id="maps">
            <div className="timing-pic is-art">
              <Image src={waterfowl} alt="" fill sizes="(min-width: 1080px) 45vw, 100vw" />
            </div>
            <div className="timing-text">
              <p className="eyebrow">Maps &amp; Time to Hunt</p>
              <h3>Know where to look before you scout.</h3>
              <p>
                Trophy-potential maps show approximate animal size by area. Waterfowl and
                predator layers add the context behind a spot. Time to Hunt points you to the
                best hours once you&rsquo;re there. Coverage varies by state and species.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

const PLAN_FEATURES = [
  ["Every point, every state", "Your points by state and species, kept current in one place."],
  [
    "Deadlines that come to you",
    "Application openings, closings and point-purchase windows, with alerts before they close.",
  ],
  [
    "A plan across years",
    "When to build, when to burn, and which hunts are worth the wait for the years you have left.",
  ],
  [
    "DrawWatch",
    "When a draw result or demand report changes your answer, DrawWatch tells you before the deadline.",
  ],
  [
    "Your hunts, ready to go",
    "A DIY trip, private-land hunt, landowner tag or annual family hunt counts too. DrawWise lines up licenses, regulations, prep and reporting for it.",
  ],
  [
    "Ask why",
    "An AI hunting partner explains any answer. Change an assumption and the plan changes with it.",
  ],
] as const;

function Plan() {
  return (
    <section className="section plan-section" id="plan">
      <div className="wrap plan-grid-layout">
        <Reveal className="plan-copy">
          <p className="eyebrow">Applications &amp; deadlines</p>
          <h2>Retire the spreadsheet.</h2>
          <p>
            If you apply in several states, you know the routine: a spreadsheet, phone alarms,
            a folder per state and a lot of nights reading draw odds. DrawWise keeps all of it
            in one place.
          </p>
          <div className="plan-features">
            {PLAN_FEATURES.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
        </Reveal>
        <Reveal className="product-window">
          <Image
            src={myPlan}
            alt="DrawWise hunting plan with committed hunts and a Wyoming antelope recommendation"
            sizes="(min-width: 1080px) 50vw, 100vw"
          />
        </Reveal>
      </div>
    </section>
  );
}

async function LatestPosts() {
  const posts = await getRecentPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="section posts-section" id="latest">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="section-head">
            <p className="eyebrow">From the blog</p>
            <h2>Field notes.</h2>
          </div>
          <Link href="/blog" className="button button-dark">
            All posts
            <span className="arrow" aria-hidden="true">
              →
            </span>
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
