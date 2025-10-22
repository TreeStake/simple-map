import { useEffect, useRef, useState } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";
import Button from "@mui/material/Button";
import "./../App.css";
import { useLocations } from "../context/LocationContext";

const AutocompleteInput = () => {
  const { addNewLocation } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState({});
  const inputRef = useRef(null);
  const places = useMapsLibrary("places");

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      types: [],
      fields: ["geometry", "name"],
    });

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      let placeToAdd = {
        name: place.name,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        createdAt: new Date().toISOString(),
      };
      setSelectedLocation(placeToAdd);
    });

    return () => autocomplete.unbindAll();
  }, [places]);

  const handleAdd = async () => {
    if (selectedLocation.name) {
      await addNewLocation(selectedLocation);
      setSelectedLocation({});
    } else {
      window.alert("Виберіть іншу локацію");
    }
  };

  return (
    <div className="input-wrapper">
      <input ref={inputRef} className="auto-input" type="text" placeholder="Введіть локацію..." />
      <Button variant="contained" onClick={handleAdd}>
        Зберегти
      </Button>
    </div>
  );
};

export default AutocompleteInput;
