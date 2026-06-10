"use client";

import { Card } from "@/components/ui/card";
export interface UsersSummaryData {
  total_users: number;
  filtered_count: number;
  showing: number;
  page: number;
  page_size: number;
  total_pages: number;
}

interface Props {
  summary: UsersSummaryData;
}

export default function UsersSummary({ summary }: Props) {
  const { total_users, filtered_count, showing, page, page_size, total_pages } = summary;
  const isFiltered = filtered_count !== total_users;

  const start = (page - 1) * page_size + 1;
  const end = start - 1 + showing;

  return (
    <Card className="p-5">
      <div className="flex flex-wrap items-center gap-3 text-sm text-zinc-600">
        <span className="font-semibold text-zinc-900">
          {total_users.toLocaleString()} total users
        </span>

        {isFiltered && (
          <>
            <span className="text-zinc-300">|</span>
            <span>
              {filtered_count.toLocaleString()} matched
            </span>
          </>
        )}

        <span className="text-zinc-300">|</span>
        <span>
          Showing{" "}
          <span className="font-medium text-zinc-800">
            {start}–{end}
          </span>{" "}
          of{" "}
          <span className="font-medium text-zinc-800">
            {filtered_count.toLocaleString()}
          </span>{" "}
          results
        </span>

        {total_pages > 1 && (
          <>
            <span className="text-zinc-300">|</span>
            <span>
              Page{" "}
              <span className="font-medium text-zinc-800">{page}</span> of{" "}
              <span className="font-medium text-zinc-800">{total_pages}</span>
            </span>
          </>
        )}
      </div>
    </Card>
  );
}
