---
title: "Publishing to the ATmosphere"
description: "How I used @sequoia.pub to publish my Next.js blog to the AT Protocol — Standard.site lexicons, Bluesky comments, and owning your content. #atproto #atdev"
publishDate: 2026-02-21
ogImage: publishing-to-the-atmosphere.jpg
tags:
  - Technology Integration
  - Knowledge Management
atUri: "at://did:plc:i2fgba5nignuw4nccml33wjp/site.standard.document/3mffowjmedw2j"
---

This post lives in two places.

You’re reading it at smart-knowledge-systems.com — or encountering it through the AT Protocol, via Standard.site, a Bluesky client, or somewhere else in the ATmosphere. The content is identical either way.

And it’s mine.

Not rented from a platform. Not subject to algorithmic reach. Not hostage to anyone’s terms of service. Here’s exactly how I got there.

## Blog Content Has Always Been Trapped

WordPress locks you in. Medium owns your distribution. Ghost is cleaner, but it’s still an island.

Even a perfectly self-hosted blog — full markdown ownership, zero vendor lock-in — has a discovery problem: if no one subscribed to your RSS feed, you’re shouting into silence.

The AT Protocol changes the equation. Own your content _and_ reach people where they already are. Self-host _and_ distribute.

That’s the promise. I wanted to know if it was real.

## What I Added to the Stack

I’m running [Next.js](https://nextjs.org) with the App Router. Posts are markdown files. Here’s the three-piece addition:

**[Sequoia](https://sequoia.pub)** — CLI tool. You run `sequoia publish`, and your markdown posts become first-class atproto records: discoverable, federable, readable through any client that understands the `site.standard.document` lexicon.

**[Standard.site](https://standard.site) lexicons** — the schema layer. Sequoia is the tooling. Standard.site is the protocol — the agreed-upon definition of what a blog post _is_ on atproto.

**`sequoia-comments`** — a web component that renders Bluesky replies for a given `at://` URI. When Sequoia publishes a post, it auto-posts to Bluesky. That thread feeds back to the blog.

The pipeline:

```
markdown file
  → sequoia publish
    → atproto PDS record (site.standard.document)
    → auto-post to Bluesky
      → replies appear via sequoia-comments
```

## The Setup

One config file, `sequoia.json`:

```json
{
  "siteUrl": "https://smart-knowledge-systems.com",
  "contentDir": "src/content/blog",
  "pathPrefix": "/blog",
  "publicationUri": "at://did:plc:i2fgba5nignuw4nccml33wjp/site.standard.publication/self"
}
```

Authentication is your AT Protocol handle — same credentials as Bluesky. Sequoia handles the PDS interaction.

The `.well-known/site.standard.publication` file verifies domain ownership: a JSON blob Sequoia generates that proves `smart-knowledge-systems.com` is authorized to publish on behalf of your DID.

The mechanical magic is frontmatter. Start with this:

```yaml
title: "Publishing to the ATmosphere"
description: "..."
publishDate: 2026-02-21
atUri: ""
```

Run `sequoia publish`. Sequoia creates the PDS record and writes the `atUri` back:

```yaml
atUri: "at://did:plc:i2fgba5nignuw4nccml33wjp/site.standard.document/3mffowjmedw2j"
```

That URI is the post’s permanent address on the protocol. Every subsequent piece hooks to it.

An ignore list handles drafts — `sequoia.ignore` or `ignoreFiles` in the config. Everything outside the list publishes on the next run.

## Wiring Up Comments

With `atUri` in frontmatter, comments are straightforward.

A `parseAtUriFromContent()` utility reads the frontmatter and returns the URI. The blog post page passes it to the `<sequoia-comments>` web component.

One App Router wrinkle: web components need the DOM, so this can’t be server-rendered. Client-side import, intentionally lazy. I wrapped it in a `CollapsibleComments` component — expand/collapse with `ResizeObserver` for smooth height transitions:

```tsx
// Simplified from the actual implementation
export function CollapsibleComments({ atUri }: { atUri: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div>
      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? "Hide comments" : "Show Bluesky comments"}
      </button>
      {expanded && <sequoia-comments uri={atUri} />}
    </div>
  );
}
```

Readers reply on Bluesky. The conversation appears on the blog. The post page doesn’t reflow as comments load. That’s the whole feature.

## One Sprint, With Claude Code

62 files changed. 2,314 insertions. Less than 12 hours including a good night’s sleep.

The entire [`feat/add-bluesky-comments-and-cover-images`](https://github.com/smart-knowledge-systems/smart-knowledge-systems.com) branch — Sequoia integration, comments component, atproto URI parsing, cover image system, OpenGraph generation, Vitest tests, `CollapsibleComments`, `ReadMoreContent` — was shipped by one developer in a sprint. With [Claude Code](https://claude.ai/referral/QBmYIgU1QA).

I’ve written about this pattern [before](https://smart-knowledge-systems.com/blog/start-school-ai-entrepreneurship). The insight isn’t just speed — it’s what speed _changes_. When you can execute a feature branch in hours instead of days, you stop filtering ideas by implementation cost. You build the thing you actually want to build.

For this integration, the value was clear: the surface area was large but each piece was well-defined. Parsing frontmatter? Trivial. Wiring a web component into RSC architecture? One hydration gotcha, then solved. A `ResizeObserver`-based collapse animation? Mechanical. Claude Code handled the mechanical work. I kept my attention on the design.

This is what building on open protocols looks like in 2026. Sequoia is simple and opinionated. atproto is well-documented. AI-assisted development makes integration fast even for a solo builder.

If you’ve been thinking the ATmosphere is too much to figure out on a weekend — that estimate is too high.

## The Larger Picture

I consult on breaking down information silos in organizations. I’ve spent years watching platforms trap knowledge behind walls that serve the platform (I got off X/Twitter before its walls went up), not the people who created the content.

atproto isn’t just for social. It’s infrastructure for publishing. Standard.site, [leaflet.pub](https://leaflet.pub), [pckt.blog](https://pckt.blog) — these are early signals of a genuine alternative to the content-silo problem that’s been baked into the web for 30 years.

Ownership and distribution used to be a tradeoff.

They don’t have to be.

## The Code Is Open

The entire implementation is on GitHub:

**[github.com/smart-knowledge-systems/smart-knowledge-systems.com](https://github.com/smart-knowledge-systems/smart-knowledge-systems.com)**

Sequoia integration, comments component, cover image system, OpenGraph generation — all of it. Fork it, read it, adapt it to your stack.

[@sequoia.pub](https://bsky.app/profile/sequoia.pub) built the tool. Go tell them what you made with it.

What would you build on Standard.site?

