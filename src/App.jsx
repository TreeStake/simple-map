import "./App.css";
import { APIProvider } from "@vis.gl/react-google-maps";
import HereMap from "./components/HereMap";
import AutocompleteInput from "./components/AutocompleteSearch";

function App() {
  return (
    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_API} libraries={["places"]}>
      <HereMap>
        <AutocompleteInput />
      </HereMap>
    </APIProvider>
  );
}

export default App;
