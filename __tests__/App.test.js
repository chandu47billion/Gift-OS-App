/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('react-native-gesture-handler', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    GestureHandlerRootView: ({ children }) => mockReact.createElement(View, null, children),
  };
});

jest.mock('@react-navigation/native', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    NavigationContainer: ({ children }) => mockReact.createElement(View, null, children),
  };
});

jest.mock('../src/store/useAppStore', () => {
  const mockReact = require('react');
  const { View } = require('react-native');
  return {
    AppProvider: ({ children }) => mockReact.createElement(View, null, children),
    useAppStore: () => ({
      state: {
        isAuthenticated: false,
        hasOnboarded: false,
        themePreference: 'system',
        people: [],
        wishlist: [],
        giftHistory: [],
        budget: [],
        reminders: [],
        notifications: [],
        isPremium: false,
        userName: 'Test User',
        userEmail: 'test@example.com',
        settings: {
          analyticsEnabled: true,
          autoBackup: true,
          pushNotificationsEnabled: true,
          emailNotificationsEnabled: true,
          smartRemindersEnabled: true,
          defaultReminderLeadDays: 7,
        },
      },
      dispatch: jest.fn(),
      isHydrated: true,
      resetPersistedState: jest.fn(),
    }),
  };
});

jest.mock('../src/navigation/AppNavigator', () => 'AppNavigator');

test('renders correctly', async () => {
  const App = require('../App').default;
  let tree;
  await ReactTestRenderer.act(() => {
    tree = ReactTestRenderer.create(<App />);
  });
  expect(tree).toBeTruthy();
});
