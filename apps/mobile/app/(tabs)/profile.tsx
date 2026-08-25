import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { useUserStore } from '../../store/useUserStore';
import { useBookmarkStore } from '../../store/useBookmarkStore';
import { TOPIC_CATEGORIES } from '../../constants/topics';
import { FeedCard } from '../../components/feed/FeedCard';
import { Category, FeedStyle } from '@funbytes/types';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function ProfileScreen() {
  const router = useRouter();
  const {
    userName,
    userAvatar,
    selectedTopics,
    toggleTopic,
    feedStyle,
    setFeedStyle,
    resetPreferences,
  } = useUserStore();

  const { savedItems, folders, activeFolder, setActiveFolder } = useBookmarkStore();
  const [activeTab, setActiveTab] = useState<'bookmarks' | 'preferences'>('bookmarks');

  const filteredBookmarks =
    activeFolder === 'All'
      ? savedItems
      : savedItems.filter(
          (item) => item.category?.toLowerCase() === activeFolder.toLowerCase()
        );

  const handleResetOnboarding = () => {
    Alert.alert(
      'Reset Preferences',
      'This will clear your chosen interests and restart the onboarding wizard.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            resetPreferences();
            router.replace('/onboarding');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Your Profile & Bookmarks" showSearch={false} showBell={false} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* User Card */}
        <View style={styles.userCard}>
          <Image source={{ uri: userAvatar }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.displayName}>{userName}</Text>
            <View style={styles.badgeRow}>
              <View style={styles.guestBadge}>
                <Text style={styles.guestBadgeText}>⚡ Byte Pioneer</Text>
              </View>
              <View style={styles.styleBadge}>
                <Text style={styles.styleBadgeText}>Feed: {feedStyle}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Tab Switcher */}
        <View style={styles.tabSwitcher}>
          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'bookmarks' && styles.tabBtnActive]}
            onPress={() => setActiveTab('bookmarks')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'bookmarks' && styles.tabBtnTextActive]}>
              🔖 Saved Bytes ({savedItems.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, activeTab === 'preferences' && styles.tabBtnActive]}
            onPress={() => setActiveTab('preferences')}
          >
            <Text style={[styles.tabBtnText, activeTab === 'preferences' && styles.tabBtnTextActive]}>
              ⚙️ Feed Preferences
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab 1: Bookmarks */}
        {activeTab === 'bookmarks' && (
          <View style={styles.bookmarksSection}>
            {/* Folder Pills */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.folderScroll}
            >
              {folders.map((f) => {
                const isSelected = activeFolder === f;
                return (
                  <TouchableOpacity
                    key={f}
                    style={[styles.folderPill, isSelected && styles.folderPillActive]}
                    onPress={() => setActiveFolder(f)}
                  >
                    <Text style={[styles.folderText, isSelected && styles.folderTextActive]}>
                      {f}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {filteredBookmarks.length === 0 ? (
              <View style={styles.emptyBookmarks}>
                <Ionicons name="bookmark-outline" size={40} color={Colors.textTertiary} />
                <Text style={styles.emptyTitle}>No saved stories yet</Text>
                <Text style={styles.emptySubtitle}>
                  Tap the bookmark icon 🔖 on any card in the feed to save it for later reading.
                </Text>
              </View>
            ) : (
              filteredBookmarks.map((item) => <FeedCard key={item.id} item={item} />)
            )}
          </View>
        )}

        {/* Tab 2: Preferences & Algorithm */}
        {activeTab === 'preferences' && (
          <View style={styles.preferencesSection}>
            <Text style={styles.sectionHeading}>Your Active Topics</Text>
            <Text style={styles.sectionSubtitle}>
              Tap to add or remove categories from your personalized feed ranking.
            </Text>

            <View style={styles.topicsGrid}>
              {TOPIC_CATEGORIES.filter((t) => t.id !== 'all').map((topic) => {
                const isSelected = selectedTopics.includes(topic.id as Category);
                return (
                  <TouchableOpacity
                    key={topic.id}
                    style={[
                      styles.topicPill,
                      isSelected && { borderColor: topic.color, backgroundColor: topic.color + '20' },
                    ]}
                    onPress={() => {
                      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                      toggleTopic(topic.id as Category);
                    }}
                  >
                    <Text style={styles.topicIcon}>{topic.icon}</Text>
                    <Text style={[styles.topicLabel, isSelected && { color: topic.color }]}>
                      {topic.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={[styles.sectionHeading, { marginTop: Spacing.xl }]}>Feed Algorithm Style</Text>
            <View style={styles.stylesList}>
              {[
                { id: 'personalized', label: '🎯 Personalized (AI balanced)' },
                { id: 'trending', label: '🔥 Trending (High engagement velocity)' },
                { id: 'latest', label: '🆕 Latest (Chronological recency)' },
                { id: 'fun', label: '😂 More Fun (Extra memes & cartoons)' },
              ].map((s) => (
                <TouchableOpacity
                  key={s.id}
                  style={[
                    styles.feedStyleOption,
                    feedStyle === s.id && styles.feedStyleOptionActive,
                  ]}
                  onPress={() => setFeedStyle(s.id as FeedStyle)}
                >
                  <Text
                    style={[
                      styles.feedStyleText,
                      feedStyle === s.id && { color: Colors.secondary, fontWeight: '700' },
                    ]}
                  >
                    {s.label}
                  </Text>
                  {feedStyle === s.id && <Ionicons name="checkmark" size={18} color={Colors.secondary} />}
                </TouchableOpacity>
              ))}
            </View>

            {/* Restart Onboarding */}
            <TouchableOpacity style={styles.resetBtn} onPress={handleResetOnboarding}>
              <Text style={styles.resetBtnText}>Restart Onboarding Wizard 🚀</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: Spacing.xxxl,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    margin: Spacing.md,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: Colors.primary,
    marginRight: Spacing.lg,
  },
  userInfo: {
    flex: 1,
  },
  displayName: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: Spacing.xs,
    flexWrap: 'wrap',
  },
  guestBadge: {
    backgroundColor: Colors.primary + '20',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.primary + '40',
  },
  guestBadgeText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.primaryLight,
    fontWeight: '700',
  },
  styleBadge: {
    backgroundColor: Colors.cardHighlight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
  },
  styleBadgeText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  tabSwitcher: {
    flexDirection: 'row',
    marginHorizontal: Spacing.md,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: 4,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: BorderRadius.sm,
  },
  tabBtnActive: {
    backgroundColor: Colors.cardElevated,
  },
  tabBtnText: {
    fontSize: Typography.fontSizes.xs + 1,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  tabBtnTextActive: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  bookmarksSection: {
    flex: 1,
  },
  folderScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.sm,
    marginBottom: Spacing.md,
  },
  folderPill: {
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  folderPillActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  folderText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  folderTextActive: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  emptyBookmarks: {
    alignItems: 'center',
    paddingVertical: Spacing.xxxl,
    paddingHorizontal: Spacing.xl,
  },
  emptyTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginTop: Spacing.md,
    marginBottom: Spacing.xs,
  },
  emptySubtitle: {
    fontSize: Typography.fontSizes.xs + 1,
    color: Colors.textTertiary,
    textAlign: 'center',
    lineHeight: 18,
  },
  preferencesSection: {
    paddingHorizontal: Spacing.md,
  },
  sectionHeading: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  topicIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  topicLabel: {
    fontSize: Typography.fontSizes.xs + 1,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  stylesList: {
    gap: Spacing.sm,
    marginTop: Spacing.xs,
  },
  feedStyleOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  feedStyleOptionActive: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.cardElevated,
  },
  feedStyleText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  resetBtn: {
    marginTop: Spacing.xxl,
    backgroundColor: Colors.cardHighlight,
    paddingVertical: 14,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  resetBtnText: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textSecondary,
    fontWeight: '700',
  },
});

