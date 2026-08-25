# FunBytes UI Design System & Guidelines

## 1. Visual Philosophy
FunBytes is designed dark-mode first. It marries the speed and density of social platforms (X/Twitter) with the visual delight of media apps.

## 2. Color Tokens
```typescript
export const Colors = {
  background: '#090A0F',     // Root background (deep void)
  card: '#12141D',           // Card surface
  cardElevated: '#181B26',   // Elevated card / Popovers
  cardHighlight: '#1E2333',  // Hover / Pressed state
  border: '#232838',         // Subtle container borders
  borderLight: '#32394E',    // Active border

  primary: '#6366F1',        // Electric Indigo (brand primary)
  primaryGradient: ['#6366F1', '#8B5CF6'],
  secondary: '#00F5D4',      // Cyan Byte (accent & badges)
  accentGold: '#FFB703',     // Trending & high engagement
  accentMeme: '#F72585',     // Memes & humor
  accentLike: '#FF4D6D',     // Like heart

  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  textTertiary: '#64748B',
  textMuted: '#475569',

  badgeReddit: '#FF4500',
  badgeMedium: '#00AB6C',
  badgeDevHumor: '#7209B7',
  badgeBBC: '#BB1919',
};
```

## 3. Typography & Spacing
- **Headlines**: Semi-bold / Bold, 16px - 18px with 1.35 line height.
- **Summary**: Regular, 14px with 1.4 line height.
- **Card Spacing**: 12px horizontal padding, 16px vertical card spacing.
- **Border Radius**: 16px for post cards, 12px for image media, 20px for topic chips.

## 4. Micro-Interactions & Animation
- **Heart Like**: Spring bounce scale (0.8 -> 1.3 -> 1.0) with color shift to `#FF4D6D`.
- **Topic Chips**: Horizontal pill carousel with smooth selected state highlight and active badge indicator.
- **Skeleton Shimmer**: Linear gradient sweep across `#12141D` and `#1E2333`.
