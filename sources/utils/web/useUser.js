import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then(res => res.json());

export default function useUser() {
  const { data, mutate, error } = useSWR("/api/user/me", fetcher);

  const loading = !data && !error;
  const loggedOut = (error && error.status === 403) || !data?.user;

  return {
    loading,
    loggedOut,
    mutate,
    user: data?.user
  };
}
