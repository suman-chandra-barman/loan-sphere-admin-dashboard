import { useState, useEffect, useMemo } from "react";
import { LoanType, LoanTemplate, LoanTemplateSection } from "@/types/loan";
import { INITIAL_LOAN_TYPES, INITIAL_TEMPLATES } from "@/data/mockLoans";

export type LoanManagementView = "dashboard" | "templates" | "add-type" | "edit-type" | "edit-template";

export function useLoanManagement() {
  const [loanTypes, setLoanTypes] = useState<LoanType[]>([]);
  const [loanTemplates, setLoanTemplates] = useState<LoanTemplate[]>([]);
  const [currentView, setCurrentView] = useState<LoanManagementView>("dashboard");
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [initialized, setInitialized] = useState(false);

  // Load from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTypes = localStorage.getItem("loan_types");
      const savedTemplates = localStorage.getItem("loan_templates");

      if (savedTypes) {
        try {
          setLoanTypes(JSON.parse(savedTypes));
        } catch (e) {
          console.error("Failed to parse loan types", e);
          setLoanTypes(INITIAL_LOAN_TYPES);
        }
      } else {
        setLoanTypes(INITIAL_LOAN_TYPES);
        localStorage.setItem("loan_types", JSON.stringify(INITIAL_LOAN_TYPES));
      }

      if (savedTemplates) {
        try {
          setLoanTemplates(JSON.parse(savedTemplates));
        } catch (e) {
          console.error("Failed to parse loan templates", e);
          setLoanTemplates(INITIAL_TEMPLATES);
        }
      } else {
        setLoanTemplates(INITIAL_TEMPLATES);
        localStorage.setItem("loan_templates", JSON.stringify(INITIAL_TEMPLATES));
      }
      setInitialized(true);
    }
  }, []);

  // Save to localStorage
  const updateLoanTypesState = (newTypes: LoanType[]) => {
    setLoanTypes(newTypes);
    if (typeof window !== "undefined") {
      localStorage.setItem("loan_types", JSON.stringify(newTypes));
    }
  };

  const updateLoanTemplatesState = (newTemplates: LoanTemplate[]) => {
    setLoanTemplates(newTemplates);
    if (typeof window !== "undefined") {
      localStorage.setItem("loan_templates", JSON.stringify(newTemplates));
    }
  };

  // Helper date formatter
  const getFormattedDate = () => {
    return new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  // View switchers
  const navigateTo = (view: LoanManagementView, typeId: string | null = null, templateId: string | null = null) => {
    setCurrentView(view);
    setSelectedTypeId(typeId);
    setSelectedTemplateId(templateId);
  };

  // --- LOAN TYPES ACTIONS ---

  const addLoanType = (type: Omit<LoanType, "id">) => {
    const newType: LoanType = {
      ...type,
      id: `loan-${Date.now()}`
    };
    const updated = [...loanTypes, newType];
    updateLoanTypesState(updated);
  };

  const updateLoanType = (id: string, updatedFields: Partial<LoanType>) => {
    const updated = loanTypes.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
    updateLoanTypesState(updated);
  };

  const deleteLoanType = (id: string) => {
    const updated = loanTypes.filter((t) => t.id !== id);
    updateLoanTypesState(updated);
  };

  const toggleLoanTypeStatus = (id: string) => {
    const updated = loanTypes.map((t) => {
      if (t.id === id) {
        return {
          ...t,
          status: t.status === "Active" ? ("Inactive" as const) : ("Active" as const)
        };
      }
      return t;
    });
    updateLoanTypesState(updated);
  };

  // --- LOAN TEMPLATES ACTIONS ---

  const addLoanTemplate = (name: string) => {
    const newTemplate: LoanTemplate = {
      id: `tpl-${Date.now()}`,
      name,
      sectionsCount: 0,
      lastUpdated: getFormattedDate(),
      status: "Draft",
      sections: []
    };
    const updated = [...loanTemplates, newTemplate];
    updateLoanTemplatesState(updated);
    return newTemplate.id;
  };

  const updateLoanTemplate = (id: string, name: string) => {
    const updated = loanTemplates.map((t) =>
      t.id === id ? { ...t, name, lastUpdated: getFormattedDate() } : t
    );
    updateLoanTemplatesState(updated);
  };

  const deleteLoanTemplate = (id: string) => {
    // Also clear templateId assignment from loan types
    const updatedTypes = loanTypes.map((t) => (t.templateId === id ? { ...t, templateId: "" } : t));
    updateLoanTypesState(updatedTypes);

    const updatedTemplates = loanTemplates.filter((t) => t.id !== id);
    updateLoanTemplatesState(updatedTemplates);
  };

  const publishTemplate = (id: string) => {
    const updated = loanTemplates.map((t) =>
      t.id === id ? { ...t, status: "Published" as const, lastUpdated: getFormattedDate() } : t
    );
    updateLoanTemplatesState(updated);
  };

  // --- TEMPLATE SECTIONS ACTIONS ---

  const addTemplateSection = (templateId: string, title: string, content: string) => {
    const updated = loanTemplates.map((t) => {
      if (t.id === templateId) {
        const newSection: LoanTemplateSection = {
          id: `sec-${Date.now()}`,
          title,
          content
        };
        const updatedSections = [...t.sections, newSection];
        return {
          ...t,
          sections: updatedSections,
          sectionsCount: updatedSections.length,
          lastUpdated: getFormattedDate()
        };
      }
      return t;
    });
    updateLoanTemplatesState(updated);
  };

  const updateTemplateSection = (
    templateId: string,
    sectionId: string,
    title: string,
    content: string
  ) => {
    const updated = loanTemplates.map((t) => {
      if (t.id === templateId) {
        const updatedSections = t.sections.map((s) => (s.id === sectionId ? { ...s, title, content } : s));
        return {
          ...t,
          sections: updatedSections,
          lastUpdated: getFormattedDate()
        };
      }
      return t;
    });
    updateLoanTemplatesState(updated);
  };

  const deleteTemplateSection = (templateId: string, sectionId: string) => {
    const updated = loanTemplates.map((t) => {
      if (t.id === templateId) {
        const updatedSections = t.sections.filter((s) => s.id !== sectionId);
        return {
          ...t,
          sections: updatedSections,
          sectionsCount: updatedSections.length,
          lastUpdated: getFormattedDate()
        };
      }
      return t;
    });
    updateLoanTemplatesState(updated);
  };

  const reorderTemplateSections = (templateId: string, reorderedSections: LoanTemplateSection[]) => {
    const updated = loanTemplates.map((t) => {
      if (t.id === templateId) {
        return {
          ...t,
          sections: reorderedSections,
          lastUpdated: getFormattedDate()
        };
      }
      return t;
    });
    updateLoanTemplatesState(updated);
  };

  // Memoized lookups for forms
  const selectedType = useMemo(() => {
    return loanTypes.find((t) => t.id === selectedTypeId) || null;
  }, [loanTypes, selectedTypeId]);

  const selectedTemplate = useMemo(() => {
    return loanTemplates.find((t) => t.id === selectedTemplateId) || null;
  }, [loanTemplates, selectedTemplateId]);

  // Statistics summaries
  const stats = useMemo(() => {
    const totalTypes = loanTypes.length;
    const activeTypes = loanTypes.filter((t) => t.status === "Active").length;
    const inactiveTypes = totalTypes - activeTypes;

    const totalTpls = loanTemplates.length;
    const publishedTpls = loanTemplates.filter((t) => t.status === "Published").length;
    const draftTpls = totalTpls - publishedTpls;

    const totalSections = loanTemplates.reduce((acc, t) => acc + (t.sections?.length || 0), 0);
    const avgSections = totalTpls > 0 ? parseFloat((totalSections / totalTpls).toFixed(1)) : 0;

    return {
      totalTypes,
      activeTypes,
      inactiveTypes,
      totalTemplates: totalTpls,
      publishedTemplates: publishedTpls,
      draftTemplates: draftTpls,
      avgSections
    };
  }, [loanTypes, loanTemplates]);

  return {
    initialized,
    loanTypes,
    loanTemplates,
    currentView,
    selectedTypeId,
    selectedTemplateId,
    selectedType,
    selectedTemplate,
    stats,
    navigateTo,
    addLoanType,
    updateLoanType,
    deleteLoanType,
    toggleLoanTypeStatus,
    addLoanTemplate,
    updateLoanTemplate,
    deleteLoanTemplate,
    publishTemplate,
    addTemplateSection,
    updateTemplateSection,
    deleteTemplateSection,
    reorderTemplateSections
  };
}
