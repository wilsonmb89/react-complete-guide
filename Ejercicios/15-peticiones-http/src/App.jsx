import { useRef, useState, useCallback, useEffect } from "react";

import Places from "./components/Places.jsx";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import AvailablePlaces from "./components/AvailablePlaces.jsx";
import { deleteUserPlace, fetchUserPlaces, putUserPlaces } from "./http.js";
import ErrorPage from "./components/ErrorPage.jsx";

function App() {
  const selectedPlace = useRef();

  const [userPlaces, setUserPlaces] = useState([]);
  const [errorUpdatingPlaces, setErrorUpdatingPlaces] = useState(null);

  const [fetchingUserPlacesLabel, setFetchingUserPlacesLabel] = useState('');
  const [errorFetchingUserPlaces, setErrorFetchingUserPlaces] = useState(null);

  const [modalIsOpen, setModalIsOpen] = useState(false);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  }

  async function handleSelectPlace(selectedPlace) {
    setUserPlaces((prevPickedPlaces) => {
      if (!prevPickedPlaces) {
        prevPickedPlaces = [];
      }
      if (prevPickedPlaces.some((place) => place.id === selectedPlace.id)) {
        return prevPickedPlaces;
      }
      const userPlacesUpdated = [selectedPlace, ...prevPickedPlaces];

      return userPlacesUpdated;
    });

    try {
      await putUserPlaces([selectedPlace, ...userPlaces]);
    } catch (error) {
      setUserPlaces(userPlaces);
      setErrorUpdatingPlaces({
        message: error.message || "Failed to update places",
      });
    }
  }

  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    try {
      await deleteUserPlace(selectedPlace.current);
      setUserPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter(
          (place) => place.id !== selectedPlace.current.id
        )
      );
    } catch (error) {
      setErrorUpdatingPlaces({
        message: error.message || "Failed to delete place",
      });
    }

    setModalIsOpen(false);
  }, []);

  function handleError() {
    setErrorUpdatingPlaces(null);
  }

  useEffect(() => {
    (async () => {
      setFetchingUserPlacesLabel('Fetching user data...');
      try {
        const userPlacesFetched = await fetchUserPlaces();
        setUserPlaces(userPlacesFetched);
      } catch (error) {
        setUserPlaces([]);
        setErrorFetchingUserPlaces({
          message: error.message || "Failed to fetch user places",
        });
      }
      setFetchingUserPlacesLabel('');
    })();
  }, []);

  const userPlacesContent = errorFetchingUserPlaces ? (
    <ErrorPage
      title="An error occurred! :("
      message={errorFetchingUserPlaces.message}
    />
  ) : (
    <Places
      title="I'd like to visit ..."
      fallbackText={fetchingUserPlacesLabel || "Select the places you would like to visit below."}
      places={userPlaces}
      onSelectPlace={handleStartRemovePlace}
    />
  );

  return (
    <>
      <Modal open={errorUpdatingPlaces} onClose={handleError}>
        {errorUpdatingPlaces && (
          <ErrorPage
            message={errorUpdatingPlaces.message}
            title="An error occured!"
            onConfirm={handleError}
          />
        )}
      </Modal>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
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
        {userPlacesContent}
        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
