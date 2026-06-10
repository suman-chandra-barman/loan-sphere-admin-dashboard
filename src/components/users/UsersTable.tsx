"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import Pagination from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,  
} from "@/components/ui/table";
import type { AdminUser, UsersSummaryData } from "@/types/users";

// ── Helpers ────────────────────────────────────────────────────────────────────
function getRoleBadge(role: string) {
  switch (role) {
    case "family_owner":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "family_member":
      return "bg-sky-50 text-sky-700 border border-sky-200";
    default:
      return "bg-zinc-100 text-zinc-700";
  }
}

function getRoleLabel(role: string) {
  return role.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}



// ── Props ──────────────────────────────────────────────────────────────────────
interface Props {
  users: AdminUser[];
  summary: UsersSummaryData;
  onPageChange: (page: number) => void;
}

// ── Component ──────────────────────────────────────────────────────────────────
export default function 
UsersTable({ users, summary, onPageChange }: Props) {
  const { page, total_pages, filtered_count, showing, page_size } = summary;
  const start = (page - 1) * page_size + 1;
  const end = start - 1 + showing;
  const countLabel = `Showing ${start}–${end} of ${filtered_count.toLocaleString()} results`;

  return (
    <Card>
      <CardContent className="pt-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Plan</TableHead>
              <TableHead>Family</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>Verified</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="py-16 text-center text-sm text-zinc-500"
                >
                  No users match your filters.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="group">
                  {/* User */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 ring-2 ring-amber-100">
                        <AvatarImage
                          src={`${process.env.NEXT_PUBLIC_BASE_URL}${user.profile_image}`}
                          alt={user.full_name}
                        />
                        <AvatarFallback className="bg-amber-100 text-xs font-semibold text-amber-700">
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold text-zinc-900 group-hover:text-amber-700 transition-colors">
                          {user.full_name}
                        </p>
                        <p className="text-xs text-zinc-500">{user.email}</p>
                        {user.whatsapp_number && (
                          <p className="text-xs text-zinc-400">
                            {user.whatsapp_number}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  {/* Role */}
                  <TableCell>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${getRoleBadge(user.role)}`}
                    >
                      {getRoleLabel(user.role)}
                    </span>
                  </TableCell>

                  {/* Plan */}
                  <TableCell>
                    {user.plan ? (
                      <div>
                        <span className="rounded-full bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-700">
                          {user.plan.name}
                        </span>
                        <p className="mt-1 text-xs text-zinc-400 capitalize">
                          ${user.plan.price} / {user.plan.billing_cycle}
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400">—</span>
                    )}
                  </TableCell>

                  {/* Family */}
                  <TableCell>
                    {user.family ? (
                      <div>
                        <p className="text-sm font-medium text-zinc-800">
                          {user.family.name}
                        </p>
                        <p className="text-xs text-zinc-400">
                          {user.members_count}{" "}
                          {user.members_count === 1 ? "member" : "members"}
                          {user.membership && (
                            <> · {user.membership.relation_display}</>
                          )}
                        </p>
                      </div>
                    ) : (
                      <span className="text-xs text-zinc-400">—</span>
                    )}
                  </TableCell>

                  {/* Join Date */}
                  <TableCell className="text-sm text-zinc-700">
                    {user.join_date_display}
                  </TableCell>


                  {/* Email Verified */}
                  <TableCell>
                    {user.is_email_verified ? (
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-zinc-300" />
                    )}
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant={user.status === "active" ? "default" : "muted" as never}
                    >
                      {user.status_display}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {/* Pagination */}
        {total_pages > 1 && (
          <div className="mt-4">
            <Pagination
              totalCountLabel={countLabel}
              currentPage={page}
              totalPages={total_pages}
              onPrev={() => onPageChange(page - 1)}
              onNext={() => onPageChange(page + 1)}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
