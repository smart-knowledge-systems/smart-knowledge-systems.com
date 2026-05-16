import { russAuthor } from "@/content/blog/authors";
import { categories } from "@/content/blog/categories";
import type { Post } from "@/content/blog/posts";

const DID = "did:plc:i2fgba5nignuw4nccml33wjp";
const PDS_HOST = "https://auriporia.us-west.host.bsky.network";
const APPVIEW_BASE = "https://bsky.social/xrpc";

const TAG_CATEGORY_MAP: Record<
  string,
  (typeof categories)[keyof typeof categories]
> = {
  "Knowledge Management": categories.knowledgeManagement,
  "Technology Integration": categories.technologyIntegration,
  "Organizational Culture": categories.organizationalCulture,
  Leadership: categories.leadership,
  "Team Collaboration": categories.teamCollaboration,
  "Project Management": categories.projectManagement,
};

function tagsToCategories(tags: string[]): Post["categories"] {
  return tags
    .map((tag, i) => {
      const cat = TAG_CATEGORY_MAP[tag];
      return cat ? { ...cat, priority: i + 1 } : null;
    })
    .filter((c): c is NonNullable<typeof c> => c !== null);
}

function truncateForDescription(text: string, canonicalUrl: string): string {
  const hrMatch = text.match(/\n\s*---\s*\n/);
  if (hrMatch?.index != null) {
    return text.slice(0, hrMatch.index).trim() + `\n\nRead More at ${canonicalUrl}`;
  }
  const paragraphs = text.split(/\n\n+/).filter((p) => p.trim());
  return paragraphs.slice(0, 3).join("\n\n") + `\n\nRead More at ${canonicalUrl}`;
}

interface AtProtoBlob {
  $type: string;
  ref: { $link: string };
  mimeType: string;
  size: number;
}

interface AtProtoRecord {
  uri: string;
  cid: string;
  value: {
    $type: string;
    path?: string;
    site?: string;
    title: string;
    description?: string;
    textContent?: string;
    publishedAt: string;
    updatedAt?: string;
    tags?: string[];
    coverImage?: AtProtoBlob;
    content?: {
      $type: string;
      text?: {
        $type: string;
        markdown?: string;
        flavor?: string;
        renderingRules?: string;
      };
    };
    contributors?: Array<{ did: string; role?: string; displayName?: string }>;
    canonicalUrl?: string;
  };
}

function recordToPost(record: AtProtoRecord): Post {
  const { value } = record;
  const rkey = record.uri.split("/").pop() ?? record.uri;
  const slug = (value.path ?? "").replace(/^\/blog\//, "");
  const href = `/blog/${slug}`;

  const body = value.content?.text?.markdown ?? "";

  const description =
    value.description ??
    (value.textContent
      ? truncateForDescription(value.textContent, value.canonicalUrl ?? href)
      : "");

  const coverImageUrl = value.coverImage?.ref.$link
    ? `${PDS_HOST}/xrpc/com.atproto.sync.getBlob?did=${DID}&cid=${value.coverImage.ref.$link}`
    : undefined;

  return {
    id: rkey,
    title: value.title,
    href,
    description,
    datetime: new Date(value.publishedAt),
    categories: tagsToCategories(value.tags ?? []),
    author: russAuthor,
    body,
    atUri: record.uri,
    coverImageUrl,
    contributors: value.contributors,
  };
}

let fetchPromise: Promise<Post[]> | null = null;

export function fetchAllDocuments(): Promise<Post[]> {
  if (!fetchPromise) {
    fetchPromise = (async () => {
      const url = `${APPVIEW_BASE}/com.atproto.repo.listRecords?repo=${DID}&collection=site.standard.document&limit=100`;
      const res = await fetch(url, {
        next: { revalidate: 604800 },
      } as RequestInit);
      if (!res.ok) throw new Error(`AT Protocol fetch failed: ${res.status}`);
      const data = (await res.json()) as { records: AtProtoRecord[] };
      const now = new Date();
      return data.records
        .map(recordToPost)
        .filter((p) => p.datetime <= now)
        .sort((a, b) => b.datetime.getTime() - a.datetime.getTime());
    })().finally(() => {
      fetchPromise = null;
    });
  }
  return fetchPromise;
}

export async function fetchDocument(slug: string): Promise<Post | undefined> {
  const posts = await fetchAllDocuments();
  return posts.find((p) => p.href === `/blog/${slug}`);
}
