import { useCallback, useEffect, useRef, useState } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

const LOCAL_STORAGE_KEY = "picked-places-saved";

const savedPickedPlacesStr = localStorage.getItem(LOCAL_STORAGE_KEY);
const savedPickedPlaces = savedPickedPlacesStr
  ? JSON.parse(savedPickedPlacesStr)
  : [];

function App() {
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(savedPickedPlaces);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const {
          coords: { latitude, longitude },
        } = position;

        const sortedPlacesArray = sortPlacesByDistance(
          AVAILABLE_PLACES,
          latitude,
          longitude
        );
        setAvailablePlaces(sortedPlacesArray);
      },
      () => setAvailablePlaces(AVAILABLE_PLACES)
    );
  }, []);

  function handleStartRemovePlace(id) {
    setIsModalOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    setIsModalOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      const newPlaces = [place, ...prevPickedPlaces];

      updateLocalStorageData(newPlaces);

      return newPlaces;
    });
  }

  const handleRemovePlace = useCallback(() => {
    setPickedPlaces((prevPickedPlaces) => {
      const newPlaces = prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current
      );

      updateLocalStorageData(newPlaces);

      return newPlaces;
    });

    setIsModalOpen(false);
  }, []);

  function updateLocalStorageData(placesData) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(placesData));
  }

  return (
    <>
      <Modal open={isModalOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          fallbackText={"Sorting places near you... Please wait..."}
          places={availablePlaces}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
