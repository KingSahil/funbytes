"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediumSource = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const base_1 = require("./base");
class MediumSource extends base_1.BaseContentSource {
    id = 'medium_tech';
    name = 'Medium Tech';
    category = 'developers';
    url = 'https://medium.com/tag/programming';
    parser;
    constructor() {
        super();
        this.parser = new rss_parser_1.default({
            headers: {
                'User-Agent': 'FunBytesBot/1.0',
            },
            timeout: 4000,
        });
        this.refreshIntervalMinutes = 30;
    }
    async fetchContent() {
        try {
            const feed = await this.parser.parseURL('https://medium.com/feed/tag/programming');
            if (feed && feed.items) {
                return this.normalizeContent(feed.items);
            }
            return [];
        }
        catch (error) {
            console.warn(`[MediumSource] Warning fetching feed: ${error.message}`);
            return [];
        }
    }
    normalizeContent(rawItems) {
        if (!Array.isArray(rawItems))
            return [];
        return rawItems.map((item) => {
            // Extract image from content:encoded or description if present
            let imageUrl = undefined;
            const contentHtml = item['content:encoded'] || item.content || item.description || '';
            const imgMatch = contentHtml.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch && imgMatch[1]) {
                imageUrl = imgMatch[1];
            }
            const cleanSummary = this.stripHtml(item.contentSnippet || item.summary || item.description || '').slice(0, 240);
            return {
                id: this.generateDeterministicId('medium', item.guid || item.link || item.title || 'med'),
                sourceId: this.id,
                sourceName: 'Medium',
                sourceUrl: 'https://medium.com',
                sourceLogo: 'https://miro.medium.com/v2/resize:fill:152:152/1*mG6i4Bh_LtjafnkJQU71ew.png',
                title: item.title || 'Untitled Medium Post',
                summary: cleanSummary ? cleanSummary + (cleanSummary.length >= 240 ? '...' : '') : 'A popular developer article published on Medium.',
                author: item.creator || item.author || 'Medium Contributor',
                imageUrl,
                thumbnailUrl: imageUrl,
                articleUrl: item.link || this.url,
                publishedAt: item.isoDate || item.pubDate ? new Date(item.isoDate || item.pubDate).toISOString() : new Date().toISOString(),
                category: this.category,
                tags: (item.categories || ['Programming', 'Technology', 'Architecture']).slice(0, 4),
                contentType: 'article',
                engagement: {
                    likes: Math.floor(Math.random() * 400) + 120,
                    comments: Math.floor(Math.random() * 60) + 15,
                    shares: Math.floor(Math.random() * 30) + 5,
                },
                meta: {
                    readingTimeMinutes: 5,
                },
            };
        });
    }
}
exports.MediumSource = MediumSource;
