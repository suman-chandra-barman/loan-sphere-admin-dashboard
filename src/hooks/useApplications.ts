import { useState, useMemo } from "react";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  AlertCircle, 
  ShieldCheck 
} from "lucide-react";
import { LoanApplication } from "@/types/application";
import { INITIAL_APPLICATIONS } from "@/data/mockApplications";

export const ITEMS_PER_PAGE = 8;

export const UNIQUE_STATUSES = [
  "All", 
  "Approved", 
  "Under Review", 
  "AI Assessment", 
  "Submitted", 
  "Pending Documents", 
  "Rejected", 
  "Draft", 
  "Cond. Approved"
];

export const UNIQUE_TYPES = [
  "All", 
  "Home Loan", 
  "Personal Loan", 
  "Vehicle Loan", 
  "Business Loan", 
  "Education Loan", 
  "Debt Consolidation"
];

export function useApplications() {
  const [applications, setApplications] = useState<LoanApplication[]>(INITIAL_APPLICATIONS);
  
  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  
  // Drawer Detail State
  const [selectedAppCode, setSelectedAppCode] = useState<string | null>(null);

  // Reset pagination when filter or search changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement> | string) => {
    const value = typeof e === "string" ? e : e.target.value;
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    setCurrentPage(1);
  };

  const handleTypeFilter = (type: string) => {
    setTypeFilter(type);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("All");
    setTypeFilter("All");
    setCurrentPage(1);
  };

  const toggleFiltersPanel = () => {
    setIsFiltersOpen(prev => !prev);
  };

  // Filtered Applications logic
  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch = 
        app.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        app.code.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesStatus = statusFilter === "All" || app.status === statusFilter;
      const matchesType = typeFilter === "All" || app.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [applications, searchQuery, statusFilter, typeFilter]);

  // Paginated rows logic
  const totalPages = Math.ceil(filteredApplications.length / ITEMS_PER_PAGE) || 1;
  const paginatedApplications = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredApplications.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  }, [filteredApplications, currentPage]);

  const selectedApp = useMemo(() => {
    return applications.find((app) => app.code === selectedAppCode) || null;
  }, [applications, selectedAppCode]);

  // Change Application Status logic
  const handleUpdateStatus = (code: string, newStatus: string) => {
    setApplications(prev => prev.map(app => {
      if (app.code === code) {
        const timestamp = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        
        let timelineIcon = Clock;
        let timelineColor = "text-amber-600 bg-amber-50";
        if (newStatus === "Approved") { timelineIcon = CheckCircle2; timelineColor = "text-emerald-600 bg-emerald-50"; }
        if (newStatus === "Rejected") { timelineIcon = XCircle; timelineColor = "text-rose-600 bg-rose-50"; }
        if (newStatus === "AI Assessment") { timelineIcon = Brain; timelineColor = "text-purple-600 bg-purple-50"; }
        if (newStatus === "Pending Documents") { timelineIcon = AlertCircle; timelineColor = "text-orange-600 bg-orange-50"; }
        
        const updatedTimeline = [
          ...app.details.timeline,
          { label: `Status updated to ${newStatus}`, date: timestamp, icon: timelineIcon, color: timelineColor }
        ];

        return {
          ...app,
          status: newStatus,
          details: {
            ...app.details,
            timeline: updatedTimeline
          }
        };
      }
      return app;
    }));
  };

  // Toggle Document Checklist logic
  const handleToggleChecklist = (code: string, checklistKey: keyof LoanApplication["details"]["checklist"]) => {
    setApplications(prev => prev.map(app => {
      if (app.code === code) {
        const updatedChecklist = {
          ...app.details.checklist,
          [checklistKey]: !app.details.checklist[checklistKey]
        };

        // If checking/unchecking, log it in the timeline
        const timestamp = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const label = `${checklistKey.replace(/([A-Z])/g, " $1")} checklist updated`;

        return {
          ...app,
          details: {
            ...app.details,
            checklist: updatedChecklist,
            timeline: [
              ...app.details.timeline,
              { label, date: timestamp, icon: ShieldCheck, color: "text-blue-600 bg-blue-50" }
            ]
          }
        };
      }
      return app;
    }));
  };

  return {
    applications,
    searchQuery,
    statusFilter,
    typeFilter,
    isFiltersOpen,
    currentPage,
    selectedAppCode,
    filteredApplications,
    totalPages,
    paginatedApplications,
    selectedApp,
    handleSearchChange,
    handleStatusFilter,
    handleTypeFilter,
    handleResetFilters,
    toggleFiltersPanel,
    setCurrentPage,
    setSelectedAppCode,
    handleUpdateStatus,
    handleToggleChecklist
  };
}
