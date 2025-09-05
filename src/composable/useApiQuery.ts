import { axiosApi } from "@/utils/api";
import { useQuery } from "@tanstack/vue-query";
import type { AxiosRequestConfig } from "axios";

interface IApiQuery {
  queryKey: (string | number)[];
  url: string;
  config?: AxiosRequestConfig;
  staleTime?: number;
}

export const useApiQuery = <TResponse>({
  queryKey,
  url,
  config,
  staleTime = 1000 * 60 * 5,
}: IApiQuery) => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const res = await axiosApi.get<TResponse>(url, config);
      return res.data;
    },
    staleTime,
  });
};
