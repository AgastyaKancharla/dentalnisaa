import type { MetadataRoute } from "next";
import { clinic, treatments, blogPosts } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/about", "/treatments", "/gallery", "/faq", "/blog", "/booking", "/contact"];

  const treatmentRoutes = treatments.map((t) => `/treatments/${t.id}`);
  const blogRoutes = blogPosts.map((p) => `/blog/${p.slug}`);

  const all = [...staticRoutes, ...treatmentRoutes, ...blogRoutes];

  return all.map((route) => ({
    url: `${clinic.website}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : route.startsWith("/treatments/") ? 0.8 : 0.6,
  }));
}
