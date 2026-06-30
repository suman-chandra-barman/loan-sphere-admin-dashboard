/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
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
import { useCreateCaseManagerMutation, useUpdateCaseManagerMutation } from "@/redux/api/supportApi";
import type { CaseManager } from "@/types/support";

interface ManagerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  managerToEdit: CaseManager | null;
}

export default function ManagerModal({
  open,
  onOpenChange,
  managerToEdit,
}: ManagerModalProps) {
  const [createCaseManager, { isLoading: isCreating }] = useCreateCaseManagerMutation();
  const [updateCaseManager, { isLoading: isUpdating }] = useUpdateCaseManagerMutation();

  const isEditMode = !!managerToEdit;

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [title, setTitle] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [rating, setRating] = useState("5.0");
  const [reviewsCount, setReviewsCount] = useState(0);
  const [availableCallTypes, setAvailableCallTypes] = useState<string[]>(["phone_call", "live_chat"]);
  const [isActive, setIsActive] = useState(true);
  const [sortOrder, setSortOrder] = useState(1);

  // Sync edit values
  useEffect(() => {
    if (managerToEdit) {
      setName(managerToEdit.name || "");
      setEmail(managerToEdit.email || "");
      setPhoneNumber(managerToEdit.phoneNumber || "");
      setTitle(managerToEdit.title || "");
      setSpeciality(managerToEdit.speciality || "");
      setRating(managerToEdit.rating || "5.0");
      setReviewsCount(managerToEdit.reviewsCount ?? 0);
      setAvailableCallTypes(managerToEdit.availableCallTypes || []);
      setIsActive(managerToEdit.isActive ?? true);
      setSortOrder(1);
    } else {
      // Reset values
      setName("");
      setEmail("");
      setPhoneNumber("");
      setTitle("");
      setSpeciality("");
      setRating("5.0");
      setReviewsCount(0);
      setAvailableCallTypes(["phone_call", "live_chat"]);
      setIsActive(true);
      setSortOrder(1);
    }
  }, [managerToEdit, open]);

  const handleToggleCallType = (type: string) => {
    setAvailableCallTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return toast.warning("Name is required");
    if (!email.trim()) return toast.warning("Email is required");
    if (availableCallTypes.length === 0) {
      return toast.warning("Please select at least one contact channel");
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      phone_number: phoneNumber.trim(),
      title: title.trim(),
      speciality: speciality.trim(),
      rating,
      reviews_count: Number(reviewsCount),
      available_call_types: availableCallTypes,
      is_active: isActive,
      sort_order: Number(sortOrder),
    };

    try {
      if (isEditMode && managerToEdit) {
        const res = await updateCaseManager({
          id: managerToEdit.id,
          ...payload,
        }).unwrap();
        if (res.success) {
          toast.success("Case manager profile updated successfully");
          onOpenChange(false);
        }
      } else {
        const res = await createCaseManager(payload).unwrap();
        if (res.success) {
          toast.success("Case manager created successfully");
          onOpenChange(false);
        }
      }
    } catch (err: unknown) {
      const error = err as { data?: { message?: string } };
      toast.error(error?.data?.message || "Failed to save case manager profile");
    }
  };

  const isSaving = isCreating || isUpdating;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit Case Manager Profile" : "Register Case Manager"}</DialogTitle>
          <DialogDescription>
            Provide detailed information for this support staff account.
          </DialogDescription>
        </DialogHeader>
        <DialogCloseButton />

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Name */}
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="mgr-name" className="text-xs font-bold text-zinc-500 uppercase">
                Full Name
              </Label>
              <Input
                id="mgr-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Suman Chandra"
                className="h-10 rounded-xl"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="mgr-email" className="text-xs font-bold text-zinc-500 uppercase">
                Email Address
              </Label>
              <Input
                id="mgr-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. manager@domain.com"
                className="h-10 rounded-xl"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="mgr-phone" className="text-xs font-bold text-zinc-500 uppercase">
                Phone Number
              </Label>
              <Input
                id="mgr-phone"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="e.g. +1 (555) 010-0000"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Title */}
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="mgr-title" className="text-xs font-bold text-zinc-500 uppercase">
                Advisor Title
              </Label>
              <Input
                id="mgr-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lead Loan Advisor"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Speciality */}
            <div className="space-y-1.5 col-span-2 sm:col-span-1">
              <Label htmlFor="mgr-speciality" className="text-xs font-bold text-zinc-500 uppercase">
                Speciality Category
              </Label>
              <Input
                id="mgr-speciality"
                value={speciality}
                onChange={(e) => setSpeciality(e.target.value)}
                placeholder="e.g. Homeowner Loans"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Rating */}
            <div className="space-y-1.5">
              <Label htmlFor="mgr-rating" className="text-xs font-bold text-zinc-500 uppercase">
                Initial Rating
              </Label>
              <Input
                id="mgr-rating"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                placeholder="e.g. 4.9"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Reviews Count */}
            <div className="space-y-1.5">
              <Label htmlFor="mgr-reviews" className="text-xs font-bold text-zinc-500 uppercase">
                Reviews Count
              </Label>
              <Input
                id="mgr-reviews"
                type="number"
                value={reviewsCount}
                onChange={(e) => setReviewsCount(Number(e.target.value))}
                placeholder="e.g. 150"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Sort order */}
            <div className="space-y-1.5">
              <Label htmlFor="mgr-sort" className="text-xs font-bold text-zinc-500 uppercase">
                Sort Order
              </Label>
              <Input
                id="mgr-sort"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                placeholder="e.g. 1"
                className="h-10 rounded-xl"
              />
            </div>

            {/* Available channels checkbox */}
            <div className="col-span-2 space-y-2 border-t border-zinc-100 pt-3">
              <span className="block text-xs font-bold text-zinc-500 uppercase">
                Communication Channels
              </span>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-zinc-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availableCallTypes.includes("phone_call")}
                    onChange={() => handleToggleCallType("phone_call")}
                    className="h-4.5 w-4.5 rounded border-zinc-300 focus:ring-zinc-800"
                  />
                  Phone Calls
                </label>
                <label className="flex items-center gap-2 text-sm text-zinc-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={availableCallTypes.includes("live_chat")}
                    onChange={() => handleToggleCallType("live_chat")}
                    className="h-4.5 w-4.5 rounded border-zinc-300 focus:ring-zinc-800"
                  />
                  Live Chat
                </label>
              </div>
            </div>

            {/* Is Active selection */}
            <div className="col-span-2 space-y-2 border-t border-zinc-100 pt-3">
              <span className="block text-xs font-bold text-zinc-500 uppercase">
                Account Status
              </span>
              <label className="flex items-center gap-2 text-sm text-zinc-700 font-semibold cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4.5 w-4.5 rounded border-zinc-300 focus:ring-zinc-800"
                />
                Active & Booking Slots Available
              </label>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-4 border-t border-zinc-100">
            <Button
              type="button"
              variant="secondary"
              onClick={() => onOpenChange(false)}
              className="h-10 px-4 rounded-xl text-xs font-bold text-zinc-600 border border-zinc-200/60 bg-zinc-50 cursor-pointer"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSaving}
              className="h-10 px-5 rounded-xl text-xs font-bold bg-zinc-900 hover:bg-zinc-950 text-white cursor-pointer flex items-center gap-1.5"
            >
              {isSaving && <Loader2 className="h-3.5 w-3.5 animate-spin" />}
              {isEditMode ? "Save Profile Changes" : "Register Staff"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
