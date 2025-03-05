import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Hook to fetch and manage all product data
const useAllPaymentInfo = () => {
  const queryClient = useQueryClient();

  // Fetch all products
  const { 
    refetch, 
    data: allpayments = [], // Default to an empty array 
    isLoading: queryLoading 
  } = useQuery({
    queryKey: ["allpayments"],
    queryFn: async () => {
      try {
        const res = await axios.get("http://localhost:5000/payments");
        return res.data; // Return the data if request is successful
      } catch (error) {
        throw error; // Re-throw other errors
      }
    },
   
  });

  // Combine all loading states (only using queryLoading)
  const loading = queryLoading;

  return [allpayments, loading, refetch];
};

export default useAllPaymentInfo;