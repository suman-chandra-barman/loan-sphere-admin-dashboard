export interface EnrichedDetails {
  applications: number;
  creditScore: number | string;
  joined: string;
  phone: string;
  employer: string;
  address: string;
  employment: string;
  income: string;
  memberSince: string;
  avatarBg?: string;
}

export const ENRICHED_USER_DETAILS: Record<string, EnrichedDetails> = {
  "sarah@example.com": {
    applications: 2,
    creditScore: 742,
    joined: "Jan 2024",
    phone: "+1 (555) 010-1234",
    employer: "TechCorp Inc.",
    address: "123 Main St, San Francisco, CA 94105",
    employment: "full time",
    income: "$85,000",
    memberSince: "Jan 15, 2024",
    avatarBg: "bg-[#A31D1D]"
  },
  "marcus@example.com": {
    applications: 2,
    creditScore: 698,
    joined: "Feb 2024",
    phone: "+1 (555) 010-5678",
    employer: "DesignStudio",
    address: "456 Oak Ave, Los Angeles, CA 90015",
    employment: "full time",
    income: "$92,000",
    memberSince: "Feb 10, 2024",
    avatarBg: "bg-[#A31D1D]"
  },
  "emily@example.com": {
    applications: 2,
    creditScore: 785,
    joined: "Mar 2024",
    phone: "+1 (555) 010-9012",
    employer: "BioHealth Group",
    address: "789 Pine Rd, Boston, MA 02110",
    employment: "full time",
    income: "$105,000",
    memberSince: "Mar 05, 2024",
    avatarBg: "bg-[#A31D1D]"
  },
  "robert@example.com": {
    applications: 2,
    creditScore: 661,
    joined: "Mar 2024",
    phone: "+1 (555) 010-3456",
    employer: "Apex Logistics",
    address: "321 Elm St, Chicago, IL 60601",
    employment: "full time",
    income: "$78,000",
    memberSince: "Mar 12, 2024",
    avatarBg: "bg-[#A31D1D]"
  },
  "james@example.com": {
    applications: 1,
    creditScore: 720,
    joined: "Apr 2024",
    phone: "+1 (555) 010-7890",
    employer: "EduLearn Inc.",
    address: "654 Spruce St, Seattle, WA 98101",
    employment: "full time",
    income: "$65,000",
    memberSince: "Apr 01, 2024",
    avatarBg: "bg-[#A31D1D]"
  },
  "lisa@example.com": {
    applications: 2,
    creditScore: 580,
    joined: "Apr 2024",
    phone: "+1 (555) 010-2345",
    employer: "Self Employed",
    address: "987 Cedar Ln, Austin, TX 78701",
    employment: "contract",
    income: "$110,000",
    memberSince: "Apr 18, 2024",
    avatarBg: "bg-[#A31D1D]"
  },
  "david@example.com": {
    applications: 1,
    creditScore: 710,
    joined: "May 2024",
    phone: "+1 (555) 010-6789",
    employer: "BuildCorp LLC",
    address: "159 Maple Dr, Miami, FL 33101",
    employment: "full time",
    income: "$82,000",
    memberSince: "May 14, 2024",
    avatarBg: "bg-[#A31D1D]"
  },
  "admin@loansphere.com": {
    applications: 0,
    creditScore: "—",
    joined: "Dec 2023",
    phone: "+1 (555) 010-0000",
    employer: "Loan Sphere",
    address: "HQ Office, New York, NY 10001",
    employment: "full time",
    income: "$120,000",
    memberSince: "Dec 01, 2023",
    avatarBg: "bg-slate-700"
  }
};

export function getEnrichedDetails(email: string, fullName: string): EnrichedDetails {
  const emailLower = email.toLowerCase();
  
  // Find key that matches or is part of email
  const foundKey = Object.keys(ENRICHED_USER_DETAILS).find(
    (k) => emailLower.includes(k) || k.includes(emailLower)
  );

  if (foundKey) {
    return ENRICHED_USER_DETAILS[foundKey];
  }

  // Generate deterministic details for other API users
  let sum = 0;
  for (let i = 0; i < fullName.length; i++) {
    sum += fullName.charCodeAt(i);
  }
  const creditScore = 580 + (sum % 220); // 580 to 800
  const applications = sum % 3; // 0 to 2
  const incomeVal = 55 + (sum % 95); // 55k to 150k
  const joinedYear = 2023 + (sum % 2);
  const joinedMonthNum = (sum % 12) + 1;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const joinedMonth = monthNames[joinedMonthNum - 1];

  return {
    applications,
    creditScore,
    joined: `${joinedMonth} ${joinedYear}`,
    phone: `+1 (555) 010-${1000 + (sum % 9000)}`,
    employer: "Enterprise Solutions",
    address: "456 Corp Parkway, New York, NY 10022",
    employment: "full time",
    income: `$${incomeVal.toLocaleString()}`,
    memberSince: `${joinedMonth} ${sum % 28 + 1}, ${joinedYear}`,
    avatarBg: "bg-[#A31D1D]"
  };
}
