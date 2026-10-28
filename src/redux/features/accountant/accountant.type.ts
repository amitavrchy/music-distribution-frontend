/* eslint-disable @typescript-eslint/no-explicit-any */
// Accountant Dashboard types
export interface EarningsBreakdownItem {
  platform: string;
  grossEarnings: string;
  commission: string;
  netEarnings: string;
}

export interface AccountantDashboardData {
  totalEarnings: string;
  platformCommission: string;
  netEarnings: string;
  earningsBreakdown: EarningsBreakdownItem[];
  pendingPaymentAmount: string;
}

export interface AccountantDashboardResponse {
  success: boolean;
  message: string;
  data: AccountantDashboardData;
}

// Payments and Earnings types
export interface EarningsOverviewItem {
  platform: string;
  amount: string;
}

export interface PendingPaymentItem {
  id: string;
  source: string;
  amount: string;
  date: string;
}

export interface PaymentHistoryItem {
  id: string;
  date: string;
  clientName: string;
  amount: string;
  method: string;
}

export interface PaymentsEarningsData {
  totalPlatformEarnings: string;
  earningsOverview: EarningsOverviewItem[];
  pendingPayments: PendingPaymentItem[];
  paymentHistory: PaymentHistoryItem[];
}

export interface PaymentsEarningsResponse {
  success: boolean;
  message: string;
  data: PaymentsEarningsData;
}

// Profit & Loss types
export interface MonthlyProfitLossData {
  month: string;
  income: number;
  expense: number;
}

export interface ClientProfitLossData {
  clientName: string;
  income: string;
  expenses: string;
}

export interface ProfitLossData {
  monthlyData: MonthlyProfitLossData[];
  clientData: ClientProfitLossData[];
}

export interface ProfitLossResponse {
  success: boolean;
  message: string;
  data: ProfitLossData;
}

// Client Financials types
export interface ClientFinancial {
  clientFinId: string;
  clientName: string;
  email: string;
  totalEarning: string;
  pendingPayment: string;
  lastPaymentDate: string;
}

export interface PaginationMetadata {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export interface ClientFinancialsData {
  data: ClientFinancial[];
  metadata: PaginationMetadata;
}

export interface ClientFinancialsResponse {
  success: boolean;
  message: string;
  data: ClientFinancial[];
  metadata: PaginationMetadata;
}

export interface ClientFinancialsQueryParams {
  page?: number;
  limit?: number;
}

// Yearly Statements types
export interface YearlyStatement {
  year: number;
  totalAmount: string;
  statements: any[]; // Can be refined based on actual statement structure
}

export interface YearlyStatementsResponse {
  success: boolean;
  message: string;
  data: YearlyStatement[];
}

// Accountant Settings types
export interface AccountantSettingsData {
  settingsId: string;
  userId: string;
  fullName: string | null;
  email: string | null;
  phoneNumber: string | null;
  profilePhoto: string | null;
  defaultCurrency: string;
  paymentGateway: string;
  twoFactorEnabled: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface AccountantSettingsResponse {
  success: boolean;
  message: string;
  data: AccountantSettingsData;
}

export interface UpdateAccountantSettingsPayload {
  fullName?: string;
  email?: string;
  phoneNumber?: string;
  defaultCurrency?: string;
  paymentGateway?: string;
  twoFactorEnabled?: boolean;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}
