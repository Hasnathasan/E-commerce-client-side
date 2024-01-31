import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useOrders = () => {
  const { data: orders, isLoading: isOrdersLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return axios
        .get("https://e-commerce-server-side-eosin.vercel.app/orders")
        .then((result) => {
          return result.data;
        });
    },
  });
  return [orders, isOrdersLoading];
};

export default useOrders;
