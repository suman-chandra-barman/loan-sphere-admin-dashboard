import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/redux/slices/authSlice";
import { baseApi } from "@/redux/api/baseApi";
import type { AuthUser } from "@/types/auth";

interface PreloadedAuthState {
  user: AuthUser | null;
  token: string | null;
  refreshToken: string | null;
}

export const makeStore = (preloadedAuth?: PreloadedAuthState) => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      auth: authReducer,
    },
    preloadedState: preloadedAuth ? { auth: preloadedAuth } : undefined,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
