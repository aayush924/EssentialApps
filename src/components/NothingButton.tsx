import React from 'react';
import { TouchableOpacity, StyleSheet, TouchableOpacityProps, ViewStyle } from 'react-native';
import * as Haptics from 'expo-haptics';
import { COLORS, BORDER_RADIUS, SPACING } from '../constants/theme';
import { NothingText } from './NothingText';

interface NothingButtonProps extends TouchableOpacityProps {
  title: string;
  variant?: 'primary' | 'secondary' | 'accent';
  icon?: React.ReactNode;
}

export const NothingButton: React.FC<NothingButtonProps> = ({ 
  title, 
  variant = 'primary', 
  style, 
  onPress,
  icon,
  ...props 
}) => {
  const handlePress = (e: any) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onPress?.(e);
  };

  const getBackgroundColor = () => {
    switch (variant) {
      case 'accent': return COLORS.red;
      case 'secondary': return 'transparent';
      default: return COLORS.white;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'accent': return COLORS.white;
      case 'secondary': return COLORS.white;
      default: return COLORS.black;
    }
  };

  const getBorder = () => {
    if (variant === 'secondary') {
      return {
        borderWidth: 1,
        borderColor: COLORS.white,
      };
    }
    return {};
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        getBorder(),
        style,
      ]}
      onPress={handlePress}
      activeOpacity={0.8}
      {...props}
    >
      {icon}
      <NothingText 
        variant="body" 
        style={[
          styles.text, 
          { color: getTextColor(), marginLeft: icon ? SPACING.s : 0 }
        ]}
      >
        {title.toUpperCase()}
      </NothingText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: BORDER_RADIUS.button,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: SPACING.l,
  },
  text: {
    fontWeight: '600',
    letterSpacing: 1,
  },
});
