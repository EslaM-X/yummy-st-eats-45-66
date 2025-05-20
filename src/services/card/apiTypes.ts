
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
}

export interface RefundResponse {
  status: string;
  refund_txn_id: number;
  new_wallet_bal: number;
  new_card_bal: number;
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
