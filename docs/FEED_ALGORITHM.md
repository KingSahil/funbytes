# FunBytes Feed Ranking & Recommendation Engine

## 1. Recommendation Objectives
1. **Instant Relevance**: Highlight topics explicitly selected during onboarding or top topic chips.
2. **Freshness & Recency**: New stories should surge to the top without drowning out high-quality viral discussions.
3. **Engagement Velocity**: Fast-growing discussions on Reddit or DevHumor get boosted proportional to interaction volume.
4. **Diversity**: Avoid monocultures by interleaving news, memes, and community discussions.

## 2. Mathematical Scoring Function
For a content item $i$ and user profile $u$:

$$S(i, u) = W_{\text{topic}} \cdot M(i.\text{category}, u) + W_{\text{recency}} \cdot e^{-\lambda \Delta t} + W_{\text{eng}} \cdot \log_{10}(1 + \text{engScore}) + W_{\text{style}} \cdot \text{Bonus}(i, u.\text{style})$$

### Default Weights:
- $W_{\text{topic}} = 50.0$ (Primary user topic alignment)
- $W_{\text{recency}} = 30.0$ ($\lambda = \frac{\ln(2)}{24\text{ hours}}$ - 24hr half-life)
- $W_{\text{eng}} = 15.0$ ($\text{engScore} = \text{likes} + 2 \times \text{comments} + 3 \times \text{shares}$)
- $W_{\text{style}} = 10.0$ (Trending / Latest / Fun multiplier)

## 3. Deduplication Algorithm
1. Normalize titles by stripping stopwords and special characters.
2. Generate 3-gram character shingles.
3. Compute Jaccard coefficient $J(A, B) = \frac{|A \cap B|}{|A \cup B|}$.
4. If $J(A, B) \ge 0.70$ and $|t_A - t_B| \le 48\text{h}$, cluster $B$ into $A$'s `coverageSources` list.
