"use client";

import React from "react";
import { RefreshCw } from "lucide-react";

interface ErrorStateProps {
  title: string;
  description: string;
  onRetry: () => void;
}

export default function ErrorState({ title, description, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-white border border-zinc-200/60 shadow-sm rounded-2xl min-h-[350px] text-center space-y-4">
      <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-500">
        <RefreshCw className="h-6 w-6" />
      </div>
      <div className="space-y-2">
        <h3 className="text-base font-bold text-zinc-900">{title}</h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">{description}</p>
      </div>
      <button
        onClick={onRetry}
        className="inline-flex items-center gap-2 rounded-xl bg-indigo-900 hover:bg-indigo-950 px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer mt-2"
      >
        <span>Retry Fetching</span>
      </button>
    </div>
  );
}
