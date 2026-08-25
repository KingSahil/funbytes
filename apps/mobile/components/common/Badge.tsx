import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Category, ContentType } from '@funbytes/types';

interface BadgeProps {
  label: string;
  category?: Category;
  contentType?: ContentType;
  logoUrl?: string;
  color?: string;
}

export const Badge: React.FC<BadgeProps> = ({ label, category, contentType, logoUrl, color }) => {
  const getBadgeColor = () => {
    if (color) return color;
    if (contentType === 'reddit') return Colors.badgeReddit;
    if (contentType === 'meme') return Colors.accentMeme;
    if (contentType === 'cartoon') return Colors.badgePolitico;
    if (category === 'developers') return Colors.secondary;
    if (category === 'technology') return Colors.primary;
    if (category === 'politics') return Colors.badgePIB;
    if (category === 'sports') return Colors.accentSuccess;
    if (category === 'bollywood') return Colors.accentGold;
    return Colors.textSecondary;
  };

  const badgeColor = getBadgeColor();

  return (
    <View style={[styles.badge, { borderColor: badgeColor + '40', backgroundColor: badgeColor + '15' }]}>
      {logoUrl ? (
        <Image source={{ uri: logoUrl }} style={styles.logo} />
      ) : null}
      <Text style={[styles.label, { color: badgeColor }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
  },
  logo: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  label: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: '700',
    letterSpacing: 0.2,
    textTransform: 'uppercase',
  },
});

