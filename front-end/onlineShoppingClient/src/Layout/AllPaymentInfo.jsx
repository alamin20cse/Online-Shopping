import React from "react";
import useAllPaymentInfo from "../Hooks/useAllPaymentInfo";

const AllPaymentInfo = () => {
  const [allPayments, loading] = useAllPaymentInfo();

  if (loading) {
    return <h1>Loading</h1>
  }
  console.log(allPayments);
  const totalAmount = allPayments.reduce((total, item) => total + parseFloat(item.amount || 0), 0);


  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">All Payment Information</h2>
      <h2 className="text-2xl font-bold mb-4">Total Payment :${totalAmount}</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 border">#</th>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Amount</th>
              <th className="px-4 py-2 border">Product Name</th>
              <th className="px-4 py-2 border">Transaction ID</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Thumbnail</th>
            </tr>
          </thead>
          <tbody>
            {allPayments.map((payment, index) => (
              <tr key={payment._id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{payment.name}</td>
                <td className="px-4 py-2 border">{payment.email}</td>
                <td className="px-4 py-2 border text-center">${payment.amount}</td>
                <td className="px-4 py-2 border">{payment.productName}</td>
                <td className="px-4 py-2 border">{payment.TranstionID || payment.transitionid}</td>
                <td className="px-4 py-2 border">
                  {payment.paidStatus ? (
                    <span className="text-green-500 font-semibold">Paid</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Unpaid</span>
                  )}
                </td>
                <td className="px-4 py-2 border">
                  <img
                    src={payment.thumbnail}
                    alt="Thumbnail"
                    className="h-12 w-12 rounded-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllPaymentInfo;