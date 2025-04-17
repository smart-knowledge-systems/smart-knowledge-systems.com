'use server';
import fs from 'fs/promises';

export const getMarkdownContent = async (href: string): Promise<string | undefined> => {
    const filePath = `src/content${href}.md`;
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      return content;
    } catch (error) {
      console.error(
        `Error loading markdown content from ${filePath}:`,
        error,
      );
      return undefined; // Return undefined if error occurs
    }
  }
