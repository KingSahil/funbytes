"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BBCSource = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const base_1 = require("./base");
class BBCSource extends base_1.BaseContentSource {
    id = 'bbc_news';
    name = 'BBC News';
    category = 'international';
    url = 'https://www.bbc.com';
    parser;
    constructor() {
        super();
        this.parser = new rss_parser_1.default({ timeout: 4000 });
        this.refreshIntervalMinutes = 20;
    }
    async fetchContent() {
        try {
            const feed = await this.parser.parseURL('http://feeds.bbci.co.uk/news/world/rss.xml');
            if (feed && feed.items) {
                return this.normalizeContent(feed.items);
            }
            return [];
        }
        catch (error) {
            console.warn(`[BBCSource] Fetch warning: ${error.message}`);
            return [];
        }
    }
    normalizeContent(rawItems) {
        if (!Array.isArray(rawItems))
            return [];
        return rawItems.map((item) => {
            const cleanSummary = this.stripHtml(item.contentSnippet || item.description || '').slice(0, 240);
            return {
                id: this.generateDeterministicId('bbc', item.guid || item.link || item.title),
                sourceId: this.id,
                sourceName: 'BBC News',
                sourceUrl: 'https://www.bbc.com',
                sourceLogo: 'https://static.files.bbci.co.uk/core/website/assets/static/icons/favicon-192x192.png',
                title: item.title || 'Breaking World News',
                summary: cleanSummary ? cleanSummary + '...' : 'Latest global news report from BBC.',
                author: 'BBC World Service',
                imageUrl: item.enclosure?.url || undefined,
                articleUrl: item.link || this.url,
                publishedAt: item.isoDate || item.pubDate ? new Date(item.isoDate || item.pubDate).toISOString() : new Date().toISOString(),
                category: this.category,
                tags: ['BBC', 'World', 'International', 'News'],
                contentType: 'article',
                engagement: {
                    likes: Math.floor(Math.random() * 800) + 100,
                    comments: Math.floor(Math.random() * 150) + 20,
                    shares: Math.floor(Math.random() * 90) + 10,
                },
            };
        });
    }
}
exports.BBCSource = BBCSource;
