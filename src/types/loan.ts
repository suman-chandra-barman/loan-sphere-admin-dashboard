export interface LoanType {
  id: string;
  name: string;
  icon: "Home" | "Car" | "Briefcase" | "GraduationCap" | "Wallet";
  description?: string;
  templateId: string;
  status: "Active" | "Inactive";
}

export interface LoanTemplateSection {
  id: string;
  title: string;
  content: string;
}

export interface LoanTemplate {
  id: string;
  name: string;
  sectionsCount: number;
  lastUpdated: string;
  status: "Published" | "Draft";
  sections: LoanTemplateSection[];
}
