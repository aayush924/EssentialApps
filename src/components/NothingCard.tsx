import React from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';
import { COLORS, BORDER_RADIUS, LAYOUT, SPACING } from '../constants/theme';

interface NothingCardProps extends ViewProps {
  noBorder?: boolean;
}

export const NothingCard: React.FC<NothingCardProps> = ({ 
  children, 
  style, 
  noBorder = false,
  ...props 
}) => {
  return (
    <View 
      style={[
        styles.card, 
        !noBorder && styles.border,
        style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.black,
    borderRadius: BORDER_RADIUS.card,
    padding: SPACING.m,
    overflow: 'hidden',
  },
  border: {
    borderWidth: LAYOUT.borderWidth,
    borderColor: COLORS.border,
  },
});
