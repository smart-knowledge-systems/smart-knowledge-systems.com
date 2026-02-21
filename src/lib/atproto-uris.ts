import fs from "fs/promises";
import path from "path";

export function parseAtUriFromContent(content: string): string | undefined {
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/)?.[1];
  if (!frontmatter) return undefined;
  const atUriMatch = frontmatter.match(/atUri:\s*(.+)/);
  return atUriMatch?.[1]?.trim().replace(/^["']|["']$/g, "");
}

export async function getAtprotoUri(slug: string): Promise<string | undefined> {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return parseAtUriFromContent(content);
  } catch {
    return undefined;
  }
}
