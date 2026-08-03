import React, { useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { AuthStackParamList } from '../../navigation/AuthNavigator';
import Button from '../../components/common/Button';

type Props = NativeStackScreenProps<AuthStackParamList, 'Onboarding'>;

const { width } = Dimensions.get('window');

const pages = [
  {
    key: '1',
    emoji: '📅',
    title: 'Never Miss a Moment',
    subtitle: 'Smart reminders for every birthday, anniversary, and special occasion in your life.',
    gradient: ['#74B9FF', '#6C5CE7'] as const,
  },
  {
    key: '2',
    emoji: '🎁',
    title: 'Perfect Gifts, Every Time',
    subtitle: 'Personalized gift suggestions based on interests, budget, and past gifts.',
    gradient: ['#6C5CE7', '#FD79A8'] as const,
  },
  {
    key: '3',
    emoji: '❤️',
    title: 'All Your Relationships',
    subtitle: 'Keep track of everyone who matters — family, friends, partners, and colleagues.',
    gradient: ['#FF7675', '#FDCB6E'] as const,
  },
];

export default function OnboardingScreen({ navigation }: Props) {
  const [index, setIndex] = useState(0);
  const listRef = useRef<FlatList>(null);

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(newIndex);
  };

  const goNext = () => {
    if (index < pages.length - 1) {
      listRef.current?.scrollToIndex({ index: index + 1 });
    } else {
      navigation.replace('Auth');
    }
  };

  const skip = () => navigation.replace('Auth');

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={pages}
        keyExtractor={(item) => item.key}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        renderItem={({ item }) => (
          <LinearGradient colors={item.gradient} style={[styles.page, { width }]}>
            <Text style={styles.emoji}>{item.emoji}</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subtitle}>{item.subtitle}</Text>
          </LinearGradient>
        )}
      />

      <View style={styles.footer}>
        <View style={styles.dotsRow}>
          {pages.map((_, i) => (
            <View
              key={i}
              style={[
                styles.dot,
                { opacity: i === index ? 1 : 0.35, width: i === index ? 20 : 8 },
              ]}
            />
          ))}
        </View>

        <View style={styles.buttonsRow}>
          <Pressable onPress={skip} hitSlop={12}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
          <Button
            title={index === pages.length - 1 ? 'Get Started' : 'Next'}
            onPress={goNext}
            fullWidth={false}
            size="sm"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  emoji: {
    fontSize: 88,
    marginBottom: 24,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  footer: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
  },
  dotsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#fff',
    marginHorizontal: 4,
  },
  buttonsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  skipText: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    fontWeight: '600',
  },
});
