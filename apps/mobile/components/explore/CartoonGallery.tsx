import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { ContentItem } from '@funbytes/types';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { useRouter } from 'expo-router';

interface CartoonGalleryProps {
  cartoons: ContentItem[];
}

export const CartoonGallery: React.FC<CartoonGalleryProps> = ({ cartoons }) => {
  const router = useRouter();

  if (cartoons.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🎨 Political Cartoons & Satire</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.galleryScroll}
      >
        {cartoons.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.cartoonCard}
            onPress={() =>
              router.push({
                pathname: '/post/[id]',
                params: { id: item.id },
              })
            }
            activeOpacity={0.9}
          >
            {item.imageUrl ? (
              <Image source={{ uri: item.imageUrl }} style={styles.artwork} resizeMode="cover" />
            ) : null}
            <View style={styles.captionOverlay}>
              <Text style={styles.artistName}>
                {item.meta?.cartoonist || item.author || 'Editorial Satire'}
              </Text>
              <Text style={styles.cartoonTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  header: {
    paddingHorizontal: Spacing.md,
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  galleryScroll: {
    paddingHorizontal: Spacing.md,
    gap: Spacing.md,
  },
  cartoonCard: {
    width: 260,
    height: 200,
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.border,
    position: 'relative',
  },
  artwork: {
    width: '100%',
    height: '100%',
  },
  captionOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(9, 10, 15, 0.88)',
    padding: Spacing.sm + 2,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  artistName: {
    fontSize: Typography.fontSizes.xs,
    fontWeight: '700',
    color: Colors.accentGold,
    marginBottom: 2,
    textTransform: 'uppercase',
  },
  cartoonTitle: {
    fontSize: Typography.fontSizes.xs + 1,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 16,
  },
});

