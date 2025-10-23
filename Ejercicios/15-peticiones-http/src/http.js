export async function fetchAvailablePlaces() {
  const response = await fetch("http://localhost:3000/places");
  const jsonResponse = await response.json();

  const { places } = jsonResponse || { places: [] };

  if (!response.ok) {
    throw new Error("Failed to fetch places");
  }

  return places;
}

export async function fetchUserPlaces() {
  const response = await fetch("http://localhost:3000/user-places");
  const jsonResponse = await response.json();

  const { places } = jsonResponse || { places: [] };

  if (!response.ok) {
    throw new Error("Failed to fetch user places");
  }

  return places;
}

export async function putUserPlaces(userPlaces) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "PUT",
    body: JSON.stringify({
      places: userPlaces,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    throw new Error("Failed to put user places");
  }

  return jsonResponse.message;
}

export async function deleteUserPlace(userPlace) {
  const response = await fetch("http://localhost:3000/user-places", {
    method: "DELETE",
    body: JSON.stringify({
      place: userPlace,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const jsonResponse = await response.json();

  if (!response.ok) {
    throw new Error("Failed to delete user place");
  }

  return jsonResponse.message;
}
