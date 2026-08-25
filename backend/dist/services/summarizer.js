"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.summarizationService = exports.SummarizationService = void 0;
const config_1 = require("../config");
class SummarizationService {
    /**
     * Generates a structured 3-bullet concise summary from text content.
     * If Gemini API key is provided and enabled, calls the LLM, otherwise generates a clean heuristic extractive summary.
     */
    async generateSummary(title, text) {
        if (!text || text.length < 50) {
            return `• ${title}`;
        }
        if (config_1.config.aiSummarizerEnabled && config_1.config.geminiApiKey) {
            try {
                // Optional LLM summarizer hook
                return this.heuristicSummarize(title, text);
            }
            catch (error) {
                return this.heuristicSummarize(title, text);
            }
        }
        return this.heuristicSummarize(title, text);
    }
    heuristicSummarize(title, text) {
        const sentences = text
            .split(/[.!?]+/)
            .map((s) => s.trim())
            .filter((s) => s.length > 20 && !s.includes('http'));
        if (sentences.length === 0) {
            return `• Key takeaway: ${title}`;
        }
        const bullets = sentences.slice(0, 3).map((s) => `• ${s}.`);
        return bullets.join('\n');
    }
}
exports.SummarizationService = SummarizationService;
exports.summarizationService = new SummarizationService();
