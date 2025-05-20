
/**
 * أنواع البيانات المستخدمة في واجهة برمجة التطبيقات (API)
 */

// تعريف الأنواع المستخدمة في طلبات وردود الواجهة البرمجية
export interface PaymentRequest {
  card_number: string;
  cvv: string;
  amount: number;
  order_id: number;
}

export interface RefundRequest {
  order_id: number;
  amount: number;
}

export interface PaymentResponse {
  transaction_id: number;
  status: string;
  amount?: number;
  timestamp?: string;
}

export interface RefundResponse {
  status: string;
  refund_txn_id: number;
  new_wallet_bal: number;
  new_card_bal: number;
  timestamp?: string;
}

export interface ApiErrorResponse {
  code: string;
  message: string;
  data: {
    status: number;
  };
}

export interface Transaction {
  id: number | string;
  transaction_id: string;
  amount: number;
  type: 'payment' | 'refund';
  status: string;
  created_at: string;
}

export interface WalletDetails {
  balance: number;
  pending_amount: number;
  card_balance: number;
  currency: string;
  last_updated: string;
  status: 'active' | 'suspended' | 'limited';
}

export interface UserCard {
  id: string;
  card_number: string;
  masked_number: string;
  expiry_date: string;
  cvv: string;
  type: 'virtual' | 'physical';
  status: 'active' | 'frozen' | 'disabled';
  balance: number;
  currency: string;
  last_used?: string;
}

export interface TransactionFilters {
  startDate?: Date;
  endDate?: Date;
  type?: 'payment' | 'refund' | 'all';
  status?: string;
  minAmount?: number;
  maxAmount?: number;
}

export interface TransactionsResponse {
  data: Transaction[];
  total: number;
  page: number;
  limit: number;
}

export interface TopUpRequest {
  amount: number;
  source: 'bank' | 'credit_card' | 'crypto';
  source_details: {
    [key: string]: any;
  };
}

export interface TopUpResponse {
  transaction_id: string;
  status: string;
  amount: number;
  fees: number;
  final_amount: number;
  timestamp: string;
}

export interface CardActivationRequest {
  card_id: string;
  action: 'activate' | 'freeze' | 'disable';
}

export interface CardActivationResponse {
  card_id: string;
  status: string;
  message: string;
}
