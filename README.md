# 🎁 Gift OS

A premium, mobile-first gifting companion built with **React Native CLI (bare React Native)** and **JavaScript**. Gift OS helps you remember every birthday, anniversary, and milestone in your life, and takes the stress out of finding the perfect gift with AI-style suggestions, budgeting tools, and greeting generation.

## ✨ Features

- **Smart Home dashboard** — today's focus event, upcoming countdowns, personalized gift suggestions, quick actions, and a reminder timeline.
- **People management** — add, search, and filter the people in your life; rich multi-step "Add Person" flow (photo, dates, interests, budget, notes); detailed profile with Overview / Occasions / Gifts / Notes tabs.
- **Calendar** — Month, Week, and Agenda views of every occasion across your people.
- **Discover** — searchable, filterable gift catalog with detail pages, AI-style rationale, and "Save to Wishlist".
- **Gifting tools** — Wishlist, Gift History, Budget Tracker (with per-person spend breakdown), Reminder Settings (lead time & channels), and an AI Greeting Creator (tone-based message generation with edit & share).
- **Premium** — feature comparison table plus monthly/annual subscription cards.
- **Profile & Settings** — theme switcher (light/dark/system), notification & privacy preferences, backup & sync, help & support, sign out.
- **Onboarding & Auth** — animated splash screen, 3-page onboarding carousel, social/guest sign-in, and a permissions walkthrough.
- Full **light/dark mode** support throughout, driven by a small design-system + theme context.

## 🏗 Architecture

```
App.js                     Root component: providers + navigation container
src/
  design-system/
    tokens.js                Design tokens: colors, spacing, radii, typography, shadows
    theme.js                 Light/dark theme objects built from tokens
  hooks/
    useTheme.ts               Resolves the active theme from user preference + system scheme
  store/
    useAppStore.js           Global app state via React Context + useReducer
  data/
    constants.js               UI constants (relationship filters, discover categories)
  types/
    index.js                   Shared JavaScript domain types
  utils/
    date.js                    Date helpers (days-until, formatting, month names)
  components/
    common/                    Button, Card, Input, Avatar, Badge, EmptyState
    home/                       EventCard, CountdownCard, GiftSuggestionCard, QuickActions
    people/                     PersonCard
    gifts/                      GiftCard
  navigation/
    AppNavigator.js            Root stack: auth flow vs. main app + full-screen detail routes
    AuthNavigator.js           Splash → Onboarding → Auth → Permissions
    MainNavigator.js           Bottom tab bar (Home, Calendar, Discover, People, Profile)
    PeopleNavigator.js         People list → Add person → Person profile
    DiscoverNavigator.js       Discover → Gift detail
  screens/
    auth/                       SplashScreen, OnboardingScreen, AuthScreen, PermissionsScreen
    home/                        HomeScreen, NotificationCenterScreen
    people/                      PeopleListScreen, AddPersonScreen, PersonProfileScreen
    calendar/                    CalendarScreen
    discover/                    DiscoverScreen, GiftDetailScreen
    gifts/                       WishlistScreen, GiftHistoryScreen, BudgetTrackerScreen,
                                  ReminderSettingsScreen, GreetingCreatorScreen
    premium/                     PremiumScreen
    profile/                     ProfileScreen, SettingsScreen
```

### Navigation model

- `AppNavigator` is the root: while the user is unauthenticated it renders `AuthNavigator`; once authenticated it renders a native stack containing `MainTabs` (the bottom tab bar) plus full-screen routes (`NotificationCenter`, `Wishlist`, `GiftHistory`, `BudgetTracker`, `ReminderSettings`, `GreetingCreator`, `Premium`, `Settings`). Any screen — regardless of which tab it lives in — can navigate to these routes and React Navigation bubbles the request up to the root stack automatically.
- `PeopleNavigator` and `DiscoverNavigator` are nested stacks embedded as tabs, encapsulating their own detail flows (`PersonProfile`, `GiftDetail`).

### State management

Global state (people, wishlist, gift history, budget, reminders, notifications, theme preference, auth/premium flags) lives in `useAppStore.js`, a React Context + `useReducer` store that starts empty. All data is created by the user at runtime. Screens read state and dispatch actions like `ADD_PERSON`, `TOGGLE_WISHLIST_PURCHASED`, `SET_THEME`, etc.

### Design system

All screens draw their colors, spacing, radii, and shadows from `design-system/tokens.js` via `design-system/theme.js` and the `useTheme()` hook, so light/dark mode and visual consistency stay centralized.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and npm
- Android Studio + Android SDK (for Android builds)
- Xcode + CocoaPods (for iOS builds on macOS)

### Install & run

```bash
npm install
npm install
npm run start
npm run android
# iOS (macOS only)
cd ios && bundle install && bundle exec pod install && cd ..
npm run ios
```

Run on a simulator/emulator or a connected device using the React Native CLI commands above.


## 📦 Key Dependencies

| Package | Purpose |
|---|---|
| `@react-navigation/*` | Native stack + bottom tabs navigation |
| `react-native-screens`, `react-native-safe-area-context` | Navigation performance & safe areas |
| `react-native-linear-gradient` | Gradient headers & hero sections |
| `react-native-vector-icons` | Iconography (Ionicons) |
| `react-native-gesture-handler` | Gesture support required by navigation |
| | `@react-native-async-storage/async-storage` | Local persistence groundwork |
| 
## 🎨 Design notes

- All imagery uses gradient placeholders + emoji instead of network images, keeping the app fully offline-friendly and dependency-light.
- Dates are plain text inputs (`YYYY-MM-DD`) rather than native date pickers, keeping the app dependency footprint small.
- Every screen is fully wired into navigation — there are no dead-end buttons.

## 🗺 Roadmap ideas

- Real authentication & backend sync (Supabase/Firebase)
- Push notifications via a native-compatible notifications library
- Native date/time pickers
- Real product search/affiliate integration on the Discover tab
