import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useCosmetics = () => {
    const { data: cosmetics, isLoading: isCosmeticsLoading, refetch } = useQuery({
        queryKey: ['cosmetics'],
        queryFn: async() => {
            return axios.get('https://e-commerce-server-side-eosin.vercel.app/products?category=cosmetics')
                .then(result => {
                    return result.data;
                })
        },
      })
      return [cosmetics, isCosmeticsLoading, refetch]
};

export default useCosmetics;