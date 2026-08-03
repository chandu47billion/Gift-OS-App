import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import Avatar from '../../components/common/Avatar';
import Card from '../../components/common/Card';
import Badge from '../../components/common/Badge';

interface Row {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  destructive?: boolean;
  badge?: string;
}

export default function ProfileScreen({ navigation }: { navigation: any }) {
  const theme = useTheme();
  const { state, dispatch } = useAppStore();

  const confirmSignOut = () => {
    Alert.alert('Sign Out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign Out', style: 'destructive', onPress: () => dispatch({ type: 'SIGN_OUT' }) },
    ]);
  };

  const rows: Row[] = [
    { icon: 'color-palette-outline', label: 'Appearance & Settings', onPress: () => navigation.navigate('Settings') },
    { icon: 'notifications-outline', label: 'Notification Preferences', onPress: () => navigation.navigate('ReminderSettings') },
    { icon: 'lock-closed-outline', label: 'Privacy', onPress: () => navigation.navigate('Settings', { section: 'privacy' }) },
    { icon: 'cloud-upload-outline', label: 'Backup & Sync', onPress: () => navigation.navigate('Settings', { section: 'backup' }) },
    {
      icon: 'star-outline',
      label: 'Go Premium',
      onPress: () => navigation.navigate('Premium'),
      badge: state.isPremium ? 'Active' : undefined,
    },
    { icon: 'help-circle-outline', label: 'Help & Support', onPress: () => navigation.navigate('Settings', { section: 'help' }) },
    { icon: 'log-out-outline', label: 'Sign Out', onPress: confirmSignOut, destructive: true },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.colors.text }]}>Profile</Text>
      </View>

      <View style={styles.userCard}>
        <Avatar emoji="🙂" color={theme.colors.primary} size={72} />
        <Text style={[styles.userName, { color: theme.colors.text }]}>{state.userName}</Text>
        <Text style={{ color: theme.colors.textSecondary, fontSize: 13 }}>{state.userEmail}</Text>
        <View style={{ marginTop: 8 }}>
          <Badge label={state.isPremium ? 'Premium Member' : 'Free Plan'} variant={state.isPremium ? 'success' : 'neutral'} />
        </View>
      </View>

      <View style={styles.content}>
        {rows.map((row) => (
          <Pressable key={row.label} onPress={row.onPress}>
            <Card style={styles.row}>
              <Ionicons
                name={row.icon}
                size={20}
                color={row.destructive ? theme.colors.error : theme.colors.text}
              />
              <Text
                style={[
                  styles.rowLabel,
                  { color: row.destructive ? theme.colors.error : theme.colors.text },
                ]}
              >
                {row.label}
              </Text>
              {row.badge ? (
                <View style={{ marginRight: 8 }}>
                  <Badge label={row.badge} variant="success" />
                </View>
              ) : null}
              <Ionicons name="chevron-forward" size={18} color={theme.colors.textSecondary} />
            </Card>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 4,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
  },
  userCard: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    marginTop: 12,
  },
  content: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  rowLabel: {
    flex: 1,
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '600',
  },
});
