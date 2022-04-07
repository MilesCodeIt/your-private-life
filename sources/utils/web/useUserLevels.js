import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useUserLevels () {
  const { data, mutate, error } = useSWR("/api/user/levels", fetcher);

  const loading = !data && !error;

  return {
    loading,
    mutate,
    levels: data?.levels
  };
}
