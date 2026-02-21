import { getAtprotoUri } from "@/lib/atproto-uris";
import BlueskyComments from "./bluesky-comments";

export default async function BlueskyCommentsWrapper({
  slug,
}: {
  slug: string;
}) {
  const atUri = await getAtprotoUri(slug);
  if (!atUri) return null;
  return <BlueskyComments atUri={atUri} />;
}
