---
name: funbytes-feed-ranking
description: Principles, formulas, and tuning rules for personalized feed scoring, recency decay, and deduplication clustering.
---

# FunBytes Feed Ranking Skill

## Purpose
Specifies the ranking formula and deduplication pipeline that transforms raw ingested content into an addictive, relevant, personalized feed.

## When to Use It
- Adjusting feed recommendation weights.
- Enhancing topic affinity or trending velocity calculations.
- Tuning deduplication similarity thresholds.

## Ranking Formula
Each `ContentItem` is evaluated against the current user context $U$:

$$\text{FinalScore} = S_{\text{topic}} + S_{\text{interest}} + S_{\text{recency}} + S_{\text{engagement}} + S_{\text{bonus}}$$

Where:
- $S_{\text{topic}} = W_{\text{topic}} \times [ \text{category} \in U.\text{selectedTopics} ? 1.0 : 0.0 ]$ (Weight: 40)
- $S_{\text{interest}} = W_{\text{interest}} \times \text{Overlap}( \text{tags}, U.\text{interests} )$ (Weight: 25)
- $S_{\text{recency}} = W_{\text{recency}} \times e^{-\frac{\Delta t}{\tau}}$ where $\tau = 24 \text{ hours}$ (Weight: 20)
- $S_{\text{engagement}} = W_{\text{eng}} \times \log_{10}(1 + \text{likes} + 2 \times \text{comments} + 3 \times \text{shares})$ (Weight: 15)
- $S_{\text{bonus}} = \text{Meme/Visual bonus based on user feed style preference}$

## Deduplication & Story Clustering
1. **Title Tokenization**: Strip punctuation, lowercase, extract 3-grams.
2. **Jaccard Similarity Threshold**: $T_{\text{sim}} \ge 0.72$.
3. **Time Window**: Within 48 hours.
4. **Group Action**: Cluster under the highest authority source and append secondary sources to `coverageSources: [{ name: "BBC", url: "..." }, { name: "PIB", url: "..." }]`.

## Testing Requirements
- Test ranking ordering for users with Developer vs Politics profiles.
- Test that fresh breaking news outranks older viral posts.
- Test that 3 identical news items collapse into 1 card with coverage tags.
