import { codeToHtml } from "shiki";
import { snippets } from "@/data/snippets";
import CodeShowcaseClient from "./CodeShowcaseClient";

export default async function CodeShowcase() {
  const highlighted = await Promise.all(
    snippets.map(async (s) => ({
      id: s.id,
      project: s.project,
      projectTag: s.projectTag,
      highlightedHtml: await codeToHtml(s.code, { lang: s.lang, theme: "one-dark-pro" }),
    }))
  );

  return <CodeShowcaseClient snippets={highlighted} />;
}
