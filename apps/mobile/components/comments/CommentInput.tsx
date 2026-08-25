import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '../../constants/theme';
import { Comment } from '@funbytes/types';
import * as Haptics from 'expo-haptics';

interface CommentInputProps {
  onSend: (text: string, parentId?: string) => void;
  replyingTo?: Comment | null;
  onCancelReply?: () => void;
}

export const CommentInput: React.FC<CommentInputProps> = ({
  onSend,
  replyingTo,
  onCancelReply,
}) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim().length === 0) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
    onSend(text.trim(), replyingTo?.id);
    setText('');
    if (onCancelReply) onCancelReply();
  };

  return (
    <View style={styles.wrapper}>
      {replyingTo && (
        <View style={styles.replyBanner}>
          <Text style={styles.replyBannerText}>
            Replying to <Text style={styles.replyAuthor}>{replyingTo.authorName}</Text>
          </Text>
          <TouchableOpacity onPress={onCancelReply}>
            <Ionicons name="close-circle" size={18} color={Colors.textTertiary} />
          </TouchableOpacity>
        </View>
      )}

      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          placeholder="Add a comment on this byte..."
          placeholderTextColor={Colors.textTertiary}
          value={text}
          onChangeText={setText}
          multiline
          maxLength={500}
        />

        <TouchableOpacity
          style={[styles.sendButton, text.trim().length > 0 && styles.sendButtonActive]}
          onPress={handleSend}
          disabled={text.trim().length === 0}
          activeOpacity={0.8}
        >
          <Ionicons
            name="arrow-up"
            size={18}
            color={text.trim().length > 0 ? Colors.textPrimary : Colors.textTertiary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.cardElevated,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  replyBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: Spacing.xs,
    paddingHorizontal: 4,
  },
  replyBannerText: {
    fontSize: Typography.fontSizes.xs,
    color: Colors.textSecondary,
  },
  replyAuthor: {
    color: Colors.secondary,
    fontWeight: '700',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.inputBackground,
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  textInput: {
    flex: 1,
    color: Colors.textPrimary,
    fontSize: Typography.fontSizes.sm,
    maxHeight: 90,
  },
  sendButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: Colors.cardHighlight,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  sendButtonActive: {
    backgroundColor: Colors.primary,
  },
});

