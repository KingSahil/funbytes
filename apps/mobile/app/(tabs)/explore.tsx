import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { TrendingCarousel } from '../../components/explore/TrendingCarousel';
import { TopicGrid } from '../../components/explore/TopicGrid';
import { CartoonGallery } from '../../components/explore/CartoonGallery';
import { FeedCard } from '../../components/feed/FeedCard';
import { api } from '../../services/api';

export default function ExploreScreen() {
  const router = useRouter();

  const { data: trendingData, isLoading: loadingTrending } = useQuery({
    queryKey: ['explore_trending'],
    queryFn: () => api.getTrending(),
  });

  const { data: devFeed, isLoading: loadingDev } = useQuery({
    queryKey: ['explore_dev_zone'],
    queryFn: () => api.getFeed({ topic: 'developers', limit: 4 }),
  });

  const { data: cartoonData } = useQuery({
    queryKey: ['explore_cartoons'],
    queryFn: () => api.getFeed({ topic: 'cartoons', limit: 6 }),
  });

  const handleSelectTopic = (topicId: string) => {
    router.push({
      pathname: '/(tabs)',
      params: { topic: topicId },
    });
  };

  const handleSelectHashtag = (tag: string) => {
    router.push({
      pathname: '/search',
      params: { q: tag.replace('#', '') },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Explore & Discover" showSearch={true} showBell={false} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Trending Section */}
        {loadingTrending ? (
          <View style={styles.loaderBox}>
            <ActivityIndicator color={Colors.secondary} />
          </View>
        ) : (
          <TrendingCarousel
            items={trendingData?.items || []}
            hashtags={trendingData?.hashtags || []}
            onSelectHashtag={handleSelectHashtag}
          />
        )}

        {/* Topic Grid */}
        <TopicGrid onSelectTopic={handleSelectTopic} />

        {/* Political Cartoons Gallery */}
        <CartoonGallery cartoons={cartoonData?.items || []} />

        {/* Developer Zone Banner & Spotlight */}
        <View style={styles.devZoneContainer}>
          <View style={styles.devZoneHeader}>
            <View>
              <Text style={styles.devZoneTitle}>💻 Developer Zone</Text>
              <Text style={styles.devZoneSubtitle}>
                r/developersIndia · Medium · DevHumor
              </Text>
            </View>
            <TouchableOpacity
              style={styles.viewAllBtn}
              onPress={() => handleSelectTopic('developers')}
            >
              <Text style={styles.viewAllText}>View All →</Text>
            </TouchableOpacity>
          </View>

          {devFeed?.items.slice(0, 3).map((item) => (
            <FeedCard key={item.id} item={item} />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xxxl,
  },
  loaderBox: {
    paddingVertical: Spacing.xl,
    alignItems: 'center',
  },
  devZoneContainer: {
    marginTop: Spacing.md,
  },
  devZoneHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  devZoneTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  devZoneSubtitle: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.secondary,
    fontWeight: '600',
    marginTop: 2,
  },
  viewAllBtn: {
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  viewAllText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.primary,
    fontWeight: '700',
  },
});

