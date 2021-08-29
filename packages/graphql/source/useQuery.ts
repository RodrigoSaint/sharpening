import useSWR from "swr";
import queryGraphql from "./query";

export default function useQuery<Variable = {}, Return = {}>(
  key: string | Array<any>,
  query: string,
  variables?: Variable
) {
  return useSWR<Return>(key, () => queryGraphql(query, variables), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
}
