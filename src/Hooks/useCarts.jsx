import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";


const useCarts = () => {
    const {user} = useContext(AuthContext);
    const { data: carts, isLoading: isCartsLoading, refetch } = useQuery({
        queryKey: ['carts', user?.email],
        queryFn: async() => {
            return axios.get(`https://e-commerce-server-side-eosin.vercel.app/carts?email=${user?.email}`)
                .then(result => {
                    return result.data;
                })
        },
      })
      return [carts, isCartsLoading, refetch]
};

export default useCarts;