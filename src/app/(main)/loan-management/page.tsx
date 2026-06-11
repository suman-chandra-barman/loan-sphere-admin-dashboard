"use client";

import React, { useRef } from "react";
import { Plus } from "lucide-react";
import { useLoanManagement } from "@/hooks/useLoanManagement";
import StatsCards from "@/components/loan-management/StatsCards";
import NavSectionCards from "@/components/loan-management/NavSectionCards";
import LoanTypeCard from "@/components/loan-management/LoanTypeCard";
import LoanTypeForm from "@/components/loan-management/LoanTypeForm";
import LoanTemplatesList from "@/components/loan-management/LoanTemplatesList";
import TemplateDetailEdit from "@/components/loan-management/TemplateDetailEdit";
import { Button } from "@/components/ui/button";

export default function LoanManagementPage() {
  const {
    initialized,
    loanTypes,
    loanTemplates,
    currentView,
    selectedType,
    selectedTemplate,
    stats,
    navigateTo,
    addLoanType,
    updateLoanType,
    deleteLoanType,
    toggleLoanTypeStatus,
    addLoanTemplate,
    deleteLoanTemplate,
    publishTemplate,
    addTemplateSection,
    updateTemplateSection,
    deleteTemplateSection,
    reorderTemplateSections
  } = useLoanManagement();

  const typesSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToTypes = () => {
    typesSectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!initialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#A31D1D]"></div>
      </div>
    );
  }

  // --- SUBVIEW RENDERING ROUTER ---

  if (currentView === "templates") {
    return (
      <div className="pb-12">
        <LoanTemplatesList
          templates={loanTemplates}
          onBack={() => navigateTo("dashboard")}
          onEditTemplate={(id) => navigateTo("edit-template", null, id)}
          onCreateTemplate={addLoanTemplate}
          onDeleteTemplate={deleteLoanTemplate}
        />
      </div>
    );
  }

  if (currentView === "edit-template") {
    if (!selectedTemplate) {
      return (
        <div className="p-8 text-center text-zinc-500 bg-white rounded-2xl border border-zinc-200">
          <p>Template not found or has been deleted.</p>
          <button
            onClick={() => navigateTo("templates")}
            className="text-[#A31D1D] font-bold underline mt-2 inline-block cursor-pointer"
          >
            Return to templates list
          </button>
        </div>
      );
    }
    return (
      <div className="pb-12">
        <TemplateDetailEdit
          template={selectedTemplate}
          onBack={() => navigateTo("templates")}
          onPublish={publishTemplate}
          onAddSection={addTemplateSection}
          onUpdateSection={updateTemplateSection}
          onDeleteSection={deleteTemplateSection}
          onReorderSections={reorderTemplateSections}
        />
      </div>
    );
  }

  if (currentView === "add-type" || currentView === "edit-type") {
    return (
      <div className="pb-12">
        <LoanTypeForm
          loanType={selectedType}
          templates={loanTemplates}
          onCancel={() => navigateTo("dashboard")}
          onSave={(data) => {
            if (currentView === "edit-type" && selectedType) {
              updateLoanType(selectedType.id, data);
            } else {
              addLoanType(data);
            }
            navigateTo("dashboard");
          }}
        />
      </div>
    );
  }

  // --- DEFAULT DASHBOARD VIEW ---
  return (
    <div className="space-y-8 pb-12 relative min-h-screen">
      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900">
            Loan Management
          </h1>
          <p className="text-sm font-semibold text-zinc-400">
            Manage loan types, templates, and configurations
          </p>
        </div>

        <Button
          onClick={() => navigateTo("templates")}
          className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold flex items-center gap-2 h-10 rounded-xl px-4 cursor-pointer self-start sm:self-auto shadow-sm transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Loan Template
        </Button>
      </div>

      {/* Aggregate Stats Cards */}
      <StatsCards stats={stats} />

      {/* Primary Navigation shortcuts */}
      <NavSectionCards
        stats={{
          totalTypes: stats.totalTypes,
          totalTemplates: stats.totalTemplates
        }}
        onNavigateToTemplates={() => navigateTo("templates")}
        onScrollToTypes={handleScrollToTypes}
      />

      {/* Loan Types Section */}
      <div ref={typesSectionRef} className="pt-2">
        <div className="flex items-center justify-between border-b border-zinc-200/60 pb-4 mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-zinc-900">Loan Products</h2>
            <p className="text-xs font-semibold text-zinc-400 mt-0.5">
              Available loan products and their agreement associations
            </p>
          </div>
          <Button
            onClick={() => navigateTo("add-type")}
            className="bg-[#A31D1D] hover:bg-[#8B1818] text-white font-semibold flex items-center gap-2 h-10 rounded-xl px-4 cursor-pointer shadow-xs transition-colors"
          >
            <Plus className="h-4 w-4" />
            Add Loan Type
          </Button>
        </div>

        {/* Loan Types Grid */}
        {loanTypes.length === 0 ? (
          <div className="py-16 text-center text-zinc-400 border border-dashed border-zinc-200 rounded-2xl bg-white shadow-xs">
            No loan types configured. Click &quot;Add Loan Type&quot; to define your first product.
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {loanTypes.map((type) => {
              const assignedTpl = loanTemplates.find((t) => t.id === type.templateId);
              return (
                <LoanTypeCard
                  key={type.id}
                  loanType={type}
                  assignedTemplateName={assignedTpl ? assignedTpl.name : "No template assigned"}
                  onEdit={() => navigateTo("edit-type", type.id)}
                  onDelete={() => deleteLoanType(type.id)}
                  onToggleStatus={() => toggleLoanTypeStatus(type.id)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}