import {
  Person,
  GiftSuggestion,
  WishlistItem,
  GiftHistoryItem,
  BudgetEntry,
  Reminder,
  NotificationItem,
} from '../types';

export const people: Person[] = [
  {
    id: 'p1',
    name: 'Emma Carter',
    relationship: 'Partner',
    avatarEmoji: '👩‍🦰',
    avatarColor: '#FD79A8',
    birthday: '1994-08-14',
    anniversary: '2020-06-21',
    occasions: [
      { id: 'o1', type: 'Birthday', label: "Emma's Birthday", date: '2026-08-14', recurring: true },
      { id: 'o2', type: 'Anniversary', label: 'Our Anniversary', date: '2026-06-21', recurring: true },
    ],
    interests: ['Yoga', 'Photography', 'Coffee', 'Travel'],
    sizes: 'M / US 7',
    budgetMin: 80,
    budgetMax: 250,
    wishlistUrl: 'https://example.com/wishlist/emma',
    address: '221B Maple Street, Austin, TX',
    notes: 'Loves minimalist design and matcha lattes.',
  },
  {
    id: 'p2',
    name: 'Marcus Johnson',
    relationship: 'Friend',
    avatarEmoji: '🧔',
    avatarColor: '#74B9FF',
    birthday: '1992-09-02',
    occasions: [
      { id: 'o3', type: 'Birthday', label: "Marcus' Birthday", date: '2026-09-02', recurring: true },
    ],
    interests: ['Gaming', 'Sneakers', 'BBQ', 'Basketball'],
    budgetMin: 30,
    budgetMax: 100,
    notes: 'Collects limited edition sneakers.',
  },
  {
    id: 'p3',
    name: 'Grace Lin',
    relationship: 'Family',
    avatarEmoji: '👵',
    avatarColor: '#FDCB6E',
    birthday: '1958-08-20',
    occasions: [
      { id: 'o4', type: 'Birthday', label: "Mom's Birthday", date: '2026-08-20', recurring: true },
      { id: 'o5', type: 'Holiday', label: 'Mother\'s Day', date: '2027-05-09', recurring: true },
    ],
    interests: ['Gardening', 'Baking', 'Classic novels', 'Tea'],
    budgetMin: 50,
    budgetMax: 150,
    notes: 'Prefers handmade or sentimental gifts.',
  },
  {
    id: 'p4',
    name: 'Diego Alvarez',
    relationship: 'Colleague',
    avatarEmoji: '👨‍💻',
    avatarColor: '#00B894',
    birthday: '1990-11-03',
    occasions: [
      { id: 'o6', type: 'Birthday', label: "Diego's Birthday", date: '2026-11-03', recurring: true },
    ],
    interests: ['Coffee', 'Mechanical keyboards', 'Chess'],
    budgetMin: 20,
    budgetMax: 60,
  },
  {
    id: 'p5',
    name: 'Sophie Turner',
    relationship: 'Friend',
    avatarEmoji: '👩',
    avatarColor: '#6C5CE7',
    birthday: '1995-08-09',
    occasions: [
      { id: 'o7', type: 'Birthday', label: "Sophie's Birthday", date: '2026-08-09', recurring: true },
      { id: 'o8', type: 'Graduation', label: 'MBA Graduation', date: '2026-08-30', recurring: false },
    ],
    interests: ['Wine tasting', 'Hiking', 'Journaling'],
    budgetMin: 40,
    budgetMax: 120,
    notes: 'Just finished her MBA — big milestone!',
  },
];

export const giftSuggestions: GiftSuggestion[] = [
  {
    id: 'g1',
    name: 'Fujifilm Instax Mini Camera',
    category: 'Tech & Photo',
    price: 89.99,
    rating: 4.7,
    emoji: '📷',
    gradient: ['#74B9FF', '#6C5CE7'],
    rationale: 'Emma loves photography — an instant camera fits her creative hobby perfectly.',
    personId: 'p1',
  },
  {
    id: 'g2',
    name: 'Limited Edition Sneakers',
    category: 'Fashion',
    price: 145,
    rating: 4.8,
    emoji: '👟',
    gradient: ['#FF7675', '#FD79A8'],
    rationale: 'Marcus collects sneakers — this drop matches his favorite brand.',
    personId: 'p2',
  },
  {
    id: 'g3',
    name: 'Heirloom Garden Tool Set',
    category: 'Home & Garden',
    price: 68,
    rating: 4.6,
    emoji: '🌱',
    gradient: ['#00B894', '#55EFC4'],
    rationale: 'Grace enjoys gardening — a quality tool set is thoughtful and practical.',
    personId: 'p3',
  },
  {
    id: 'g4',
    name: 'Artisan Coffee Sampler',
    category: 'Food & Drink',
    price: 34,
    rating: 4.5,
    emoji: '☕',
    gradient: ['#FDCB6E', '#FFEAA7'],
    rationale: 'Diego is a coffee enthusiast who loves trying new roasts.',
    personId: 'p4',
  },
  {
    id: 'g5',
    name: 'Weekend Hiking Backpack',
    category: 'Outdoors',
    price: 112,
    rating: 4.9,
    emoji: '🎒',
    gradient: ['#6C5CE7', '#FD79A8'],
    rationale: 'Sophie loves hiking — perfect for her next trail adventure.',
    personId: 'p5',
  },
  {
    id: 'g6',
    name: 'Personalized Star Map Print',
    category: 'Sentimental',
    price: 59,
    rating: 4.8,
    emoji: '🌌',
    gradient: ['#74B9FF', '#00B894'],
    rationale: 'A meaningful keepsake for your anniversary date and location.',
    personId: 'p1',
  },
];

export const wishlist: WishlistItem[] = [
  { id: 'w1', personId: 'p1', name: 'Leather Journal', price: 42, emoji: '📓', purchased: false, url: 'https://example.com/journal' },
  { id: 'w2', personId: 'p1', name: 'Matcha Gift Set', price: 28, emoji: '🍵', purchased: false },
  { id: 'w3', personId: 'p2', name: 'Wireless Gaming Headset', price: 129, emoji: '🎧', purchased: false },
  { id: 'w4', personId: 'p3', name: 'Ceramic Tea Set', price: 55, emoji: '🍶', purchased: true },
  { id: 'w5', personId: 'p5', name: 'Trail Running Shoes', price: 98, emoji: '👟', purchased: false },
];

export const giftHistory: GiftHistoryItem[] = [
  { id: 'h1', personId: 'p1', giftName: 'Rose Gold Watch', date: '2025-06-21', price: 210, occasion: 'Anniversary', status: 'given' },
  { id: 'h2', personId: 'p3', giftName: 'Cashmere Scarf', date: '2025-08-20', price: 85, occasion: 'Birthday', status: 'given' },
  { id: 'h3', personId: 'p2', giftName: 'Board Game Bundle', date: '2025-09-02', price: 60, occasion: 'Birthday', status: 'given' },
  { id: 'h4', personId: 'p4', giftName: 'Desk Plant', date: '2025-11-03', price: 25, occasion: 'Birthday', status: 'given' },
  { id: 'h5', personId: 'p5', giftName: 'Hiking Poles', date: '2025-08-09', price: 45, occasion: 'Birthday', status: 'given' },
  { id: 'h6', personId: 'p1', giftName: 'Instax Camera', date: '2026-08-14', price: 90, occasion: 'Birthday', status: 'planned' },
];

export const budget: BudgetEntry[] = [
  { id: 'b1', personId: 'p1', label: 'Birthday + Anniversary', amount: 300, spent: 210 },
  { id: 'b2', personId: 'p2', label: 'Birthday', amount: 100, spent: 60 },
  { id: 'b3', personId: 'p3', label: 'Birthday + Holidays', amount: 200, spent: 85 },
  { id: 'b4', personId: 'p4', label: 'Birthday', amount: 60, spent: 25 },
  { id: 'b5', personId: 'p5', label: 'Birthday + Graduation', amount: 180, spent: 45 },
];

export const reminders: Reminder[] = [
  { id: 'r1', personId: 'p1', title: "Emma's Birthday", leadDays: 14, enabled: true, channel: 'both' },
  { id: 'r2', personId: 'p3', title: "Mom's Birthday", leadDays: 7, enabled: true, channel: 'push' },
  { id: 'r3', personId: 'p5', title: "Sophie's Birthday", leadDays: 7, enabled: true, channel: 'push' },
  { id: 'r4', personId: 'p2', title: "Marcus' Birthday", leadDays: 3, enabled: false, channel: 'email' },
];

export const notifications: NotificationItem[] = [
  { id: 'n1', title: "Emma's Birthday in 11 days", body: 'Start planning the perfect gift now.', time: '2h ago', read: false, icon: '🎂' },
  { id: 'n2', title: 'New gift idea for Sophie', body: 'Trail Running Shoes matches her interests.', time: '5h ago', read: false, icon: '🎁' },
  { id: 'n3', title: 'Budget alert', body: "You've used 70% of Emma's gift budget.", time: '1d ago', read: true, icon: '💰' },
  { id: 'n4', title: 'Reminder set', body: "We'll remind you 7 days before Mom's birthday.", time: '2d ago', read: true, icon: '🔔' },
];

export const discoverCategories = ['All', 'Tech', 'Fashion', 'Home', 'Experiences', 'Books', 'Jewelry'];

export const relationshipFilters: string[] = ['All', 'Family', 'Friend', 'Partner', 'Colleague', 'Other'];
