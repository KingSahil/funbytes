"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PIBSource = void 0;
const rss_parser_1 = __importDefault(require("rss-parser"));
const base_1 = require("./base");
class PIBSource extends base_1.BaseContentSource {
    id = 'pib_india';
    name = 'PIB India';
    category = 'politics';
    url = 'https://www.pib.gov.in';
    parser;
    constructor() {
        super();
        this.parser = new rss_parser_1.default({ timeout: 4000 });
        this.refreshIntervalMinutes = 30;
    }
    async fetchContent() {
        try {
            // PIB official press release feed endpoint
            return [];
        }
        catch (error) {
            console.warn(`[PIBSource] Warning fetching feed: ${error.message}`);
            return [];
        }
    }
    normalizeContent(rawItems) {
        if (!Array.isArray(rawItems))
            return [];
        return rawItems.map((item) => ({
            id: this.generateDeterministicId('pib', item.guid || item.title),
            sourceId: this.id,
            sourceName: 'PIB India',
            sourceUrl: this.url,
            sourceLogo: 'https://pib.gov.in/pib_images/pib_logo.png',
            title: item.title || 'Official Government Release',
            summary: this.stripHtml(item.summary || item.description || '').slice(0, 240),
            author: 'Press Information Bureau',
            articleUrl: item.link || this.url,
            publishedAt: item.pubDate || new Date().toISOString(),
            category: 'politics',
            tags: ['India', 'PIB', 'Government', 'Policy'],
            contentType: 'article',
            engagement: {
                likes: Math.floor(Math.random() * 300) + 50,
                comments: Math.floor(Math.random() * 40) + 5,
                shares: Math.floor(Math.random() * 80) + 12,
            },
        }));
    }
}
exports.PIBSource = PIBSource;
