import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../navigation';
import {colors, spacing, typography} from '../theme';
import {PrimaryButton} from '../components/PrimaryButton';
import {Surface} from '../components/Surface';
import {MetricTag} from '../components/MetricTag';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({navigation}: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <Text style={styles.overline}>Lava Data Survey • Mobile</Text>
        <Text style={styles.title}>Interactive vs. Static Visuals on Small Screens</Text>
        <Text style={styles.subtitle}>
          Testing how touch-first, on-the-go experiences shape comprehension, engagement, and trust in modern interactive
          visualizations compared to traditional static views.
        </Text>

        <Surface style={styles.card}>
          <Text style={styles.sectionTitle}>What we are measuring</Text>
          <View style={styles.tags}>
            <MetricTag label="Comprehension" value="Accuracy + Recall" />
            <MetricTag label="Engagement" value="Time on task" tone="success" />
            <MetricTag label="Trust" value="Self-reported" tone="warning" />
          </View>
          <Text style={styles.copy}>
            Participants rotate through traditional charts and interactive bubble canvases, completing timed reading tasks and
            reporting confidence and effort. Instrumentation captures taps, drags, scroll depth, and latency for mobile-specific insight.
          </Text>
          <PrimaryButton label="Begin mobile study" onPress={() => navigation.navigate('Comparison')} />
        </Surface>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {flex: 1, backgroundColor: colors.background},
  container: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.lg,
  },
  overline: {
    color: colors.accentAlt,
    letterSpacing: 1.2,
    fontSize: typography.caption,
    marginTop: spacing.lg,
  },
  title: {
    color: colors.textPrimary,
    fontSize: typography.heading,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
    marginTop: spacing.sm,
  },
  card: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.subheading,
    fontWeight: '700',
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  copy: {
    color: colors.textSecondary,
    lineHeight: 22,
    fontSize: typography.body,
  },
});
