import type { MetadataRoute } from "next";
import { clinic } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/about", "/treatments", "/booking", "/contact"];

  return routes.map((route) => ({
    url: `${clinic.website}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
