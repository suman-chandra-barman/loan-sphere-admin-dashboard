export interface CaseManager {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  initials: string;
  title: string;
  speciality: string;
  rating: string;
  reviewsCount: number;
  avatarUrl: string | null;
  availableCallTypes: string[];
  isActive: boolean;
  slotsApi: string;
}

export interface AvailabilityRule {
  id: string;
  weekday: number;
  weekdayLabel: string;
  startTime: string;
  endTime: string;
  slotDurationMinutes: number;
  breakStartTime: string;
  breakEndTime: string;
  isActive: boolean;
}

export interface AppointmentReminder {
  enabled: boolean;
  minutesBefore: number;
  message: string;
}

export interface AppointmentCustomer {
  id: string;
  name: string;
  email: string;
  initials: string;
  role: string;
  isAdmin: boolean;
}

export interface AppointmentActions {
  canCancel: boolean;
  canReschedule: boolean;
  cancelApi: string;
  rescheduleApi: string;
}

export interface Appointment {
  id: string;
  status: string;
  statusLabel: string;
  callType: string;
  callTypeLabel: string;
  date: string;
  dateLabel: string;
  time: string;
  timeLabel: string;
  startsAt: string;
  endsAt: string;
  note: string | null;
  cancelReason: string | null;
  reminder: AppointmentReminder;
  manager: CaseManager;
  customer: AppointmentCustomer;
  application: any | null;
  actions: AppointmentActions;
  createdAt: string;
  updatedAt: string;
}

// Request and Response schemas
export interface CaseManagersResponse {
  success: boolean;
  message: string;
  meta: Record<string, any>;
  data: CaseManager[];
  requestId: string;
}

export interface SingleCaseManagerResponse {
  success: boolean;
  message: string;
  meta: Record<string, any>;
  data: CaseManager;
  requestId: string;
}

export interface CreateCaseManagerParams {
  name: string;
  email: string;
  phone_number: string;
  title: string;
  speciality: string;
  rating: string;
  reviews_count: number;
  available_call_types: string[];
  is_active: boolean;
  sort_order?: number;
}

export interface UpdateCaseManagerParams extends Partial<CreateCaseManagerParams> {
  id: string;
}

export interface AvailabilityListResponse {
  success: boolean;
  message: string;
  meta: Record<string, any>;
  data: {
    manager: CaseManager;
    availability: AvailabilityRule[];
  };
  requestId: string;
}

export interface CreateAvailabilityParams {
  weekdays: number[];
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  break_start_time: string;
  break_end_time: string;
  is_active: boolean;
}

export interface UpdateAvailabilityRuleParams {
  ruleId: string;
  weekday: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  break_start_time: string;
  break_end_time: string;
  is_active: boolean;
}

export interface AvailabilityRuleUpdateResponse {
  success: boolean;
  message: string;
  meta: Record<string, any>;
  data: {
    manager: CaseManager;
    availability: AvailabilityRule;
  };
  requestId: string;
}

export interface AppointmentsResponse {
  success: boolean;
  message: string;
  meta: Record<string, any>;
  data: Appointment[];
  requestId: string;
}

export interface SingleAppointmentResponse {
  success: boolean;
  message: string;
  meta: Record<string, any>;
  data: Appointment;
  requestId: string;
}

export interface UpdateAppointmentStatusParams {
  id: string;
  status: string;
}
