
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to my-orders page
    navigate('/my-orders');
  }, [navigate]);

  // This component won't render anything as it immediately redirects
  return null;
};

export default OrdersPage;
