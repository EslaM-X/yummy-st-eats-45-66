
// This is a simple mock implementation of VirtualCardService 
// after removing wallet functionality

/**
 * Mock service for virtual card operations
 */
export class VirtualCardService {
  /**
   * Mock method to validate card number
   */
  static isCardNumberValid(cardNumber: string): boolean {
    const normalizedCardNumber = cardNumber.replace(/\s+/g, '');
    return normalizedCardNumber.length >= 16 && normalizedCardNumber.length <= 19;
  }

  /**
   * Mock method to validate CVV
   */
  static isCvvValid(cvv: string): boolean {
    return cvv.length >= 3 && cvv.length <= 4;
  }

  /**
   * Mock method for payment transaction
   */
  static async createPaymentTransaction(data: any): Promise<any> {
    // Mock successful payment response
    return Promise.resolve({
      transaction_id: `TXN-${Math.floor(Math.random() * 1000000)}`,
      status: 'completed',
      amount: data.amount,
      created_at: new Date().toISOString()
    });
  }

  /**
   * Mock method for refund transaction
   */
  static async createRefundTransaction(data: any): Promise<any> {
    // Mock successful refund response
    return Promise.resolve({
      refund_txn_id: Math.floor(Math.random() * 1000000),
      status: 'completed',
      amount: data.amount,
      created_at: new Date().toISOString()
    });
  }

  /**
   * Mock method for user transactions
   */
  static async getUserTransactions(): Promise<any[]> {
    // Return empty array since wallet functionality is removed
    return Promise.resolve([]);
  }
}
