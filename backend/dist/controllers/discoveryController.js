"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discoveryController = exports.DiscoveryController = void 0;
const mockFeedData_1 = require("../data/mockFeedData");
class DiscoveryController {
    getTopics = async (req, res) => {
        const topics = [
            {
                id: 'developers',
                name: 'Developers',
                icon: '💻',
                description: 'Code, system architecture, open source & engineering',
                subInterests: ['React Native', 'Rust', 'TypeScript', 'Backend', 'DevOps', 'PostgreSQL'],
            },
            {
                id: 'technology',
                name: 'Technology',
                icon: '🤖',
                description: 'AI breakthroughs, quantum computing, gadgets & silicon',
                subInterests: ['AI', 'Quantum', 'Batteries', 'Cybersecurity', 'Robotics'],
            },
            {
                id: 'memes',
                name: 'Dev Memes',
                icon: '😂',
                description: 'Hilarious programming humor and developer chaos',
                subInterests: ['DevHumor', 'CSS', 'Git', 'Production', 'NodeJS'],
            },
            {
                id: 'cartoons',
                name: 'Political Cartoons',
                icon: '🎨',
                description: 'Sharp editorial political satire and artwork',
                subInterests: ['Editorial', 'Satire', 'Global Affairs', 'Culture'],
            },
            {
                id: 'politics',
                name: 'Politics & India',
                icon: '🏛️',
                description: 'National policy, Digital Public Infrastructure, governance & economy',
                subInterests: ['India', 'PIB', 'DPI', 'Semiconductor', 'Renewables'],
            },
            {
                id: 'sports',
                name: 'Sports',
                icon: '🏏',
                description: 'Cricket thrillers, UCL football, Formula 1 & Olympics',
                subInterests: ['Cricket', 'Football', 'Formula 1', 'Olympics', 'IPL'],
            },
            {
                id: 'bollywood',
                name: 'Bollywood & Cinema',
                icon: '🎬',
                description: 'Box office spectacles, OTT releases & indie music',
                subInterests: ['Cinema', 'OTT', 'Indie Music', 'Box Office'],
            },
            {
                id: 'international',
                name: 'International News',
                icon: '🌎',
                description: 'Global diplomacy, space exploration & world events',
                subInterests: ['Space', 'Climate', 'Global Economy', 'JWST'],
            },
        ];
        res.json({ success: true, data: topics });
    };
    getTrending = async (req, res) => {
        // Return top 6 viral items sorted by total engagement
        const trendingItems = [...mockFeedData_1.mockFeedData]
            .sort((a, b) => {
            const engA = (a.engagement?.likes || 0) + (a.engagement?.comments || 0) * 2;
            const engB = (b.engagement?.likes || 0) + (b.engagement?.comments || 0) * 2;
            return engB - engA;
        })
            .slice(0, 6);
        const trendingTags = [
            { tag: '#ModularMonoliths', count: '14.2K bytes' },
            { tag: '#ReactNative078', count: '9.8K bytes' },
            { tag: '#T20Thriller', count: '28.4K bytes' },
            { tag: '#DevHumor', count: '18.1K bytes' },
            { tag: '#QuantumSupremacy', count: '7.5K bytes' },
            { tag: '#DPIRevolution', count: '6.2K bytes' },
        ];
        res.json({
            success: true,
            data: {
                items: trendingItems,
                hashtags: trendingTags,
            },
        });
    };
    search = async (req, res) => {
        try {
            const q = (req.query.q || '').toLowerCase().trim();
            const category = req.query.category?.toLowerCase();
            if (!q) {
                res.json({ success: true, data: [] });
                return;
            }
            let results = mockFeedData_1.mockFeedData.filter((item) => {
                const titleMatch = item.title.toLowerCase().includes(q);
                const summaryMatch = item.summary?.toLowerCase().includes(q);
                const authorMatch = item.author?.toLowerCase().includes(q);
                const sourceMatch = item.sourceName.toLowerCase().includes(q);
                const tagMatch = item.tags.some((t) => t.toLowerCase().includes(q));
                return titleMatch || summaryMatch || authorMatch || sourceMatch || tagMatch;
            });
            if (category && category !== 'all') {
                results = results.filter((item) => item.category.toLowerCase() === category);
            }
            res.json({ success: true, data: results });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    getVisualSection = async (req, res) => {
        try {
            const { type } = req.params; // 'cartoons' or 'memes'
            const items = mockFeedData_1.mockFeedData.filter((i) => i.contentType === (type === 'cartoons' ? 'cartoon' : 'meme'));
            res.json({ success: true, data: items });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}
exports.DiscoveryController = DiscoveryController;
exports.discoveryController = new DiscoveryController();
