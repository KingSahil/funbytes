import { Category, ContentItem } from './content';
export interface Comment {
    id: string;
    contentId: string;
    authorId: string;
    authorName: string;
    authorAvatar?: string;
    content: string;
    createdAt: string;
    likesCount: number;
    isLiked?: boolean;
    parentId?: string;
    replies?: Comment[];
}
export interface BookmarkFolder {
    id: string;
    name: string;
    category?: Category;
    count: number;
}
export interface BookmarkItem {
    id: string;
    contentId: string;
    content: ContentItem;
    folderId?: string;
    savedAt: string;
}
export interface ContentReport {
    id: string;
    contentId: string;
    reporterUserId: string;
    reason: 'misinformation' | 'spam' | 'hate' | 'harassment' | 'inappropriate' | 'copyright';
    details?: string;
    createdAt: string;
    status: 'pending' | 'reviewed' | 'dismissed';
}
