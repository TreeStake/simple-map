import "./App.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import HereMap from "./components/HereMap";
import AutocompleteInput from "./components/AutocompleteSearch";
import LocationList from "./components/LocationList";

function App() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API} libraries={["places"]}>
      <HereMap>
        <AutocompleteInput />
        <LocationList />
      </HereMap>
    </APIProvider>
  );
}

export default App;
