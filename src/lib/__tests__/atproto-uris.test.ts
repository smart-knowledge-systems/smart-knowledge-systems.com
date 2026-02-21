import { describe, it, expect } from "vitest";
import { parseAtUriFromContent } from "../atproto-uris";

describe("parseAtUriFromContent", () => {
  it("returns atUri when it is the last field before closing ---", () => {
    const content = `---
title: Test Post
atUri: at://did:plc:abc123/app.bsky.feed.post/xyz
---

Body content here.
`;
    expect(parseAtUriFromContent(content)).toBe(
      "at://did:plc:abc123/app.bsky.feed.post/xyz"
    );
  });

  it("returns atUri when there are fields after it", () => {
    const content = `---
title: Test Post
atUri: at://did:plc:abc123/app.bsky.feed.post/xyz
author: Someone
---

Body content here.
`;
    expect(parseAtUriFromContent(content)).toBe(
      "at://did:plc:abc123/app.bsky.feed.post/xyz"
    );
  });

  it("strips surrounding double quotes", () => {
    const content = `---
title: Test Post
atUri: "at://did:plc:abc123/app.bsky.feed.post/xyz"
---

Body content here.
`;
    expect(parseAtUriFromContent(content)).toBe(
      "at://did:plc:abc123/app.bsky.feed.post/xyz"
    );
  });

  it("strips surrounding single quotes", () => {
    const content = `---
title: Test Post
atUri: 'at://did:plc:abc123/app.bsky.feed.post/xyz'
---

Body content here.
`;
    expect(parseAtUriFromContent(content)).toBe(
      "at://did:plc:abc123/app.bsky.feed.post/xyz"
    );
  });

  it("returns atUri without quotes as-is", () => {
    const content = `---
title: Test Post
atUri: at://did:plc:abc123/app.bsky.feed.post/xyz
---

Body content here.
`;
    expect(parseAtUriFromContent(content)).toBe(
      "at://did:plc:abc123/app.bsky.feed.post/xyz"
    );
  });

  it("returns undefined when no atUri in frontmatter", () => {
    const content = `---
title: Test Post
description: No AT URI here
---

Body content here.
`;
    expect(parseAtUriFromContent(content)).toBeUndefined();
  });

  it("returns undefined when no frontmatter at all", () => {
    const content = `Just plain content without frontmatter.

Some more text here.
`;
    expect(parseAtUriFromContent(content)).toBeUndefined();
  });

  it("returns undefined when atUri appears only in body, not frontmatter", () => {
    const content = `---
title: Test Post
description: No AT URI in frontmatter
---

Body content with atUri: at://did:plc:abc123/app.bsky.feed.post/xyz here.
`;
    expect(parseAtUriFromContent(content)).toBeUndefined();
  });

  it("does not match a horizontal rule --- in the body as frontmatter close", () => {
    const content = `---
title: Friction Post
description: This one has a horizontal rule in body
---

Some intro text.

---

More text after the horizontal rule.
`;
    expect(parseAtUriFromContent(content)).toBeUndefined();
  });
});
