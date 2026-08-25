import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing, BorderRadius } from '../../constants/theme';

export const SkeletonCard: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 700,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.card}>
      {/* Header Skeleton */}
      <View style={styles.header}>
        <Animated.View style={[styles.avatar, { opacity }]} />
        <View style={styles.headerText}>
          <Animated.View style={[styles.line, { width: '40%', opacity }]} />
          <Animated.View style={[styles.line, { width: '20%', height: 10, marginTop: 4, opacity }]} />
        </View>
      </View>

      {/* Title & Body */}
      <Animated.View style={[styles.line, { width: '90%', height: 16, marginTop: 12, opacity }]} />
      <Animated.View style={[styles.line, { width: '75%', height: 16, marginTop: 6, opacity }]} />

      {/* Image Skeleton */}
      <Animated.View style={[styles.imagePlaceholder, { opacity }]} />

      {/* Action Bar */}
      <View style={styles.actions}>
        <Animated.View style={[styles.actionPill, { opacity }]} />
        <Animated.View style={[styles.actionPill, { opacity }]} />
        <Animated.View style={[styles.actionPill, { opacity }]} />
        <Animated.View style={[styles.actionPill, { opacity }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    padding: Spacing.lg,
    marginHorizontal: Spacing.md,
    marginVertical: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.cardHighlight,
  },
  headerText: {
    marginLeft: Spacing.md,
    flex: 1,
  },
  line: {
    height: 12,
    backgroundColor: Colors.cardHighlight,
    borderRadius: 4,
  },
  imagePlaceholder: {
    height: 180,
    backgroundColor: Colors.cardHighlight,
    borderRadius: BorderRadius.md,
    marginTop: Spacing.md,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  actionPill: {
    width: 50,
    height: 18,
    borderRadius: 9,
    backgroundColor: Colors.cardHighlight,
  },
});

