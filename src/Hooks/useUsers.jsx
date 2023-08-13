import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useUsers = () => {
    const { data: users, isLoading: isUsersLoading, refetch } = useQuery({
        queryKey: ['allUsers'],
        queryFn: async() => {
            return axios.get('https://e-commerce-server-side-eosin.vercel.app/users')
                .then(result => {
                    return result.data;
                })
        },
      })
      return [users, isUsersLoading, refetch]
};

export default useUsers;