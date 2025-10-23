import { useEffect, useState } from "react";

const useFetch = (fetchDataFn, initialValue) => {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const [fetchedData, setFetchedData] = useState(initialValue);

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchDataFn();
        setFetchedData(data);
      } catch (error) {
        setError({ message: error.message || "Failed to fetch fetch data." });
      }

      setIsFetching(false);
    }

    fetchPlaces();
  }, [fetchDataFn]);

  return { isFetching, error, fetchedData, setFetchedData };
};

export default useFetch;
