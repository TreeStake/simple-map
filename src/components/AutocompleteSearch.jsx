import { useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

const AutocompleteInput = () => {
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
      console.log(place);
    });

    return () => autocomplete.unbindAll();
  }, [places]);

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Введіть локацію..."
      style={{
        width: "300px",
        padding: "10px",
        fontSize: "16px",
        borderRadius: "8px",
        border: "1px solid #ccc",
        position: "absolute",
        top: "20px",
        left: "50vw",
        zIndex: 999,
        translate: "-50% 0px",
      }}
    />
  );
};

export default AutocompleteInput;
