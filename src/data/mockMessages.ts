export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string; // ISO string or simple display string
  isFromAdmin: boolean;
}

export interface Conversation {
  id: string; // Maps to userId
  userId: string;
  userFullName: string;
  userInitials: string;
  userEmail: string;
  userStatus: "active" | "inactive";
  avatarBg: string;
  lastMessage: string;
  timestamp: string; // Last message display timestamp
  unreadCount: number;
  messages: Message[];
}

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: "usr-1",
    userId: "usr-1",
    userFullName: "Sarah Johnson",
    userInitials: "SJ",
    userEmail: "sarah@example.com",
    userStatus: "active",
    avatarBg: "bg-[#A31D1D]", // Primary red theme color for consistency
    lastMessage: "Thank you! I'll upload them right away.",
    timestamp: "Mar 14, 2024",
    unreadCount: 0,
    messages: [
      {
        id: "msg-1-1",
        senderId: "admin-1",
        senderName: "Alex Rivera",
        text: "Hi Sarah! I'm reviewing your home loan application. Everything looks great so far.",
        timestamp: "Mar 13, 2024",
        isFromAdmin: true,
      },
      {
        id: "msg-1-2",
        senderId: "usr-1",
        senderName: "Sarah Johnson",
        text: "Thank you! I'm really excited about this. Is there anything else you need from me?",
        timestamp: "Mar 13, 2024",
        isFromAdmin: false,
      },
      {
        id: "msg-1-3",
        senderId: "admin-1",
        senderName: "Alex Rivera",
        text: "Yes, I need your last 3 months' bank statements and most recent pay stubs. Could you upload those through the documents section?",
        timestamp: "Mar 14, 2024",
        isFromAdmin: true,
      },
      {
        id: "msg-1-4",
        senderId: "usr-1",
        senderName: "Sarah Johnson",
        text: "Thank you! I'll upload them right away.",
        timestamp: "Mar 14, 2024",
        isFromAdmin: false,
      },
    ],
  },
  {
    id: "usr-2",
    userId: "usr-2",
    userFullName: "Marcus Davis",
    userInitials: "MD",
    userEmail: "marcus@example.com",
    userStatus: "active",
    avatarBg: "bg-amber-700",
    lastMessage: "Could you clarify the conditions for re...",
    timestamp: "Mar 15, 2024",
    unreadCount: 2,
    messages: [
      {
        id: "msg-2-1",
        senderId: "admin-1",
        senderName: "Alex Rivera",
        text: "Hi Marcus, how is your loan template setup going?",
        timestamp: "Mar 15, 2024",
        isFromAdmin: true,
      },
      {
        id: "msg-2-2",
        senderId: "usr-2",
        senderName: "Marcus Davis",
        text: "Hey, it's going fine, but I have a quick question about the interest rates.",
        timestamp: "Mar 15, 2024",
        isFromAdmin: false,
      },
      {
        id: "msg-2-3",
        senderId: "usr-2",
        senderName: "Marcus Davis",
        text: "Could you clarify the conditions for refinancing under the new rates?",
        timestamp: "Mar 15, 2024",
        isFromAdmin: false,
      },
    ],
  },
  {
    id: "usr-3",
    userId: "usr-3",
    userFullName: "Emily Chen",
    userInitials: "EC",
    userEmail: "emily@example.com",
    userStatus: "active",
    avatarBg: "bg-purple-700",
    lastMessage: "Great, when can I expect the funds to...",
    timestamp: "Jan 30, 2024",
    unreadCount: 1,
    messages: [
      {
        id: "msg-3-1",
        senderId: "admin-1",
        senderName: "Alex Rivera",
        text: "Hi Emily, your loan application has been approved and moved to final underwriting.",
        timestamp: "Jan 30, 2024",
        isFromAdmin: true,
      },
      {
        id: "msg-3-2",
        senderId: "usr-3",
        senderName: "Emily Chen",
        text: "Great, when can I expect the funds to be disbursed to my account?",
        timestamp: "Jan 30, 2024",
        isFromAdmin: false,
      },
    ],
  },
  {
    id: "usr-5",
    userId: "usr-5",
    userFullName: "James Thompson",
    userInitials: "JT",
    userEmail: "james@example.com",
    userStatus: "active",
    avatarBg: "bg-emerald-700",
    lastMessage: "Thank you for approving the business loan",
    timestamp: "Mar 05, 2024",
    unreadCount: 0,
    messages: [
      {
        id: "msg-5-1",
        senderId: "admin-1",
        senderName: "Alex Rivera",
        text: "Hi James, we've reviewed the documents for the business expansion loan and everything checks out. The contract is ready for your signature.",
        timestamp: "Mar 05, 2024",
        isFromAdmin: true,
      },
      {
        id: "msg-5-2",
        senderId: "usr-5",
        senderName: "James Thompson",
        text: "Thank you for approving the business loan! I'll sign it tonight.",
        timestamp: "Mar 05, 2024",
        isFromAdmin: false,
      },
    ],
  },
];
