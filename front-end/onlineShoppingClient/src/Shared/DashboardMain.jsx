import React, { useContext } from 'react';
import { AuthContex } from './AuthProvider';
import useAllPaymentInfo from '../Hooks/useAllPaymentInfo';
import Loading from '../Route/Loading';

const DashboardMain = () => {
  const { user } = useContext(AuthContex);
  const [allPayments, loading] = useAllPaymentInfo();

  if (loading) {
    return <Loading />;
  }

  const totalAmount = allPayments.reduce((total, item) => total + parseFloat(item.amount || 0), 0);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-center text-blue-700">Dashboard Summary</h2>
        <p className="text-lg font-medium mb-2">👋 Welcome, <span className="font-semibold text-gray-800">{user.displayName}</span></p>
        <p className="text-lg font-medium mb-2">💰 Total Sold Amount: <span className="font-semibold text-green-600">${totalAmount.toFixed(2)}</span></p>
        <p className="text-sm text-gray-500 mt-4 text-center">Keep up the great work!</p>
      </div>
    </div>
  );
};

export default DashboardMain;
