import useSWR from "swr";

export default function useQuery<Variable = {}, Return = {}>(
  key: string | Array<any>,
  query: string,
  variables?: Variable
) {
  return useSWR<Return>(
    key,
    () =>
      fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ query, variables }),
      })
        .then<{ data: Return }>((c) => c.json())
        .then((c) => c.data),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
}
