import { createContext, useCallback, useContext, useEffect, useMemo, useState, useReducer } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  people as seedPeople,
  wishlist as seedWishlist,
  giftHistory as seedHistory,
  budget as seedBudget,
  reminders as seedReminders,
  notifications as seedNotifications
} from "../data/mockData";
const APP_STATE_STORAGE_KEY = "@gift-os/app-state";
const APP_STATE_SCHEMA_VERSION = 1;
const initialState = {
  isAuthenticated: false,
  hasOnboarded: false,
  themePreference: "system",
  people: seedPeople,
  wishlist: seedWishlist,
  giftHistory: seedHistory,
  budget: seedBudget,
  reminders: seedReminders,
  notifications: seedNotifications,
  isPremium: false,
  userName: "Alex Rivera",
  userEmail: "alex.rivera@example.com",
  settings: {
    analyticsEnabled: true,
    autoBackup: true,
    pushNotificationsEnabled: true,
    emailNotificationsEnabled: true,
    smartRemindersEnabled: true,
    defaultReminderLeadDays: 7
  }
};
const noOpMigrationToV1 = (state) => state;
const migrations = {
  // Example migration slot so future schema changes can be added safely.
  1: noOpMigrationToV1
};
function pickPersistedState(state) {
  const safeTheme = ["light", "dark", "system"].includes(state?.themePreference) ? state.themePreference : initialState.themePreference;
  const settings = {
    analyticsEnabled: typeof state?.settings?.analyticsEnabled === "boolean" ? state.settings.analyticsEnabled : initialState.settings.analyticsEnabled,
    autoBackup: typeof state?.settings?.autoBackup === "boolean" ? state.settings.autoBackup : initialState.settings.autoBackup,
    pushNotificationsEnabled: typeof state?.settings?.pushNotificationsEnabled === "boolean" ? state.settings.pushNotificationsEnabled : initialState.settings.pushNotificationsEnabled,
    emailNotificationsEnabled: typeof state?.settings?.emailNotificationsEnabled === "boolean" ? state.settings.emailNotificationsEnabled : initialState.settings.emailNotificationsEnabled,
    smartRemindersEnabled: typeof state?.settings?.smartRemindersEnabled === "boolean" ? state.settings.smartRemindersEnabled : initialState.settings.smartRemindersEnabled,
    defaultReminderLeadDays: Number.isFinite(state?.settings?.defaultReminderLeadDays) ? state.settings.defaultReminderLeadDays : initialState.settings.defaultReminderLeadDays
  };
  return {
    people: Array.isArray(state?.people) ? state.people : initialState.people,
    wishlist: Array.isArray(state?.wishlist) ? state.wishlist : initialState.wishlist,
    giftHistory: Array.isArray(state?.giftHistory) ? state.giftHistory : initialState.giftHistory,
    budget: Array.isArray(state?.budget) ? state.budget : initialState.budget,
    reminders: Array.isArray(state?.reminders) ? state.reminders : initialState.reminders,
    notifications: Array.isArray(state?.notifications) ? state.notifications : initialState.notifications,
    themePreference: safeTheme,
    isAuthenticated: typeof state?.isAuthenticated === "boolean" ? state.isAuthenticated : initialState.isAuthenticated,
    hasOnboarded: typeof state?.hasOnboarded === "boolean" ? state.hasOnboarded : initialState.hasOnboarded,
    isPremium: typeof state?.isPremium === "boolean" ? state.isPremium : initialState.isPremium,
    userName: typeof state?.userName === "string" ? state.userName : initialState.userName,
    userEmail: typeof state?.userEmail === "string" ? state.userEmail : initialState.userEmail,
    settings
  };
}
function safeParsePersistedPayload(raw) {
  if (!raw) {
    return null;
  }
  try {
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") {
      return null;
    }
    const version = Number.isInteger(parsed.version) ? parsed.version : 0;
    if (parsed.data && typeof parsed.data === "object") {
      return { version, data: parsed.data };
    }
    if (version === 0) {
      return { version, data: parsed };
    }
    return null;
  } catch {
    return null;
  }
}
function migrateState(data, fromVersion) {
  let nextState = data;
  for (let version = fromVersion + 1; version <= APP_STATE_SCHEMA_VERSION; version += 1) {
    const migrate = migrations[version];
    if (typeof migrate === "function") {
      nextState = migrate(nextState);
    }
  }
  return nextState;
}
function reducer(state, action) {
  switch (action.type) {
    case "HYDRATE_STATE":
      return { ...state, ...action.value };
    case "SET_AUTHENTICATED":
      return { ...state, isAuthenticated: action.value };
    case "SET_ONBOARDED":
      return { ...state, hasOnboarded: action.value };
    case "SET_THEME":
      return { ...state, themePreference: action.value };
    case "ADD_PERSON":
      return { ...state, people: [action.value, ...state.people] };
    case "UPDATE_PERSON":
      return {
        ...state,
        people: state.people.map((p) => p.id === action.value.id ? action.value : p)
      };
    case "REMOVE_PERSON":
      return { ...state, people: state.people.filter((p) => p.id !== action.id) };
    case "ADD_WISHLIST_ITEM":
      return { ...state, wishlist: [action.value, ...state.wishlist] };
    case "TOGGLE_WISHLIST_PURCHASED":
      return {
        ...state,
        wishlist: state.wishlist.map(
          (w) => w.id === action.id ? { ...w, purchased: !w.purchased } : w
        )
      };
    case "REMOVE_WISHLIST_ITEM":
      return { ...state, wishlist: state.wishlist.filter((w) => w.id !== action.id) };
    case "ADD_GIFT_HISTORY":
      return { ...state, giftHistory: [action.value, ...state.giftHistory] };
    case "ADD_BUDGET_ENTRY":
      return { ...state, budget: [action.value, ...state.budget] };
    case "TOGGLE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map(
          (r) => r.id === action.id ? { ...r, enabled: !r.enabled } : r
        )
      };
    case "MARK_NOTIFICATION_READ":
      return {
        ...state,
        notifications: state.notifications.map(
          (n) => n.id === action.id ? { ...n, read: true } : n
        )
      };
    case "MARK_ALL_NOTIFICATIONS_READ":
      return {
        ...state,
        notifications: state.notifications.map((n) => ({ ...n, read: true }))
      };
    case "SET_PREMIUM":
      return { ...state, isPremium: action.value };
    case "SIGN_OUT":
      return { ...state, isAuthenticated: false };
    case "SET_SETTING":
      return {
        ...state,
        settings: { ...state.settings, [action.key]: action.value }
      };
    case "RESET_STATE":
      return initialState;
    default:
      return state;
  }
}
const AppContext = createContext(void 0);
function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isHydrated, setIsHydrated] = useState(false);
  useEffect(() => {
    let isActive = true;
    const hydrate = async () => {
      const stored = await AsyncStorage.getItem(APP_STATE_STORAGE_KEY).catch(() => null);
      const parsedPayload = safeParsePersistedPayload(stored);
      if (!isActive) {
        return;
      }
      if (!parsedPayload || parsedPayload.version > APP_STATE_SCHEMA_VERSION) {
        // Corrupted/unknown payloads fall back to defaults instead of crashing.
        dispatch({ type: "HYDRATE_STATE", value: initialState });
        setIsHydrated(true);
        return;
      }
      const migrated = migrateState(parsedPayload.data, parsedPayload.version);
      dispatch({
        type: "HYDRATE_STATE",
        value: pickPersistedState(migrated)
      });
      setIsHydrated(true);
    };
    hydrate();
    return () => {
      isActive = false;
    };
  }, []);
  useEffect(() => {
    if (!isHydrated) {
      // Avoid overwriting persisted data with defaults before hydration finishes.
      return;
    }
    const payload = {
      version: APP_STATE_SCHEMA_VERSION,
      data: pickPersistedState(state)
    };
    AsyncStorage.setItem(APP_STATE_STORAGE_KEY, JSON.stringify(payload)).catch(() => {
    });
  }, [isHydrated, state]);
  const resetPersistedState = useCallback(async () => {
    await AsyncStorage.removeItem(APP_STATE_STORAGE_KEY).catch(() => {
    });
    dispatch({ type: "RESET_STATE" });
  }, []);
  const value = useMemo(() => ({
    state,
    dispatch,
    isHydrated,
    resetPersistedState
  }), [isHydrated, resetPersistedState, state]);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useAppStore must be used within an AppProvider");
  }
  return ctx;
}
export {
  AppProvider,
  useAppStore,
  APP_STATE_SCHEMA_VERSION
};
