"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deduplicationEngine = exports.DeduplicationEngine = void 0;
class DeduplicationEngine {
    similarityThreshold = 0.55;
    timeWindowHours = 48;
    stopWords = new Set([
        'a', 'an', 'the', 'and', 'or', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'is', 'are', 'was', 'were', 'new'
    ]);
    /**
     * Tokenize text into normalized lowercase words without punctuation and stopwords.
     */
    getWords(text) {
        const clean = text
            .toLowerCase()
            .replace(/[^a-z0-9\s]/g, '')
            .split(/\s+/)
            .filter((w) => w.length > 1 && !this.stopWords.has(w));
        return new Set(clean);
    }
    /**
     * Calculate Jaccard similarity coefficient between two strings based on key words.
     */
    calculateSimilarity(textA, textB) {
        if (textA === textB)
            return 1.0;
        const wordsA = this.getWords(textA);
        const wordsB = this.getWords(textB);
        if (wordsA.size === 0 || wordsB.size === 0)
            return 0.0;
        let intersectionCount = 0;
        for (const w of wordsA) {
            if (wordsB.has(w)) {
                intersectionCount++;
            }
        }
        const unionCount = wordsA.size + wordsB.size - intersectionCount;
        return unionCount > 0 ? intersectionCount / unionCount : 0.0;
    }
    /**
     * Group similar stories into a single primary item with multi-source coverage.
     */
    deduplicateAndCluster(items) {
        const clustered = [];
        const processedIds = new Set();
        for (let i = 0; i < items.length; i++) {
            const current = items[i];
            if (processedIds.has(current.id))
                continue;
            const primary = { ...current };
            primary.coverageSources = primary.coverageSources ? [...primary.coverageSources] : [];
            // Check if primary already has a coverage source for itself
            if (!primary.coverageSources.some((s) => s.name.toLowerCase() === primary.sourceName.toLowerCase())) {
                primary.coverageSources.push({
                    name: primary.sourceName,
                    url: primary.articleUrl,
                    sourceLogo: primary.sourceLogo,
                });
            }
            processedIds.add(primary.id);
            const currentTime = new Date(primary.publishedAt).getTime();
            // Search subsequent items for duplicates
            for (let j = i + 1; j < items.length; j++) {
                const candidate = items[j];
                if (processedIds.has(candidate.id))
                    continue;
                const candidateTime = new Date(candidate.publishedAt).getTime();
                const hourDiff = Math.abs(currentTime - candidateTime) / (1000 * 60 * 60);
                if (hourDiff <= this.timeWindowHours) {
                    const sim = this.calculateSimilarity(primary.title, candidate.title);
                    if (sim >= this.similarityThreshold) {
                        // Group duplicate into primary's coverage sources
                        if (!primary.coverageSources.some((s) => s.name.toLowerCase() === candidate.sourceName.toLowerCase())) {
                            primary.coverageSources.push({
                                name: candidate.sourceName,
                                url: candidate.articleUrl,
                                sourceLogo: candidate.sourceLogo,
                            });
                        }
                        // Merge engagement counts
                        primary.engagement = {
                            likes: primary.engagement.likes + Math.floor(candidate.engagement.likes * 0.4),
                            comments: primary.engagement.comments + Math.floor(candidate.engagement.comments * 0.4),
                            shares: primary.engagement.shares + Math.floor(candidate.engagement.shares * 0.4),
                        };
                        processedIds.add(candidate.id);
                    }
                }
            }
            clustered.push(primary);
        }
        return clustered;
    }
}
exports.DeduplicationEngine = DeduplicationEngine;
exports.deduplicationEngine = new DeduplicationEngine();
