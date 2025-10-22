import { useEffect, useRef } from "react";

const HereMap = ({ children }) => {
  const mapRef = useRef(null);
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

    window.addEventListener("resize", () => map.getViewPort().resize());

    const _behavior = new window.H.mapevents.Behavior(new window.H.mapevents.MapEvents(map));

    const _ui = window.H.ui.UI.createDefault(map, defaultLayers);

    return () => map.dispose();
  });

  return (
    <div ref={mapRef} style={{ width: "100vw", height: "100vh", position: "relative", overflow: "scroll" }}>
      {children}
    </div>
  );
};

export default HereMap;
