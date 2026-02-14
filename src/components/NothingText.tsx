import React from 'react';
import { Text, TextProps, StyleSheet, Platform } from 'react-native';
import { COLORS, FONTS } from '../constants/theme';

interface NothingTextProps extends TextProps {
  variant?: 'header' | 'body' | 'label';
  color?: string;
}

export const NothingText: React.FC<NothingTextProps> = ({ 
  children, 
  style, 
  variant = 'body', 
  color = COLORS.white,
  ...props 
}) => {
  const getFontFamily = () => {
    if (variant === 'header') return FONTS.dotMatrix;
    return Platform.OS === 'ios' ? 'Menlo' : 'monospace';
  };

  const getFontSize = () => {
    switch (variant) {
      case 'header': return 24;
      case 'label': return 12;
      default: return 16;
    }
  };

  return (
    <Text 
      style={[
        styles.text, 
        { 
          color, 
          fontFamily: getFontFamily(),
          fontSize: getFontSize(),
        }, 
        style
      ]} 
      {...props}
    >
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    // includeFontPadding: false,
    // textAlignVertical: 'center',
  },
});
