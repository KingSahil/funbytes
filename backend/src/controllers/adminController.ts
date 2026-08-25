import { Request, Response } from 'express';
import { sourceManager } from '../sources';
import { moderationService } from '../services/moderation';

export class AdminController {
  getSources = async (req: Request, res: Response): Promise<void> => {
    try {
      const sources = sourceManager.getAllSources().map((s) => ({
        id: s.id,
        name: s.name,
        category: s.category,
        url: s.url,
        enabled: s.enabled,
        refreshIntervalMinutes: s.refreshIntervalMinutes,
        lastFetchedAt: s.lastFetchedAt,
        status: s.enabled ? 'active' : 'disabled',
      }));

      res.json({ success: true, data: sources });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  toggleSource = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { enabled } = req.body;

      const success = sourceManager.setSourceEnabled(id, Boolean(enabled));
      if (!success) {
        res.status(404).json({ success: false, error: 'Source not found' });
        return;
      }

      res.json({ success: true, message: `Source ${id} updated to ${enabled ? 'enabled' : 'disabled'}` });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getReports = async (req: Request, res: Response): Promise<void> => {
    try {
      const reports = moderationService.getAllReports();
      res.json({ success: true, data: reports });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  hideContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const contentId = String(req.params.contentId);
      moderationService.hideContent(contentId);
      res.json({ success: true, message: `Content ${contentId} hidden successfully` });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export const adminController = new AdminController();
