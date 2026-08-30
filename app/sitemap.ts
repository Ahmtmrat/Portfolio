import type { MetadataRoute } from "next";
import { personal } from "@/data/cv";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: personal.site,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
