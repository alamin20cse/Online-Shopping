import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Hook to fetch and manage all product data
const useProduct = () => {
  const queryClient = useQueryClient();

  // Fetch all products
  const { 
    refetch, 
    data: allproducts = [], // Default to an empty array 
    isLoading: queryLoading 
  } = useQuery({
    queryKey: ["allproducts"],
    queryFn: async () => {
      try {
        const res = await axios.get("https://online-shoppin-server.vercel.app/allproducts");
        return res.data; // Return the data if request is successful
      } catch (error) {
        throw error; // Re-throw other errors
      }
    },
    staleTime: 0, // Always fetch fresh data
    cacheTime: 1000 * 60 * 5, // Cache for 5 minutes
  });

  // Combine all loading states (only using queryLoading)
  const loading = queryLoading;

  return [allproducts, loading, refetch];
};

export default useProduct;