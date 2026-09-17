"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import { OfferCta } from "./offer-cta";
import { useOffer } from "./offer-context";

/** "See how DrawWise reasons" modal. Content follows the active season. */
export function ReasonDialog() {
  const { offer, reasonOpen, closeReason } = useOffer();
  const ref = useRef<HTMLDialogElement>(null);
  const { dialog } = offer;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reasonOpen && !el.open) el.showModal();
    if (!reasonOpen && el.open) el.close();
  }, [reasonOpen]);

  // Clicks on the backdrop land on the <dialog> itself, outside its box.
  const onBackdropClick = (event: MouseEvent<HTMLDialogElement>) => {
    if (event.target !== ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const inside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!inside) closeReason();
  };

  return (
    <dialog
      ref={ref}
      className="reason-dialog"
      aria-labelledby="reason-dialog-title"
      onClose={closeReason}
      onClick={onBackdropClick}
    >
      <div className="dialog-head">
        <div>
          <p className="eyebrow">{dialog.eyebrow}</p>
          <h2 id="reason-dialog-title">{dialog.title}</h2>
        </div>
        <button
          className="dialog-close"
          type="button"
          aria-label="Close recommendation"
          onClick={closeReason}
        >
          ×
        </button>
      </div>
      <div className="dialog-body">
        {dialog.rows.map(([label, copy]) => (
          <div key={label} className="dialog-row">
            <small>{label}</small>
            <p>{copy}</p>
          </div>
        ))}
        <div className="dialog-cta">
          <OfferCta onClick={closeReason} />
          <button className="button button-paper" type="button" onClick={closeReason}>
            Keep exploring
          </button>
        </div>
      </div>
    </dialog>
  );
}
