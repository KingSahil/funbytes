import { Router } from 'express';
import { feedController } from '../controllers/feedController';
import { interactionController } from '../controllers/interactionController';
import { discoveryController } from '../controllers/discoveryController';
import { adminController } from '../controllers/adminController';

export const apiRouter = Router();

// ==========================================
// FEED ROUTES
// ==========================================
apiRouter.get('/feed', feedController.getFeed);
apiRouter.get('/content/:id', feedController.getItemById);

// ==========================================
// DISCOVERY & TOPICS
// ==========================================
apiRouter.get('/topics', discoveryController.getTopics);
apiRouter.get('/trending', discoveryController.getTrending);
apiRouter.get('/search', discoveryController.search);
apiRouter.get('/visual/:type', discoveryController.getVisualSection);

// ==========================================
// INTERACTIONS (Likes, Comments, Bookmarks)
// ==========================================
apiRouter.post('/content/:id/like', interactionController.toggleLike);
apiRouter.get('/content/:id/comments', interactionController.getComments);
apiRouter.post('/content/:id/comments', interactionController.addComment);
apiRouter.post('/comments/:commentId/like', interactionController.toggleCommentLike);

apiRouter.post('/content/:id/bookmark', interactionController.toggleBookmark);
apiRouter.get('/bookmarks/:userId', interactionController.getUserBookmarks);
apiRouter.post('/content/:id/report', interactionController.reportContent);

// ==========================================
// ADMIN & HEALTH
// ==========================================
apiRouter.get('/admin/sources', adminController.getSources);
apiRouter.patch('/admin/sources/:id', adminController.toggleSource);
apiRouter.get('/admin/reports', adminController.getReports);
apiRouter.post('/admin/hide/:contentId', adminController.hideContent);
