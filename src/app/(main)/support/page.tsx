"use client";

import { useState } from "react";
import { Plus, User, CalendarDays, RefreshCw } from "lucide-react";
import { useGetCaseManagersQuery, useGetAppointmentsQuery } from "@/redux/api/supportApi";
import ManagerCard from "@/components/support/ManagerCard";
import ManagerModal from "@/components/support/ManagerModal";
import AvailabilityModal from "@/components/support/AvailabilityModal";
import AppointmentTable from "@/components/support/AppointmentTable";
import ErrorState from "@/components/ui/ErrorState";
import { Skeleton } from "@/components/ui/skeleton";
import type { CaseManager } from "@/types/support";

export default function SupportPage() {
  const [activeTab, setActiveTab] = useState<"managers" | "appointments">("managers");

  // Fetch list queries
  const {
    data: managersData,
    isLoading: isManagersLoading,
    error: managersError,
    refetch: refetchManagers,
  } = useGetCaseManagersQuery();

  const {
    data: appointmentsData,
    isLoading: isAppointmentsLoading,
    error: appointmentsError,
    refetch: refetchAppointments,
  } = useGetAppointmentsQuery();

  // Modals management
  const [isManagerModalOpen, setIsManagerModalOpen] = useState(false);
  const [selectedManagerToEdit, setSelectedManagerToEdit] = useState<CaseManager | null>(null);

  const [isAvailabilityModalOpen, setIsAvailabilityModalOpen] = useState(false);
  const [selectedManagerForSched, setSelectedManagerForSched] = useState<CaseManager | null>(null);

  // Appointment filters state
  const [apptStatusFilter, setApptStatusFilter] = useState<string>("");

  const managersList = managersData?.data || [];
  const appointmentsList = appointmentsData?.data || [];

  // Filter appointments list
  const filteredAppointments = apptStatusFilter
    ? appointmentsList.filter((a) => a.status === apptStatusFilter)
    : appointmentsList;

  const handleEditManager = (manager: CaseManager) => {
    setSelectedManagerToEdit(manager);
    setIsManagerModalOpen(true);
  };

  const handleOpenAddManager = () => {
    setSelectedManagerToEdit(null);
    setIsManagerModalOpen(true);
  };

  const handleManageAvailability = (manager: CaseManager) => {
    setSelectedManagerForSched(manager);
    setIsAvailabilityModalOpen(true);
  };

  const apptTabs = [
    { label: "All Bookings", value: "" },
    { label: "Scheduled", value: "scheduled" },
    { label: "Completed", value: "completed" },
    { label: "Cancelled", value: "cancelled" },
  ];

  if (managersError || appointmentsError) {
    return (
      <div className="space-y-6 pb-12 min-h-screen">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Support & Scheduling</h1>
          <p className="text-zinc-500 text-sm font-semibold">Manage staff advisor profiles and customer appointments</p>
        </div>
        <ErrorState
          title="Failed to Load Support Services"
          description="We had a problem loading scheduling or case manager details. Check database connection and verify services."
          onRetry={() => {
            refetchManagers();
            refetchAppointments();
          }}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 min-h-screen">
      {/* Title Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Support & Scheduling</h1>
        <p className="text-zinc-500 text-sm font-semibold">Manage staff advisor profiles and customer appointments</p>
      </div>

      {/* Tabs Navigation (Modern line-based tab bar) */}
      <div className="border-b border-zinc-200/80 flex gap-6 pt-2 shrink-0">
        <button
          onClick={() => setActiveTab("managers")}
          className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "managers"
              ? "border-zinc-950 text-zinc-950 font-extrabold"
              : "border-transparent text-zinc-450 hover:text-zinc-700 hover:border-zinc-300"
          }`}
        >
          <User className="h-4 w-4" />
          <span>Case Managers</span>
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          className={`flex items-center gap-2 pb-3.5 text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === "appointments"
              ? "border-zinc-950 text-zinc-950 font-extrabold"
              : "border-transparent text-zinc-450 hover:text-zinc-700 hover:border-zinc-300"
          }`}
        >
          <CalendarDays className="h-4 w-4" />
          <span>Customer Bookings</span>
        </button>
      </div>

      {/* MANAGERS TAB VIEW */}
      {activeTab === "managers" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center bg-white p-4 border border-zinc-200/60 rounded-2xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-zinc-855">Advisors Listing</h3>
              <p className="text-xs text-zinc-450 font-medium">Manage specialties, contact ratings, and weekly schedule rules.</p>
            </div>
            <button
              onClick={handleOpenAddManager}
              className="inline-flex items-center gap-1.5 h-10 px-4 rounded-xl bg-zinc-900 hover:bg-zinc-950 text-white text-xs font-bold shadow-sm transition-all active:scale-98 cursor-pointer shrink-0"
            >
              <Plus className="h-4 w-4" />
              Register Staff
            </button>
          </div>

          {isManagersLoading ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-64 rounded-2xl w-full" />
              ))}
            </div>
          ) : managersList.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {managersList.map((mgr) => (
                <ManagerCard
                  key={mgr.id}
                  manager={mgr}
                  onEdit={handleEditManager}
                  onManageAvailability={handleManageAvailability}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white border border-zinc-200/60 shadow-sm rounded-2xl">
              <User className="h-10 w-10 mx-auto text-zinc-300 mb-2" />
              <p className="text-sm font-bold text-zinc-800">No Advisors Registered</p>
              <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-1">
                You haven't added any case managers yet. Register your first advisor to configure weekly bookings.
              </p>
            </div>
          )}
        </div>
      )}

      {/* APPOINTMENTS TAB VIEW */}
      {activeTab === "appointments" && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 bg-white p-4 border border-zinc-200/60 rounded-2xl shadow-xs">
            <div>
              <h3 className="text-sm font-bold text-zinc-855">Customer Support Bookings</h3>
              <p className="text-xs text-zinc-450 font-medium">Verify customer notes, scheduled advisor staff details, and booking channels.</p>
            </div>

            {/* Segmented status filter */}
            <div className="flex bg-zinc-100 p-1 rounded-xl border border-zinc-200/30 self-start lg:self-auto">
              {apptTabs.map((tab) => {
                const isActive = apptStatusFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    onClick={() => setApptStatusFilter(tab.value)}
                    className={`px-3.5 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                      isActive
                        ? "bg-white text-zinc-900 shadow-2xs font-semibold"
                        : "text-zinc-500 hover:text-zinc-850"
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Table list */}
          <AppointmentTable appointments={filteredAppointments} isLoading={isAppointmentsLoading} />
        </div>
      )}

      {/* Register / Edit Advisor Modal */}
      <ManagerModal
        open={isManagerModalOpen}
        onOpenChange={setIsManagerModalOpen}
        managerToEdit={selectedManagerToEdit}
      />

      {/* Manage Scheduler Availability rules modal */}
      <AvailabilityModal
        open={isAvailabilityModalOpen}
        onOpenChange={setIsAvailabilityModalOpen}
        manager={selectedManagerForSched}
      />
    </div>
  );
}
