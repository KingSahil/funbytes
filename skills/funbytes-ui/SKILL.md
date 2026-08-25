---
name: funbytes-ui
description: UI/UX design guidelines, dark-mode styling rules, animation patterns, and component composition for FunBytes.
---

# FunBytes UI Design Skill

## Purpose
This skill enforces the visual identity, dark-first styling conventions, microcopy tone, and interaction patterns for the FunBytes mobile app.

## When to Use It
- Creating new screens, cards, modals, or UI widgets in the React Native Expo client.
- Polishing animations, skeleton loaders, and touch interactions.

## Inputs
- UI mockups, screen requirements, or design specifications.

## Expected Outputs
- Polished, responsive React Native components with smooth micro-interactions, dark mode styling, and proper accessibility.

## Design Rules & Color Palette
- **Background Root**: `#090A0F` (Pitch void)
- **Elevated Card Surface**: `#12141D` (Dark slate)
- **Secondary Card / Input Surface**: `#1A1D29`
- **Border Subtle**: `#242838`
- **Primary Accent**: `#6366F1` (Electric Indigo)
- **Secondary Accent**: `#00F5D4` (Cyan Byte)
- **Like Heart Accent**: `#FF5E57`
- **Text Primary**: `#FFFFFF`
- **Text Secondary / Muted**: `#94A3B8`
- **Text Tertiary / Timestamps**: `#64748B`

## Component Structure & Standards
1. **FeedCard**: Clean header with source badge, publication time ago, title (bold, 16px), crisp summary, full-width rounded media (if image exists), author indicator, and engagement action bar.
2. **MemeCard / CartoonCard**: Edge-to-edge media presentation with prominent visual focus and quick action overlays.
3. **Optimistic Feedback**: Liking a post or comment must immediately update the local count and trigger a heart bounce animation before server sync.
4. **Skeletons**: Never show empty white screens. Use shimmering dark skeleton placeholders (`#1A1D29`) during query loading.
5. **Microcopy**: Keep empty states and feed dividers playful ("Your bytes are ready ⚡", "More developer chaos incoming 👨💻", "You're caught up 🎉").

## Common Mistakes to Avoid
- Using pure white backgrounds (`#FFFFFF`) or generic light gray borders.
- Forgetting to handle missing/broken image URLs with fallback placeholders.
- Heavy animations that cause frame drops on mid-range Android devices.

## Testing Requirements
- Component visual tests for error, loading, and empty states.
- Verify touch targets are at least 44x44 dp for accessibility.
