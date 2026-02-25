---
title: "From Guest Lists to Conversations: Building an Instrument of Perception"
description: "How I built a semantic research pipeline and viewer that embodies its own theory — and what the architecture taught me about meaning-space."
publishDate: 2026-02-23
ogImage: from-guest-lists-to-conversations.jpg
tags:
  - Knowledge Management
  - Technology Integration
  - Organizational Culture
  - Research Tools
atUri: ""
---

## The Dinner Party, Revisited

Last May I wrote about my AI research assistant using the metaphor of an academic dinner party — Kamler and Thomson's lovely image of the scholar as host, inviting selected thinkers to the table for meaningful conversation. That first assistant was a guest-list organizer. It scored abstracts against tags with GPT-4o-mini, sorted by weighted relevance, and handed me a prioritized reading list. It answered the question: _who should be at the table?_

But organizing a guest list is not hosting a conversation.

I could rank 690 articles by relevance to two dozen tags. I could filter and sort and threshold. What I could not do was hear what the guests would say to each other. I could not perceive why an article on perceptual symbol systems and an article on posthumanist writing might rhyme — not in their keywords, which share nothing, but in their vocabularies, their spatial intuitions, the shapes of the arguments they make. The Jupyter notebook approach worked for triage. The dissertation demanded something else entirely: not _which_ articles are relevant, but _how_ they connect to specific arguments — and to each other.

What follows is the story of building a system that doesn't just organize information but helps perceive the structure of meaning itself. Building it taught me something I didn't expect. The architecture became evidence for the essay's own argument.

## Giving Every Guest a Position in the Room

The first fundamental shift was from keyword matching to semantic embeddings — from checking names against a guest list to giving every guest a position in the room.

Every article abstract in the database passes through OpenAI's `text-embedding-3-large` model and returns as a point in 3,072-dimensional space. Every paragraph of my essay, too. These aren't arbitrary coordinates. Articles about similar concepts cluster near each other. A paragraph about embodied cognition sits near articles about embodiment regardless of whether they share a single keyword. The similarity between any two texts is the cosine of the angle between their vectors — a measure of proximity in meaning-space.

I find myself reaching for a phrase from [an essay I wrote in 2018](/portfolio?courses=WRTG%203870), back when I was trying to articulate why my organic chemistry textbook felt more like home than any novel: "Writing is multi-dimensional while aural dialogue is one-dimensionally threaded." I was writing about the dimensional affordances of material culture — how skeletal formulas and free-body diagrams construct knowledge in ways that articulate speech cannot. I didn't know then that I was describing, in folk terms, exactly what embedding models would make literal. The 3,072-dimensional vectors _are_ writing made dimensional. Each coefficient is a facet of meaning, learned from the co-occurrence patterns of billions of words. The embeddings don't reduce meaning to a point; they give it a position in a space too vast to visualize but navigable nonetheless.

The dinner party: instead of checking names against a list, each guest now has a position in the room. You can see who's standing near whom. The similarity matrix is a map of the room from every seat.

## The Five-Step Conversation

Proximity in meaning-space is suggestive, but it isn't dialogue. Knowing that two guests are standing near each other doesn't tell you what they're saying. The analysis pipeline I built is a five-step progressive deepening — from mapping proximity to facilitating actual conversation.

**Step 1: The Similarity Matrix.** Each paragraph of my essay is embedded with its heading context — "## Sociocognitive Space" prepended to the paragraph text — because context shapes what aspects of meaning become salient. The matrix maps every paragraph against every article, cached by a hash of the essay content so that revising the essay triggers fresh computation while unchanged paragraphs use cached results.

**Step 2: Threshold.** Not every guest gets to speak. A `target-pairs` parameter controls the budget for conversation depth — how many paragraph-article pairs the system will analyze. The pipeline sorts all similarity scores and finds the cutoff that yields approximately that many pairs. This is a practical decision about attention, not a judgment about relevance. At 50 target pairs, perhaps 12 unique articles rise above threshold across 7 paragraphs. At 200, the conversation widens.

**Step 3: Glossary Generation.** Before the conversation can happen, each guest needs a phrasebook. Claude reads each article's abstract and keywords and generates contextual definitions — not dictionary entries but definitions grounded in how _this specific article_ uses _this specific term_. "Motivation" means something different in second language acquisition theory than in organizational psychology. "Embodiment" means something different in Merleau-Ponty than in robotics. The glossary captures these distinctions. This resonates with something I've been thinking about for years — what my manuscript calls the "inexhaustible meaning-potential" of words. Each use reveals nearer and newer determinations. A contextual glossary is a record of which determinations this particular article has revealed.

**Step 4: Connection Summaries.** Now the dialogue. Claude reads the full essay, the target paragraph with its section context, the article's abstract, and its glossary, then writes about the _connection_ — not a summary of either text independently but an articulation of the relationship between them. The prompt is explicit: "Do NOT summarize the abstract or paragraph independently. Focus only on the CONNECTION between them." Each connection summary is an act of interpretive reading. Angela Carter wrote that "Reading a book is like re-writing it for yourself." I explored this idea [years ago](/portfolio?courses=ENGL%202600&tags=writing-studies) — that writers risk being re-written by readers, that each reading is a fresh act of interpretation. Each connection summary is a re-writing — Claude reading the article-paragraph relationship and articulating what it perceives. And each analysis run is a fresh reading, contingent on the essay's current state.

**Step 5: Paragraph Synthesis.** Finally, Claude reads all the articles connected to a single paragraph and identifies the shared vocabulary — the key terms that put these articles into conversation with each other. It ranks each article's relevance and produces a synthesis of the conceptual threads. This is where the dinner conversation actually happens. The synthesis reveals which frameworks multiple articles engage with, which vocabulary they share, and how their arguments relate to the paragraph's claims.

Every step is cached, resumable, and model-scoped. If the pipeline fails at step 47 of 50 connection summaries, you resume with `--run-id` and it picks up where it left off. `ON CONFLICT DO NOTHING` honors prior work. Knowledge builds incrementally.

## The Data Model as Dialogue Architecture

Five PostgreSQL tables. Not a schema — an argument about how meaning works.

**`articles`** — the guests, each with a position in the room (a 3,072-dimensional embedding vector). They persist across runs, across essays, across years. An article's identity doesn't change because I asked a new question.

**`glossaries`** — each guest's phrasebook. Contextual definitions scoped to the article and the model that generated them. Glossaries persist because vocabulary is relatively stable — an article's use of "embodiment" doesn't shift between analysis runs. But the model scope matters: Claude Haiku reads differently than Claude Sonnet, and both readings are worth keeping.

**`connections`** — the conversations. Scoped to a run, because a connection summary is an interpretation, and interpretations are contingent. The same article connects differently to the same paragraph when the surrounding essay has changed. Connections are the most ephemeral and the most valuable — they're where meaning is actively constructed.

**`paragraph_syntheses`** — the themes emerging from each table. JSON arrays of key terms and ranked articles. Also run-scoped, also contingent. The synthesis is a snapshot of what the conversation sounded like on this particular evening.

**`connection_glossary_matches`** — the aha moments. Pre-computed semantic similarities between connection summaries and glossary terms from _any_ article. This is where cross-article resonance becomes visible. A connection summary about perceptual symbol systems might semantically match a glossary term from an article on posthumanist writing — a connection that no keyword search would find.

I wrote [an essay in 2019](/portfolio?courses=WRTG%203830) analyzing Scrum as genre — typified social action, not just a framework. What struck me then was that the Scrum Guide's emphasis on roles, events, and artifacts obscured the social and cultural work that Scrum actually performs. "The social dynamism that the Scrum genre affords is the goose that lays the golden egg products of agile development." The same insight applies here. The schema _is_ the theory. Deciding that glossaries belong to articles (persistent) but connections belong to runs (contingent) is not a database design decision. It's a claim about the relationship between vocabulary and interpretation — that words have relatively stable meaning-potential while the connections we perceive through them are always being re-written.

## The Viewer as Perceptual Instrument

The Next.js viewer I built is not a dashboard. It's an instrument for perceiving meaning-space — the way a microscope is an instrument for perceiving cellular structure. Progressive drill-down: runs, then paragraphs, then articles. Each level reveals more structure that was always there but invisible without the instrument.

Three features make invisible structure visible.

**Glossary highlighting.** When a glossary term appears in a connection summary or synthesis text, it renders with a dotted underline — a subtle visual cue that this word has a specific, contextual definition from a specific article. Click it and a popover appears: the term, its definition, and which article it comes from. First occurrence only, longest match first, to avoid visual noise. This is exact-match perception — the viewer shows you when an article's vocabulary has entered the conversation.

**Key terms sidebar.** Claude's synthesis of shared vocabulary for each paragraph. When six articles all engage with Borghi and Binkofski's Words as Social Tools framework, the key terms surface that shared engagement. You can see not just that these articles are nearby in meaning-space but _what vocabulary_ they share — the bridges that make cross-article conversation possible. The key terms are the shared language of the dinner table.

**Semantic match tags.** "Related concepts" badges on each connection card — pre-computed embeddings matching the connection summary against all glossary terms in the database. These go beyond keyword matching into harmonic resonance: a connection summary about scaffolding might semantically match a glossary entry for "zone of proximal development" from a completely different article. The computation happens once, during the analysis run. The viewer just reads the results. Perception at zero request-time cost.

A brief note on design: Newsreader serif headings, DM Sans body text, warm oklch palette with slight yellow undertone in backgrounds and deep navy primaries. These aren't aesthetic choices. A scholarly tool should feel like a scholarly environment. The typography and color communicate: this is a place for careful reading, not skimming.

## When the Tool Embodies the Theory

Here is where things get strange, and where building this system became research rather than engineering.

My manuscript argues that language acquisition is the development of a perceptual modality — what I call _socioesthesia_ — for navigating sociocognitive space: a real, dimensionally structured manifold of intersubjective meanings existing in the interstitial reality between minds. Words are hyperdimensional objects (WaSO) that cast perceptible shadows (WaSS) across modalities — sounds, written forms, signs. Fluency is the ability to navigate between these shadows to perceive the fuller objects they project from.

The research assistant _is_ an instrument of socioesthesia. It doesn't just analyze the essay. It embodies the essay's theory.

Embeddings _are_ positions in sociocognitive space — literally, coordinates in a high-dimensional manifold of intersubjective meaning, learned from the patterns of how humans use language together.

Glossaries _are_ contextual grounding — records of how meaning shifts per article, each entry a partial determination of a word's inexhaustible meaning-potential. "Motivation" in SLA theory and "motivation" in organizational psychology are different shadows cast by the same sociocognitive object.

Connection summaries _are_ acts of perception — articulations of relational structure in meaning-space, each one a fresh reading that reveals nearer and newer determinations of how two texts relate.

Key terms _are_ shared vocabulary — the intersubjective bridges that make conversation possible. When six articles all engage with the same framework, the key terms make that convergence perceptible. These are the nexuses of meaning that my earlier essay on [sociocognitive shadows](/portfolio?courses=ELTL%20700) described as existing "in the interstitial, matrixial, social space between minds."

Semantic matching _is_ cross-modal perception — harmonic resonance between different articles' vocabularies, perceived not through keyword overlap but through proximity in embedding space. The match between a connection summary and a glossary term from a different article is perception across boundaries — seeing that two guests at the dinner party are talking about the same thing in different languages.

In ["Bridging Informational Silos,"](/portfolio?courses=CIST%20614) I proposed a framework for integrating "formal knowledge structures with informal dialogic processes." The research assistant _is_ that integration. The PostgreSQL schema, the embedding vectors, the cached similarity matrices — these are the formal knowledge structures. The connection summaries, the key terms, the glossary definitions — these are the dialogic processes. The viewer makes them legible to each other.

The tool didn't just help me analyze the essay. Building it was research. The architecture is an argument about how meaning-space works. And it convinced me of things the essay only theorized.

## What Building This Taught Me

I've been thinking about the relationship between information and knowledge for years. In the process of building this tool, several insights crystallized that I want to name — not as engineering lessons but as observations about knowledge systems.

**Idempotency is trust.** `ON CONFLICT DO NOTHING` is not just a database pattern. It's a way of saying: if this work has already been done, honor it. Don't overwrite a glossary entry because a new run started. Don't regenerate a connection summary because the pipeline restarted. Knowledge builds incrementally, and a system that respects prior work earns the trust of the person using it. The opposite — a system that re-does everything from scratch each time — treats prior knowledge as disposable. That's a claim about epistemology, not just engineering.

**Pre-computation is generosity.** The semantic glossary matches are computed once, during the analysis run, and stored in `connection_glossary_matches`. The viewer never calls an embedding API. Every page load is fast because expensive perceptual work was done in advance. This is the same principle that makes a well-organized library generous: the cataloging labor happens once so that every subsequent reader benefits. The alternative — computing semantic matches on every page load — would be technically possible but conceptually stingy.

**Structured output eliminates ambiguity.** Claude's JSON schema mode means the glossary and synthesis responses are guaranteed valid JSON matching a predefined structure. No parsing failures, no edge cases, no "the model returned markdown instead of JSON." This matters more than it might seem. Pipelines that fail unpredictably erode trust. Structured output makes the pipeline reliable enough to run unattended, which makes it usable as a research tool rather than a debugging exercise.

**The schema is the theory.** I keep returning to this. Five tables, each with specific scoping rules — article-level persistence for glossaries, run-level contingency for connections, pre-computed joins for semantic matches. Every scoping decision is a claim about what endures and what is contingent, what belongs to the text and what belongs to the reading. Database design is theory-making.

Angela Carter's observation that reading is re-writing applies here too. Each analysis run is a fresh reading of the article-paragraph relationship. The connection summaries are re-writings — Claude's interpretations of how the texts relate, shaped by the full context of the essay, the paragraph, the abstract, and the glossary. And because connections are run-scoped, the system preserves the fact that readings are temporal and contingent. Yesterday's reading doesn't overwrite today's. Both persist. Both are real.

## The Conversation Continues

The dinner party has evolved. The guests are seated. Each has a position in the room — a literal position in 3,072-dimensional meaning-space. Each has a phrasebook of contextual definitions. The conversations are flowing: connection summaries articulate how each guest's work speaks to specific passages in my essay. And now you can hear the themes — the key terms that multiple guests share, the semantic resonances that cross disciplinary boundaries, the vocabulary that makes dialogue possible.

The assistant didn't write the essay. It helped me perceive the meaning-space the essay lives in. The embeddings showed me topology I couldn't see. The glossaries showed me how the same words fracture into different meanings across disciplines. The connection summaries showed me relationships I'd intuited but couldn't articulate. And the viewer made all of it legible — turned the invisible geometry of meaning-space into something I could navigate, paragraph by paragraph, article by article, term by term.

In doing so, the tool became evidence for the essay's own argument. If sociocognitive space is real and dimensionally structured, then an instrument that maps that space and renders its structure perceptible should be useful — and it is. If meaning resides in the interstitial space between minds, then a system that computes and displays the connections between texts should reveal structure — and it does. If language acquisition is developing a perceptual modality for meaning-space, then a tool that augments that perception should teach you something you couldn't learn otherwise — and it did.

What does it mean to build a tool that embodies its own theory? What does it reveal when the architecture of a system — its tables, its vectors, its cached computations — mirrors the structure of the argument it was built to support?

---

_This post was drafted in conversation with Claude, which also powers the research assistant's analysis pipeline. The author revised, restructured, and substantially edited the draft._
