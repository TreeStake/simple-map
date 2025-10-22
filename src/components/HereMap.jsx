import { useEffect, useRef } from "react";
import { useLocations } from "../context/LocationContext";

const HereMap = ({ children }) => {
  const { clikedLocation } = useLocations();
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const groupRef = useRef(null);
  const markerRef = useRef(null);
  const apikey = import.meta.env.VITE_HERE_MAP_API;

  useEffect(() => {
    if (!mapRef.current) return;

    const platform = new window.H.service.Platform({
      apikey: apikey,
    });

    const engineType = H.Map.EngineType["HARP"];

    const defaultLayers = platform.createDefaultLayers({ engineType });

    const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: { lat: 49.842957, lng: 24.031111 },
      zoom: 12,
      engineType,
      pixelRatio: window.devicePixelRatio || 1,
    });

    mapInstanceRef.current = map;

    const group = new window.H.map.Group();
    groupRef.current = group;
    map.addObject(group);

    window.addEventListener("resize", () => map.getViewPort().resize());

    const _behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

    const _ui = window.H.ui.UI.createDefault(map, defaultLayers);

    const handleResize = () => map.getViewPort().resize();

    return () => {
      window.removeEventListener("resize", handleResize);
      map.dispose();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    const group = groupRef.current;

    if (!map || !group) return;
    const { lat, lng } = clikedLocation;
    if (lat == null || lng == null) return;

    if (markerRef.current) {
      try {
        if (group.getObjects().includes(markerRef.current)) {
          group.removeObject(markerRef.current);
        }
      } catch (e) {
        console.error(e.message);
      }
    }

    const marker = new window.H.map.Marker(clikedLocation);

    markerRef.current = marker;
    group.addObject(marker);

    map.setCenter(clikedLocation);
  }, [clikedLocation]);

  return (
    <div ref={mapRef} style={{ width: "100vw", height: "100vh", position: "relative", overflow: "hidden" }}>
      {children}
    </div>
  );
};

export default HereMap;
