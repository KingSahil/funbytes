import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'trending' | 'system';
  title: string;
  body: string;
  timeAgo: string;
  avatarUrl?: string;
  postId?: string;
}

export default function NotificationsScreen() {
  const router = useRouter();

  const notifications: NotificationItem[] = [
    {
      id: 'notif_1',
      type: 'like',
      title: 'New Like on your comment',
      body: 'Alexandre Roche and 4 others liked your comment on Modular Monoliths.',
      timeAgo: '15m ago',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&q=80',
      postId: 'dev_post_01',
    },
    {
      id: 'notif_2',
      type: 'trending',
      title: '🔥 Trending in Developers',
      body: 'React Native 0.78 is surging with over 2.8K likes across FunBytes.',
      timeAgo: '1h ago',
      postId: 'dev_post_02',
    },
    {
      id: 'notif_3',
      type: 'comment',
      title: 'Reply to your thought',
      body: 'Priya Sharma replied: "Tested React Native 0.78 on our production app!"',
      timeAgo: '2h ago',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80',
      postId: 'reddit_dev_01',
    },
    {
      id: 'notif_4',
      type: 'system',
      title: '⚡ Algorithm Tuned',
      body: 'Your feed stream has been recalibrated based on your developer reading preferences.',
      timeAgo: '1d ago',
    },
  ];

  const getIcon = (type: NotificationItem['type']) => {
    switch (type) {
      case 'like':
        return <Ionicons name="heart" size={18} color={Colors.accentLike} />;
      case 'comment':
        return <Ionicons name="chatbubble" size={18} color={Colors.secondary} />;
      case 'trending':
        return <Ionicons name="flame" size={18} color={Colors.accentGold} />;
      default:
        return <Ionicons name="flash" size={18} color={Colors.primary} />;
    }
  };

  const handlePress = (notif: NotificationItem) => {
    if (notif.postId) {
      router.push({
        pathname: '/post/[id]',
        params: { id: notif.postId },
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Notifications & Activity" showSearch={false} showBell={false} />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.notifCard}
            onPress={() => handlePress(item)}
            activeOpacity={0.8}
          >
            <View style={styles.iconContainer}>{getIcon(item.type)}</View>
            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                <Text style={styles.notifTitle}>{item.title}</Text>
                <Text style={styles.timeAgo}>{item.timeAgo}</Text>
              </View>
              <Text style={styles.notifBody}>{item.body}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  listContent: {
    padding: Spacing.md,
    gap: Spacing.sm,
  },
  notifCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notifTitle: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  timeAgo: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
  },
  notifBody: {
    fontSize: Typography.fontSizes.xs + 1,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
});

