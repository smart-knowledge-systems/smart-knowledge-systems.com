import fs from 'fs';
import path from 'path';

export function loadMarkdownContent({ contentDirPath } : { contentDirPath: string }) {
  const markdownCache: Record<string, string> = {};
  const contentDir = path.join(process.cwd(), contentDirPath);
  
  // Read all .md files in the content directory
  const files = fs.readdirSync(contentDir);
  files.forEach(file => {
    if (file.endsWith('.md')) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const slug = `/blog/${file.replace('.md', '')}`;
      markdownCache[slug] = content;
    }
  });
  
  return markdownCache;
}