import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const useUsers = () => {
    const { data: users, isLoading: isUsersLoading, refetch } = useQuery({
        queryKey: ['cosmetics'],
        queryFn: async() => {
            return axios.get('http://localhost:5000/users')
                .then(result => {
                    return result.data;
                })
        },
      })
      return [users, isUsersLoading, refetch]
};

export default useUsers;