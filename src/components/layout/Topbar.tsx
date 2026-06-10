"use client";

import { Bell, ChevronDown, LogOut, Menu, Settings, User } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutModal from "../modals/LogoutModal";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";
import Link from "next/link";

interface TopbarProps {
  onOpenSidebar: () => void;
}

export default function Topbar({ onOpenSidebar }: TopbarProps) {
  const pathname = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const user = useAppSelector((state) => state.auth.user);

  // Prevent hydration mismatch: user data only exists on the client (Redux store
  // is empty during SSR), so we must not render user-derived content until
  // after the first client render.
  useEffect(() => {
    setMounted(true);
  }, []);

  const pageMap: Record<string, { title: string; section: string }> = {
    "/": { title: "Dashboard", section: "Dashboard" },
    "/analytics": { title: "AI Insights", section: "Dashboard" },
    "/users": { title: "Users", section: "Dashboard" },
    "/subscriptions": { title: "Applications", section: "Dashboard" },
    "/revenue": { title: "Loan Management", section: "Dashboard" },
    "/faq": { title: "FAQ", section: "Dashboard" },
    "/supports": { title: "Messages", section: "Dashboard" },
    "/settings": { title: "My Profile", section: "Dashboard" },
  };

  const current = pageMap[pathname] ?? {
    title: "Dashboard",
    section: "Dashboard",
  };

  // Only derive initials on the client to avoid server/client mismatch
  const initials = mounted
    ? (user?.full_name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() ?? "")
    : "";

  const getAvatarUrl = () => {
    if (!user?.profile_image) return "";
    if (user.profile_image.startsWith("http://") || user.profile_image.startsWith("https://")) {
      return user.profile_image;
    }
    return `${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_image}`;
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-amber-100/70 bg-white/85 px-6 py-2 shadow-sm backdrop-blur">
      <div className="flex min-w-0 items-center gap-3">
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-amber-100 bg-white text-amber-700 shadow-sm lg:hidden"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <Menu className="h-4 w-4" />
        </button>
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-500/70">
            {current.section} / {current.title}
          </p>
          <h2 className="text-xl font-semibold text-zinc-900">
            {current.title}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 rounded-full border border-amber-100 bg-white px-3 py-2 text-left shadow-sm">
              <Avatar className="h-8 w-8">
                {mounted && getAvatarUrl() && (
                  <AvatarImage
                    src={getAvatarUrl()}
                    alt="Admin"
                  />
                )}
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className="hidden sm:block">
                <p className="text-xs font-semibold text-zinc-900 capitalize">
                  {mounted ? user?.full_name : ""}
                </p>
                <p className="text-[11px] text-zinc-500 capitalize">
                  {mounted ? user?.role : ""}
                </p>
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-500" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <div className="px-3 py-2">
              <p className="text-xs font-semibold text-zinc-900 capitalize">
                {user?.full_name}
              </p>
              <p className="text-xs text-zinc-500">{user?.email}</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/settings" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-rose-500 focus:text-rose-500"
              onClick={() => setIsLogoutOpen(true)}
            >
              <LogOut className="h-4 w-4" />
              Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <LogoutModal
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        onConfirm={() => {
          dispatch(logout());
          setIsLogoutOpen(false);
          router.replace("/signin");
        }}
      />
    </header>
  );
}
