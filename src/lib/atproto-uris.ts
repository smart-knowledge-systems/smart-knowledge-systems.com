import fs from "fs/promises";
import path from "path";

export async function getAtprotoUri(slug: string): Promise<string | undefined> {
  const filePath = path.join(process.cwd(), "src/content/blog", `${slug}.md`);
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const match = content.match(/^---\n[\s\S]*?atUri:\s*(.+)\n[\s\S]*?\n---/);
    return match?.[1]?.trim();
  } catch {
    return undefined;
  }
}
