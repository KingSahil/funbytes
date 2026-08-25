import { Share, Platform, Alert } from 'react-native';
import * as Sharing from 'expo-sharing';
import { ContentItem } from '@funbytes/types';

export const shareService = {
  async sharePost(item: ContentItem): Promise<void> {
    try {
      const message = `⚡ Check this out on FunBytes:\n\n${item.title}\n\nRead more: ${item.articleUrl}\n\n#FunBytes #${item.category}`;

      await Share.share({
        title: item.title,
        message,
        url: item.articleUrl,
      });
    } catch (error: any) {
      console.warn('[ShareService] Error sharing post:', error.message);
    }
  },

  async shareApp(): Promise<void> {
    try {
      const message = `🚀 Download FunBytes — Your internet. Your interests. Your feed.\nhttps://funbytes.app`;
      await Share.share({
        title: 'FunBytes App',
        message,
      });
    } catch (error: any) {
      console.warn('[ShareService] Error sharing app:', error.message);
    }
  },
};

