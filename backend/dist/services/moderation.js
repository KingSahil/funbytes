"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.moderationService = exports.ModerationService = void 0;
const uuid_1 = require("uuid");
class ModerationService {
    reports = [];
    hiddenContentIds = new Set();
    bannedUsers = new Set();
    reportContent(contentId, reporterUserId, reason, details) {
        const report = {
            id: `rep_${(0, uuid_1.v4)().slice(0, 8)}`,
            contentId,
            reporterUserId,
            reason,
            details,
            createdAt: new Date().toISOString(),
            status: 'pending',
        };
        this.reports.push(report);
        // Auto-hide if reported by 3 or more distinct users
        const postReports = this.reports.filter((r) => r.contentId === contentId);
        if (postReports.length >= 3) {
            this.hiddenContentIds.add(contentId);
        }
        return report;
    }
    isContentHidden(contentId) {
        return this.hiddenContentIds.has(contentId);
    }
    hideContent(contentId) {
        this.hiddenContentIds.add(contentId);
    }
    unhideContent(contentId) {
        this.hiddenContentIds.delete(contentId);
    }
    getAllReports() {
        return this.reports;
    }
    banUser(userId) {
        this.bannedUsers.add(userId);
    }
    isUserBanned(userId) {
        return this.bannedUsers.has(userId);
    }
}
exports.ModerationService = ModerationService;
exports.moderationService = new ModerationService();
