import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useProducts = () => {
    const { data: products, isLoading: isProductsLoading, refetch } = useQuery({
        queryKey: ['allProducts'],
        queryFn: async() => {
            return axios.get('http://localhost:5000/allProducts')
                .then(result => {
                    return result.data;
                })
        },
      })
      return [products, isProductsLoading, refetch]
};

export default useProducts;