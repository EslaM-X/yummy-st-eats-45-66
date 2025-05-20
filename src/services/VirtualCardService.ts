import { supabase } from "@/integrations/supabase/client";

interface TransactionRequestData {
  card_number: string;
  cvv: string;
  amount: number;
  order_id: number | string;
}

interface RefundRequestData {
  orderId: number | string;
  amount: number;
  reason?: string;
}

interface TransactionResponse {
  transaction_id: number;
  status: string;
}

interface RefundResponse {
  status: string;
  refund_txn_id: number;
  new_wallet_bal: number;
  new_card_bal: number;
}

interface TransactionStats {
  total_payments: number;
  total_refunds: number;
  payment_count: number;
  refund_count: number;
  net_revenue: number;
}

interface TransactionRecord {
  id: number;
  date: string;
  type: 'payment' | 'refund';
  amount: number;
  status: 'completed' | 'pending' | 'failed' | 'frozen';
  orderId: string | number;
  cardNumber?: string;
  customer?: {
    name: string;
    email: string;
  };
}

interface CardDetails {
  cardNumber: string;
  type: string;
  expiryDate: string;
  balance: number;
  status: 'active' | 'blocked' | 'expired';
  lastUsed?: string;
}

export class VirtualCardService {
  /**
   * Check if a card number is valid
   */
  public static isCardNumberValid(cardNumber: string): boolean {
    // Basic validation: check if it's 16 digits (spaces allowed)
    const sanitizedNumber = cardNumber.replace(/\s/g, '');
    if (sanitizedNumber.length !== 16) {
      return false;
    }
    
    // Check if digits only
    if (!/^\d+$/.test(sanitizedNumber)) {
      return false;
    }
    
    // Mock Luhn algorithm check (in a real app, this would be more thorough)
    return true;
  }
  
  /**
   * Check if CVV is valid
   */
  public static isCvvValid(cvv: string): boolean {
    // Basic validation: check if it's 3-4 digits
    return /^\d{3,4}$/.test(cvv);
  }
  
  /**
   * Create a payment transaction
   */
  public static async createPaymentTransaction(data: TransactionRequestData): Promise<any> {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("User must be authenticated to process payment");
      }
      
      const { data: result, error } = await supabase.functions.invoke("process-payment", {
        body: {
          card_number: data.card_number,
          cvv: data.cvv,
          amount: data.amount,
          order_id: data.order_id.toString()
        }
      });
      
      if (error) {
        console.error("Payment function error:", error);
        throw new Error(error.message || "Failed to process payment");
      }
      
      return result;
    } catch (error) {
      console.error('Error creating payment transaction:', error);
      throw error;
    }
  }

  /**
   * Get admin transactions
   */
  public static async getAdminTransactions(): Promise<any[]> {
    try {
      // In a real app, fetch from Supabase
      const { data, error } = await supabase
        .from('st_virtual_card_transactions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Format data for display
      return data.map((tx: any) => ({
        id: tx.id,
        order_id: tx.order_id,
        transaction_id: tx.transaction_id,
        user: 'مستخدم',
        email: 'user@example.com',
        type: tx.transaction_type,
        amount: tx.amount,
        card_last_four: tx.card_last_four,
        status: tx.status,
        created_at: tx.created_at,
        formatted_date: new Date(tx.created_at).toLocaleDateString('ar-SA')
      }));
    } catch (error) {
      console.error('Error fetching admin transactions:', error);
      return [];
    }
  }
  
  /**
   * Get user transactions
   */
  public static async getUserTransactions(): Promise<any[]> {
    try {
      // Check if user is authenticated
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        return [];
      }
      
      // Fetch transactions for the user
      const { data, error } = await supabase
        .from('st_virtual_card_transactions')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      // Format transactions for display
      return data.map((tx: any) => ({
        id: tx.id,
        date: new Date(tx.created_at).toLocaleDateString('ar-SA'),
        type: tx.transaction_type,
        amount: tx.amount,
        status: tx.status,
        orderId: tx.order_id,
        cardLastFour: tx.card_last_four,
        transactionId: tx.transaction_id
      }));
    } catch (error) {
      console.error('Error fetching user transactions:', error);
      return [];
    }
  }
  
  /**
   * Get pending refund requests
   */
  public static async getPendingRefunds(status: string = 'pending'): Promise<any[]> {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("User must be authenticated to view refunds");
      }
      
      const { data: result, error } = await supabase.functions.invoke("get-pending-refunds", {
        query: { status }
      });
      
      if (error) {
        console.error("Get refunds function error:", error);
        throw new Error(error.message || "Failed to retrieve refund requests");
      }
      
      return result.data || [];
    } catch (error) {
      console.error('Error fetching pending refunds:', error);
      return [];
    }
  }
  
  /**
   * Processes a card payment transaction
   */
  public static async processPayment(data: TransactionRequestData): Promise<TransactionResponse> {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("User must be authenticated to process payment");
      }
      
      const { data: result, error } = await supabase.functions.invoke("process-payment", {
        body: {
          card_number: data.card_number,
          cvv: data.cvv,
          amount: data.amount,
          order_id: data.order_id.toString()
        }
      });
      
      if (error) {
        console.error("Payment function error:", error);
        throw new Error(error.message || "Failed to process payment");
      }
      
      return {
        transaction_id: result.transaction_id,
        status: result.status || 'frozen'
      };
    } catch (error) {
      console.error('Payment processing error:', error);
      throw error;
    }
  }
  
  /**
   * Processes a refund transaction
   */
  public static async processRefund(data: RefundRequestData): Promise<RefundResponse> {
    try {
      const { data: session } = await supabase.auth.getSession();
      
      if (!session.session) {
        throw new Error("User must be authenticated to process refund");
      }
      
      const { data: result, error } = await supabase.functions.invoke("process-refund", {
        body: {
          order_id: data.orderId,
          amount: data.amount,
          reason: data.reason
        }
      });
      
      if (error) {
        console.error("Refund function error:", error);
        throw new Error(error.message || "Failed to process refund");
      }
      
      return {
        status: result.status || 'success',
        refund_txn_id: result.refund_txn_id,
        new_wallet_bal: result.new_wallet_bal || 0,
        new_card_bal: result.new_card_bal || 0
      };
    } catch (error) {
      console.error('Refund processing error:', error);
      throw error;
    }
  }
  
  /**
   * Get transaction statistics
   */
  public static async getTransactionStats(): Promise<TransactionStats> {
    try {
      // Get payments data
      const { data: payments, error: paymentsError } = await supabase
        .from('st_virtual_card_transactions')
        .select('amount')
        .eq('transaction_type', 'payment');
        
      if (paymentsError) throw paymentsError;
      
      // Get refunds data
      const { data: refunds, error: refundsError } = await supabase
        .from('refund_transactions')
        .select('amount');
        
      if (refundsError) throw refundsError;
      
      // Calculate totals
      const total_payments = payments.reduce((sum, tx) => sum + Number(tx.amount), 0);
      const total_refunds = refunds.reduce((sum, tx) => sum + Number(tx.amount), 0);
      
      return {
        total_payments,
        total_refunds,
        payment_count: payments.length,
        refund_count: refunds.length,
        net_revenue: total_payments - total_refunds
      };
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
      // Return fallback data if there's an error
      return {
        total_payments: 0,
        total_refunds: 0,
        payment_count: 0,
        refund_count: 0,
        net_revenue: 0
      };
    }
  }
  
  /**
   * Get recent transactions list
   */
  public static async getRecentTransactions(limit: number = 10): Promise<TransactionRecord[]> {
    try {
      // Get recent payment transactions
      const { data: payments, error: paymentsError } = await supabase
        .from('st_virtual_card_transactions')
        .select(`
          id,
          created_at,
          transaction_type,
          amount,
          status,
          order_id,
          card_last_four,
          transaction_id,
          profiles:user_id (
            full_name,
            username
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
        
      if (paymentsError) throw paymentsError;
      
      // Get recent refund transactions
      const { data: refunds, error: refundsError } = await supabase
        .from('refund_transactions')
        .select(`
          id,
          created_at,
          amount,
          status,
          order_id,
          transaction_id,
          profiles:user_id (
            full_name,
            username
          )
        `)
        .order('created_at', { ascending: false })
        .limit(limit);
        
      if (refundsError) throw refundsError;
      
      // Combine and sort transactions
      const combinedTransactions = [
        ...payments.map((p: any) => ({
          id: p.id,
          date: p.created_at,
          type: 'payment' as const,
          amount: Number(p.amount),
          status: p.status,
          orderId: p.order_id,
          cardNumber: p.card_last_four ? `•••• •••• •••• ${p.card_last_four}` : undefined,
          customer: {
            name: p.profiles?.full_name || 'Unknown User',
            email: p.profiles?.username || 'unknown@example.com'
          }
        })),
        ...refunds.map((r: any) => ({
          id: r.id,
          date: r.created_at,
          type: 'refund' as const,
          amount: Number(r.amount),
          status: r.status,
          orderId: r.order_id,
          customer: {
            name: r.profiles?.full_name || 'Unknown User',
            email: r.profiles?.username || 'unknown@example.com'
          }
        }))
      ];
      
      // Sort by date descending
      combinedTransactions.sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      
      return combinedTransactions.slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      return [];
    }
  }
  
  /**
   * Get virtual card details
   */
  public static async getCardDetails(cardNumber: string): Promise<CardDetails> {
    try {
      // In a real application, this would fetch data from an API or database
      // For demo purposes, we're returning mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get only last 4 digits of card number for security
      const lastFour = cardNumber.replace(/\s/g, '').slice(-4);
      
      return {
        cardNumber: `•••• •••• •••• ${lastFour}`,
        type: 'ST Virtual Card',
        expiryDate: '12/26',
        balance: 1450.75,
        status: 'active',
        lastUsed: '2025-05-19T14:23:45'
      };
    } catch (error) {
      console.error('Error fetching card details:', error);
      throw error;
    }
  }
  
  /**
   * Get customer details by ID
   */
  public static async getCustomerDetails(customerId: string) {
    try {
      // In a real application, this would fetch data from an API or database
      // For demo purposes, we're returning mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 600));
      
      const customerData = {
        id: customerId,
        name: 'أحمد محمد',
        email: 'ahmad@example.com',
        phone: '+966501234567',
        registerDate: '2025-01-15',
        totalOrders: 12,
        totalSpent: 1876.50,
        status: 'active'
      };
      
      return customerData;
    } catch (error) {
      console.error('Error fetching customer details:', error);
      throw error;
    }
  }
}
