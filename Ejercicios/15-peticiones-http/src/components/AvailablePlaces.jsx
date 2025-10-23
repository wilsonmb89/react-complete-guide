import { useEffect, useState } from "react";

import Places from "./Places.jsx";
import ErrorPage from "./ErrorPage.jsx";
import { sortPlacesByDistance } from "../loc.js";
import { fetchAvailablePlaces } from "../http.js";

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [loadingText, setLoadingText] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoadingText("Fetching place data...");
    (async () => {
      try {
        const places = await fetchAvailablePlaces();
        navigator.geolocation.getCurrentPosition(
            (position) => {
              const {
                coords: { latitude, longitude },
              } = position;

              const sortedPlaces = sortPlacesByDistance(
                places,
                latitude,
                longitude
              );
              setAvailablePlaces(sortedPlaces);
              setLoadingText("");
            },
            () => {
              setAvailablePlaces(places);
              setLoadingText("");
            }
          );
      } catch (error) {
        setLoadingText("");
        setError(error);
      }
    })();
  }, []);

  if (error) {
    return <ErrorPage title="An error occurred! :(" message={error.message} />;
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
      loadingText={loadingText}
    />
  );
}
