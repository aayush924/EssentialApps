import React from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Play, Edit2 } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { NothingText } from '../components/NothingText';
import { NothingCard } from '../components/NothingCard';

interface AppEntry {
  id: string;
  name: string;
  lastEdited: string;
  icon: string;
}

const MOCK_APPS: AppEntry[] = [
  { id: '1', name: 'TODO LIST', lastEdited: '10:42 AM', icon: 'box' },
  { id: '2', name: 'WEATHER', lastEdited: 'YESTERDAY', icon: 'cloud' },
  { id: '3', name: 'NOTES', lastEdited: '2 DAYS AGO', icon: 'file-text' },
  { id: '4', name: 'CALCULATOR', lastEdited: '1 WEEK AGO', icon: 'calculator' },
];

const AppWidget = ({ item }: { item: AppEntry }) => (
  <NothingCard style={styles.widget}>
    <View style={styles.widgetHeader}>
      <Box size={24} color={COLORS.white} strokeWidth={2} />
      <NothingText variant="label" style={styles.timestamp}>{item.lastEdited}</NothingText>
    </View>
    
    <View style={styles.widgetBody}>
      <NothingText variant="header" style={styles.appName} numberOfLines={2}>
        {item.name}
      </NothingText>
    </View>

    <View style={styles.widgetFooter}>
      <TouchableOpacity style={styles.actionButton}>
        <Play size={20} color={COLORS.white} fill={COLORS.white} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.actionButton}>
        <Edit2 size={20} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  </NothingCard>
);

export const VaultScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <NothingText variant="header">VAULT</NothingText>
        <NothingText variant="label" style={styles.subtitle}>
          HISTORY OF APPS BUILT
        </NothingText>
      </View>

      <FlatList
        data={MOCK_APPS}
        renderItem={({ item }) => <AppWidget item={item} />}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  header: {
    padding: SPACING.l,
    paddingBottom: SPACING.m,
  },
  subtitle: {
    marginTop: SPACING.xs,
    opacity: 0.7,
  },
  listContent: {
    padding: SPACING.l,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: SPACING.l,
  },
  widget: {
    flex: 0.48, // Slightly less than 50% to account for gap
    aspectRatio: 1, // Square widget (2x2 feel)
    justifyContent: 'space-between',
    padding: SPACING.m,
  },
  widgetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.5,
  },
  widgetBody: {
    flex: 1,
    justifyContent: 'center',
  },
  appName: {
    fontSize: 20,
    lineHeight: 24,
  },
  widgetFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: SPACING.s,
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
