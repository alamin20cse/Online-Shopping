import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContex } from "../Shared/AuthProvider";


// Only logged-in users will see data
const useUsers = () => {
    const { user, loading: authLoading, logOut } = useContext(AuthContex);

    const { refetch, data: users = [], isLoading: queryLoading } = useQuery({
        queryKey: ['users', user?.email],
        queryFn: async () => {
            if (!user?.email) return []; // Avoid querying if email is not available

            // Fixed template literal syntax
            const res = await axios.get(`https://online-shoppin-server.vercel.app/users?email=${user.email}`);
            return res.data;
        },
        enabled: !authLoading && !!user?.email, // Ensure AuthContext is loaded before querying
    });

    const loading = authLoading || queryLoading;
    return [users, loading, refetch];
};

export default useUsers;
