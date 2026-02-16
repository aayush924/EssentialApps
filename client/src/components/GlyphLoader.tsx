import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';
import { COLORS, SPACING } from '../constants/theme';

interface GlyphLoaderProps {
  loading: boolean;
  count?: number;
}

export const GlyphLoader: React.FC<GlyphLoaderProps> = ({ 
  loading, 
  count = 12 
}) => {
  const animations = useRef<Animated.Value[]>([]).current;

  if (animations.length !== count) {
    animations.length = 0;
    for (let i = 0; i < count; i++) {
      animations.push(new Animated.Value(0));
    }
  }

  useEffect(() => {
    if (loading) {
      const sequence = animations.map((anim, index) => {
        return Animated.sequence([
          Animated.delay(index * 100),
          Animated.timing(anim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            easing: Easing.ease,
          }),
        ]);
      });

      Animated.loop(
        Animated.stagger(100, sequence)
      ).start();
    } else {
      animations.forEach(anim => anim.setValue(0));
    }
  }, [loading, count]);

  if (!loading) return null;

  return (
    <View style={styles.container}>
      {animations.map((anim, index) => (
        <Animated.View
          key={index}
          style={[
            styles.dot,
            {
              opacity: anim.interpolate({
                inputRange: [0, 1],
                outputRange: [0.2, 1],
              }),
              transform: [{
                scale: anim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.5],
                }),
              }],
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    gap: 8,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.white,
  },
});
