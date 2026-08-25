"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.interactionController = exports.InteractionController = void 0;
const interactionStore_1 = require("../services/interactionStore");
const moderation_1 = require("../services/moderation");
const mockFeedData_1 = require("../data/mockFeedData");
class InteractionController {
    toggleLike = async (req, res) => {
        try {
            const id = String(req.params.id);
            const { userId = 'guest_user' } = req.body;
            const item = mockFeedData_1.mockFeedData.find((i) => i.id === id);
            const baseLikes = item?.engagement?.likes || 0;
            const result = interactionStore_1.interactionStore.toggleLike(String(userId), id, baseLikes);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    getComments = async (req, res) => {
        try {
            const id = String(req.params.id);
            const userId = req.query.userId || 'guest_user';
            const comments = interactionStore_1.interactionStore.getComments(id, String(userId));
            res.json({ success: true, data: comments });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    addComment = async (req, res) => {
        try {
            const id = String(req.params.id);
            const { userId = 'guest_user', authorName = 'Anonymous Byte', text, parentId } = req.body;
            if (!text || text.trim().length === 0) {
                res.status(400).json({ success: false, error: 'Comment text is required' });
                return;
            }
            if (moderation_1.moderationService.isUserBanned(String(userId))) {
                res.status(403).json({ success: false, error: 'User is banned from commenting' });
                return;
            }
            const comment = interactionStore_1.interactionStore.addComment(id, String(userId), String(authorName), String(text).trim(), parentId ? String(parentId) : undefined);
            res.status(201).json({ success: true, data: comment });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    toggleCommentLike = async (req, res) => {
        try {
            const commentId = String(req.params.commentId);
            const { userId = 'guest_user' } = req.body;
            const result = interactionStore_1.interactionStore.toggleCommentLike(String(userId), commentId);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    toggleBookmark = async (req, res) => {
        try {
            const id = String(req.params.id);
            const { userId = 'guest_user' } = req.body;
            const result = interactionStore_1.interactionStore.toggleBookmark(String(userId), id);
            res.json({ success: true, data: result });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    getUserBookmarks = async (req, res) => {
        try {
            const userId = String(req.params.userId || 'guest_user');
            const bookmarkedIds = interactionStore_1.interactionStore.getUserBookmarks(userId);
            const items = mockFeedData_1.mockFeedData
                .filter((item) => bookmarkedIds.includes(item.id))
                .map((item) => ({
                ...item,
                isBookmarked: true,
                isLiked: interactionStore_1.interactionStore.isPostLiked(userId, item.id),
            }));
            res.json({ success: true, data: items });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    reportContent = async (req, res) => {
        try {
            const id = String(req.params.id);
            const { userId = 'guest_user', reason = 'inappropriate', details } = req.body;
            const report = moderation_1.moderationService.reportContent(id, String(userId), reason, details ? String(details) : undefined);
            res.json({ success: true, data: report, message: 'Report submitted for review' });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}
exports.InteractionController = InteractionController;
exports.interactionController = new InteractionController();
