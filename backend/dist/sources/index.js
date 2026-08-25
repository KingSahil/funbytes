"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sourceManager = exports.SourceManager = void 0;
const reddit_1 = require("./reddit");
const medium_1 = require("./medium");
const devhumor_1 = require("./devhumor");
const bbc_1 = require("./bbc");
const aljazeera_1 = require("./aljazeera");
const pib_1 = require("./pib");
const politico_1 = require("./politico");
class SourceManager {
    sources = new Map();
    constructor() {
        this.registerDefaults();
    }
    registerDefaults() {
        this.register(new reddit_1.RedditSource('developersIndia', 'r/developersIndia', 'developers'));
        this.register(new reddit_1.RedditSource('programming', 'r/programming', 'developers'));
        this.register(new reddit_1.RedditSource('ArtificialInteligence', 'r/ArtificialInteligence', 'technology'));
        this.register(new medium_1.MediumSource());
        this.register(new devhumor_1.DevHumorSource());
        this.register(new bbc_1.BBCSource());
        this.register(new aljazeera_1.AlJazeeraSource());
        this.register(new pib_1.PIBSource());
        this.register(new politico_1.PoliticoCartoonSource());
    }
    register(source) {
        this.sources.set(source.id, source);
    }
    getSource(id) {
        return this.sources.get(id);
    }
    getAllSources() {
        return Array.from(this.sources.values());
    }
    setSourceEnabled(id, enabled) {
        const source = this.sources.get(id);
        if (source) {
            source.enabled = enabled;
            return true;
        }
        return false;
    }
    async fetchAll() {
        const promises = Array.from(this.sources.values())
            .filter((source) => source.enabled)
            .map(async (source) => {
            try {
                const items = await source.fetchContent();
                source.lastFetchedAt = new Date().toISOString();
                return items;
            }
            catch (error) {
                console.error(`[SourceManager] Error from ${source.id}:`, error);
                return [];
            }
        });
        const results = await Promise.all(promises);
        return results.flat();
    }
}
exports.SourceManager = SourceManager;
exports.sourceManager = new SourceManager();
