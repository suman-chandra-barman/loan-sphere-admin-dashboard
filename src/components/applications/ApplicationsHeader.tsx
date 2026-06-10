import React from "react";

interface ApplicationsHeaderProps {
  filteredCount: number;
}

export default function ApplicationsHeader({ filteredCount }: ApplicationsHeaderProps) {
  return (
    <div className="space-y-1">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
        Applications
      </h1>
      <p className="text-sm font-semibold text-zinc-400">
        {filteredCount} {filteredCount === 1 ? "application" : "applications"} found
      </p>
    </div>
  );
}
