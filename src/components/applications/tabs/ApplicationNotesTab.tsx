import React, { useState } from "react";
import { Plus } from "lucide-react";
import { getInitials } from "@/components/applications/ApplicationsTable";
import {
  useGetApplicationNotesQuery,
  useAddApplicationNoteMutation,
} from "@/redux/api/applicationsApi";
import { NotesTabSkeleton } from "@/components/skeleton/TabContentSkeleton";

interface ApplicationNotesTabProps {
  applicationId: string;
  canAddNote: boolean;
}

export default function ApplicationNotesTab({ applicationId, canAddNote }: ApplicationNotesTabProps) {
  const { data, isLoading, error } = useGetApplicationNotesQuery(applicationId);
  const [addNote, { isLoading: isAdding }] = useAddApplicationNoteMutation();
  const [newNoteContent, setNewNoteContent] = useState("");

  if (isLoading) {
    return <NotesTabSkeleton />;
  }

  if (error || !data?.success) {
    return (
      <div className="bg-white rounded-2xl border border-zinc-200/60 p-8 text-center text-zinc-500 font-semibold shadow-3xs">
        Failed to load application notes.
      </div>
    );
  }

  const notes = data?.data?.notes || [];

  const handleNoteSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteContent.trim() || isAdding) return;

    try {
      const response = await addNote({
        id: applicationId,
        note: newNoteContent.trim(),
      }).unwrap();

      if (response?.success) {
        setNewNoteContent("");
        const { toast } = await import("react-toastify");
        toast.success("Admin note added successfully");
      }
    } catch (err: any) {
      const { toast } = await import("react-toastify");
      toast.error(err?.data?.message || "Failed to add note");
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Notes List */}
      <div className="space-y-4">
        {notes.length > 0 ? (
          notes.map((note: any) => (
            <div
              key={note.id}
              className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm space-y-2"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-zinc-200 text-zinc-700 flex items-center justify-center font-bold text-[10px] uppercase shadow-3xs">
                    {getInitials(note.createdBy || "")}
                  </div>
                  <span className="font-extrabold text-zinc-800 text-xs">{note.createdBy}</span>
                  <span className="bg-amber-50 text-amber-700 border border-amber-100/50 rounded px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-3xs">
                    Admin Note
                  </span>
                </div>
                <span className="text-[10px] font-bold text-zinc-400">
                  {new Date(note.createdAt).toLocaleString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>

              <p className="text-sm font-semibold text-zinc-600 leading-relaxed pl-8">
                {note.note}
              </p>
            </div>
          ))
        ) : (
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 text-center text-zinc-400 text-sm font-semibold shadow-3xs">
            No internal notes listed yet.
          </div>
        )}
      </div>

      {/* Note Input Form */}
      {canAddNote && (
        <div className="bg-white rounded-2xl border border-zinc-200/60 p-5 shadow-sm space-y-4">
          <h3 className="font-extrabold text-zinc-900 text-sm uppercase tracking-tight">Add Note</h3>
          <form onSubmit={handleNoteSubmit} className="space-y-4">
            <textarea
              value={newNoteContent}
              onChange={(e) => setNewNoteContent(e.target.value)}
              placeholder="Add an internal note about this application..."
              rows={4}
              disabled={isAdding}
              className="w-full rounded-xl border border-zinc-200/80 p-4 text-sm font-semibold focus:border-[#9c2415] focus:outline-none placeholder-zinc-300 resize-none leading-relaxed text-zinc-700 bg-zinc-50/25 focus:bg-white transition-colors disabled:opacity-55"
            />

            <button
              type="submit"
              disabled={!newNoteContent.trim() || isAdding}
              className={`h-10 px-5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-3xs transition-all cursor-pointer ${
                newNoteContent.trim() && !isAdding
                  ? "bg-[#9c2415] text-white hover:bg-[#851e11] active:scale-98"
                  : "bg-zinc-100 text-zinc-400 border border-zinc-200/50 cursor-not-allowed"
              }`}
            >
              <Plus className="h-4 w-4" /> Add Note
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
