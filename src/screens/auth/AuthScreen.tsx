import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAppStore } from '../../store/useAppStore';

type Props = NativeStackScreenProps<AuthStackParamList, 'Auth'>;

export default function AuthScreen({ navigation }: Props) {
  const { dispatch } = useAppStore();

  const continueToApp = () => {
    navigation.replace('Permissions');
  };

  return (
    <LinearGradient colors={['#F8F9FB', '#EDEBFB']} style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.logo}>🎁</Text>
        <Text style={styles.title}>Gift OS</Text>
        <Text style={styles.tagline}>Thoughtful gifting, made effortless</Text>
      </View>

      <View style={styles.buttons}>
        <Pressable style={[styles.socialButton, styles.googleButton]} onPress={continueToApp}>
          <Ionicons name="logo-google" size={20} color="#DB4437" />
          <Text style={styles.socialText}>Continue with Google</Text>
        </Pressable>

        <Pressable style={[styles.socialButton, styles.appleButton]} onPress={continueToApp}>
          <Ionicons name="logo-apple" size={20} color="#fff" />
          <Text style={[styles.socialText, { color: '#fff' }]}>Continue with Apple</Text>
        </Pressable>

        <Pressable style={[styles.socialButton, styles.emailButton]} onPress={continueToApp}>
          <Ionicons name="mail-outline" size={20} color="#111827" />
          <Text style={styles.socialText}>Continue with Email</Text>
        </Pressable>

        <Pressable
          onPress={() => {
            dispatch({ type: 'SET_AUTHENTICATED', value: true });
            dispatch({ type: 'SET_ONBOARDED', value: true });
          }}
          style={styles.guestLink}
        >
          <Text style={styles.guestText}>Continue as Guest</Text>
        </Pressable>
      </View>

      <Text style={styles.footer}>
        By continuing, you agree to our Terms of Service and Privacy Policy.
      </Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 100,
    paddingBottom: 40,
  },
  hero: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#111827',
    marginTop: 8,
  },
  tagline: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 6,
  },
  buttons: {
    marginTop: 40,
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 14,
    marginBottom: 12,
  },
  googleButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  appleButton: {
    backgroundColor: '#111827',
  },
  emailButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  socialText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 10,
  },
  guestLink: {
    marginTop: 8,
    alignItems: 'center',
    paddingVertical: 10,
  },
  guestText: {
    color: '#6C5CE7',
    fontWeight: '600',
    fontSize: 14,
  },
  footer: {
    fontSize: 11,
    color: '#9CA3AF',
    textAlign: 'center',
    lineHeight: 16,
  },
});
