## How I Use AI in Creating Knowledge-Sharing Ecosystems

In today's academic environment, we're flooded with an overwhelming amount of information. With millions of articles published yearly, finding and prioritizing relevant content has become increasingly challenging. Over the past year, I've been experimenting with AI tools to help me navigate this landscape, using them as research assistants while maintaining my human judgment and scholarly approach.

### Creating a Knowledge-Sharing Dinner Party with AI

I love the metaphor of a "dinner party" for working with academic literature, as described by Kamler and Thomson in their excellent chapter "Persuading an octopus into a glass: Working with literatures." Rather than feeling lost or drowning in information, this metaphor positions me as a host who invites selected scholars to my table for meaningful conversation.

As the host of this dinner party, I have agency. I can't invite everyone because they won't all fit at my table, and I'm not just reviewing the conversation but actively participating in it. While I may not always catch all the nuances of complex theoretical discussions, I'm present and engaged, reflecting on these conversations later and deciding which guests to invite back.

What I've discovered is that AI can serve as an excellent "dinner party assistant" — helping me organize the guest list, prepare conversation topics, and even suggest seating arrangements, while I remain the host who guides the conversation and makes meaning from the exchange.

## How I Use AI in My Research Process

### 1. Organizing and Prioritizing My Reading Collection

Like many researchers, I've built a substantial personal collection of academic articles — around 1,000 articles growing at nearly 12 per week. This collection reflects my exploration from searching academic databases, following reference trails, and using discovery tools to build a comprehensive foundation for my research.

But having a vast collection is only valuable if you can navigate it effectively. That's where I've found AI tools particularly helpful:

While I wish I could read every article that interests me, I use generative AI to prioritize which papers I should read from my collection. I'll write out my thinking on the interdisciplinary connections I'm trying to make and create 1-2 dozen reference tags that address the question. I describe each of those tags, perhaps using generative AI to elaborate further based on a draft of my writing, then ask an LLM to rate the relevance of each abstract to each of my tags.

This process is documented in my `score-and-sort-abstracts.ipynb` notebook, where I used GPT-4o-mini to systematically rate the relevance of article abstracts to my tags:

```python
def get_relevance_score(tag_desc, abstract_text):
    prompt = (
        f"Rate the relevance of the following article abstract to the tag description on a scale of 0-10.\n\n"
        f"Tag description:\n{tag_desc}\n\n"
        f"Article abstract:\n{abstract_text}\n\n"
        "Respond with only a single integer between 0 (not relevant) and 10 (highly relevant)."
    )
    response = openai.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        temperature=0
    )
    return int(response.choices[0].message.content.strip())

# Process articles and assign relevance scores
for article in tqdm(articles, desc="Processing articles"):
    for tag in tags:
        score = get_relevance_score(tag["description"], article["abstract"])
        if score > 0:
            article["tags"].append({
                "id": tag["id"],
                "secondaryWeight": score
            })
            weighted_sum += tag["primaryWeight"] + score
    article["weightedSum"] = weighted_sum
```

This approach allows me to filter hundreds of articles based on their relevance to my specific research focus in minutes rather than hours or days:

```python
articles_sorted = sorted(articles, key: "weightedSum", reverse=True)
# Filter articles with high relevance scores
filtered_articles = articles_sorted[:20]
for i in range(1, 11): 
	# i is relevance score - secondaryWeight
	# n is the number of tags that need to meet the threshold
    test = filter_by_relevance(articles_sorted[20:], i, n)
    print(f"Filtered articles with threshold {i}: {len(test)}")
    if len(test) < 25:
        filtered_articles += test
        break
```

The result is a manageable reading list that prioritizes the most relevant sources for my research. This list helps me navigate my collection more efficiently while still maintaining control over the final selection process.

### 2. Creating Supporting Materials for Personal Organization

For sources lacking abstracts (like book chapters), I use generative AI to draft preliminary abstracts following NISO (2015) Guidelines for Abstracts. These AI-generated abstracts serve as organizational tools for my personal reference. These abstracts aren't included in my final manuscript, but they help me organize and prioritize my reading.

Similarly, I use speech-to-text models to capture my verbal think-aloud reflections while reading. Editing and mixing those notes with quotes pulled from the text creates much more productive documentation than typical margin notes or highlights.

## The Human-AI Balance in Research

While AI tools have become valuable assistants in my research workflow, I'm careful to maintain appropriate boundaries. AI primarily functions as an organizational tool to help navigate a large corpus of literature rather than a generator of content. But, I will let AI draft some non-academic writing, which I then substantially revise, such as every post on this blog.

As artificial intelligence transforms information retrieval and knowledge management, information agency leaders face the challenge of harnessing AI's capabilities while preserving the dialogic processes that build shared understanding. I practice what I preach by using AI as a tool to enhance my research while ensuring that the final analysis and meaning-making remain firmly in my hands.

## Knowledge Emerges Through Conversation

Many organizations make the fundamental mistake of treating information and knowledge as interchangeable. They're not. Information consists of organized data that can be transmitted, stored, and accessed. Knowledge, by contrast, emerges when information connects with experience, context, and judgment.

AI helps me organize information, but knowledge emerges through my engagement with that information — through conversation, reflection, and the connections I make with others between different ideas. When I use AI to help prioritize my reading, I'm not outsourcing my thinking but creating more space for it by reducing the cognitive load of initial organization.

Knowledge isn't just transmitted — it's constructed through social interaction, shared experiences, and dialogue. Knowledge grows rather than flows. In this sense, AI doesn't replace scholarly conversation but can help facilitate it by connecting me with the right "dinner guests" - the scholars whose ideas are most relevant to my current thinking.

## AI Disclosure Practices

Generative AI tools are becoming an increasingly valuable part of the writing and research process, offering new ways to enhance creativity, streamline workflows, and tackle complex challenges. Whether you’re exploring these tools for the first time or already incorporating them into your writing, understanding how to use them responsibly ensures your work remains original, ethical, and aligned with professional publishing standards.

I refer to [Wiley's guide for using AI tools in your writing](https://www.wiley.com/en-us/publish/book/ai-guidelines) to guide my development of an ethical framework and craft my disclosures.

## Conclusion: The Future of AI-Assisted Research

As AI tools continue to evolve, I believe they'll become increasingly valuable for helping scholars navigate the growing volume of academic literature. However, their most effective use will remain assistive rather than generative — helping researchers find relevant sources, organize information effectively, and document their thinking, while leaving the critical scholarly work of analysis, synthesis, and original thinking to embodied and social cognition.

In this evolving landscape, the dinner party metaphor remains apt. AI can help me prepare the guest list and set the table, but I remain the host who guides the conversation and makes meaning from the exchange. The most successful researchers are those who develop thoughtful workflows that leverage AI's organizational capabilities while maintaining a firm commitment to their own intellectual contribution.

Using AI to help organize my vast reading collection and capture my thoughts, I can engage more deeply with the literature while maintaining the human-centered approach essential to quality scholarship.

What AI-assisted research practices have you found most valuable in your own work?