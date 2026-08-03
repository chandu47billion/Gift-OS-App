import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore, ThemePreference } from '../../store/useAppStore';
import Card from '../../components/common/Card';

const themeOptions: { key: ThemePreference; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'light', label: 'Light', icon: 'sunny-outline' },
  { key: 'dark', label: 'Dark', icon: 'moon-outline' },
  { key: 'system', label: 'System', icon: 'phone-portrait-outline' },
];

export default function SettingsScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { state, dispatch } = useAppStore();
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [autoBackup, setAutoBackup] = useState(true);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Settings</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Appearance</Text>
        <Card style={{ marginBottom: 24, flexDirection: 'row', justifyContent: 'space-between' }}>
          {themeOptions.map((opt) => (
            <Pressable
              key={opt.key}
              onPress={() => dispatch({ type: 'SET_THEME', value: opt.key })}
              style={[
                styles.themeOption,
                {
                  backgroundColor: state.themePreference === opt.key ? theme.colors.primary : 'transparent',
                },
              ]}
            >
              <Ionicons
                name={opt.icon}
                size={20}
                color={state.themePreference === opt.key ? '#fff' : theme.colors.text}
              />
              <Text
                style={{
                  color: state.themePreference === opt.key ? '#fff' : theme.colors.text,
                  fontSize: 12,
                  marginTop: 6,
                  fontWeight: '600',
                }}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Privacy</Text>
        <Card style={{ marginBottom: 16 }}>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text }}>Share anonymous analytics</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                Helps us improve gift suggestions.
              </Text>
            </View>
            <Switch value={analyticsEnabled} onValueChange={setAnalyticsEnabled} trackColor={{ true: theme.colors.primary }} />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Backup & Sync</Text>
        <Card style={{ marginBottom: 16 }}>
          <View style={styles.switchRow}>
            <View style={{ flex: 1 }}>
              <Text style={{ color: theme.colors.text }}>Automatic backup</Text>
              <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginTop: 2 }}>
                Keep your people and gift data backed up to the cloud.
              </Text>
            </View>
            <Switch value={autoBackup} onValueChange={setAutoBackup} trackColor={{ true: theme.colors.primary }} />
          </View>
        </Card>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Help & Support</Text>
        <Pressable onPress={() => Alert.alert('Help Center', 'Visit help.giftos.app for FAQs and guides.')}>
          <Card style={{ marginBottom: 10 }}>
            <View style={styles.switchRow}>
              <Text style={{ color: theme.colors.text }}>Visit Help Center</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
            </View>
          </Card>
        </Pressable>
        <Pressable onPress={() => Alert.alert('Contact Support', 'Email us at support@giftos.app')}>
          <Card>
            <View style={styles.switchRow}>
              <Text style={{ color: theme.colors.text }}>Contact Support</Text>
              <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
            </View>
          </Card>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 12,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    marginBottom: 12,
  },
  themeOption: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 4,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
