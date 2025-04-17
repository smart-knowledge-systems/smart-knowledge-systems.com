'use server';

import { loadMarkdownContent } from '@/lib/load-markdown';


const contentDirPath = 'src/content/blog';
const markdownCache = loadMarkdownContent({ contentDirPath });

export const getMarkdownContent = async (href: string): Promise<string | undefined> => {
    return markdownCache[href];
};
