"use client";

import { useRef } from "react";
import { Provider } from "react-redux";

import { makeStore, AppStore } from "@/redux/store";
import type { AuthUser } from "@/types/auth";

/**
 * Read auth tokens from localStorage synchronously so that makeStore
 * receives a preloaded state before the very first render.
 * This prevents RTK Query from firing API calls before the token is available,
 * which would otherwise cause a 401 race condition on hard reload.
 */
function getPreloadedAuth() {
  if (typeof window === "undefined") return undefined;

  try {
    const userRaw = localStorage.getItem("user");
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (userRaw && accessToken && refreshToken) {
      const user: AuthUser = JSON.parse(userRaw);
      return { user, token: accessToken, refreshToken };
    }
  } catch {
    // Ignore malformed storage
  }

  return undefined;
}

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // storeRef is initialised once — synchronously — with the token already set.
  const storeRef = useRef<AppStore | null>(null);

  if (!storeRef.current) {
    storeRef.current = makeStore(getPreloadedAuth());
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
