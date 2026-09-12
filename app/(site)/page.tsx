import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PostCard } from "@/components/post-card";
import { ProductStage } from "@/components/product-stage";
import { site } from "@/lib/site";
import findHunts from "@/public/landing/find-hunts.jpg";
import scoreAnimal from "@/public/landing/score-animal.jpg";
import today from "@/public/landing/today.jpg";
import { getRecentPosts } from "@/sanity/lib/fetch";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyDrawWise />
      <Scoring />
      <HowItWorks />
      <Suspense fallback={null}>
        <LatestPosts />
      </Suspense>
      <NewsletterCta source="landing" />
    </>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">One plan across states, species, and seasons</p>
          <h1>
            Outthink.<span>Outplan.</span>
          </h1>
          <p className="hero-hook">
            Last year’s results tell you what happened. DrawWise helps you decide what
            comes next.
          </p>
          <p className="hero-lead">
            Turn your points, goals, time, budget, experience, and access into one
            strategy built around you—across every state and species you select.
          </p>
          <div className="hero-actions">
            <a className="button button-primary button-arrow" href={site.app.signup}>
              Start your free trial
            </a>
            <a className="button button-outline" href="#product">
              See the actual product
            </a>
          </div>
        </div>

        <ProductStage />
      </div>

      <div className="wrap trust-rail" aria-label="The questions DrawWise answers">
        <div className="trust-list">
          <div className="trust-item">
            <b>Know</b>
            <span>Where you stand across the states and species you care about</span>
          </div>
          <div className="trust-item">
            <b>Do</b>
            <span>Apply, buy a point, wait, skip, or change course</span>
          </div>
          <div className="trust-item">
            <b>When</b>
            <span>This year or later—and the reason why</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WhyDrawWise() {
  return (
    <section className="section decision-section" id="why-drawwise">
      <div className="wrap decision-grid">
        <div className="decision-copy">
          <p className="eyebrow">The difference</p>
          <h2>Your points are not the plan.</h2>
          <p className="decision-statement">
            Points matter. But they cannot tell you which hunt deserves your time, money,
            and next move.
          </p>
          <p className="decision-body">
            DrawWise connects your points with your goals, timing, budget, access,
            experience, and every state and species you select. Then it compares the
            paths and explains what belongs ahead of what.
          </p>

          <div className="decision-list">
            <div className="decision-row">
              <span>01</span>
              <div>
                <strong>Built around your life</strong>
                <p>
                  Your time, budget, ability, access, experience, goals, and point
                  position all change the answer.
                </p>
              </div>
            </div>
            <div className="decision-row">
              <span>02</span>
              <div>
                <strong>Know when to apply. Know when to wait.</strong>
                <p>
                  See the current action—apply, buy a point, wait, skip, or change
                  course—and the reason behind it.
                </p>
              </div>
            </div>
            <div className="decision-row">
              <span>03</span>
              <div>
                <strong>One strategy across states and species</strong>
                <p>
                  Every opportunity is considered against the rest of your annual and
                  multi-year plan.
                </p>
              </div>
            </div>
          </div>
          <p className="filter-hook">
            When everyone uses the same filter, <em>the filter becomes the trap.</em>
          </p>
        </div>

        <div className="decision-visual product-window">
          <span className="window-label">Actual Find Hunts view</span>
          <Image
            src={findHunts}
            sizes="(min-width: 1080px) 55vw, 100vw"
            alt="Actual DrawWise Find Hunts screen showing personalized recommendations, confidence, and evidence gates"
          />
        </div>

        <div className="reasoning-panel" aria-label="How DrawWise explains a recommendation">
          <div className="reasoning-intro">
            <p className="eyebrow">Visible reasoning</p>
            <h3>See how the recommendation was built.</h3>
            <p>
              DrawWise does not hide the decision behind a percentage. It shows the
              information, reasoning, evidence, and next action—so you can question the
              answer before you act on it.
            </p>
          </div>
          <div className="reasoning-points">
            <article className="reasoning-point">
              <span>01 · What it knows</span>
              <strong>Your hunting position</strong>
              <p>Points, residency, priorities, timing, access, budget, experience, and constraints.</p>
            </article>
            <article className="reasoning-point">
              <span>02 · Why this move</span>
              <strong>The reason it ranks here</strong>
              <p>Why this path advances ahead of the alternatives in your plan.</p>
            </article>
            <article className="reasoning-point">
              <span>03 · What could change</span>
              <strong>The assumptions that matter</strong>
              <p>See which missing fact, preference, or official update could move the recommendation.</p>
            </article>
            <article className="reasoning-point">
              <span>04 · What comes next</span>
              <strong>A decision you can act on</strong>
              <p>Apply, buy a point, wait, skip, or change course—with the official source trace attached.</p>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}

function Scoring() {
  return (
    <section className="section scoring-section" id="score-an-animal">
      <div className="wrap scoring-grid">
        <div className="product-window">
          <span className="window-label">Actual scoring tool</span>
          <Image
            src={scoreAnimal}
            sizes="(min-width: 1080px) 55vw, 100vw"
            alt="Actual DrawWise Score an Animal screen showing photo intake and scoring workflow"
          />
        </div>

        <div className="scoring-copy">
          <p className="eyebrow">Available separately or included</p>
          <h2>Score, compare, and save an animal.</h2>
          <p className="scoring-lead">
            Upload up to four angles of the same animal. DrawWise returns a score range,
            shows its confidence, and tells you what would tighten the read—then keeps the
            result with the right hunt or in My Animals.
          </p>
          <div className="score-outputs" aria-label="Scoring outputs">
            <span>Score range</span>
            <span>Age range</span>
            <span>Maturity</span>
            <span>Confidence</span>
          </div>
          <div className="score-pricing" aria-label="Animal scoring purchase options">
            <div className="score-price">
              <strong>$29.99 / year</strong>
              <span>Purchase the animal-scoring tool separately.</span>
            </div>
            <div className="score-price is-included">
              <strong>Included</strong>
              <span>Part of the full $199 DrawWise membership.</span>
            </div>
          </div>
          <div className="scoring-actions">
            <a className="button button-primary button-arrow" href={site.app.signup}>
              Try animal scoring
            </a>
            <a className="button button-outline" href="#membership">
              See full membership
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="section cycle-section" id="how-it-works">
      <div className="wrap">
        <div className="cycle-layout">
          <div className="cycle-copy">
            <p className="eyebrow">One connected plan</p>
            <h2>
              Plan. Execute.
              <br />
              Measure. Adjust.
            </h2>
            <p>
              DrawWise carries the same hunter, priorities, and decisions from planning
              through the draw, the hunt, and the next season. The next action changes as
              the season moves.
            </p>

            <div className="cycle-steps">
              <article className="cycle-step">
                <span className="number">01</span>
                <h3>Plan</h3>
                <p>Build the strategy across the states and species you select.</p>
              </article>
              <article className="cycle-step">
                <span className="number">02</span>
                <h3>Execute</h3>
                <p>Know the next action and the deadline attached to it.</p>
              </article>
              <article className="cycle-step">
                <span className="number">03</span>
                <h3>Measure</h3>
                <p>Record what happened and preserve what the season taught you.</p>
              </article>
              <article className="cycle-step">
                <span className="number">04</span>
                <h3>Adjust</h3>
                <p>Update the plan and see what changes everywhere else.</p>
              </article>
            </div>
          </div>

          <div className="product-window">
            <span className="window-label">Actual Today view</span>
            <Image
              src={today}
              sizes="(min-width: 1080px) 55vw, 100vw"
              alt="Actual DrawWise Today screen showing current hunt mode, scoring access, and the next recommendation"
            />
          </div>
        </div>

        <div className="membership-card" id="membership">
          <div className="membership-main">
            <p className="eyebrow">Full DrawWise membership</p>
            <h3>What to build. What to burn. What to skip.</h3>
            <p>
              Personalized recommendations and one multi-year strategy across the states
              and species you select—with the complete animal-scoring tool included.
            </p>
            <ul className="included-list">
              <li>Personalized Hunter Model</li>
              <li>Find Hunts recommendations</li>
              <li>Annual and multi-year strategy</li>
              <li>DrawWise Advisor</li>
              <li>DrawWatch alerts</li>
              <li>Evidence and source trace</li>
              <li>Hunt workspace and review</li>
              <li>Animal scoring included</li>
            </ul>
          </div>
          <div className="membership-price">
            <span className="label">Annual membership</span>
            <span className="amount">
              <sup>$</sup>199
            </span>
            <span className="term">per year · full planning cycle included</span>
            <a className="button button-dark button-arrow" href={site.app.signup}>
              Start your free trial
            </a>
            <p className="fine">DrawWise informs and recommends. You decide.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

async function LatestPosts() {
  const posts = await getRecentPosts(3);
  if (posts.length === 0) return null;

  return (
    <section className="section decision-section" id="latest">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="section-head">
            <p className="eyebrow">From the blog</p>
            <h2>Field notes.</h2>
          </div>
          <Link href="/blog" className="button button-dark button-arrow">
            All posts
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
