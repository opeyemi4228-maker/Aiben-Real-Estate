"use client";

import { useEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";

// Brand-styled map. Pins sit at area level (approximate) until AIBEN supplies
// exact site coordinates. Leaflet is loaded only in the browser.
export default function EstateMap({ estates, active, onSelect, className = "" }) {
  const el = useRef(null);
  const [lf, setLf] = useState(null); // { L, map, layer }

  useEffect(() => {
    let cancelled = false;
    let map;
    import("leaflet").then((mod) => {
      if (cancelled) return;
      const L = mod.default || mod;
      map = L.map(el.current, { scrollWheelZoom: false });
      // Keyless OpenStreetMap tiles for the demo, tinted to the brand in CSS.
      // Production: Mapbox with a custom AIBEN style (spec 9.1).
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);
      setLf({ L, map, layer: L.layerGroup().addTo(map) });
    });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, []);

  // Fit the view only when the filtered set changes, not on hover.
  useEffect(() => {
    if (!lf) return;
    const pins = estates.filter((e) => e.coords);
    if (pins.length) lf.map.fitBounds(lf.L.latLngBounds(pins.map((p) => p.coords)), { padding: [40, 40], maxZoom: 12 });
    else lf.map.setView([9.06, 7.45], 10);
  }, [lf, estates]);

  useEffect(() => {
    if (!lf) return;
    const { L, layer } = lf;
    layer.clearLayers();
    estates
      .filter((e) => e.coords)
      .forEach((e) => {
        const size = e.slug === active ? 22 : 14;
        L.marker(e.coords, { icon: L.divIcon({ className: "aiben-pin", iconSize: [size, size] }), title: e.name, keyboard: true })
          .addTo(layer)
          .bindTooltip(`${e.name} · ${e.area}`, { direction: "top", offset: [0, -8] })
          .on("click", () => onSelect?.(e.slug));
      });
  }, [lf, estates, active, onSelect]);

  return <div ref={el} className={className} role="region" aria-label="Map of AIBEN estates (approximate areas)" />;
}
