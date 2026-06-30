"use client";

import { useState } from "react";
import { toast } from "react-toastify";
import { Loader2, Plus, Calendar, Clock, Coffee, Sparkles, Check, AlertCircle, Edit2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogCloseButton,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useGetAvailabilityQuery,
  useCreateAvailabilityMutation,
  useUpdateAvailabilityRuleMutation,
} from "@/redux/api/supportApi";
import type { CaseManager, AvailabilityRule } from "@/types/support";

interface AvailabilityModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  manager: CaseManager | null;
}

const weekdayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function AvailabilityModal({
  open,
  onOpenChange,
  manager,
}: AvailabilityModalProps) {
  const managerId = manager?.id || "";

  const { data, isLoading, error } = useGetAvailabilityQuery(managerId, {
    skip: !managerId || !open,
  });

  const [createAvailability, { isLoading: isBatchCreating }] = useCreateAvailabilityMutation();
  const [updateAvailabilityRule, { isLoading: isRuleUpdating }] = useUpdateAvailabilityRuleMutation();

  const rulesList = data?.data?.availability || [];

  // Edit rule inline state
  const [editingRuleId, setEditingRuleId] = useState<string | null>(null);

  // Form states for Single Rule update
  const [singleWeekday, setSingleWeekday] = useState(0);
  const [singleStart, setSingleStart] = useState("09:00");
  const [singleEnd, setSingleEnd] = useState("17:00");
  const [singleDuration, setSingleDuration] = useState(30);
  const [singleBreakStart, setSingleBreakStart] = useState("13:00");
  const [singleBreakEnd, setSingleBreakEnd] = useState("14:00");
  const [singleActive, setSingleActive] = useState(true);

  // Form states for Batch Creation
  const [batchWeekdays, setBatchWeekdays] = useState<number[]>([0, 1, 2, 3, 4, 5]);
  const [batchStart, setBatchStart] = useState("09:00");
  const [batchEnd, setBatchEnd] = useState("17:00");
  const [batchDuration, setBatchDuration] = useState(30);
  const [batchBreakStart, setBatchBreakStart] = useState("13:00");
  const [batchBreakEnd, setBatchBreakEnd] = useState("14:00");

  const handleStartEdit = (rule: AvailabilityRule) => {
    setEditingRuleId(rule.id);
    setSingleWeekday(rule.weekday);
    setSingleStart(rule.startTime || "09:00");
    setSingleEnd(rule.endTime || "17:00");
    setSingleDuration(rule.slotDurationMinutes || 30);
    setSingleBreakStart(rule.breakStartTime || "13:00");
    setSingleBreakEnd(rule.breakEndTime || "14:00");
    setSingleActive(rule.isActive ?? true);
  };

  const handleSaveRule = async (ruleId: string) => {
    try {
      const res = await updateAvailabilityRule({
        ruleId,
        weekday: singleWeekday,
        start_time: singleStart,
        end_time: singleEnd,
        slot_duration_minutes: Number(singleDuration),
        break_start_time: singleBreakStart,
        break_end_time: singleBreakEnd,
        is_active: singleActive,
      }).unwrap();

      if (res.success) {
        toast.success("Availability rule updated successfully");
        setEditingRuleId(null);
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update availability rule");
    }
  };

  const handleBatchToggleWeekday = (day: number) => {
    setBatchWeekdays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleBatchCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!managerId) return;

    if (batchWeekdays.length === 0) {
      return toast.warning("Please select at least one weekday for batch creation");
    }

    try {
      const res = await createAvailability({
        managerId,
        body: {
          weekdays: batchWeekdays,
          start_time: batchStart,
          end_time: batchEnd,
          slot_duration_minutes: Number(batchDuration),
          break_start_time: batchBreakStart,
          break_end_time: batchBreakEnd,
          is_active: true,
        },
      }).unwrap();

      if (res.success) {
        toast.success("Availability rules created successfully");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create availability schedule rules");
    }
  };

  const formatTime = (time24: string) => {
    if (!time24) return "—";
    const [hStr, mStr] = time24.split(":");
    const hours = parseInt(hStr, 10);
    const ampm = hours >= 12 ? "PM" : "AM";
    const dispHours = hours % 12 || 12;
    return `${dispHours}:${mStr} ${ampm}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Scheduler Control: {manager?.name}</DialogTitle>
          <DialogDescription>
            Manage weekly booking rules, lunch break ranges, and slot durations for {manager?.title}.
          </DialogDescription>
        </DialogHeader>
        <DialogCloseButton />

        <div className="space-y-6 py-4">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center p-8 min-h-[250px] text-zinc-400">
              <Loader2 className="h-8 w-8 animate-spin text-zinc-500 mb-2" />
              <p className="text-sm font-semibold">Fetching availability rules...</p>
            </div>
          ) : error ? (
            <div className="bg-rose-50 border border-rose-200/60 p-5 rounded-2xl flex items-start gap-3 text-rose-800">
              <AlertCircle className="h-5 w-5 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-extrabold text-sm uppercase tracking-wider">Failed to Load rules</h4>
                <p className="text-xs text-rose-700 leading-relaxed mt-1">
                  We had trouble loading availability settings. Ensure the backend support service is active.
                </p>
              </div>
            </div>
          ) : rulesList.length > 0 ? (
            /* Rules list and single editor block */
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-extrabold text-zinc-500 uppercase tracking-wider">
                  Weekly Schedule Rules
                </h4>
                <span className="text-[10px] bg-indigo-50 border border-indigo-100 text-indigo-700 px-2 py-0.5 rounded font-bold">
                  {rulesList.length} Rules active
                </span>
              </div>

              <div className="space-y-3">
                {rulesList.map((rule) => {
                  const isEditing = editingRuleId === rule.id;

                  if (isEditing) {
                    return (
                      <div
                        key={rule.id}
                        className="bg-zinc-50 border border-indigo-900/20 p-4 rounded-xl space-y-4 animate-in fade-in duration-150"
                      >
                        <div className="flex justify-between items-center border-b border-zinc-200/60 pb-2">
                          <span className="text-sm font-bold text-indigo-950">
                            Modify {rule.weekdayLabel || weekdayNames[rule.weekday]} Settings
                          </span>
                          <span className="text-[10px] text-zinc-400 font-semibold font-mono">
                            Rule: {rule.id.substring(0, 8)}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                          {/* Shift starts */}
                          <div className="space-y-1">
                            <Label className="font-bold text-zinc-500">Shift Starts</Label>
                            <Input
                              type="time"
                              value={singleStart}
                              onChange={(e) => setSingleStart(e.target.value)}
                              className="h-9 text-xs rounded-lg"
                            />
                          </div>

                          {/* Shift ends */}
                          <div className="space-y-1">
                            <Label className="font-bold text-zinc-500">Shift Ends</Label>
                            <Input
                              type="time"
                              value={singleEnd}
                              onChange={(e) => setSingleEnd(e.target.value)}
                              className="h-9 text-xs rounded-lg"
                            />
                          </div>

                          {/* Break start */}
                          <div className="space-y-1">
                            <Label className="font-bold text-zinc-500">Lunch Break Starts</Label>
                            <Input
                              type="time"
                              value={singleBreakStart}
                              onChange={(e) => setSingleBreakStart(e.target.value)}
                              className="h-9 text-xs rounded-lg"
                            />
                          </div>

                          {/* Break ends */}
                          <div className="space-y-1">
                            <Label className="font-bold text-zinc-500">Lunch Break Ends</Label>
                            <Input
                              type="time"
                              value={singleBreakEnd}
                              onChange={(e) => setSingleBreakEnd(e.target.value)}
                              className="h-9 text-xs rounded-lg"
                            />
                          </div>

                          {/* Duration */}
                          <div className="space-y-1 col-span-2">
                            <Label className="font-bold text-zinc-500">Slot Duration (Minutes)</Label>
                            <select
                              value={singleDuration}
                              onChange={(e) => setSingleDuration(Number(e.target.value))}
                              className="w-full h-9 rounded-lg border border-zinc-200 px-3 text-xs bg-white"
                            >
                              <option value={15}>15 Minutes</option>
                              <option value={30}>30 Minutes</option>
                              <option value={45}>45 Minutes</option>
                              <option value={60}>60 Minutes</option>
                            </select>
                          </div>

                          {/* Active state */}
                          <div className="flex items-end pb-1 col-span-2 sm:col-span-1">
                            <label className="flex items-center gap-1.5 font-bold text-zinc-600 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={singleActive}
                                onChange={(e) => setSingleActive(e.target.checked)}
                                className="h-4.5 w-4.5 rounded border-zinc-300 focus:ring-zinc-800"
                              />
                              Rule Active
                            </label>
                          </div>
                        </div>

                        <div className="flex gap-2 justify-end border-t border-zinc-200/50 pt-3">
                          <Button
                            size="sm"
                            variant="secondary"
                            onClick={() => setEditingRuleId(null)}
                            className="h-8 text-xs font-bold px-3 rounded-lg border bg-white cursor-pointer"
                          >
                            Cancel
                          </Button>
                          <Button
                            size="sm"
                            disabled={isRuleUpdating}
                            onClick={() => handleSaveRule(rule.id)}
                            className="h-8 text-xs font-bold bg-[#1e252b] hover:bg-[#2b353e] text-white px-3.5 rounded-lg cursor-pointer flex items-center gap-1"
                          >
                            {isRuleUpdating && <Loader2 className="h-3 w-3 animate-spin" />}
                            <Check className="h-3.5 w-3.5" />
                            Save
                          </Button>
                        </div>
                      </div>
                    );
                  }

                  return (
                    <div
                      key={rule.id}
                      className="bg-white border border-zinc-200/60 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    >
                      {/* Weekday badge info */}
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 bg-zinc-100/80 rounded-lg flex items-center justify-center border border-zinc-200/40 shrink-0">
                          <Calendar className="h-4 w-4 text-zinc-500" />
                        </div>
                        <div>
                          <p className="font-bold text-zinc-800 text-sm">
                            {rule.weekdayLabel || weekdayNames[rule.weekday]}
                          </p>
                          <span
                            className={`inline-flex items-center text-[10px] font-bold ${
                              rule.isActive ? "text-emerald-600" : "text-zinc-400"
                            }`}
                          >
                            {rule.isActive ? "Active Status" : "Disabled Status"}
                          </span>
                        </div>
                      </div>

                      {/* Rule parameters */}
                      <div className="grid grid-cols-2 gap-x-6 gap-y-1.5 text-xs">
                        <div className="flex items-center gap-1.5 text-zinc-600 font-semibold">
                          <Clock className="h-3.5 w-3.5 text-zinc-400" />
                          <span>Shift:</span>
                          <span className="font-bold text-zinc-800">
                            {formatTime(rule.startTime)} - {formatTime(rule.endTime)}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 text-zinc-600 font-semibold">
                          <Coffee className="h-3.5 w-3.5 text-zinc-400" />
                          <span>Lunch:</span>
                          <span className="font-bold text-zinc-800">
                            {formatTime(rule.breakStartTime)} - {formatTime(rule.breakEndTime)}
                          </span>
                        </div>

                        <div className="col-span-2 text-zinc-400 font-medium">
                          Session Slot Duration: <span className="font-bold text-zinc-700">{rule.slotDurationMinutes} Minutes</span>
                        </div>
                      </div>

                      {/* Edit control */}
                      <button
                        onClick={() => handleStartEdit(rule)}
                        className="inline-flex items-center gap-1 text-[#e05638] hover:text-[#f86c4f] text-xs font-bold self-end sm:self-center transition-colors cursor-pointer"
                      >
                        <Edit2 className="h-3.5 w-3.5" />
                        <span>Edit Rule</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Empty rules: Batch Availability Config setup */
            <form onSubmit={handleBatchCreate} className="space-y-4 bg-zinc-50 p-6 rounded-2xl border border-zinc-200/50">
              <div className="flex items-center gap-2 text-indigo-950 font-bold text-sm">
                <Sparkles className="h-4 w-4 text-indigo-700" />
                <span>Initialize Availability Schedule Rules</span>
              </div>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">
                Set up the default shift times, slot intervals, and lunch break ranges across the weekdays for this advisor account.
              </p>

              <div className="grid grid-cols-2 gap-4 text-xs pt-2">
                {/* Weekday checkboxes */}
                <div className="col-span-2 space-y-2">
                  <Label className="block font-bold text-zinc-500 uppercase">Apply to Weekdays</Label>
                  <div className="flex flex-wrap gap-x-4 gap-y-2">
                    {weekdayNames.slice(0, 6).map((day, idx) => (
                      <label key={idx} className="flex items-center gap-1.5 font-bold text-zinc-600 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={batchWeekdays.includes(idx)}
                          onChange={() => handleBatchToggleWeekday(idx)}
                          className="h-4.5 w-4.5 rounded border-zinc-300"
                        />
                        {day.substring(0, 3)}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Shift starts */}
                <div className="space-y-1">
                  <Label className="font-bold text-zinc-500 uppercase">Shift Starts</Label>
                  <Input
                    type="time"
                    value={batchStart}
                    onChange={(e) => setBatchStart(e.target.value)}
                    className="h-10 rounded-xl"
                  />
                </div>

                {/* Shift ends */}
                <div className="space-y-1">
                  <Label className="font-bold text-zinc-500 uppercase">Shift Ends</Label>
                  <Input
                    type="time"
                    value={batchEnd}
                    onChange={(e) => setBatchEnd(e.target.value)}
                    className="h-10 rounded-xl"
                  />
                </div>

                {/* Break start */}
                <div className="space-y-1">
                  <Label className="font-bold text-zinc-500 uppercase">Lunch Starts</Label>
                  <Input
                    type="time"
                    value={batchBreakStart}
                    onChange={(e) => setBatchBreakStart(e.target.value)}
                    className="h-10 rounded-xl"
                  />
                </div>

                {/* Break ends */}
                <div className="space-y-1">
                  <Label className="font-bold text-zinc-500 uppercase">Lunch Ends</Label>
                  <Input
                    type="time"
                    value={batchBreakEnd}
                    onChange={(e) => setBatchBreakEnd(e.target.value)}
                    className="h-10 rounded-xl"
                  />
                </div>

                {/* Duration */}
                <div className="space-y-1 col-span-2 sm:col-span-1">
                  <Label className="font-bold text-zinc-500 uppercase">Slot Interval</Label>
                  <select
                    value={batchDuration}
                    onChange={(e) => setBatchDuration(Number(e.target.value))}
                    className="w-full h-10 rounded-xl border border-zinc-200 px-3 bg-white"
                  >
                    <option value={15}>15 Minutes</option>
                    <option value={30}>30 Minutes</option>
                    <option value={45}>45 Minutes</option>
                    <option value={60}>60/Hour</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end pt-3">
                <Button
                  type="submit"
                  disabled={isBatchCreating}
                  className="h-10 px-5 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-950 text-white cursor-pointer flex items-center gap-1.5"
                >
                  {isBatchCreating && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
                  <Plus className="h-4 w-4" />
                  Generate Weekly Schedule Rules
                </Button>
              </div>
            </form>
          )}

          <div className="flex justify-end border-t border-zinc-100 pt-4 mt-2">
            <Button
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="h-10 px-5 rounded-xl text-xs font-bold text-zinc-600 border border-zinc-200/60 bg-zinc-50 cursor-pointer"
            >
              Close Panel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
