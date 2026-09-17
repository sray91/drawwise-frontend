import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Hero } from "@/components/landing/hero";
import { Membership } from "@/components/landing/membership";
import { OfferCta } from "@/components/landing/offer-cta";
import { ProofStrip } from "@/components/landing/proof-strip";
import { ReasonDialog } from "@/components/landing/reason-dialog";
import { ReasoningDemo } from "@/components/landing/reasoning-demo";
import { Reveal } from "@/components/landing/reveal";
import { Starter } from "@/components/landing/starter";
import { NewsletterCta } from "@/components/newsletter-cta";
import { PostCard } from "@/components/post-card";
import { site } from "@/lib/site";
import huntScope from "@/public/landing/hunt-antelope-scope.webp";
import scoutAntelope from "@/public/landing/scout-antelope.webp";
import { getRecentPosts } from "@/sanity/lib/fetch";

export const metadata: Metadata = {
  title: "Start with what matters this season",
  description: site.description,
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ProofStrip />
      <Starter />
      <HowItStarts />
      <Difference />
      <Reasoning />
      <HuntingYear />
      <HunterModel />
      <Capabilities />
      <Membership />
      <Suspense fallback={null}>
        <LatestPosts />
      </Suspense>
      <NewsletterCta source="landing" />
      <ReasonDialog />
    </>
  );
}

function HowItStarts() {
  return (
    <section className="start-wrap" id="start">
      <div className="section wrap">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">How DrawWise starts</p>
          <h2>Start with the job that matters now.</h2>
          <p>
            The date gives DrawWise a sensible starting point, but it does not assume your
            hunting calendar. Choose the job in front of you and begin with the minimum
            information needed to help.
          </p>
        </Reveal>
        <Reveal className="start-grid">
          <article className="start-step">
            <span className="step-number">01 · Choose</span>
            <h3>Start with what matters now.</h3>
            <div className="first-question" aria-label="Ways to begin with DrawWise">
              <span>Score an animal I am looking at.</span>
              <span>Prepare for a hunt I already have.</span>
              <span>Decide what to do with my points.</span>
            </div>
          </article>
          <article className="start-step">
            <span className="step-number">02 · Answer</span>
            <h3>Tell it only what changes the answer.</h3>
            <p>
              DrawWise begins with the minimum useful facts, such as your state, species,
              points, hunt dates, or target animal. It does not require a complete profile
              before helping.
            </p>
          </article>
          <article className="start-step">
            <span className="step-number">03 · See it free</span>
            <h3>Receive a completed result.</h3>
            <p>
              See what to do, why it fits, when to act, what remains uncertain, the best
              alternative, and what would change the answer.
            </p>
          </article>
          <article className="start-step">
            <span className="step-number">04 · Work it through</span>
            <h3>Question the result for seven days.</h3>
            <p>
              Add context, correct an assumption, compare an alternative, or ask what could
              make the recommendation wrong. The clock starts only after the first completed
              result.
            </p>
          </article>
        </Reveal>
        <Reveal className="profile-grows">
          <div>
            <small>After the seasonal starter</small>
            <h3>See whether one useful result becomes a better hunting relationship.</h3>
          </div>
          <div>
            <p>
              DrawWise builds the Hunter Model through useful work, not one long form.
              Points, hunts, documents, animals, corrections, and outcomes carry forward so
              the next answer starts with more of your hunting life already understood.
            </p>
            <div className="profile-inputs">
              <span>Cross-state portfolio</span>
              <span>Saved plan</span>
              <span>DrawWatch</span>
              <span>Hunt readiness</span>
              <span>Ongoing scoring</span>
              <span>Persistent profile</span>
            </div>
            <OfferCta />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Difference() {
  return (
    <section className="section" id="difference">
      <div className="wrap difference">
        <Reveal className="difference-intro">
          <p className="eyebrow">More than information</p>
          <h2>Your points are not the plan.</h2>
          <p>
            Draw odds, maps, deadlines, and score estimates matter. The real value is knowing
            what they mean together for the hunter you are and the hunt you still want.
          </p>
          <a className="button button-dark" href="#reasoning">
            See how it thinks
            <span className="arrow" aria-hidden="true">
              ↓
            </span>
          </a>
        </Reveal>
        <Reveal className="difference-grid">
          <article className="difference-row">
            <b>01</b>
            <div>
              <h3>It starts with your life, not a generic ranking.</h3>
              <p>
                Your points, residency, prior animals, target class, available years, budget,
                access, ability, and hunting style shape the answer.
              </p>
            </div>
          </article>
          <article className="difference-row">
            <b>02</b>
            <div>
              <h3>It works across states and species.</h3>
              <p>
                Every opportunity competes for the same time, money, physical capacity, and
                calendar. DrawWise treats the whole position as one portfolio.
              </p>
            </div>
          </article>
          <article className="difference-row">
            <b>03</b>
            <div>
              <h3>It recommends an action.</h3>
              <p>
                Apply, hold, use the points, buy access, choose the random draw, find a
                lower-point hunt, or stop buying. Then it tells you why.
              </p>
            </div>
          </article>
          <article className="difference-row">
            <b>04</b>
            <div>
              <h3>It stays open to being challenged.</h3>
              <p>
                You see what is known, calculated, inferred, and still missing. Change an
                assumption and the plan should change with it.
              </p>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function Reasoning() {
  return (
    <section className="reasoning-wrap" id="reasoning">
      <div className="section wrap">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">A real recommendation, not a score alone</p>
          <h2>See exactly how the answer changes.</h2>
          <p>
            This published Wyoming example uses the 2026 nonresident regular preference draw.
            Move the hunter&rsquo;s point position and watch the decision language change.
          </p>
        </Reveal>
        <Reveal>
          <ReasoningDemo />
        </Reveal>
      </div>
    </section>
  );
}

function HuntingYear() {
  return (
    <section className="year-section" id="year">
      <div className="section wrap">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">One partner through a continuous hunting year</p>
          <h2>What leads changes. Your hunting life stays connected.</h2>
          <p>
            Hunting, learning, applying, scouting, and preparation overlap. DrawWise advances
            the work that matters now without pretending the rest of your year has stopped.
          </p>
        </Reveal>
        <Reveal className="year-grid">
          <article className="year-card">
            <span className="year-num">01 · Late season + early applications</span>
            <h3>Finish, learn, and make the first decisions.</h3>
            <p>
              Keep hunting where seasons remain open, record outcomes, update the plan, and
              act on early deadlines.
            </p>
          </article>
          <article className="year-card">
            <span className="year-num">02 · Main application season</span>
            <h3>Decide what deserves the year ahead.</h3>
            <p>
              Compare states, species, points, likely waits, fit, cost, and opportunity cost
              before each window closes.
            </p>
          </article>
          <article className="year-card photo">
            <Image
              src={scoutAntelope}
              alt=""
              fill
              sizes="(min-width: 1080px) 25vw, (min-width: 650px) 50vw, 100vw"
              className="year-photo"
            />
            <span className="year-num">03 · Early hunts + scout + prep</span>
            <h3>Find animals and make the hunt ready.</h3>
            <p>
              Connect trail-camera evidence, access, licenses, regulations, equipment,
              logistics, and hunts already underway.
            </p>
          </article>
          <article className="year-card photo">
            <Image
              src={huntScope}
              alt=""
              fill
              sizes="(min-width: 1080px) 25vw, (min-width: 650px) 50vw, 100vw"
              className="year-photo"
            />
            <span className="year-num">04 · Main hunt + harvest</span>
            <h3>Know what matters in the field.</h3>
            <p>
              Evaluate animals, respond to changing conditions, record the harvest, and carry
              the outcome forward.
            </p>
          </article>
        </Reveal>
        <Reveal className="year-note">
          <article>
            <strong>A committed hunt counts even when no draw created it.</strong>
            <p>
              Add a DIY trip, private-land hunt, landowner tag, or annual family hunt. DrawWise
              reasons forward to licenses, tags, preparation, and reporting.
            </p>
          </article>
          <article>
            <strong>Every outcome improves the next answer.</strong>
            <p>
              Applications, photos, sightings, harvests, corrections, and actual scores become
              part of the relationship instead of isolated records.
            </p>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

function HunterModel() {
  return (
    <section className="section" id="profile">
      <div className="wrap">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">Personal because the inputs are personal</p>
          <h2>DrawWise learns the hunting life behind the points.</h2>
          <p>
            The profile is not paperwork. It is the living model that decides which
            opportunities fit, which questions matter, and which recommendations deserve the
            top of Today.
          </p>
        </Reveal>
        <Reveal className="profile-model">
          <div className="model-visual">
            <Image
              src={scoutAntelope}
              alt="A pronghorn buck standing in sagebrush, photographed by a trail camera"
              fill
              sizes="(min-width: 1080px) 50vw, 100vw"
              className="model-photo"
            />
            <div className="model-caption">
              <small>The animal decision</small>
              <h3>
                &ldquo;Is this the animal I came here to find?&rdquo; is more useful than a
                number alone.
              </h3>
            </div>
          </div>
          <div className="model-facts">
            <article className="model-fact">
              <small>Your position</small>
              <strong>Points, residency, and exact hunt codes</strong>
              <p>Know where you stand without confusing a prior cutoff with a guarantee.</p>
            </article>
            <article className="model-fact">
              <small>Your standard</small>
              <strong>Target animal and animals already taken</strong>
              <p>A merely available hunt is not automatically worth pursuing.</p>
            </article>
            <article className="model-fact">
              <small>Your constraints</small>
              <strong>Time, budget, ability, access, and pressure</strong>
              <p>The best hunt on paper may still be the wrong use of your year.</p>
            </article>
            <article className="model-fact">
              <small>Your commitments</small>
              <strong>Hunts, partners, dates, licenses, and tags</strong>
              <p>DrawWise should know what must be true before you leave.</p>
            </article>
            <article className="model-fact">
              <small>Your field evidence</small>
              <strong>Photos, animals, sightings, and ground knowledge</strong>
              <p>Scouting and scoring sharpen the hunt and the next strategy.</p>
            </article>
            <article className="model-fact">
              <small>Your judgment</small>
              <strong>Corrections, tradeoffs, decisions, and outcomes</strong>
              <p>The hunter remains the authority. DrawWise carries the work.</p>
            </article>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const CAPABILITIES = [
  ["01", "Today", "A ranked answer to what you need to know, what to do, and when to do it."],
  ["02", "My Hunting Plan", "One portfolio for points, applications, committed hunts, opportunity cost, and remaining hunting years."],
  ["03", "Find Hunts + Draw Position", "Thousands of hunts ranked against your fit, with pools, cutoffs, creep, access, and working what-if controls."],
  ["04", "Decision Receipts + DrawWatch", "The reasoning behind each consequential action, plus the changes that can reopen it."],
  ["05", "My Hunts + Calendar", "Turn tags and committed trips into license, regulation, preparation, deadline, and reporting readiness."],
  ["06", "Score Wise + Animal History", "Photo-based score, age, identity, confidence, target fit, and the next view needed."],
  ["07", "Maps + Conditions", "Open the map around the active decision, with access, boundaries, weather, and local field evidence in context."],
  ["08", "Evidence + Sources", "See source dates, confidence, missing evidence, and where agency regulations remain the authority."],
  ["DW", "Ask DrawWise", "Challenge the recommendation, add what you know, change an assumption, and keep reasoning with the same partner."],
] as const;

function Capabilities() {
  return (
    <section className="capabilities" id="included">
      <div className="section wrap">
        <Reveal as="header" className="section-head">
          <p className="eyebrow">The existing tools, working as one system</p>
          <h2>Everything supports the next decision.</h2>
          <p>
            DrawWise keeps the depth serious hunters expect, but the hunter should not have
            to visit every tool to assemble the answer.
          </p>
        </Reveal>
        <Reveal className="cap-grid">
          {CAPABILITIES.map(([icon, title, copy]) => (
            <article key={title} className="cap-card">
              <span className="cap-icon" aria-hidden="true">
                {icon}
              </span>
              <h3>{title}</h3>
              <p>{copy}</p>
            </article>
          ))}
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
