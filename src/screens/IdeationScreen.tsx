import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Lightbulb, Plus, Send, Save, Trash2 } from 'lucide-react-native';
import { COLORS, SPACING, BORDER_RADIUS } from '../constants/theme';
import { NothingText } from '../components/NothingText';
import { NothingInput } from '../components/NothingInput';
import { NothingButton } from '../components/NothingButton';
import { NothingCard } from '../components/NothingCard';
import { GlyphLoader } from '../components/GlyphLoader';

interface IdeaEntry {
  id: string;
  content: string;
  timestamp: string;
}

const MOCK_IDEAS: IdeaEntry[] = [
  { id: '1', content: 'A social network for cats', timestamp: '10:42 AM' },
  { id: '2', content: 'Uber for dog walking', timestamp: 'YESTERDAY' },
  { id: '3', content: 'AI powered recipe generator', timestamp: '2 DAYS AGO' },
];

export const IdeationScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<IdeaEntry[]>(MOCK_IDEAS);
  const [generatedIdea, setGeneratedIdea] = useState<string | null>(null);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    Keyboard.dismiss();
    
    // Simulate AI thinking
    setTimeout(() => {
      setLoading(false);
      setGeneratedIdea(`Generated concept based on: ${prompt}\n\nThis is a simulated AI response expanding on your idea with key features and potential challenges.`);
      // In a real app, this would call an LLM
    }, 2000);
  };

  const handleSave = () => {
    if (generatedIdea) {
      const newIdea: IdeaEntry = {
        id: Date.now().toString(),
        content: generatedIdea,
        timestamp: 'JUST NOW',
      };
      setIdeas([newIdea, ...ideas]);
      setGeneratedIdea(null);
      setPrompt('');
    }
  };

  const handleDelete = (id: string) => {
    setIdeas(ideas.filter(idea => idea.id !== id));
  };

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        <NothingText variant="header">IDEATION</NothingText>
        <NothingText variant="label" style={styles.subtitle}>
          BRAINSTORM & STORE CONCEPTS
        </NothingText>
      </View>

      <View style={styles.inputSection}>
        <NothingInput
          style={styles.input}
          multiline={true}
          placeholder="DESCRIBE YOUR IDEA..."
          value={prompt}
          onChangeText={setPrompt}
        />
        
        <View style={styles.actionRow}>
          {loading ? (
            <GlyphLoader loading={loading} />
          ) : (
            <NothingButton 
              title="GENERATE" 
              variant="accent" 
              onPress={handleGenerate}
              disabled={loading || !prompt.trim()}
              style={styles.generateButton}
            />
          )}
        </View>
      </View>

      {generatedIdea && (
        <View style={styles.generatedContainer}>
          <NothingText variant="label" style={styles.generatedLabel}>AI SUGGESTION:</NothingText>
          <NothingCard style={styles.generatedCard}>
            <NothingText style={styles.generatedText}>{generatedIdea}</NothingText>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Save size={20} color={COLORS.black} />
              <NothingText style={styles.saveButtonText}>SAVE IDEA</NothingText>
            </TouchableOpacity>
          </NothingCard>
        </View>
      )}

      <View style={styles.divider} />
      <NothingText variant="header" style={styles.listTitle}>SAVED IDEAS</NothingText>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <FlatList
          data={ideas}
          renderItem={({ item }) => (
            <NothingCard style={styles.ideaCard}>
              <View style={styles.ideaHeader}>
                <Lightbulb size={20} color={COLORS.white} />
                <NothingText variant="label" style={styles.timestamp}>{item.timestamp}</NothingText>
              </View>
              <NothingText style={styles.ideaContent}>{item.content}</NothingText>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDelete(item.id)}
              >
                <Trash2 size={16} color={COLORS.gray} />
              </TouchableOpacity>
            </NothingCard>
          )}
          keyExtractor={item => item.id}
          ListHeaderComponent={renderHeader}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
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
  listContent: {
    padding: SPACING.l,
    paddingBottom: 100, // Space for bottom tab bar
  },
  headerContainer: {
    marginBottom: SPACING.l,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  subtitle: {
    marginTop: SPACING.xs,
    opacity: 0.7,
  },
  inputSection: {
    marginBottom: SPACING.l,
  },
  input: {
    minHeight: 100,
    marginBottom: SPACING.m,
    fontSize: 18,
    lineHeight: 24,
    textAlignVertical: 'top',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  generateButton: {
    minWidth: 120,
  },
  generatedContainer: {
    marginBottom: SPACING.xl,
  },
  generatedLabel: {
    marginBottom: SPACING.s,
    color: COLORS.accent,
  },
  generatedCard: {
    borderColor: COLORS.accent,
    borderWidth: 1,
  },
  generatedText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: SPACING.m,
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    padding: SPACING.s,
    borderRadius: BORDER_RADIUS.s,
    gap: SPACING.s,
  },
  saveButtonText: {
    color: COLORS.black,
    fontWeight: 'bold',
    fontFamily: 'Ndot57-Regular',
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginBottom: SPACING.l,
  },
  listTitle: {
    fontSize: 20,
    marginBottom: SPACING.m,
  },
  ideaCard: {
    marginBottom: SPACING.m,
  },
  ideaHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SPACING.s,
  },
  timestamp: {
    fontSize: 10,
    opacity: 0.5,
  },
  ideaContent: {
    fontSize: 16,
    lineHeight: 22,
  },
  deleteButton: {
    alignSelf: 'flex-end',
    marginTop: SPACING.s,
    padding: 4,
  },
});
