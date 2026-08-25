import { ContentReport } from '@funbytes/types';
import { v4 as uuidv4 } from 'uuid';

export class ModerationService {
  private reports: ContentReport[] = [];
  private hiddenContentIds: Set<string> = new Set();
  private bannedUsers: Set<string> = new Set();

  reportContent(
    contentId: string,
    reporterUserId: string,
    reason: ContentReport['reason'],
    details?: string
  ): ContentReport {
    const report: ContentReport = {
      id: `rep_${uuidv4().slice(0, 8)}`,
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

  isContentHidden(contentId: string): boolean {
    return this.hiddenContentIds.has(contentId);
  }

  hideContent(contentId: string): void {
    this.hiddenContentIds.add(contentId);
  }

  unhideContent(contentId: string): void {
    this.hiddenContentIds.delete(contentId);
  }

  getAllReports(): ContentReport[] {
    return this.reports;
  }

  banUser(userId: string): void {
    this.bannedUsers.add(userId);
  }

  isUserBanned(userId: string): boolean {
    return this.bannedUsers.has(userId);
  }
}

export const moderationService = new ModerationService();
