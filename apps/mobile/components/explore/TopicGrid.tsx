import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TOPIC_CATEGORIES, TopicDefinition } from '../../constants/topics';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { useRouter } from 'expo-router';

interface TopicGridProps {
  onSelectTopic: (topicId: string) => void;
}

export const TopicGrid: React.FC<TopicGridProps> = ({ onSelectTopic }) => {
  const topics = TOPIC_CATEGORIES.filter((t) => t.id !== 'all');

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>🎯 Explore by Topic</Text>
      <View style={styles.grid}>
        {topics.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={[styles.topicCard, { borderColor: topic.color + '30' }]}
            onPress={() => onSelectTopic(topic.id)}
            activeOpacity={0.8}
          >
            <View style={[styles.iconCircle, { backgroundColor: topic.color + '20' }]}>
              <Text style={styles.iconText}>{topic.icon}</Text>
            </View>
            <Text style={styles.topicName}>{topic.name}</Text>
            <Text style={styles.subCount}>{topic.subInterests.length} sub-interests</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    marginVertical: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.md,
  },
  topicCard: {
    width: '47.5%',
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    borderWidth: 1,
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  iconText: {
    fontSize: 22,
  },
  topicName: {
    fontSize: Typography.fontSizes.sm + 1,
    fontWeight: '700',
    color: Colors.textPrimary,
    marginBottom: 2,
  },
  subCount: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
  },
});

