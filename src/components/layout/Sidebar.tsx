"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  LayoutGrid,
  FileText,
  ScrollText,
  Users,
  MessageSquare,
  Brain,
  CircleUser,
  LogOut,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "../ui/button";
import LogoutModal from "../modals/LogoutModal";
import { useAppDispatch } from "@/redux/hooks";
import { logout } from "@/redux/slices/authSlice";

interface NavItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const navigation: NavItem[] = [
  { name: "Dashboard", href: "/", icon: LayoutGrid },
  { name: "Applications", href: "/applications", icon: FileText },
  { name: "Loan Management", href: "/loan-management", icon: ScrollText },
  { name: "Users", href: "/users", icon: Users },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "AI Insights", href: "/ai-insights", icon: Brain },
  { name: "My Profile", href: "/my-profile", icon: CircleUser },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NavItemProps {
  item: NavItem;
  active: boolean;
  onClose: () => void;
}

const NavItemComponent = ({ item, active, onClose }: NavItemProps) => {
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
        active
          ? "text-white bg-white/10 shadow-xs"
          : "text-slate-400 hover:text-slate-200 hover:bg-white/5",
      )}
      onClick={onClose}
    >
      <item.icon
        className={cn(
          "h-[18px] w-[18px] shrink-0 transition-colors duration-200",
          active ? "text-white" : "text-slate-400 group-hover:text-slate-200",
        )}
      />
      {item.name}
    </Link>
  );
};

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <>
      {isOpen ? (
        <button
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={onClose}
          aria-label="Close sidebar overlay"
        />
      ) : null}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen w-64 flex-col justify-between border-r transition-transform duration-200 lg:transition-none",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0",
        )}
        style={{ backgroundColor: "#1E252B", borderColor: "rgba(255, 255, 255, 0.08)" }}
      >
        {/* Logo */}
        <div className="space-y-2">
          <div
            className="flex items-center gap-2.5 px-5 border-b py-4"
            style={{ borderColor: "rgba(255, 255, 255, 0.08)" }}
          >
            <Image
              src="/logo.png"
              alt="Loan Sphere"
              width={36}
              height={36}
              style={{ height: "auto" }}
              priority
            />
            <span className="text-xl font-semibold text-white tracking-wide">
              Loan Sphere
            </span>
            <button
              className="ml-auto inline-flex h-8 w-8 items-center justify-center rounded-md text-gray-300 hover:text-white lg:hidden"
              onClick={onClose}
              aria-label="Close sidebar"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1.5 px-4 pt-6">
            {navigation.map((item) => (
              <NavItemComponent
                key={item.name}
                item={item}
                active={pathname === item.href}
                onClose={onClose}
              />
            ))}
          </nav>
        </div>

        {/* Logout Button */}
        <div className="px-4 pb-4 space-y-1">
          <Button
            className="w-full bg-red-500 hover:bg-red-600 cursor-pointer flex items-center gap-3.5 rounded-xl px-4 py-3 text-sm font-medium text-white hover:text-red-200 transition-colors"
            onClick={() => setIsLogoutOpen(true)}
          >
            <LogOut className="h-4 w-4 shrink-0 text-white" />
            Logout
          </Button>
        </div>
      </aside>

      <LogoutModal
        open={isLogoutOpen}
        onOpenChange={setIsLogoutOpen}
        onConfirm={() => {
          dispatch(logout());
          setIsLogoutOpen(false);
          router.replace("/signin");
        }}
      />
    </>
  );
}
