"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseContentSource = void 0;
class BaseContentSource {
    enabled = true;
    refreshIntervalMinutes = 30;
    lastFetchedAt;
    async isAvailable() {
        return true;
    }
    generateDeterministicId(sourcePrefix, urlOrId) {
        // Simple deterministic slug-based ID
        const cleanStr = urlOrId.toLowerCase().replace(/[^a-z0-9]/g, '-').slice(-40);
        return `${sourcePrefix}_${cleanStr}`;
    }
    stripHtml(html) {
        if (!html)
            return '';
        return html.replace(/<[^>]*>?/gm, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').trim();
    }
}
exports.BaseContentSource = BaseContentSource;
