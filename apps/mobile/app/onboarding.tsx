import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../constants/theme';
import { useUserStore } from '../store/useUserStore';
import { TOPIC_CATEGORIES } from '../constants/topics';
import { Category, FeedStyle } from '@funbytes/types';
import * as Haptics from 'expo-haptics';

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const {
    selectedTopics,
    toggleTopic,
    selectedInterests,
    toggleInterest,
    feedStyle,
    setFeedStyle,
    completeOnboarding,
  } = useUserStore();

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    if (step < 3) {
      setStep(step + 1);
    } else {
      completeOnboarding();
      router.replace('/(tabs)');
    }
  };

  const feedStyles: Array<{ id: FeedStyle; title: string; desc: string; icon: string }> = [
    {
      id: 'personalized',
      title: '🎯 Personalized',
      desc: 'Balanced feed optimized for your chosen topics & reading habits',
      icon: '🎯',
    },
    {
      id: 'trending',
      title: '🔥 Trending',
      desc: 'Viral discussions and high-engagement breaking stories',
      icon: '🔥',
    },
    {
      id: 'latest',
      title: '🆕 Latest',
      desc: 'Real-time chronological stream of fresh stories as they happen',
      icon: '🆕',
    },
    {
      id: 'fun',
      title: '😂 More Fun',
      desc: 'Higher frequency of developer memes and political satire cartoons',
      icon: '😂',
    },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Step Indicator */}
        <View style={styles.stepIndicatorRow}>
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              style={[
                styles.stepBar,
                step >= i && styles.stepBarActive,
                step === i && styles.stepBarCurrent,
              ]}
            />
          ))}
        </View>

        {/* Step 1: Welcome */}
        {step === 1 && (
          <View style={styles.stepContent}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoText}>FUN</Text>
              <Text style={styles.logoBytes}>BYTES</Text>
              <Text style={styles.logoBolt}>⚡</Text>
            </View>

            <Text style={styles.heading}>Welcome to FunBytes 🚀</Text>
            <Text style={styles.subheading}>
              “Your internet. Your interests. Your feed.”
            </Text>
            <Text style={styles.bodyDescription}>
              Say goodbye to noisy algorithms. FunBytes aggregates the best of developer news,
              Reddit discussions, tech breakthroughs, and memes into one lightning-fast feed.
            </Text>

            <View style={styles.featureList}>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>💻</Text>
                <Text style={styles.featureText}>Developer news & r/developersIndia</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>⚡</Text>
                <Text style={styles.featureText}>Instant summaries & multi-source coverage</Text>
              </View>
              <View style={styles.featureItem}>
                <Text style={styles.featureIcon}>🎨</Text>
                <Text style={styles.featureText}>Dev memes & political satire gallery</Text>
              </View>
            </View>
          </View>
        )}

        {/* Step 2: Pick Interests */}
        {step === 2 && (
          <View style={styles.stepContent}>
            <Text style={styles.heading}>Pick your interests 🎯</Text>
            <Text style={styles.subheading}>
              Choose topics to seed your initial algorithm. You can change these anytime.
            </Text>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.topicsGrid}>
              {TOPIC_CATEGORIES.filter((t) => t.id !== 'all').map((topic) => {
                const isSelected = selectedTopics.includes(topic.id as Category);
                return (
                  <TouchableOpacity
                    key={topic.id}
                    style={[
                      styles.topicPill,
                      isSelected && styles.topicPillSelected,
                      isSelected && { borderColor: topic.color },
                    ]}
                    onPress={() => toggleTopic(topic.id as Category)}
                    activeOpacity={0.75}
                  >
                    <Text style={styles.topicIcon}>{topic.icon}</Text>
                    <Text style={[styles.topicLabel, isSelected && { color: topic.color }]}>
                      {topic.name}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        )}

        {/* Step 3: Feed Style */}
        {step === 3 && (
          <View style={styles.stepContent}>
            <Text style={styles.heading}>Choose your feed style ⚡</Text>
            <Text style={styles.subheading}>
              How would you like FunBytes to score and present your stream?
            </Text>

            <View style={styles.feedStylesContainer}>
              {feedStyles.map((s) => {
                const isSelected = feedStyle === s.id;
                return (
                  <TouchableOpacity
                    key={s.id}
                    style={[styles.styleCard, isSelected && styles.styleCardSelected]}
                    onPress={() => setFeedStyle(s.id)}
                    activeOpacity={0.8}
                  >
                    <View style={styles.styleCardHeader}>
                      <Text style={styles.styleCardTitle}>{s.title}</Text>
                      {isSelected && <Text style={styles.checkIcon}>✓</Text>}
                    </View>
                    <Text style={styles.styleCardDesc}>{s.desc}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Footer Navigation */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.primaryButton} onPress={handleNext} activeOpacity={0.85}>
            <Text style={styles.primaryButtonText}>
              {step === 3 ? "Let's Go 🚀" : 'Continue →'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  container: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'space-between',
  },
  stepIndicatorRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.lg,
  },
  stepBar: {
    flex: 1,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.cardHighlight,
  },
  stepBarActive: {
    backgroundColor: Colors.primary,
  },
  stepBarCurrent: {
    backgroundColor: Colors.secondary,
  },
  stepContent: {
    flex: 1,
  },
  logoBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.xl,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: 1,
  },
  logoBytes: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.secondary,
    letterSpacing: 1,
  },
  logoBolt: {
    fontSize: 20,
    marginLeft: 4,
  },
  heading: {
    fontSize: Typography.fontSizes.xxl,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  subheading: {
    fontSize: Typography.fontSizes.md,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeights.md,
    marginBottom: Spacing.lg,
  },
  bodyDescription: {
    fontSize: Typography.fontSizes.sm,
    color: Colors.textTertiary,
    lineHeight: Typography.lineHeights.sm + 4,
    marginBottom: Spacing.xl,
  },
  featureList: {
    gap: Spacing.md,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  featureIcon: {
    fontSize: 24,
    marginRight: Spacing.md,
  },
  featureText: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '600',
    color: Colors.textPrimary,
    flex: 1,
  },
  topicsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm + 2,
    paddingBottom: Spacing.xxl,
  },
  topicPill: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 10,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.full,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  topicPillSelected: {
    backgroundColor: Colors.cardElevated,
  },
  topicIcon: {
    fontSize: 16,
    marginRight: 8,
  },
  topicLabel: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  feedStylesContainer: {
    gap: Spacing.md,
  },
  styleCard: {
    backgroundColor: Colors.card,
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  styleCardSelected: {
    borderColor: Colors.secondary,
    backgroundColor: Colors.cardElevated,
  },
  styleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  styleCardTitle: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  checkIcon: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.secondary,
  },
  styleCardDesc: {
    fontSize: Typography.fontSizes.xs + 1,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  footer: {
    paddingTop: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 6,
  },
  primaryButtonText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
});

