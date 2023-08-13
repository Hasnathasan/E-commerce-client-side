import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";


const useUserRole = () => {
    const {user} = useContext(AuthContext)
    const { data: userRole, isLoading: isUserRoleLoading } = useQuery({
        queryKey: [`USER`, user?.email],
        queryFn: async () => {
            return axios.get(`https://e-commerce-server-side-eosin.vercel.app/userRole?email=${user?.email}`)
            .then(result => {
                return result.data;
            })
        },
      });
      return [userRole, isUserRoleLoading]
};

export default useUserRole;