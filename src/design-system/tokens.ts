export const Colors = {
  primary: '#6C5CE7',
  primaryLight: '#A29BFE',
  secondary: '#00B894',
  accent: '#FF7675',
  bgLight: '#F8F9FB',
  bgDark: '#0F1115',
  surfaceLight: '#FFFFFF',
  surfaceDark: '#171A21',
  cardLight: '#FFFFFF',
  cardDark: '#1E222B',
  textPrimaryLight: '#111827',
  textPrimaryDark: '#F3F4F6',
  textSecondaryLight: '#6B7280',
  textSecondaryDark: '#9CA3AF',
  borderLight: '#E5E7EB',
  borderDark: '#2D3348',
  success: '#16A34A',
  warning: '#F59E0B',
  error: '#DC2626',
  purple: '#6C5CE7',
  pink: '#FD79A8',
  blue: '#74B9FF',
  yellow: '#FDCB6E',
  white: '#FFFFFF',
  black: '#000000',
};

export const Spacing = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48 };

export const Radii = { sm: 8, md: 12, lg: 16, xl: 24, full: 9999 };

export const FontSizes = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 28,
  display: 34,
};

export const FontWeights = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};

export const Shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 3,
    elevation: 2,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 8,
  },
};

export const Gradients = {
  primary: [Colors.primary, Colors.primaryLight] as const,
  sunset: ['#FF7675', '#FD79A8'] as const,
  ocean: ['#74B9FF', '#6C5CE7'] as const,
  mint: ['#00B894', '#55EFC4'] as const,
  gold: ['#FDCB6E', '#FFEAA7'] as const,
  premium: ['#6C5CE7', '#FD79A8'] as const,
};
