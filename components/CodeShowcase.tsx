import { codeToHtml } from "shiki";
import { snippets } from "@/data/snippets";
import CodeShowcaseClient from "./CodeShowcaseClient";

/**
 * Server component: every snippet is highlighted once at build time, so no
 * highlighter ships to the browser.
 */
export default async function CodeShowcase() {
  const highlighted = await Promise.all(
    snippets.map(async (s) => ({
      id: s.id,
      file: s.file,
      project: s.project,
      projectTag: s.projectTag,
      code: s.code,
      html: await codeToHtml(s.code, { lang: s.lang, theme: "one-dark-pro" }),
    }))
  );

  return <CodeShowcaseClient snippets={highlighted} />;
}
