import { useQuery } from "@tanstack/react-query";

const useProduct = (id) => {
    const { data: product, isLoading: isProductLoading } = useQuery({
        queryKey: [`product/${id}`],
        queryFn: async () => {
          const res = await fetch(
            `http://localhost:5000/products/details?id=${id}`
          );
          return res.json();
        },
      });
      return [product, isProductLoading]
};

export default useProduct;