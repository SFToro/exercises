const IMG_ENDPOINT = "https://cataas.com/cat/says/";

export const getImgURL = (fact) => {
  const words = fact.split(" ", 3).join(" ");
  const res = fetch(`${IMG_ENDPOINT}${words}?size=25&color=red&json=true`);
  const json = res.then((res) => {
    if (res.ok) return res.json();
    throw new Error("Error while fetching fact");
  });
  const url = json.then((json) => "https://cataas.com/" + json.url);
  return url;
};
