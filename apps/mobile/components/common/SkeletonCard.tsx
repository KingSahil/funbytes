import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { Colors, Spacing } from '../../constants/theme';

export const SkeletonCard: React.FC = () => {
  const opacity = useRef(new Animated.Value(0.25)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.6,
          duration: 750,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.25,
          duration: 750,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [opacity]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {/* Avatar Skeleton */}
        <Animated.View style={[styles.avatar, { opacity }]} />

        {/* Content Skeleton */}
        <View style={styles.content}>
          <View style={styles.headerLine}>
            <Animated.View style={[styles.line, { width: '45%', opacity }]} />
            <Animated.View style={[styles.line, { width: '20%', opacity }]} />
          </View>
          <Animated.View style={[styles.line, { width: '90%', height: 14, marginTop: 8, opacity }]} />
          <Animated.View style={[styles.line, { width: '70%', height: 14, marginTop: 6, opacity }]} />

          {/* Media placeholder */}
          <Animated.View style={[styles.imagePlaceholder, { opacity }]} />

          {/* Actions placeholder */}
          <View style={styles.actions}>
            <Animated.View style={[styles.actionDot, { opacity }]} />
            <Animated.View style={[styles.actionDot, { opacity }]} />
            <Animated.View style={[styles.actionDot, { opacity }]} />
            <Animated.View style={[styles.actionDot, { opacity }]} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    paddingVertical: 12,
    paddingHorizontal: Spacing.md,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.cardElevated,
    marginRight: 10,
  },
  content: {
    flex: 1,
  },
  headerLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  line: {
    height: 12,
    backgroundColor: Colors.cardElevated,
    borderRadius: 6,
  },
  imagePlaceholder: {
    height: 180,
    backgroundColor: Colors.cardElevated,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    marginTop: 10,
    marginBottom: 8,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    maxWidth: 280,
    marginTop: 6,
  },
  actionDot: {
    width: 24,
    height: 12,
    borderRadius: 6,
    backgroundColor: Colors.cardElevated,
  },
});

