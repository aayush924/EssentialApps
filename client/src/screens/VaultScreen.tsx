import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Box, Play, Edit2, X, Eye, ArrowRight } from 'lucide-react-native';
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

interface AppWidgetProps {
  item: AppEntry;
  onPress: () => void;
  onPlay: () => void;
  onEdit: () => void;
}

const AppWidget = ({ item, onPress, onPlay, onEdit }: AppWidgetProps) => (
  <TouchableOpacity 
    style={styles.widgetContainer} 
    onPress={onPress}
    activeOpacity={0.7}
  >
    <NothingCard style={styles.widgetContent}>
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
        <TouchableOpacity style={styles.actionButton} onPress={onPlay}>
          <Play size={20} color={COLORS.white} fill={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton} onPress={onEdit}>
          <Edit2 size={20} color={COLORS.white} />
        </TouchableOpacity>
      </View>
    </NothingCard>
  </TouchableOpacity>
);

export const VaultScreen = () => {
  const [selectedApp, setSelectedApp] = useState<AppEntry | null>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleAppPress = (app: AppEntry) => {
    setSelectedApp(app);
    setMenuVisible(true);
  };

  const handlePlay = (app: AppEntry) => {
    console.log(`Launch app: ${app.name}`);
    // TODO: Implement app launch logic
  };

  const handleEdit = (app: AppEntry) => {
    console.log(`Rename app: ${app.name}`);
    // TODO: Implement rename logic
    Alert.alert('Rename', `Rename ${app.name}`);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    setSelectedApp(null);
  };

  const handleMenuOption = (action: 'launch' | 'instructions' | 'rename') => {
    if (!selectedApp) return;
    
    switch (action) {
      case 'launch':
        handlePlay(selectedApp);
        break;
      case 'instructions':
        console.log(`View instructions for: ${selectedApp.name}`);
        // TODO: Implement view instructions logic
        break;
      case 'rename':
        handleEdit(selectedApp);
        break;
    }
    closeMenu();
  };

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
        renderItem={({ item }) => (
          <AppWidget 
            item={item} 
            onPress={() => handleAppPress(item)}
            onPlay={() => handlePlay(item)}
            onEdit={() => handleEdit(item)}
          />
        )}
        keyExtractor={item => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={styles.columnWrapper}
      />

      <Modal
        visible={menuVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeMenu}
      >
        <TouchableWithoutFeedback onPress={closeMenu}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                <View style={styles.menuHeader}>
                  <NothingText variant="header" style={styles.menuTitle}>
                    {selectedApp?.name}
                  </NothingText>
                  <TouchableOpacity onPress={closeMenu}>
                    <X size={24} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
                
                <TouchableOpacity 
                  style={styles.menuOption} 
                  onPress={() => handleMenuOption('launch')}
                >
                  <View style={styles.menuOptionContent}>
                    <Play size={20} color={COLORS.white} />
                    <NothingText style={styles.menuOptionText}>Launch App</NothingText>
                  </View>
                  <ArrowRight size={16} color="rgba(255, 255, 255, 0.5)" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.menuOption} 
                  onPress={() => handleMenuOption('instructions')}
                >
                  <View style={styles.menuOptionContent}>
                    <Eye size={20} color={COLORS.white} />
                    <NothingText style={styles.menuOptionText}>View Instructions</NothingText>
                  </View>
                  <ArrowRight size={16} color="rgba(255, 255, 255, 0.5)" />
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.menuOption, styles.lastMenuOption]} 
                  onPress={() => handleMenuOption('rename')}
                >
                  <View style={styles.menuOptionContent}>
                    <Edit2 size={20} color={COLORS.white} />
                    <NothingText style={styles.menuOptionText}>Rename</NothingText>
                  </View>
                  <ArrowRight size={16} color="rgba(255, 255, 255, 0.5)" />
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  widgetContainer: {
    flex: 0.48, // Slightly less than 50% to account for gap
    aspectRatio: 1, // Square widget (2x2 feel)
  },
  widgetContent: {
    flex: 1,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: SPACING.l,
  },
  menuContainer: {
    width: '100%',
    backgroundColor: COLORS.darkGray,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.m,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  menuHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.m,
    paddingBottom: SPACING.s,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  menuTitle: {
    fontSize: 18,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: SPACING.m,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  lastMenuOption: {
    borderBottomWidth: 0,
  },
  menuOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SPACING.m,
  },
  menuOptionText: {
    fontSize: 16,
    color: COLORS.white,
  },
});
