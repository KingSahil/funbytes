import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  SafeAreaView,
  Text,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Spacing } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { TopicChips } from '../../components/feed/TopicChips';
import { FeedCard } from '../../components/feed/FeedCard';
import { MemeCard } from '../../components/feed/MemeCard';
import { CartoonCard } from '../../components/feed/CartoonCard';
import { SkeletonCard } from '../../components/common/SkeletonCard';
import { EmptyState } from '../../components/common/EmptyState';
import { MicrocopyBanner } from '../../components/common/MicrocopyBanner';
import { useFeed } from '../../hooks/useFeed';
import { useUserStore } from '../../store/useUserStore';
import { ContentItem } from '@funbytes/types';

export default function HomeScreen() {
  const router = useRouter();
  const { hasCompletedOnboarding } = useUserStore();
  const [activeTopic, setActiveTopic] = useState('all');

  useEffect(() => {
    if (!hasCompletedOnboarding) {
      router.replace('/onboarding');
    }
  }, [hasCompletedOnboarding]);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    refetch,
    isRefetching,
  } = useFeed(activeTopic);

  const feedItems = data?.pages.flatMap((page) => page.items) || [];

  const handleEndReached = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  const renderItem = useCallback(({ item, index }: { item: ContentItem; index: number }) => {
    // Insert playful microcopy banner after every 6 items
    const showBanner = index === 5 || index === 15;

    return (
      <View>
        {showBanner && (
          <MicrocopyBanner
            text={index === 5 ? 'More developer chaos incoming 👨💻' : 'The internet has spoken ⚡'}
            emoji={index === 5 ? '🔥' : '✨'}
          />
        )}
        {item.contentType === 'meme' ? (
          <MemeCard item={item} />
        ) : item.contentType === 'cartoon' ? (
          <CartoonCard item={item} />
        ) : (
          <FeedCard item={item} />
        )}
      </View>
    );
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top App Header */}
      <Header />

      {/* Horizontal Sticky Topic Chips */}
      <TopicChips activeTopic={activeTopic} onSelectTopic={setActiveTopic} />

      {/* Main Feed Content */}
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </View>
      ) : isError ? (
        <EmptyState
          icon="⚠️"
          title="Could not load your bytes"
          subtitle="There was an issue connecting to the feed stream."
          actionLabel="Try Again"
          onAction={() => refetch()}
        />
      ) : (
        <FlatList
          data={feedItems}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.5}
          refreshControl={
            <RefreshControl
              refreshing={isRefetching}
              onRefresh={refetch}
              tintColor={Colors.secondary}
              colors={[Colors.primary, Colors.secondary]}
            />
          }
          ListEmptyComponent={
            <EmptyState
              icon="🎉"
              title="You’re caught up!"
              subtitle="No new bytes found for this topic. Switch topic chips or refresh."
              actionLabel="Refresh Feed"
              onAction={() => refetch()}
            />
          }
          ListFooterComponent={
            isFetchingNextPage ? (
              <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color={Colors.secondary} />
              </View>
            ) : feedItems.length > 0 ? (
              <View style={styles.footerCatchup}>
                <Text style={styles.catchupText}>You're caught up 🎉</Text>
              </View>
            ) : null
          }
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingContainer: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  footerLoader: {
    paddingVertical: Spacing.lg,
    alignItems: 'center',
  },
  footerCatchup: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  catchupText: {
    color: Colors.textTertiary,
    fontSize: 13,
    fontWeight: '600',
  },
});

