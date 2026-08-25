"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RedditSource = void 0;
const axios_1 = __importDefault(require("axios"));
const base_1 = require("./base");
const config_1 = require("../config");
class RedditSource extends base_1.BaseContentSource {
    id;
    name;
    category;
    url;
    subreddit;
    constructor(subreddit, name, category = 'developers') {
        super();
        this.subreddit = subreddit;
        this.id = `reddit_${subreddit.toLowerCase()}`;
        this.name = name;
        this.category = category;
        this.url = `https://www.reddit.com/r/${subreddit}`;
        this.refreshIntervalMinutes = 15;
    }
    async fetchContent() {
        try {
            const endpoint = `https://www.reddit.com/r/${this.subreddit}/hot.json?limit=25`;
            const response = await axios_1.default.get(endpoint, {
                headers: {
                    'User-Agent': config_1.config.redditUserAgent,
                },
                timeout: 4000,
            });
            if (response.data && response.data.data && Array.isArray(response.data.data.children)) {
                return this.normalizeContent(response.data.data.children);
            }
            return [];
        }
        catch (error) {
            // Gracefully return empty array on rate limits or timeout so mock/cached data takes over
            console.warn(`[RedditSource] Fetch warning for r/${this.subreddit}: ${error.message}`);
            return [];
        }
    }
    normalizeContent(rawData) {
        if (!Array.isArray(rawData))
            return [];
        return rawData
            .filter((item) => item && item.data && !item.data.title.startsWith('[deleted]'))
            .map((item) => {
            const d = item.data;
            let imageUrl = undefined;
            if (d.preview?.images?.[0]?.source?.url) {
                imageUrl = d.preview.images[0].source.url.replace(/&amp;/g, '&');
            }
            else if (d.url && (d.url.endsWith('.png') || d.url.endsWith('.jpg') || d.url.endsWith('.jpeg') || d.url.includes('i.redd.it'))) {
                imageUrl = d.url;
            }
            else if (d.thumbnail && d.thumbnail.startsWith('http')) {
                imageUrl = d.thumbnail;
            }
            const summary = d.selftext
                ? this.stripHtml(d.selftext).slice(0, 240) + (d.selftext.length > 240 ? '...' : '')
                : `Join the active discussion on r/${this.subreddit} with ${d.num_comments} community comments.`;
            const publishedDate = new Date(d.created_utc * 1000).toISOString();
            return {
                id: this.generateDeterministicId(`reddit_${this.subreddit}`, d.id),
                sourceId: this.id,
                sourceName: `r/${this.subreddit}`,
                sourceUrl: `https://www.reddit.com/r/${this.subreddit}`,
                sourceLogo: 'https://www.redditstatic.com/shreddit/assets/favicon/192x192.png',
                title: d.title,
                summary,
                author: `u/${d.author}`,
                imageUrl,
                thumbnailUrl: imageUrl,
                articleUrl: `https://reddit.com${d.permalink}`,
                publishedAt: publishedDate,
                category: this.category,
                tags: [this.name, d.link_flair_text || 'Discussion', 'Reddit'].filter(Boolean),
                contentType: 'reddit',
                engagement: {
                    likes: Math.max(d.ups || 0, 1),
                    comments: d.num_comments || 0,
                    shares: Math.floor((d.ups || 0) * 0.12),
                },
                meta: {
                    flair: d.link_flair_text || undefined,
                    redditScore: d.ups,
                },
            };
        });
    }
}
exports.RedditSource = RedditSource;
