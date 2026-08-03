import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../hooks/useTheme';
import { useAppStore } from '../../store/useAppStore';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

const tones = ['Heartfelt', 'Funny', 'Formal', 'Short'] as const;
type Tone = (typeof tones)[number];

function generateGreetings(name: string, tone: Tone): string[] {
  switch (tone) {
    case 'Heartfelt':
      return [
        `Dear ${name}, wishing you a day as wonderful and warm as the joy you bring to everyone around you. Happy celebration! 💛`,
        `${name}, today is all about you. Thank you for being such a bright light in my life — here's to another beautiful year ahead.`,
        `Happy day, ${name}! May this year bring you closer to everything you're dreaming of.`,
      ];
    case 'Funny':
      return [
        `Happy Birthday ${name}! You're not getting older, you're just becoming a classic. 😄`,
        `${name}, they say age is just a number... yours is just a really big one now. Have an awesome day!`,
        `Warning: ${name} is now officially another year cooler. Proceed with celebration.`,
      ];
    case 'Formal':
      return [
        `Dear ${name}, please accept my warmest wishes on this special occasion. May the year ahead bring you continued success and happiness.`,
        `${name}, on behalf of everyone who values you, congratulations on this milestone.`,
        `Wishing you, ${name}, good health and prosperity in the year to come.`,
      ];
    case 'Short':
      return [
        `Happy day, ${name}! 🎉`,
        `Cheers to you, ${name}!`,
        `Congrats, ${name} — enjoy!`,
      ];
  }
}

export default function GreetingCreatorScreen({ navigation, route }: { navigation: any; route: any }) {
  const theme = useTheme();
  const { state } = useAppStore();
  const [personId, setPersonId] = useState<string>(route?.params?.personId ?? state.people[0]?.id ?? '');
  const [tone, setTone] = useState<Tone>('Heartfelt');
  const [selected, setSelected] = useState(0);
  const [editing, setEditing] = useState(false);
  const [customText, setCustomText] = useState('');

  const person = state.people.find((p) => p.id === personId);
  const firstName = person ? person.name.split(' ')[0] : 'Friend';

  const greetings = useMemo(() => generateGreetings(firstName, tone), [firstName, tone]);

  const activeText = editing ? customText : greetings[selected];

  const startEditing = () => {
    setCustomText(greetings[selected]);
    setEditing(true);
  };

  const share = () => {
    Alert.alert('Share', 'This would open the native share sheet with your greeting.');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: theme.colors.background }} contentContainerStyle={{ paddingBottom: 60 }}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={26} color={theme.colors.text} />
        </Pressable>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Greeting Creator</Text>
        <View style={{ width: 26 }} />
      </View>

      <View style={styles.content}>
        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>For</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 20 }}>
          {state.people.map((p) => (
            <Pressable
              key={p.id}
              onPress={() => setPersonId(p.id)}
              style={[
                styles.personChip,
                {
                  backgroundColor: personId === p.id ? theme.colors.primary : theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text style={{ fontSize: 16 }}>{p.avatarEmoji}</Text>
              <Text style={{ color: personId === p.id ? '#fff' : theme.colors.text, marginLeft: 6, fontWeight: '600' }}>
                {p.name}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Tone</Text>
        <View style={styles.chipRow}>
          {tones.map((t) => (
            <Pressable
              key={t}
              onPress={() => {
                setTone(t);
                setSelected(0);
                setEditing(false);
              }}
              style={[
                styles.chip,
                {
                  backgroundColor: tone === t ? theme.colors.primary : theme.colors.card,
                  borderColor: theme.colors.border,
                },
              ]}
            >
              <Text style={{ color: tone === t ? '#fff' : theme.colors.text, fontWeight: '600', fontSize: 13 }}>{t}</Text>
            </Pressable>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: theme.colors.text, marginTop: 12 }]}>Generated Options</Text>
        {greetings.map((g, idx) => (
          <Pressable
            key={idx}
            onPress={() => {
              setSelected(idx);
              setEditing(false);
            }}
          >
            <Card
              style={{
                marginBottom: 10,
                borderWidth: 2,
                borderColor: !editing && selected === idx ? theme.colors.primary : 'transparent',
              }}
            >
              <Text style={{ color: theme.colors.text, lineHeight: 20 }}>{g}</Text>
            </Card>
          </Pressable>
        ))}

        {editing ? (
          <TextInput
            value={customText}
            onChangeText={setCustomText}
            multiline
            style={[
              styles.editInput,
              { color: theme.colors.text, borderColor: theme.colors.primary, backgroundColor: theme.colors.card },
            ]}
          />
        ) : (
          <Card style={{ marginTop: 8, backgroundColor: theme.colors.primary + '11' }}>
            <Text style={{ color: theme.colors.textSecondary, fontSize: 12, marginBottom: 6 }}>PREVIEW</Text>
            <Text style={{ color: theme.colors.text, lineHeight: 20 }}>{activeText}</Text>
          </Card>
        )}

        <View style={{ marginTop: 20 }}>
          <Button title={editing ? 'Done Editing' : 'Edit Greeting'} variant="ghost" onPress={() => (editing ? setEditing(false) : startEditing())} />
          <View style={{ height: 12 }} />
          <Button title="Share Greeting" onPress={share} icon={<Ionicons name="share-social-outline" size={18} color="#fff" />} />
        </View>
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
  personChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 9999,
    borderWidth: 1,
    marginRight: 8,
    marginBottom: 8,
  },
  editInput: {
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 14,
    minHeight: 100,
    textAlignVertical: 'top',
    marginTop: 8,
  },
});
