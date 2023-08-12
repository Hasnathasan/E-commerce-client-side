import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";


const useUserRole = () => {
    const {user} = useContext(AuthContext)
    const { data: userRole, isLoading: isUserRoleLoading } = useQuery({
        queryKey: [`USER`, user?.email],
        queryFn: async () => {
            return axios.get(`http://localhost:5000/userRole?email=${user?.email}`)
            .then(result => {
                console.log(result);
                return result.data;
            })
        },
      });
      return [userRole, isUserRoleLoading]
};

export default useUserRole;