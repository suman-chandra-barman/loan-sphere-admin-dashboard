import { Card } from "@/components/ui/card";

export default function ProfileSkeleton() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Card Skeleton */}
      <Card className="overflow-hidden border-zinc-200/60 shadow-xs rounded-2xl bg-zinc-800 h-56 flex flex-col justify-end p-6">
        <div className="flex flex-col sm:flex-row sm:items-end gap-6 pb-2">
          <div className="h-24 w-24 rounded-2xl bg-zinc-700 shrink-0" />
          <div className="space-y-3 flex-1">
            <div className="h-6 w-48 bg-zinc-700 rounded-md" />
            <div className="h-4 w-72 bg-zinc-700 rounded-md" />
          </div>
        </div>
      </Card>

      {/* Main Two-Column Grid Content Skeleton */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Info Card Skeleton */}
          <Card className="border-zinc-200/60 shadow-xs rounded-2xl bg-white p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="h-9 w-9 rounded-xl bg-zinc-100 shrink-0" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-zinc-200 rounded-md" />
                <div className="h-3 w-48 bg-zinc-200 rounded-md" />
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <div className="h-3.5 w-24 bg-zinc-200 rounded-md" />
                  <div className="h-8 w-64 bg-zinc-100 rounded-xl" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column Skeleton */}
        <div className="space-y-6">
          <Card className="border-zinc-200/60 shadow-xs rounded-2xl bg-white p-6 space-y-6">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="h-9 w-9 rounded-xl bg-zinc-150 shrink-0" />
              <div className="space-y-2">
                <div className="h-4 w-32 bg-zinc-200 rounded-md" />
                <div className="h-3 w-48 bg-zinc-200 rounded-md" />
              </div>
            </div>
            <div className="space-y-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex justify-between items-center py-2">
                  <div className="h-3.5 w-28 bg-zinc-200 rounded-md" />
                  <div className="h-5 w-12 bg-zinc-100 rounded-md" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
