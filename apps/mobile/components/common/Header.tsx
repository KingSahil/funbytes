import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '../../constants/theme';
import { useUserStore } from '../../store/useUserStore';

interface HeaderProps {
  showSearch?: boolean;
  showBell?: boolean;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ showSearch = true, showBell = true, title }) => {
  const router = useRouter();
  const { userAvatar } = useUserStore();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => router.push('/(tabs)/profile')}
        activeOpacity={0.8}
      >
        <Image source={{ uri: userAvatar }} style={styles.avatar} />
      </TouchableOpacity>

      {title ? (
        <Text style={styles.titleText}>{title}</Text>
      ) : (
        <View style={styles.brandContainer}>
          <Text style={styles.brandFun}>FUN</Text>
          <Text style={styles.brandBytes}>BYTES</Text>
          <Text style={styles.brandBolt}>⚡</Text>
        </View>
      )}

      <View style={styles.actionsContainer}>
        {showSearch && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/search')}
            activeOpacity={0.7}
          >
            <Ionicons name="search-outline" size={21} color={Colors.textPrimary} />
          </TouchableOpacity>
        )}

        {showBell && (
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => router.push('/(tabs)/notifications')}
            activeOpacity={0.7}
          >
            <Ionicons name="notifications-outline" size={22} color={Colors.textPrimary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    backgroundColor: Colors.background,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  profileButton: {
    padding: 2,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandFun: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: Colors.primary,
  },
  brandBytes: {
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 1.2,
    color: Colors.secondary,
  },
  brandBolt: {
    fontSize: 18,
    marginLeft: 3,
  },
  titleText: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.card,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: Colors.accentLike,
  },
});

