"use client";

import { useState } from "react";

type Receipt = {
  title: string;
  status: string;
  known: string;
  calculated: string;
  why: string;
  reverse: string;
  next: string;
};

/** Published 2026 Wyoming nonresident regular-preference antelope result, Area 001 Type 1. */
const RECEIPTS: Record<3 | 4 | 5, Receipt> = {
  3: {
    title: "Do not treat Area 001, Type 1 as dependable yet.",
    status: "Clear facts, open decision",
    known:
      "In the 2026 nonresident regular preference draw, 15.9% of applicants at 3 points drew. At 4 points, 100% drew.",
    calculated: "Your 3 points fall below the level that cleared for every applicant.",
    why: "The published result supports uncertainty, not a guaranteed-draw label. The full profile should decide whether to accept that chance, choose an alternative, or build one more point.",
    reverse:
      "A different exact hunt meets your standards at 3 points, or the next draw report lowers the dependable level.",
    next: "Compare the best 3-point alternatives before deciding whether this chance is worth the application.",
  },
  4: {
    title: "Apply for Area 001, Type 1.",
    status: "High confidence",
    known:
      "In the 2026 nonresident regular preference draw, applicants at 4 points drew this hunt at 100%. At 3 points, 15.9% drew.",
    calculated: "Your 4 points clear the level that actually drew.",
    why: "Banking loses here because your balance already clears this hunt and antelope points are inexpensive to rebuild.",
    reverse:
      "The 2027 demand report pushes the 100% level above 4 points, or your profile says this hunt does not fit the animal, access, cost, or experience you want.",
    next: "Save the exact hunt to your plan, compare it with your best alternative, and make the application before the verified deadline.",
  },
  5: {
    title: "Area 001, Type 1 clears. Now prove it is worth using 5 points.",
    status: "Draw position clear",
    known: "The 2026 dependable level was 4 points. Your working balance is one point above it.",
    calculated:
      "Draw position is not the constraint. Trophy fit, access, cost, pressure, and the opportunity cost of spending 5 points now become the decision.",
    why: "A cleared cutoff can establish availability. It cannot establish that this is the best hunt for you.",
    reverse:
      "A better hunt uses the extra point well, or this hunt uniquely fits the experience and animal you want.",
    next: "Compare this hunt against the best use of all 5 points before making it the saved plan.",
  },
};

export function ReasoningDemo() {
  const [points, setPoints] = useState<3 | 4 | 5>(4);
  const receipt = RECEIPTS[points];

  return (
    <div className="reasoning-demo">
      <aside className="profile-card">
        <p className="eyebrow">Working hunter profile</p>
        <h3>Wyoming antelope</h3>
        <p>A nonresident hunter looking for a dependable rifle opportunity.</p>
        <div className="profile-list">
          <div className="profile-row">
            <span>Residency</span>
            <strong>Nonresident</strong>
          </div>
          <div className="profile-row">
            <span>Species</span>
            <strong>Antelope</strong>
          </div>
          <div className="profile-row">
            <span>Pool</span>
            <strong>Regular preference</strong>
          </div>
          <div className="profile-row">
            <span>Candidate</span>
            <strong>Area 001, Type 1</strong>
          </div>
        </div>
        <div className="point-control">
          <label htmlFor="point-slider">
            Preference points <output htmlFor="point-slider">{points}</output>
          </label>
          <input
            id="point-slider"
            type="range"
            min={3}
            max={5}
            step={1}
            value={points}
            onChange={(event) => setPoints(Number(event.target.value) as 3 | 4 | 5)}
          />
          <div className="point-scale" aria-hidden="true">
            <span>3</span>
            <span>4</span>
            <span>5</span>
          </div>
        </div>
      </aside>

      <article className="receipt" aria-live="polite">
        <header className="receipt-head">
          <div>
            <small>DrawWise recommendation</small>
            <h3>{receipt.title}</h3>
          </div>
          <span className="receipt-status">{receipt.status}</span>
        </header>
        <div className="receipt-body">
          <div className="receipt-row">
            <small>What DrawWise knows</small>
            <strong>{receipt.known}</strong>
          </div>
          <div className="receipt-row">
            <small>What it calculated</small>
            <strong>{receipt.calculated}</strong>
          </div>
          <div className="receipt-row">
            <small>Why this action</small>
            <strong>{receipt.why}</strong>
          </div>
          <div className="receipt-row unknown">
            <small>What could change it</small>
            <strong>{receipt.reverse}</strong>
          </div>
          <div className="receipt-next">
            <small>What you do next</small>
            <strong>{receipt.next}</strong>
          </div>
        </div>
      </article>
    </div>
  );
}
