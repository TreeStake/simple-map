import React, { createContext, useContext, useEffect, useState } from "react";
import { addLocation, getLocations, deleteLocation } from "../firebase/crud";

const LocationContext = createContext();
export const useLocations = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const [locations, setLocations] = useState([]);
  const collectionName = "locations";
  const [clikedLocation, setClikedLocation] = useState({});

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    const data = await getLocations(collectionName);
    setLocations(data);
  };

  const addNewLocation = async (data) => {
    await addLocation(collectionName, data);
    fetchLocations();
  };

  const removeLocation = async (id) => {
    await deleteLocation(collectionName, id);
    fetchLocations();
  };

  return (
    <LocationContext.Provider
      value={{
        locations,
        fetchLocations,
        addNewLocation,
        removeLocation,
        clikedLocation,
        setClikedLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
};
