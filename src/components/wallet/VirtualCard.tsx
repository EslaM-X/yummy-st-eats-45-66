
import React from 'react';

interface VirtualCardProps {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  balance: number;
  status: string;
}

// This is a simple placeholder component after removing wallet functionality
const VirtualCard: React.FC<VirtualCardProps> = ({
  cardNumber,
  expiryDate,
  cvv,
  balance,
  status
}) => {
  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
      <div className="text-lg mb-4">Virtual Card (Placeholder)</div>
      <div className="text-xl font-bold mb-2">{balance} ST</div>
      <div className="text-sm opacity-80">Status: {status}</div>
    </div>
  );
};

export default VirtualCard;
