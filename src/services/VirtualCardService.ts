
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
  private static readonly API_KEY = process.env.ST_VPC_API_KEY || 'demo-api-key';
  
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
      // Here we would normally call an API or insert into Supabase
      const { data: transaction, error } = await supabase
        .from('st_virtual_card_transactions')
        .insert({
          card_number: data.card_number,
          cvv: data.cvv,
          amount: data.amount,
          order_id: data.order_id.toString(),
          transaction_type: 'payment',
          status: 'processing',
          card_last_four: data.card_number.slice(-4),
          transaction_id: `TXN-${Math.floor(Math.random() * 10000000)}`
        })
        .select()
        .single();
      
      if (error) throw error;
      
      return transaction;
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
   * Processes a card payment transaction
   */
  public static async processPayment(data: TransactionRequestData): Promise<TransactionResponse> {
    try {
      // In a real application, this would make an API call to a payment gateway
      // For demo purposes, we're simulating a successful response
      
      // For future integration with Supabase Functions
      // const { data: response, error } = await supabase.functions.invoke('st-payment', {
      //   body: JSON.stringify(data)
      // });
      
      // if (error) throw new Error(error.message);
      // return response;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful transaction
      const response: TransactionResponse = {
        transaction_id: Math.floor(Math.random() * 1000) + 500,
        status: 'frozen'  // Transactions start in frozen state until confirmed
      };
      
      console.log('Payment processed:', response);
      return response;
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
      // In a real application, this would make an API call to a payment gateway
      // For demo purposes, we're simulating a successful response
      
      // For future integration with Supabase Functions
      // const { data: response, error } = await supabase.functions.invoke('st-refund', {
      //   body: JSON.stringify({
      //     order_id: data.orderId,
      //     amount: data.amount,
      //     reason: data.reason
      //   })
      // });
      
      // if (error) throw new Error(error.message);
      // return response;
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful refund
      const response: RefundResponse = {
        status: 'success',
        refund_txn_id: Math.floor(Math.random() * 1000) + 500,
        new_wallet_bal: 1250.75 - data.amount,
        new_card_bal: 75.50 + data.amount
      };
      
      console.log('Refund processed:', response);
      return response;
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
      // In a real application, this would fetch data from an API or database
      // For demo purposes, we're returning mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      return {
        total_payments: 14587.50,
        total_refunds: 1243.25,
        payment_count: 167,
        refund_count: 23,
        net_revenue: 13344.25
      };
    } catch (error) {
      console.error('Error fetching transaction stats:', error);
      throw error;
    }
  }
  
  /**
   * Get recent transactions list
   */
  public static async getRecentTransactions(limit: number = 10): Promise<TransactionRecord[]> {
    try {
      // In a real application, this would fetch data from an API or database
      // For demo purposes, we're returning mock data
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      const transactions: TransactionRecord[] = [
        {
          id: 4231,
          date: '2025-05-19T14:23:45',
          type: 'payment',
          amount: 156.50,
          status: 'completed',
          orderId: 'ORD-9021',
          cardNumber: '•••• •••• •••• 3841',
          customer: {
            name: 'أحمد محمد',
            email: 'ahmad@example.com'
          }
        },
        {
          id: 4230,
          date: '2025-05-19T13:45:12',
          type: 'refund',
          amount: 42.75,
          status: 'completed',
          orderId: 'ORD-9018',
          cardNumber: '•••• •••• •••• 5294',
          customer: {
            name: 'سارة عبدالله',
            email: 'sara@example.com'
          }
        },
        {
          id: 4229,
          date: '2025-05-19T11:32:09',
          type: 'payment',
          amount: 214.25,
          status: 'frozen',
          orderId: 'ORD-9017',
          cardNumber: '•••• •••• •••• 7712',
          customer: {
            name: 'خالد العمري',
            email: 'khalid@example.com'
          }
        },
        {
          id: 4228,
          date: '2025-05-19T10:17:54',
          type: 'payment',
          amount: 78.00,
          status: 'completed',
          orderId: 'ORD-9016',
          cardNumber: '•••• •••• •••• 1187',
          customer: {
            name: 'نورة السعيد',
            email: 'noura@example.com'
          }
        },
        {
          id: 4227,
          date: '2025-05-18T21:05:33',
          type: 'payment',
          amount: 135.50,
          status: 'completed',
          orderId: 'ORD-9015',
          cardNumber: '•••• •••• •••• 9234',
          customer: {
            name: 'فهد القحطاني',
            email: 'fahad@example.com'
          }
        },
        {
          id: 4226,
          date: '2025-05-18T18:56:21',
          type: 'refund',
          amount: 67.25,
          status: 'completed',
          orderId: 'ORD-9012',
          cardNumber: '•••• •••• •••• 6318',
          customer: {
            name: 'هدى الشمري',
            email: 'huda@example.com'
          }
        }
      ];
      
      return transactions.slice(0, limit);
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      throw error;
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
