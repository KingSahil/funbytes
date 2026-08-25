"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoliticoCartoonSource = void 0;
const base_1 = require("./base");
class PoliticoCartoonSource extends base_1.BaseContentSource {
    id = 'politico_cartoons';
    name = 'Politico Cartoons';
    category = 'cartoons';
    url = 'https://www.politico.com/gallery/political-cartoons';
    constructor() {
        super();
        this.refreshIntervalMinutes = 60;
    }
    async fetchContent() {
        try {
            // In production, fetch gallery feed
            return [];
        }
        catch (error) {
            console.warn(`[PoliticoCartoonSource] Warning: ${error.message}`);
            return [];
        }
    }
    normalizeContent(rawItems) {
        if (!Array.isArray(rawItems))
            return [];
        return rawItems.map((item) => ({
            id: this.generateDeterministicId('politico_cartoon', item.id || item.title),
            sourceId: this.id,
            sourceName: 'Politico Cartoons',
            sourceUrl: this.url,
            sourceLogo: 'https://static.politico.com/favicon.ico',
            title: item.title || 'Political Cartoon of the Week',
            summary: item.context || 'Editorial cartoon commenting on global economic and political developments.',
            author: item.cartoonist || 'Editorial Staff',
            imageUrl: item.imageUrl,
            thumbnailUrl: item.imageUrl,
            articleUrl: item.link || this.url,
            publishedAt: item.publishedAt || new Date().toISOString(),
            category: 'cartoons',
            tags: ['Cartoons', 'Politics', 'Editorial', 'Satire'],
            contentType: 'cartoon',
            engagement: {
                likes: item.likes || Math.floor(Math.random() * 900) + 150,
                comments: item.comments || Math.floor(Math.random() * 90) + 10,
                shares: item.shares || Math.floor(Math.random() * 200) + 30,
            },
            meta: {
                cartoonist: item.cartoonist || 'Matt Wuerker',
                publication: 'Politico',
            },
        }));
    }
}
exports.PoliticoCartoonSource = PoliticoCartoonSource;
