"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, Phone, MessageSquare, Calendar, User, Clipboard, UserCheck, AlertOctagon } from "lucide-react";
import { toast } from "react-toastify";
import { useUpdateAppointmentStatusMutation } from "@/redux/api/supportApi";
import type { Appointment } from "@/types/support";

interface AppointmentTableProps {
  appointments: Appointment[];
  isLoading?: boolean;
}

export function getAppointmentStatusStyles(status: string) {
  const type = (status || "").toLowerCase();
  switch (type) {
    case "completed":
      return "bg-emerald-50 text-emerald-700 border-emerald-200/50";
    case "scheduled":
      return "bg-blue-50 text-blue-700 border-blue-200/50";
    case "cancelled":
      return "bg-rose-50 text-rose-700 border-rose-200/50";
    default:
      return "bg-zinc-50 text-zinc-600 border-zinc-200";
  }
}

export default function AppointmentTable({
  appointments,
  isLoading,
}: AppointmentTableProps) {
  const [updateAppointmentStatus, { isLoading: isUpdating }] = useUpdateAppointmentStatusMutation();

  const handleMarkCompleted = async (id: string) => {
    try {
      const res = await updateAppointmentStatus({ id, status: "completed" }).unwrap();
      if (res.success) {
        toast.success("Appointment status updated to completed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update appointment status");
    }
  };

  if (isLoading) {
    return (
      <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-zinc-50/50">
                <TableRow className="border-b border-zinc-100">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <TableHead key={i} className="px-6 py-4.5">
                      <Skeleton className="h-4 w-20 rounded" />
                    </TableHead>
                  ))}
                  <TableHead className="w-[80px]" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 4 }).map((_, rowIndex) => (
                  <TableRow key={rowIndex} className="border-b border-zinc-100">
                    <TableCell className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-24 rounded" />
                          <Skeleton className="h-3.5 w-32 rounded" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <div className="flex items-center gap-3">
                        <Skeleton className="h-8 w-8 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-24 rounded" />
                          <Skeleton className="h-3.5 w-20 rounded" />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4.5 w-24 rounded" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-5 w-24 rounded-full" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5">
                      <Skeleton className="h-4.5 w-40 rounded" />
                    </TableCell>
                    <TableCell className="px-6 py-4.5 text-right">
                      <Skeleton className="h-8 w-8 rounded-lg inline-block" />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-zinc-200/60 shadow-sm rounded-2xl overflow-hidden bg-white">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-zinc-50/50">
              <TableRow className="border-b border-zinc-100">
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Customer
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Case Manager
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Schedule Time
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Channel
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Status
                </TableHead>
                <TableHead className="px-6 py-4.5 text-zinc-400 font-semibold text-xs tracking-wider uppercase">
                  Audit Notes
                </TableHead>
                <TableHead className="px-6 py-4.5 w-[100px]" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.length > 0 ? (
                appointments.map((appt) => {
                  const custInitials = appt.customer?.initials || appt.customer?.name?.substring(0, 2).toUpperCase() || "CU";
                  const mgrInitials = appt.manager?.initials || appt.manager?.name?.substring(0, 2).toUpperCase() || "BA";

                  return (
                    <TableRow
                      key={appt.id}
                      className="group border-b border-zinc-100 hover:bg-zinc-50/35 transition-colors duration-200 text-xs"
                    >
                      {/* Customer Info */}
                      <TableCell className="px-6 py-4.5 font-medium text-zinc-800">
                        <div className="flex items-center gap-2.5">
                          <Avatar className="h-8 w-8 bg-zinc-100 border border-zinc-200/40">
                            <AvatarFallback className="text-[10px] font-bold text-zinc-700 bg-zinc-200/50">
                              {custInitials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-bold text-zinc-800 text-sm leading-tight">
                              {appt.customer?.name}
                            </span>
                            <span className="text-[10px] text-zinc-400 font-semibold mt-0.5">
                              {appt.customer?.email}
                            </span>
                          </div>
                        </div>
                      </TableCell>

                      {/* Advisor / Manager Assigned */}
                      <TableCell className="px-6 py-4.5 text-zinc-600">
                        {appt.manager ? (
                          <div className="flex items-center gap-2.5">
                            <Avatar className="h-8 w-8 bg-zinc-100 border border-zinc-200/40">
                              <AvatarFallback className="text-[10px] font-bold text-zinc-700 bg-zinc-200/50">
                                {mgrInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                              <span className="font-bold text-zinc-800 leading-tight">
                                {appt.manager.name}
                              </span>
                              <span className="text-[10px] text-zinc-400 font-medium mt-0.5">
                                {appt.manager.title}
                              </span>
                            </div>
                          </div>
                        ) : (
                          <span className="text-zinc-400 font-semibold">—</span>
                        )}
                      </TableCell>

                      {/* Schedule Time Label */}
                      <TableCell className="px-6 py-4.5 font-bold text-zinc-850">
                        <div className="flex flex-col gap-0.5">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                            <span>{appt.dateLabel || appt.date}</span>
                          </div>
                          <span className="text-[10px] text-zinc-500 font-semibold ml-4.5">
                            {appt.timeLabel || appt.time}
                          </span>
                        </div>
                      </TableCell>

                      {/* Channels badge */}
                      <TableCell className="px-6 py-4.5 font-semibold">
                        <span className="inline-flex items-center gap-1 rounded bg-zinc-100 border border-zinc-200/40 px-2 py-0.5 font-semibold text-[10px] text-zinc-700 uppercase">
                          {appt.callType === "phone_call" ? (
                            <Phone className="h-3 w-3 text-zinc-400" />
                          ) : (
                            <MessageSquare className="h-3 w-3 text-zinc-400" />
                          )}
                          <span>{appt.callTypeLabel || appt.callType}</span>
                        </span>
                      </TableCell>

                      {/* Status */}
                      <TableCell className="px-6 py-4.5 font-semibold">
                        <span
                          className={`inline-flex items-center border rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-3xs uppercase tracking-wider ${getAppointmentStatusStyles(
                            appt.status
                          )}`}
                        >
                          {appt.statusLabel || appt.status}
                        </span>
                      </TableCell>

                      {/* Audit Note */}
                      <TableCell className="px-6 py-4.5 max-w-[200px] truncate text-zinc-500 font-medium" title={appt.note || ""}>
                        {appt.note || <span className="text-zinc-300 font-normal">No details provided</span>}
                      </TableCell>

                      {/* Mark Completed Control Action */}
                      <TableCell className="px-6 py-4.5 text-right">
                        {appt.status === "scheduled" ? (
                          <button
                            onClick={() => handleMarkCompleted(appt.id)}
                            disabled={isUpdating}
                            className="inline-flex items-center justify-center gap-1 h-8 px-2.5 rounded-lg text-emerald-600 bg-emerald-50 hover:bg-emerald-100 hover:text-emerald-800 text-[10px] font-bold border border-emerald-200/40 transition-colors cursor-pointer select-none"
                            title="Mark Completed"
                          >
                            <Check className="h-3.5 w-3.5 shrink-0" />
                            <span>Complete</span>
                          </button>
                        ) : (
                          <span className="text-zinc-300 text-[10px] font-semibold flex justify-end items-center gap-1 select-none pr-2">
                            <UserCheck className="h-3.5 w-3.5" />
                            Audited
                          </span>
                        )}
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-zinc-400 font-semibold text-sm">
                    No support appointments found in this status.
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
