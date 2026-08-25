import type { MetadataRoute } from "next";
import { clinic } from "@/lib/site-data";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: clinic.name,
    short_name: "DentalNisaa",
    description: clinic.tagline,
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#0F402C",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}
