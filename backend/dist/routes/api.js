"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiRouter = void 0;
const express_1 = require("express");
const feedController_1 = require("../controllers/feedController");
const interactionController_1 = require("../controllers/interactionController");
const discoveryController_1 = require("../controllers/discoveryController");
const adminController_1 = require("../controllers/adminController");
exports.apiRouter = (0, express_1.Router)();
// ==========================================
// FEED ROUTES
// ==========================================
exports.apiRouter.get('/feed', feedController_1.feedController.getFeed);
exports.apiRouter.get('/content/:id', feedController_1.feedController.getItemById);
// ==========================================
// DISCOVERY & TOPICS
// ==========================================
exports.apiRouter.get('/topics', discoveryController_1.discoveryController.getTopics);
exports.apiRouter.get('/trending', discoveryController_1.discoveryController.getTrending);
exports.apiRouter.get('/search', discoveryController_1.discoveryController.search);
exports.apiRouter.get('/visual/:type', discoveryController_1.discoveryController.getVisualSection);
// ==========================================
// INTERACTIONS (Likes, Comments, Bookmarks)
// ==========================================
exports.apiRouter.post('/content/:id/like', interactionController_1.interactionController.toggleLike);
exports.apiRouter.get('/content/:id/comments', interactionController_1.interactionController.getComments);
exports.apiRouter.post('/content/:id/comments', interactionController_1.interactionController.addComment);
exports.apiRouter.post('/comments/:commentId/like', interactionController_1.interactionController.toggleCommentLike);
exports.apiRouter.post('/content/:id/bookmark', interactionController_1.interactionController.toggleBookmark);
exports.apiRouter.get('/bookmarks/:userId', interactionController_1.interactionController.getUserBookmarks);
exports.apiRouter.post('/content/:id/report', interactionController_1.interactionController.reportContent);
// ==========================================
// ADMIN & HEALTH
// ==========================================
exports.apiRouter.get('/admin/sources', adminController_1.adminController.getSources);
exports.apiRouter.patch('/admin/sources/:id', adminController_1.adminController.toggleSource);
exports.apiRouter.get('/admin/reports', adminController_1.adminController.getReports);
exports.apiRouter.post('/admin/hide/:contentId', adminController_1.adminController.hideContent);
