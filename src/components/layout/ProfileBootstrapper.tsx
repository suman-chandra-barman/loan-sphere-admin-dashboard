"use client";

/**
 * ProfileBootstrapper
 *
 * A lightweight, render-nothing component that fires `useGetMeQuery`
 * as soon as the authenticated admin shell mounts.
 *
 * Why a separate component?
 * - Keeps the layout clean — no query logic leaks into structural components.
 * - RTK Query's `onQueryStarted` in `authApi.getMe` already dispatches
 *   `updateUser`, so the Redux store (and therefore Topbar) will reflect the
 *   latest profile_image, full_name, etc. immediately after the API responds —
 *   even on first login, before the user ever visits the Settings page.
 * - RTK Query deduplicates the request: if other components
 *   also call useGetMeQuery, no second network request is made.
 */

import { useGetMeQuery } from "@/redux/api/authApi";

export default function ProfileBootstrapper() {
  // Skip the query when there is no authenticated session
  // (e.g. during server render or before the Redux store is hydrated).
  useGetMeQuery(undefined);

  // Renders nothing — this component exists purely for its side-effects.
  return null;
}
