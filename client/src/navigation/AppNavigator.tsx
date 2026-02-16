import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Plus, Grid, Lightbulb } from 'lucide-react-native';
import { Platform, StyleSheet, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { CreationLabScreen } from '../screens/CreationLabScreen';
import { VaultScreen } from '../screens/VaultScreen';
import { IdeationScreen } from '../screens/IdeationScreen';
import { COLORS, SPACING } from '../constants/theme';

const Tab = createBottomTabNavigator();

export const AppNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.red,
        tabBarInactiveTintColor: COLORS.white,
      }}
      screenListeners={{
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      }}
    >
      <Tab.Screen 
        name="Ideation" 
        component={IdeationScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Lightbulb color={focused ? COLORS.black : color} strokeWidth={2} size={24} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="CreationLab" 
        component={CreationLabScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Plus color={focused ? COLORS.black : color} strokeWidth={2} size={28} />
            </View>
          ),
        }}
      />
      <Tab.Screen 
        name="Vault" 
        component={VaultScreen}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIcon]}>
              <Grid color={focused ? COLORS.black : color} strokeWidth={2} size={24} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.black,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: Platform.OS === 'ios' ? 88 : 60,
    paddingTop: SPACING.s,
  },
  iconContainer: {
    width: 48,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIcon: {
    backgroundColor: COLORS.red,
  },
});
