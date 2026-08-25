import React from 'react';
import { View, ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TOPIC_CATEGORIES } from '../../constants/topics';
import { Colors, Spacing, Typography } from '../../constants/theme';
import * as Haptics from 'expo-haptics';

interface TopicChipsProps {
  activeTopic: string;
  onSelectTopic: (topicId: string) => void;
}

export const TopicChips: React.FC<TopicChipsProps> = ({ activeTopic, onSelectTopic }) => {
  return (
    <View style={styles.wrapper}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        style={styles.scrollView}
      >
        {TOPIC_CATEGORIES.map((topic) => {
          const isSelected = activeTopic.toLowerCase() === topic.id.toLowerCase();
          return (
            <TouchableOpacity
              key={topic.id}
              style={styles.tabItem}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
                onSelectTopic(topic.id);
              }}
              activeOpacity={0.7}
            >
              <Text style={[styles.tabLabel, isSelected ? styles.tabLabelActive : styles.tabLabelInactive]}>
                {topic.name}
              </Text>
              {isSelected && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 48,
    backgroundColor: Colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    zIndex: 10,
  },
  scrollView: {
    flexGrow: 0,
    height: 48,
  },
  scrollContent: {
    paddingHorizontal: Spacing.sm,
    alignItems: 'center',
    height: 48,
  },
  tabItem: {
    height: 48,
    paddingHorizontal: Spacing.md + 2,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  tabLabel: {
    fontSize: Typography.fontSizes.md,
    letterSpacing: -0.2,
  },
  tabLabelActive: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  tabLabelInactive: {
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: 0,
    left: Spacing.md,
    right: Spacing.md,
    height: 3.5,
    borderRadius: 2,
    backgroundColor: Colors.primary,
  },
});

