import { LoanType, LoanTemplate } from "@/types/loan";

export const INITIAL_TEMPLATES: LoanTemplate[] = [
  {
    id: "tpl-1",
    name: "Standard Home Loan Template",
    sectionsCount: 5,
    lastUpdated: "Apr 20, 2026",
    status: "Published",
    sections: [
      {
        id: "sec-1-1",
        title: "Loan Amount",
        content: "The total principal amount being borrowed under this agreement, subject to approval and verification."
      },
      {
        id: "sec-1-2",
        title: "Interest Rate & Repayments",
        content: "Annual interest rate, repayment schedule, frequency, and total cost over the loan term."
      },
      {
        id: "sec-1-3",
        title: "Security Address",
        content: "Physical address and details of the property being used as security for this loan."
      },
      {
        id: "sec-1-4",
        title: "Borrower Obligations",
        content: "Responsibilities of the borrower including timely payments, property maintenance, and insurance requirements."
      },
      {
        id: "sec-1-5",
        title: "Default & Consequences",
        content: "Conditions that constitute default and the legal consequences including foreclosure rights."
      }
    ]
  },
  {
    id: "tpl-2",
    name: "Vehicle Financing Template",
    sectionsCount: 4,
    lastUpdated: "Apr 15, 2026",
    status: "Published",
    sections: [
      {
        id: "sec-2-1",
        title: "Vehicle Details",
        content: "Make, model, year, and VIN of the vehicle being financed under this agreement."
      },
      {
        id: "sec-2-2",
        title: "Down Payment & Principal",
        content: "Down payment details, interest rate, and total principal amount financed."
      },
      {
        id: "sec-2-3",
        title: "Repayment Schedule",
        content: "Monthly installment values, due dates, and grace periods."
      },
      {
        id: "sec-2-4",
        title: "Insurance Clause",
        content: "Mandatory comprehensive insurance coverage requirements for the duration of the loan."
      }
    ]
  },
  {
    id: "tpl-3",
    name: "Commercial Loan Template",
    sectionsCount: 7,
    lastUpdated: "Apr 25, 2026",
    status: "Published",
    sections: [
      {
        id: "sec-3-1",
        title: "Business Profile",
        content: "Corporate legal name, registration details, and primary business address."
      },
      {
        id: "sec-3-2",
        title: "Loan Allocation",
        content: "Detailed description of how the commercial funds will be deployed."
      },
      {
        id: "sec-3-3",
        title: "Collateral Details",
        content: "Business assets or property designated as collateral for the loan."
      },
      {
        id: "sec-3-4",
        title: "Guarantor Details",
        content: "Personal guarantee details from major shareholders or business partners."
      },
      {
        id: "sec-3-5",
        title: "Covenant Restrictions",
        content: "Financial covenants and restrictions on additional business debt."
      },
      {
        id: "sec-3-6",
        title: "Interest Rates & Audits",
        content: "Floating interest details and quarterly audits terms."
      },
      {
        id: "sec-3-7",
        title: "Termination Conditions",
        content: "Conditions under which the lender can demand full immediate repayment."
      }
    ]
  },
  {
    id: "tpl-4",
    name: "Student Financing Template",
    sectionsCount: 3,
    lastUpdated: "Apr 28, 2026",
    status: "Draft",
    sections: [
      {
        id: "sec-4-1",
        title: "Academic Enrollment",
        content: "Proof of enrollment, institution name, and program duration."
      },
      {
        id: "sec-4-2",
        title: "Disbursement Schedule",
        content: "Tuition payments scheduled directly to the academic institution."
      },
      {
        id: "sec-4-3",
        title: "Grace Period & Repayment",
        content: "Deferred repayment terms until six months post-graduation."
      }
    ]
  },
  {
    id: "tpl-5",
    name: "Personal Finance Template",
    sectionsCount: 4,
    lastUpdated: "Apr 18, 2026",
    status: "Published",
    sections: [
      {
        id: "sec-5-1",
        title: "Borrower Identification",
        content: "Official identification, verified current address, and employment details."
      },
      {
        id: "sec-5-2",
        title: "Loan Term & APR",
        content: "Fixed APR, monthly repayment duration, and loan origination fees."
      },
      {
        id: "sec-5-3",
        title: "Repayment Authorization",
        content: "ACH authorization for automatic monthly debits."
      },
      {
        id: "sec-5-4",
        title: "Prepayment Policy",
        content: "Terms allowing early repayment without penalties."
      }
    ]
  }
];

export const INITIAL_LOAN_TYPES: LoanType[] = [
  {
    id: "loan-1",
    name: "Home Loan",
    icon: "Home",
    description: "Standard home loan configurations for property buyers.",
    templateId: "tpl-1",
    status: "Active"
  },
  {
    id: "loan-2",
    name: "Car Loan",
    icon: "Car",
    description: "Vehicle financing options for personal and commercial cars.",
    templateId: "tpl-2",
    status: "Active"
  },
  {
    id: "loan-3",
    name: "Business Loan",
    icon: "Briefcase",
    description: "Commercial loan options for startups and small-to-medium businesses.",
    templateId: "tpl-3",
    status: "Active"
  },
  {
    id: "loan-4",
    name: "Education Loan",
    icon: "GraduationCap",
    description: "Student financing plans for academic programs and tuition fees.",
    templateId: "tpl-4",
    status: "Inactive"
  },
  {
    id: "loan-5",
    name: "Personal Loan",
    icon: "Wallet",
    description: "Personal finance loans for personal expenses and bills.",
    templateId: "tpl-5",
    status: "Active"
  }
];
