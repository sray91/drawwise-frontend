"use client";

import { useOffer } from "./offer-context";

export function ProofStrip() {
  const { offer } = useOffer();

  return (
    <section className="proof-strip" aria-label="Current beta capabilities">
      <div className="wrap proof-strip-inner">
        <div className="proof-item">
          <strong>{offer.proofTitle}</strong>
          <span>{offer.proofCopy}</span>
        </div>
        <div className="proof-item">
          <strong>One Hunter Model</strong>
          <span>points, targets, constraints, hunts, and outcomes</span>
        </div>
        <div className="proof-item">
          <strong>Reasoning receipts</strong>
          <span>evidence, uncertainty, alternatives, and reversals</span>
        </div>
        <div className="proof-item">
          <strong>7 days to test it</strong>
          <span>the clock begins with your first completed result</span>
        </div>
      </div>
    </section>
  );
}
