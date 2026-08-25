import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';

interface MicrocopyBannerProps {
  text?: string;
  emoji?: string;
}

export const MicrocopyBanner: React.FC<MicrocopyBannerProps> = ({
  text = 'Fresh bytes just dropped',
  emoji = '⚡',
}) => {
  return (
    <View style={styles.banner}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.cardElevated,
    paddingVertical: 6,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.full,
    alignSelf: 'center',
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  emoji: {
    fontSize: 13,
    marginRight: 6,
  },
  text: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: '600',
    color: Colors.secondary,
    letterSpacing: 0.3,
  },
});

