import type { MetadataRoute } from "next";
import { personal } from "@/data/cv";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${personal.site}/sitemap.xml`,
    host: personal.site,
  };
}
