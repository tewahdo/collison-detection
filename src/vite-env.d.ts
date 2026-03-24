/// <reference types="vite/client" />

// Type declarations for CSS imports
declare module "*.css" {
  const content: Record<string, string>;
  export default content;
}

// Type declarations for Leaflet CSS specifically
declare module "leaflet/dist/leaflet.css";
