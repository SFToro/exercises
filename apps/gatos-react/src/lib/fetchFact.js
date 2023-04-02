export const CAT_FACT_ENDPOINT = "https://catfact.ninja/fact";

export const getFact = () => {
  const res = fetch(CAT_FACT_ENDPOINT);

  const json = res.then((res) => {
    if (res.ok) return res.json();
    throw new Error("Error while fetching image");
  });
  return json;
};
