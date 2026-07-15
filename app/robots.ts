import type { MetadataRoute } from "next";
import { clinic } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${clinic.website}/sitemap.xml`,
  };
}
