import { useState, useMemo, useEffect } from "react";
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  AlertCircle, 
  ShieldCheck,
  FileText,
  TrendingUp,
  Upload,
  StickyNote
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

const LucideIconMap: Record<string, React.ComponentType<any>> = {
  Clock,
  CheckCircle2,
  XCircle,
  Brain,
  AlertCircle,
  ShieldCheck,
  FileText,
  TrendingUp,
  Upload,
  StickyNote
};

function serializeApps(apps: LoanApplication[]): string {
  const data = apps.map(app => {
    const serializedTimeline = app.details.timeline.map(event => {
      let iconName = "Clock";
      if (typeof event.icon === "string") {
        iconName = event.icon;
      } else {
        const found = Object.keys(LucideIconMap).find(key => LucideIconMap[key] === event.icon);
        if (found) iconName = found;
      }
      return { ...event, icon: iconName };
    });
    return {
      ...app,
      details: {
        ...app.details,
        timeline: serializedTimeline
      }
    };
  });
  return JSON.stringify(data);
}

function deserializeApps(jsonStr: string): LoanApplication[] {
  const parsed = JSON.parse(jsonStr) as any[];
  return parsed.map(app => {
    const deserializedTimeline = (app.details.timeline || []).map((event: any) => ({
      ...event,
      icon: LucideIconMap[event.icon] || Clock
    }));
    return {
      ...app,
      details: {
        ...app.details,
        timeline: deserializedTimeline
      }
    };
  });
}

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

  // Sync state with localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("loan_applications");
      if (saved) {
        try {
          const deserialized = deserializeApps(saved);
          
          // Enrich if documents and notes are missing
          const enriched = deserialized.map(app => {
            let docs = app.details.documents;
            if (!docs) {
              docs = [
                { id: `${app.code}-doc-1`, name: "Pay Stub - January 2024.pdf", size: "245 KB", date: app.date, status: "Approved" },
                { id: `${app.code}-doc-2`, name: "Bank Statement - Nov 2023.pdf", size: "1.2 MB", date: app.date, status: "Approved" },
                { id: `${app.code}-doc-3`, name: "Bank Statement - Dec 2023.pdf", size: "1.1 MB", date: app.date, status: "Approved" },
                { id: `${app.code}-doc-4`, name: "Tax Return 2022.pdf", size: "892 KB", date: app.date, status: "Approved" },
                { id: `${app.code}-doc-5`, name: "Property Appraisal Report.pdf", size: "3.4 MB", date: app.date, status: "Approved" }
              ];
            }
            let notes = app.details.notes;
            if (!notes) {
              notes = [
                { id: `${app.code}-note-1`, author: "Alex Rivera", content: "Strong credit history, stable employment. Approved with standard terms.", date: `${app.date}, 04:00 PM` }
              ];
            }
            return {
              ...app,
              details: {
                ...app.details,
                documents: docs,
                notes: notes
              }
            };
          });

          setApplications(enriched);
        } catch (e) {
          console.error("Failed to load applications from localStorage", e);
        }
      } else {
        const enriched = INITIAL_APPLICATIONS.map(app => {
          let docs = app.details.documents;
          if (!docs) {
            docs = [
              { id: `${app.code}-doc-1`, name: "Pay Stub - January 2024.pdf", size: "245 KB", date: app.date, status: "Approved" },
              { id: `${app.code}-doc-2`, name: "Bank Statement - Nov 2023.pdf", size: "1.2 MB", date: app.date, status: "Approved" },
              { id: `${app.code}-doc-3`, name: "Bank Statement - Dec 2023.pdf", size: "1.1 MB", date: app.date, status: "Approved" },
              { id: `${app.code}-doc-4`, name: "Tax Return 2022.pdf", size: "892 KB", date: app.date, status: "Approved" },
              { id: `${app.code}-doc-5`, name: "Property Appraisal Report.pdf", size: "3.4 MB", date: app.date, status: "Approved" }
            ];
          }
          let notes = app.details.notes;
          if (!notes) {
            notes = [
              { id: `${app.code}-note-1`, author: "Alex Rivera", content: "Strong credit history, stable employment. Approved with standard terms.", date: `${app.date}, 04:00 PM` }
            ];
          }
          return {
            ...app,
            details: {
              ...app.details,
              documents: docs,
              notes: notes
            }
          };
        });
        setApplications(enriched);
        localStorage.setItem("loan_applications", serializeApps(enriched));
      }
    }
  }, []);

  const updateApplicationsState = (updated: LoanApplication[]) => {
    setApplications(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("loan_applications", serializeApps(updated));
    }
  };

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
    const updated = applications.map(app => {
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
          { label: `Status updated to ${newStatus}`, date: `Alex Rivera • ${timestamp}`, icon: timelineIcon, color: timelineColor }
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
    });
    updateApplicationsState(updated);
  };

  // Toggle Document Checklist logic
  const handleToggleChecklist = (code: string, checklistKey: keyof LoanApplication["details"]["checklist"]) => {
    const updated = applications.map(app => {
      if (app.code === code) {
        const updatedChecklist = {
          ...app.details.checklist,
          [checklistKey]: !app.details.checklist[checklistKey]
        };

        const timestamp = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const keyLabel = checklistKey.replace(/([A-Z])/g, " $1");
        const label = `${keyLabel.charAt(0).toUpperCase() + keyLabel.slice(1)} checklist updated`;

        return {
          ...app,
          details: {
            ...app.details,
            checklist: updatedChecklist,
            timeline: [
              ...app.details.timeline,
              { label, date: `Alex Rivera • ${timestamp}`, icon: ShieldCheck, color: "text-blue-600 bg-blue-50" }
            ]
          }
        };
      }
      return app;
    });
    updateApplicationsState(updated);
  };

  // Update specific document status
  const handleUpdateDocumentStatus = (code: string, docId: string, status: "Approved" | "Rejected" | "Pending") => {
    const updated = applications.map(app => {
      if (app.code === code) {
        const updatedDocs = (app.details.documents || []).map(doc => {
          if (doc.id === docId) {
            return { ...doc, status };
          }
          return doc;
        });

        const timestamp = new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
        const docName = (app.details.documents || []).find(d => d.id === docId)?.name || "Document";
        const label = `Document '${docName}' status updated to ${status}`;

        return {
          ...app,
          details: {
            ...app.details,
            documents: updatedDocs,
            timeline: [
              ...app.details.timeline,
              { label, date: `Alex Rivera • ${timestamp}`, icon: ShieldCheck, color: "text-blue-600 bg-blue-50" }
            ]
          }
        };
      }
      return app;
    });
    updateApplicationsState(updated);
  };

  // Add custom note/comment
  const handleAddNote = (code: string, noteContent: string) => {
    const updated = applications.map(app => {
      if (app.code === code) {
        const timestamp = new Date().toLocaleString("en-US", { 
          month: "short", 
          day: "numeric", 
          year: "numeric", 
          hour: "2-digit", 
          minute: "2-digit" 
        });
        const newNote = {
          id: `${code}-note-${Date.now()}`,
          author: "Alex Rivera",
          content: noteContent,
          date: timestamp
        };
        const label = `Admin note added: "${noteContent.substring(0, 30)}${noteContent.length > 30 ? "..." : ""}"`;

        return {
          ...app,
          details: {
            ...app.details,
            notes: [...(app.details.notes || []), newNote],
            timeline: [
              ...app.details.timeline,
              { label, date: `Alex Rivera • ${timestamp}`, icon: StickyNote, color: "text-zinc-500 bg-zinc-50" }
            ]
          }
        };
      }
      return app;
    });
    updateApplicationsState(updated);
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
    handleToggleChecklist,
    handleUpdateDocumentStatus,
    handleAddNote
  };
}
