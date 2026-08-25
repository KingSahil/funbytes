import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { CoverageSource } from '@funbytes/types';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import * as WebBrowser from 'expo-web-browser';

interface CoverageBadgesProps {
  coverageSources?: CoverageSource[];
}

export const CoverageBadges: React.FC<CoverageBadgesProps> = ({ coverageSources }) => {
  if (!coverageSources || coverageSources.length <= 1) return null;

  const handleOpenSource = (url: string) => {
    if (url) {
      WebBrowser.openBrowserAsync(url).catch(() => {});
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.prefixText}>Coverage from:</Text>
      <View style={styles.sourcesRow}>
        {coverageSources.map((src, idx) => (
          <TouchableOpacity
            key={idx}
            style={styles.sourcePill}
            onPress={() => handleOpenSource(src.url)}
            activeOpacity={0.7}
          >
            <Text style={styles.sourceName}>{src.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardElevated,
    borderRadius: BorderRadius.md,
    padding: Spacing.sm,
    marginTop: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  prefixText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
    fontWeight: '600',
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  sourcesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  sourcePill: {
    backgroundColor: Colors.cardHighlight,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sourceName: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.secondary,
    fontWeight: '600',
  },
});

