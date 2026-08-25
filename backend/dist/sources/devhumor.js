"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DevHumorSource = void 0;
const base_1 = require("./base");
class DevHumorSource extends base_1.BaseContentSource {
    id = 'devhumor';
    name = 'DevHumor';
    category = 'memes';
    url = 'https://devhumor.com';
    constructor() {
        super();
        this.refreshIntervalMinutes = 30;
    }
    async fetchContent() {
        try {
            // In production, DevHumor structured JSON/RSS or mock fallback
            return [];
        }
        catch (error) {
            console.warn(`[DevHumorSource] Fetch warning: ${error.message}`);
            return [];
        }
    }
    normalizeContent(rawData) {
        if (!Array.isArray(rawData))
            return [];
        return rawData.map((item) => ({
            id: this.generateDeterministicId('devhumor', item.id || item.url || item.title),
            sourceId: this.id,
            sourceName: 'DevHumor',
            sourceUrl: this.url,
            sourceLogo: 'https://devhumor.com/assets/favicon.ico',
            title: item.title || 'Classic Developer Humor',
            summary: item.caption || 'When code runs fine on localhost but explodes in production.',
            author: item.author || 'DevHumor Community',
            imageUrl: item.imageUrl || item.image,
            thumbnailUrl: item.imageUrl || item.image,
            articleUrl: item.url || this.url,
            publishedAt: item.publishedAt || new Date().toISOString(),
            category: 'memes',
            tags: ['DevHumor', 'Meme', 'Programming', 'Humor'],
            contentType: 'meme',
            engagement: {
                likes: item.likes || Math.floor(Math.random() * 2500) + 500,
                comments: item.comments || Math.floor(Math.random() * 200) + 20,
                shares: item.shares || Math.floor(Math.random() * 400) + 50,
            },
        }));
    }
}
exports.DevHumorSource = DevHumorSource;
