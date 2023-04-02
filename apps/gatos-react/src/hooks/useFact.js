import { useCallback, useEffect, useState } from "react";
import { getFact } from "../lib/fetchFact";
import { getImgURL } from "../lib/getImg";

export const useFact = () => {
  const [fact, setFact] = useState("");
  const [error, setError] = useState("");
  const [url, setUrl] = useState("");

  const newFact = useCallback(() => {
    getFact()
      .then(({ fact }) => {
        setError("");
        setFact(fact);
        return getImgURL(fact);
      })
      .then((url) => {
        setUrl(url);
      })
      .catch(({ message }) => {
        setError(message);
      });
  }, []);

  useEffect(() => {
    newFact();
  }, []);

  return { error, fact, url, newFact };
};
