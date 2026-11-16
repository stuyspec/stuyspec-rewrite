/*
    This code is intended to fetch all of the crossword articles from the api.

    To future devs reading this:
    I did not read the other api related files before making this, so if this is already covered
    by another file I am sorry.
*/

export default async function fetchCrosswords() {
  let response = await fetch("/api/articles", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: { article_type: "crossword" },
      max: 100,
    }),
  });
  if (!response.ok) {
    throw new Error("fetching crosswords failed");
  }

  const data = await response.json();
  return data.articles;
}
