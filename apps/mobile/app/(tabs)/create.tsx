import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Header } from '../../components/common/Header';
import { TOPIC_CATEGORIES } from '../../constants/topics';
import { Category, ContentItem } from '@funbytes/types';
import { useUserStore } from '../../store/useUserStore';
import * as Haptics from 'expo-haptics';

export default function CreateScreen() {
  const router = useRouter();
  const { userName } = useUserStore();

  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('developers');
  const [imageUrl, setImageUrl] = useState('');
  const [tagInput, setTagInput] = useState('');

  const handlePost = () => {
    if (!title.trim()) {
      Alert.alert('Title Required', 'Please enter a title or headline for your byte.');
      return;
    }

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});

    Alert.alert(
      'Byte Published! ⚡',
      'Your post has been broadcast to the FunBytes community stream.',
      [
        {
          text: 'View Feed',
          onPress: () => {
            setTitle('');
            setSummary('');
            setImageUrl('');
            router.push('/(tabs)');
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Create a Byte ⚡" showSearch={false} showBell={false} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        {/* Author info */}
        <View style={styles.authorRow}>
          <View style={styles.authorBadge}>
            <Text style={styles.authorAvatarText}>{userName.charAt(0)}</Text>
          </View>
          <View>
            <Text style={styles.authorName}>{userName}</Text>
            <Text style={styles.authorHandle}>Posting to FunBytes Community</Text>
          </View>
        </View>

        {/* Category Picker */}
        <Text style={styles.inputLabel}>Choose Topic Category</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryChips}
        >
          {TOPIC_CATEGORIES.filter((t) => t.id !== 'all').map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <TouchableOpacity
                key={cat.id}
                style={[
                  styles.categoryPill,
                  isSelected && { borderColor: cat.color, backgroundColor: cat.color + '20' },
                ]}
                onPress={() => setSelectedCategory(cat.id as Category)}
                activeOpacity={0.7}
              >
                <Text style={styles.categoryIcon}>{cat.icon}</Text>
                <Text style={[styles.categoryName, isSelected && { color: cat.color }]}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Title Input */}
        <Text style={styles.inputLabel}>Headline / Discussion Question</Text>
        <TextInput
          style={styles.titleInput}
          placeholder="e.g. Why we replaced Redux with Zustand in our mobile app..."
          placeholderTextColor={Colors.textTertiary}
          value={title}
          onChangeText={setTitle}
          multiline
          maxLength={150}
        />

        {/* Summary Input */}
        <Text style={styles.inputLabel}>Description / Code Discussion</Text>
        <TextInput
          style={styles.summaryInput}
          placeholder="Share context, code snippets, benchmarks, or thoughts..."
          placeholderTextColor={Colors.textTertiary}
          value={summary}
          onChangeText={setSummary}
          multiline
          numberOfLines={4}
          maxLength={1000}
        />

        {/* Optional Image URL */}
        <Text style={styles.inputLabel}>Media / Meme Image URL (Optional)</Text>
        <TextInput
          style={styles.singleInput}
          placeholder="https://..."
          placeholderTextColor={Colors.textTertiary}
          value={imageUrl}
          onChangeText={setImageUrl}
          autoCapitalize="none"
          keyboardType="url"
        />

        {/* Publish Button */}
        <TouchableOpacity style={styles.publishBtn} onPress={handlePost} activeOpacity={0.85}>
          <Text style={styles.publishBtnText}>Publish Byte 🚀</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxxl,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  authorBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  authorAvatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  authorName: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  authorHandle: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textTertiary,
  },
  inputLabel: {
    fontSize: Typography.fontSizes.sm,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: Spacing.xs,
    marginTop: Spacing.md,
  },
  categoryChips: {
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  categoryPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    borderRadius: BorderRadius.full,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  categoryIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  categoryName: {
    fontSize: Typography.fontSizes.xs + 1,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  titleInput: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: Typography.fontSizes.md,
    fontWeight: '700',
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 50,
  },
  summaryInput: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: Typography.fontSizes.sm,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: 110,
    textAlignVertical: 'top',
  },
  singleInput: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    color: Colors.textPrimary,
    fontSize: Typography.fontSizes.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  publishBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.full,
    alignItems: 'center',
    marginTop: Spacing.xxl,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  publishBtnText: {
    fontSize: Typography.fontSizes.md,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: 0.5,
  },
});

