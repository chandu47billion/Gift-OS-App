import React, { createContext, useContext, useMemo, useReducer } from 'react';
import {
  Person,
  WishlistItem,
  GiftHistoryItem,
  BudgetEntry,
  Reminder,
  NotificationItem,
} from '../types';
import {
  people as seedPeople,
  wishlist as seedWishlist,
  giftHistory as seedHistory,
  budget as seedBudget,
  reminders as seedReminders,
  notifications as seedNotifications,
} from '../data/mockData';

export type ThemePreference = 'light' | 'dark' | 'system';

interface AppState {
  isAuthenticated: boolean;
  hasOnboarded: boolean;
  themePreference: ThemePreference;
  people: Person[];
  wishlist: WishlistItem[];
  giftHistory: GiftHistoryItem[];
  budget: BudgetEntry[];
  reminders: Reminder[];
  notifications: NotificationItem[];
  isPremium: boolean;
  userName: string;
  userEmail: string;
}

type AppAction =
  | { type: 'SET_AUTHENTICATED'; value: boolean }
  | { type: 'SET_ONBOARDED'; value: boolean }
  | { type: 'SET_THEME'; value: ThemePreference }
  | { type: 'ADD_PERSON'; value: Person }
  | { type: 'UPDATE_PERSON'; value: Person }
  | { type: 'REMOVE_PERSON'; id: string }
  | { type: 'ADD_WISHLIST_ITEM'; value: WishlistItem }
  | { type: 'TOGGLE_WISHLIST_PURCHASED'; id: string }
  | { type: 'ADD_BUDGET_ENTRY'; value: BudgetEntry }
  | { type: 'TOGGLE_REMINDER'; id: string }
  | { type: 'MARK_NOTIFICATION_READ'; id: string }
  | { type: 'MARK_ALL_NOTIFICATIONS_READ' }
  | { type: 'SET_PREMIUM'; value: boolean }
  | { type: 'SIGN_OUT' };

const initialState: AppState = {
  isAuthenticated: false,
  hasOnboarded: false,
  themePreference: 'system',
  people: seedPeople,
  wishlist: seedWishlist,
  giftHistory: seedHistory,
  budget: seedBudget,
  reminders: seedReminders,
  notifications: seedNotifications,
  isPremium: false,
  userName: 'Alex Rivera',
  userEmail: 'alex.rivera@example.com',
};

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_AUTHENTICATED':
      return { ...state, isAuthenticated: action.value };
    case 'SET_ONBOARDED':
      return { ...state, hasOnboarded: action.value };
    case 'SET_THEME':
      return { ...state, themePreference: action.value };
    case 'ADD_PERSON':
      return { ...state, people: [action.value, ...state.people] };
    case 'UPDATE_PERSON':
      return {
        ...state,
        people: state.people.map((p) => (p.id === action.value.id ? action.value : p)),
      };
    case 'REMOVE_PERSON':
      return { ...state, people: state.people.filter((p) => p.id !== action.id) };
    case 'ADD_WISHLIST_ITEM':
      return { ...state, wishlist: [action.value, ...state.wishlist] };
    case 'TOGGLE_WISHLIST_PURCHASED':
      return {
        ...state,
        wishlist: state.wishlist.map((w) =>
          w.id === action.id ? { ...w, purchased: !w.purchased } : w
        ),
      };
    case 'ADD_BUDGET_ENTRY':
      return { ...state, budget: [action.value, ...state.budget] };
    case 'TOGGLE_REMINDER':
      return {
        ...state,
        reminders: state.reminders.map((r) =>
          r.id === action.id ? { ...r, enabled: !r.enabled } : r
        ),
      };
    case 'MARK_NOTIFICATION_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) =>
          n.id === action.id ? { ...n, read: true } : n
        ),
      };
    case 'MARK_ALL_NOTIFICATIONS_READ':
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
      };
    case 'SET_PREMIUM':
      return { ...state, isPremium: action.value };
    case 'SIGN_OUT':
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
}

interface AppContextValue {
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = useMemo(() => ({ state, dispatch }), [state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useAppStore must be used within an AppProvider');
  }
  return ctx;
}
