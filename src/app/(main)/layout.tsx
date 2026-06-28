"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/Sidebar";
import Topbar from "@/components/layout/Topbar";
import ProfileBootstrapper from "@/components/layout/ProfileBootstrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#fff8ee,#f6f7fb_35%,#eef1f7_100%)]">
      {/* Fires useGetMeQuery immediately — syncs profile_image into Redux
          so Topbar shows the correct avatar on every page */}
      <ProfileBootstrapper />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="lg:pl-64">
        <div className="mx-auto flex min-h-screen w-full flex-col gap-6 px-4 pb-6 lg:px-6">
          <div className="sticky top-0 z-30">
            <Topbar onOpenSidebar={() => setIsSidebarOpen(true)} />
          </div>
          <main className="flex-1 space-y-6">{children}</main>
        </div>
      </div>
    </div>
  );
}
