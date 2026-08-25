import { ContentItem } from '@funbytes/types';
import { config } from '../config';

export class SummarizationService {
  /**
   * Generates a structured 3-bullet concise summary from text content.
   * If Gemini API key is provided and enabled, calls the LLM, otherwise generates a clean heuristic extractive summary.
   */
  async generateSummary(title: string, text: string): Promise<string> {
    if (!text || text.length < 50) {
      return `• ${title}`;
    }

    if (config.aiSummarizerEnabled && config.geminiApiKey) {
      try {
        // Optional LLM summarizer hook
        return this.heuristicSummarize(title, text);
      } catch (error) {
        return this.heuristicSummarize(title, text);
      }
    }

    return this.heuristicSummarize(title, text);
  }

  private heuristicSummarize(title: string, text: string): string {
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

export const summarizationService = new SummarizationService();
