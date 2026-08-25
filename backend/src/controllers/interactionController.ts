import { Request, Response } from 'express';
import { interactionStore } from '../services/interactionStore';
import { moderationService } from '../services/moderation';
import { mockFeedData } from '../data/mockFeedData';

export class InteractionController {
  toggleLike = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { userId = 'guest_user' } = req.body;

      const item = mockFeedData.find((i) => i.id === id);
      const baseLikes = item?.engagement?.likes || 0;

      const result = interactionStore.toggleLike(String(userId), id, baseLikes);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getComments = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const userId = (req.query.userId as string) || 'guest_user';

      const comments = interactionStore.getComments(id, String(userId));
      res.json({ success: true, data: comments });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  addComment = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { userId = 'guest_user', authorName = 'Anonymous Byte', text, parentId } = req.body;

      if (!text || text.trim().length === 0) {
        res.status(400).json({ success: false, error: 'Comment text is required' });
        return;
      }

      if (moderationService.isUserBanned(String(userId))) {
        res.status(403).json({ success: false, error: 'User is banned from commenting' });
        return;
      }

      const comment = interactionStore.addComment(
        id,
        String(userId),
        String(authorName),
        String(text).trim(),
        parentId ? String(parentId) : undefined
      );
      res.status(201).json({ success: true, data: comment });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  toggleCommentLike = async (req: Request, res: Response): Promise<void> => {
    try {
      const commentId = String(req.params.commentId);
      const { userId = 'guest_user' } = req.body;

      const result = interactionStore.toggleCommentLike(String(userId), commentId);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  toggleBookmark = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { userId = 'guest_user' } = req.body;

      const result = interactionStore.toggleBookmark(String(userId), id);
      res.json({ success: true, data: result });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  getUserBookmarks = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = String(req.params.userId || 'guest_user');
      const bookmarkedIds = interactionStore.getUserBookmarks(userId);

      const items = mockFeedData
        .filter((item) => bookmarkedIds.includes(item.id))
        .map((item) => ({
          ...item,
          isBookmarked: true,
          isLiked: interactionStore.isPostLiked(userId, item.id),
        }));

      res.json({ success: true, data: items });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };

  reportContent = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = String(req.params.id);
      const { userId = 'guest_user', reason = 'inappropriate', details } = req.body;

      const report = moderationService.reportContent(id, String(userId), reason, details ? String(details) : undefined);
      res.json({ success: true, data: report, message: 'Report submitted for review' });
    } catch (error: any) {
      res.status(500).json({ success: false, error: error.message });
    }
  };
}

export const interactionController = new InteractionController();
