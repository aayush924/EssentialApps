import React, { useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SPACING } from '../constants/theme';
import { NothingText } from '../components/NothingText';
import { NothingInput } from '../components/NothingInput';
import { NothingButton } from '../components/NothingButton';
import { GlyphLoader } from '../components/GlyphLoader';

export const CreationLabScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    Keyboard.dismiss();
    
    // Simulate AI thinking
    setTimeout(() => {
      setLoading(false);
      setPrompt('');
      // In a real app, this would navigate or show result
    }, 3000);
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.header}>
              <NothingText variant="header">CREATION LAB</NothingText>
              <NothingText variant="label" style={styles.subtitle}>
                INPUT PARAMETERS FOR GENERATION
              </NothingText>
            </View>

            <View style={styles.inputContainer}>
              <NothingInput
                style={styles.input}
                multiline={true}
                placeholder="DESCRIBE YOUR APP IDEA..."
                value={prompt}
                onChangeText={setPrompt}
              />
            </View>

            <View style={styles.footer}>
              {loading ? (
                <GlyphLoader loading={loading} />
              ) : (
                <NothingButton 
                  title="GENERATE" 
                  variant="accent" 
                  onPress={handleGenerate}
                  disabled={loading}
                />
              )}
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: SPACING.l,
    justifyContent: 'space-between',
  },
  header: {
    marginBottom: SPACING.xl,
  },
  subtitle: {
    marginTop: SPACING.xs,
    opacity: 0.7,
  },
  inputContainer: {
    flex: 1,
    marginBottom: SPACING.xl,
  },
  input: {
    flex: 1,
    fontSize: 24,
    lineHeight: 32,
    backgroundColor: 'transparent',
    borderWidth: 0,
    padding: 0,
  },
  footer: {
    minHeight: 60,
    justifyContent: 'center',
  },
});
