export type Relationship =
  | 'Family'
  | 'Friend'
  | 'Partner'
  | 'Colleague'
  | 'Other';

export type OccasionType =
  | 'Birthday'
  | 'Anniversary'
  | 'Holiday'
  | 'Graduation'
  | 'Wedding'
  | 'Custom';

export interface Occasion {
  id: string;
  type: OccasionType;
  label: string;
  date: string; // ISO date, e.g. 2026-09-12
  recurring: boolean;
}

export interface Person {
  id: string;
  name: string;
  relationship: Relationship;
  avatarEmoji: string;
  avatarColor: string;
  birthday?: string;
  anniversary?: string;
  occasions: Occasion[];
  interests: string[];
  sizes?: string;
  budgetMin?: number;
  budgetMax?: number;
  wishlistUrl?: string;
  address?: string;
  notes?: string;
}

export interface GiftSuggestion {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  emoji: string;
  gradient: readonly [string, string];
  rationale: string;
  personId?: string;
}

export interface WishlistItem {
  id: string;
  personId: string;
  name: string;
  price: number;
  url?: string;
  emoji: string;
  purchased: boolean;
}

export interface GiftHistoryItem {
  id: string;
  personId: string;
  giftName: string;
  date: string;
  price: number;
  occasion: string;
  status: 'given' | 'planned' | 'idea';
}

export interface BudgetEntry {
  id: string;
  personId: string;
  label: string;
  amount: number;
  spent: number;
}

export interface Reminder {
  id: string;
  personId: string;
  title: string;
  leadDays: number;
  enabled: boolean;
  channel: 'push' | 'email' | 'both';
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  icon: string;
}
