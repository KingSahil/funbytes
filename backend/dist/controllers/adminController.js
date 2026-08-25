"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminController = exports.AdminController = void 0;
const sources_1 = require("../sources");
const moderation_1 = require("../services/moderation");
class AdminController {
    getSources = async (req, res) => {
        try {
            const sources = sources_1.sourceManager.getAllSources().map((s) => ({
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
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    toggleSource = async (req, res) => {
        try {
            const id = String(req.params.id);
            const { enabled } = req.body;
            const success = sources_1.sourceManager.setSourceEnabled(id, Boolean(enabled));
            if (!success) {
                res.status(404).json({ success: false, error: 'Source not found' });
                return;
            }
            res.json({ success: true, message: `Source ${id} updated to ${enabled ? 'enabled' : 'disabled'}` });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    getReports = async (req, res) => {
        try {
            const reports = moderation_1.moderationService.getAllReports();
            res.json({ success: true, data: reports });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
    hideContent = async (req, res) => {
        try {
            const contentId = String(req.params.contentId);
            moderation_1.moderationService.hideContent(contentId);
            res.json({ success: true, message: `Content ${contentId} hidden successfully` });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    };
}
exports.AdminController = AdminController;
exports.adminController = new AdminController();
