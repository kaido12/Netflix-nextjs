import useSWR from "swr";
import fetcher from "../libs/fetcher";

// This hook is created to fetch our user for frontend
const useCurrentUser = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/current", fetcher);
  return { data, error, isLoading, mutate };
};

export default useCurrentUser;
