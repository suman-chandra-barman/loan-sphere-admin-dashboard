import React from "react";
import { ArrowRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { LoanApplication } from "@/types/application";
import Link from "next/link";

interface ApplicationsTableProps {
  applications: LoanApplication[];
  onSelectApp: (code: string) => void;
}

export function getStatusStyles(status: string) {
  switch (status) {
    case "Approved":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
    case "Under Review":
      return "bg-amber-50 text-amber-700 border-amber-200/50";
    case "AI Assessment":
      return "bg-purple-50 text-purple-700 border-purple-200/50";
    case "Submitted":
      return "bg-blue-50 text-blue-700 border-blue-200/50";
    case "Pending Documents":
      return "bg-orange-50/60 text-orange-700 border-orange-200/50";
    case "Rejected":
      return "bg-rose-50 text-rose-700 border-rose-200/50";
    case "Draft":
      return "bg-slate-100 text-slate-600 border-slate-200/50";
    case "Cond. Approved":
      return "bg-teal-50 text-teal-700 border-teal-200/50";
    default:
      return "bg-zinc-50 text-zinc-600 border-zinc-200";
  }
}

export function getDtiStyles(dti: number) {
  if (dti <= 35) return "text-emerald-600 font-semibold";
  if (dti <= 45) return "text-amber-600 font-semibold";
  return "text-rose-600 font-semibold";
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);
};

export default function ApplicationsTable({
  applications,
  onSelectApp,
}: ApplicationsTableProps) {
  return (
    <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/50">
              <TableRow className="border-b border-zinc-100">
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Application #
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Customer
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Loan Type
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Amount
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  DTI
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Date
                </TableHead>
                <TableHead className="px-6 py-4.5 w-[60px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <TableRow
                    key={app.code}
                    onClick={() => onSelectApp(app.code)}
                    className="group border-b border-zinc-100 hover:bg-zinc-50/35 transition-colors duration-200 cursor-pointer"
                  >
                    <TableCell className="px-6 py-4.5 font-bold text-[#e05638]">
                      {app.code}
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8 bg-zinc-200/70 border border-zinc-300/30">
                          <AvatarFallback className="text-xs font-bold text-zinc-700 bg-zinc-200">
                            {getInitials(app.customer)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-semibold text-zinc-800 text-sm">
                          {app.customer}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-zinc-500 font-semibold text-sm">
                      {app.type}
                    </TableCell>
                    <TableCell className="px-6 py-4.5 font-extrabold text-zinc-800 text-sm">
                      {app.amount}
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-3xs ${getStatusStyles(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </TableCell>
                    <TableCell className={`px-6 py-4.5 text-sm ${getDtiStyles(app.dti)}`}>
                      {app.dti}%
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-zinc-400 font-semibold text-sm">
                      {app.date}
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <Link 
                        href={`/applications/${app.code}`}
                        className="inline-flex items-center justify-center text-zinc-300 hover:text-zinc-600 transition-colors duration-300 group/btn p-1"
                      >
                        <ArrowRight className="h-4.5 w-4.5 transition-transform group-hover/btn:translate-x-0.5" />
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-zinc-400 font-semibold text-sm">
                    No loan applications matched your search filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
