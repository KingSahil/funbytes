import React from 'react';
import { ScrollView, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { TOPIC_CATEGORIES, TopicDefinition } from '../../constants/topics';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';

interface TopicChipsProps {
  activeTopic: string;
  onSelectTopic: (topicId: string) => void;
}

export const TopicChips: React.FC<TopicChipsProps> = ({ activeTopic, onSelectTopic }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {TOPIC_CATEGORIES.map((topic) => {
        const isSelected = activeTopic.toLowerCase() === topic.id.toLowerCase();
        return (
          <TouchableOpacity
            key={topic.id}
            style={[
              styles.chip,
              isSelected && styles.chipSelected,
              isSelected && { borderColor: topic.color },
            ]}
            onPress={() => onSelectTopic(topic.id)}
            activeOpacity={0.7}
          >
            <Text style={styles.icon}>{topic.icon}</Text>
            <Text
              style={[
                styles.label,
                isSelected && styles.labelSelected,
                isSelected && { color: topic.color },
              ]}
            >
              {topic.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    gap: Spacing.sm,
    backgroundColor: Colors.background,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 7,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.cardElevated,
  },
  icon: {
    fontSize: 14,
    marginRight: 6,
  },
  label: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  labelSelected: {
    color: Colors.textPrimary,
    fontWeight: '700',
  },
});

