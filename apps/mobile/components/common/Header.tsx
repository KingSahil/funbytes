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
            <Ionicons name="notifications-outline" size={21} color={Colors.textPrimary} />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.background,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
  },
  profileButton: {
    padding: 2,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandFun: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
    color: Colors.textPrimary,
  },
  brandBytes: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
    color: Colors.primary,
  },
  brandBolt: {
    fontSize: 16,
    marginLeft: 2,
  },
  titleText: {
    fontSize: Typography.fontSizes.lg,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 7,
    right: 7,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.primary,
  },
});

