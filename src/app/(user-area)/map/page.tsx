"use client";

import dynamic from "next/dynamic"

import "leaflet/dist/leaflet.css";

const MapLayout = dynamic(() => import("@/components/ui/map/Map"), { ssr:false })

export default function MapaPulverizacoes() {
  return (
    <div className="relative h-[calc(100vh-theme(spacing.32))] z-0">
      <MapLayout />
    </div>
  );
}
