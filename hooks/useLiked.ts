import useSWR from "swr";
import fetcher from "../libs/fetcher";

const useLiked = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/likedList", fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  return { data, error, isLoading, mutate };
};

export default useLiked;