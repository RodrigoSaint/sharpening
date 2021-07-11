import { mutate } from "swr";

export default function useMutation<Variable, Return = {}>(
  key: string,
  query: string
): (variables: Variable) => Promise<Return> {
  return (variables: Variable) =>
    mutate(key, () =>
      fetch("/api/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=utf-8" },
        body: JSON.stringify({ query, variables }),
      })
        .then<{ data: Return }>((c) => c.json())
        .then((c) => c.data)
    );
}
