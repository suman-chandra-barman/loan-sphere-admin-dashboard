import React from "react";
import { Users, User, Shield } from "lucide-react";
import { Card } from "@/components/ui/card";

interface UsersStatsCardsProps {
  totalUsers: number;
  customersCount: number;
  adminsCount: number;
}

export default function UsersStatsCards({
  totalUsers,
  customersCount,
  adminsCount
}: UsersStatsCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {/* Total Users */}
      <Card className="flex items-center gap-4 p-5 bg-white border border-zinc-200/70 shadow-xs rounded-2xl">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-rose-50 text-[#A31D1D] shrink-0">
          <Users className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-zinc-900 leading-none">
            {totalUsers}
          </p>
          <p className="text-xs font-bold text-zinc-400 mt-1.5 uppercase tracking-wider">
            Total Users
          </p>
        </div>
      </Card>

      {/* Customers */}
      <Card className="flex items-center gap-4 p-5 bg-white border border-zinc-200/70 shadow-xs rounded-2xl">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-zinc-100 text-zinc-600 shrink-0">
          <User className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-zinc-900 leading-none">
            {customersCount}
          </p>
          <p className="text-xs font-bold text-zinc-400 mt-1.5 uppercase tracking-wider">
            Customers
          </p>
        </div>
      </Card>

      {/* Administrators */}
      <Card className="flex items-center gap-4 p-5 bg-white border border-zinc-200/70 shadow-xs rounded-2xl">
        <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-rose-50 text-[#A31D1D] shrink-0">
          <Shield className="h-5 w-5" />
        </div>
        <div>
          <p className="text-2xl font-extrabold text-zinc-900 leading-none">
            {adminsCount}
          </p>
          <p className="text-xs font-bold text-zinc-400 mt-1.5 uppercase tracking-wider">
            Administrators
          </p>
        </div>
      </Card>
    </div>
  );
}
