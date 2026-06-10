"use client";

import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const APPLICATIONS = [
  {
    code: "LS-2024-001",
    customer: "Sarah Johnson",
    type: "Home",
    amount: "$350,000",
    status: "Approved",
    date: "Jan 20, 2024",
  },
  {
    code: "LS-2024-002",
    customer: "Sarah Johnson",
    type: "Personal",
    amount: "$15,000",
    status: "Under Review",
    date: "Mar 10, 2024",
  },
  {
    code: "LS-2024-003",
    customer: "Marcus Davis",
    type: "Vehicle",
    amount: "$42,000",
    status: "AI Assessment",
    date: "Mar 15, 2024",
  },
  {
    code: "LS-2024-004",
    customer: "Emily Chen",
    type: "Business",
    amount: "$120,000",
    status: "Submitted",
    date: "Mar 18, 2024",
  },
  {
    code: "LS-2024-005",
    customer: "Robert Williams",
    type: "Education",
    amount: "$45,000",
    status: "Pending Documents",
    date: "Mar 20, 2024",
  },
  {
    code: "LS-2024-006",
    customer: "Lisa Park",
    type: "Debt Consolidation",
    amount: "$28,000",
    status: "Rejected",
    date: "Feb 5, 2024",
  },
  {
    code: "LS-2024-007",
    customer: "David Martinez",
    type: "Personal",
    amount: "$8,500",
    status: "Draft",
    date: "Mar 25, 2024",
  },
  {
    code: "LS-2024-008",
    customer: "Marcus Davis",
    type: "Home",
    amount: "$480,000",
    status: "Cond. Approved",
    date: "Feb 1, 2024",
  },
];

function getStatusStyles(status: string) {
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

export default function RecentApplicationsTable() {
  return (
    <div className="space-y-4">
      <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 px-6 pt-6">
          <CardTitle className="text-base font-bold text-zinc-900">
            Recent Applications
          </CardTitle>
          <button className="flex items-center gap-1 text-xs font-semibold text-amber-700 transition-colors hover:text-amber-800">
            <span>View all</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </CardHeader>

        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow className="border-b border-zinc-100">
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Application
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Customer
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Type
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Amount
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Status
                  </TableHead>
                  <TableHead className="px-6 py-4 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                    Date
                  </TableHead>
                  <TableHead className="px-6 py-4 w-[60px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {APPLICATIONS.map((app) => (
                  <TableRow
                    key={app.code}
                    className="group border-b border-zinc-100 hover:bg-zinc-50/35 transition-colors duration-200"
                  >
                    <TableCell className="px-6 py-4.5 font-bold text-zinc-800">
                      {app.code}
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-zinc-500 font-medium">
                      {app.customer}
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-zinc-500 font-medium">
                      {app.type}
                    </TableCell>
                    <TableCell className="px-6 py-4.5 font-bold text-zinc-800">
                      {app.amount}
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-xs ${getStatusStyles(
                          app.status
                        )}`}
                      >
                        {app.status}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-zinc-400 font-medium">
                      {app.date}
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-right">
                      <button className="text-zinc-300 transition-colors duration-300 group-hover:text-zinc-600">
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination Footer */}
      <div className="flex items-center justify-end py-2">
        <div className="flex items-center gap-1.5 text-sm font-semibold text-zinc-500">
          <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-zinc-800 transition-colors disabled:opacity-50">
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>
          
          <button className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 text-white shadow-md font-bold">
            1
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-100 hover:text-zinc-800 transition-colors">
            2
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-100 hover:text-zinc-800 transition-colors">
            3
          </button>
          <span className="px-1 text-zinc-400">...</span>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-100 hover:text-zinc-800 transition-colors">
            67
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-zinc-100 hover:text-zinc-800 transition-colors">
            68
          </button>

          <button className="flex items-center gap-1 px-3 py-2 rounded-lg hover:text-zinc-800 transition-colors">
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
