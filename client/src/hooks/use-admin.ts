import { useQuery } from "@tanstack/react-query";

export function useAdmin() {
  const { data, isLoading } = useQuery<{ isAdmin: boolean }>({
    queryKey: ["/api/admin/status"],
    refetchInterval: 60000,
  });

  return {
    isAdmin: data?.isAdmin || false,
    isLoading,
  };
}
