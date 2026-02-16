import React from 'react';
import { TextInput, StyleSheet, TextInputProps, Platform } from 'react-native';
import { COLORS, BORDER_RADIUS, SPACING, FONTS } from '../constants/theme';

interface NothingInputProps extends TextInputProps {}

export const NothingInput: React.FC<NothingInputProps> = ({ 
  style, 
  placeholderTextColor = '#666',
  ...props 
}) => {
  return (
    <TextInput
      style={[styles.input, style]}
      placeholderTextColor={placeholderTextColor}
      selectionColor={COLORS.red}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    color: COLORS.white,
    backgroundColor: '#111',
    borderRadius: BORDER_RADIUS.button, // Using pill shape for inputs too often looks good in Nothing OS, or standard card radius
    paddingHorizontal: SPACING.l,
    paddingVertical: SPACING.m,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
});
