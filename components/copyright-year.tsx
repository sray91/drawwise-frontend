import { cacheLife } from "next/cache";

/** Cached so the footer stays in the static shell and refreshes daily. */
export async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
