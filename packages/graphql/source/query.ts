export default function queryGraphql<Variable = {}, Return = {}>(
  query: string,
  variables?: Variable
) {
  return fetch("/api/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ query, variables }),
  })
    .then<{ data: Return }>((c) => c.json())
    .then((c) => c.data);
}
