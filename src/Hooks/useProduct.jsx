import { useQuery } from "@tanstack/react-query";

const useProduct = (id) => {
    const { data: product, isLoading: isProductLoading } = useQuery({
        queryKey: [`product/${id}`],
        queryFn: async () => {
          const res = await fetch(
            `https://e-commerce-server-side-eosin.vercel.app/products/details?id=${id}`
          );
          return res.json();
        },
      });
      return [product, isProductLoading]
};

export default useProduct;