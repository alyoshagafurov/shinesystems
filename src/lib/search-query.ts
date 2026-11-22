"use client";

import { useSyncExternalStore } from "react";

/**
 * The catalog search text, shared between the input in the header and the
 * catalog that filters by it.
 */
let query = "";
const listeners = new Set<(q: string) => void>();

export function setSearchQuery(value: string) {
  if (value === query) return;
  query = value;
  listeners.forEach((l) => l(value));
}

export function getSearchQuery() {
  return query;
}

/** Subscribe to changes; returns the unsubscribe function. */
export function onSearchQuery(listener: (q: string) => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function useSearchQuery() {
  return useSyncExternalStore(onSearchQuery, getSearchQuery, () => "");
}
