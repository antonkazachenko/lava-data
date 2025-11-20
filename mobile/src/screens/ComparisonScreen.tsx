import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {colors, radius, spacing, typography} from '../theme';
import {Surface} from '../components/Surface';
import {MetricTag} from '../components/MetricTag';
import {PrimaryButton} from '../components/PrimaryButton';

export function ComparisonScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Traditional vs. Interactive</Text>
        <Text style={styles.subtitle}>Optimized for mobile clarity, trust, and minimal cognitive load.</Text>

        <Surface style={styles.cardRow}>
          <View style={styles.cardColumn}>
            <Text style={styles.sectionTitle}>Traditional (Mobile-Static)</Text>
            <Text style={styles.copy}>
              Single-column bar and pie summaries, word-frequency lists, and crisp labels for narrow viewports.
              Emphasizes quick scanning and familiar reading patterns.
            </Text>
            <MetricTag label="Layout" value="Single column" />
            <MetricTag label="Interaction" value="Scroll + tap" />
            <MetricTag label="Performance" value="Lightweight" tone="success" />
          </View>

          <View style={[styles.cardColumn, styles.divider]}>
            <Text style={styles.sectionTitle}>Modern (Mobile-Interactive)</Text>
            <Text style={styles.copy}>
              Bubble visuals with tap, drag, and pinch gestures. Progressive disclosure reveals details
              without overwhelming small screens; animations throttle on low-power devices.
            </Text>
            <MetricTag label="Interaction" value="Tap • Drag • Pinch" />
            <MetricTag label="Feedback" value="Progressive + haptics" tone="warning" />
            <MetricTag label="Trust" value="Confidence surveys" />
          </View>
        </Surface>

        <Surface style={styles.card}>
          <Text style={styles.sectionTitle}>Mobile Study Flow</Text>
          <Text style={styles.copy}>
            Participants alternate between static and interactive views, completing timed interpretation tasks, then rating
            confidence, clarity, and effort. Instrumentation captures gesture density, scroll depth, orientation changes, and
            latency to connect experience quality with comprehension.
          </Text>
          <PrimaryButton label="Collect responses" onPress={() => {}} />
          <PrimaryButton label="Export telemetry" variant="secondary" onPress={() => {}} />
        </Surface>

        <Surface style={styles.card}>
          <Text style={styles.sectionTitle}>Mobile Guardrails</Text>
          <Text style={styles.copy}>Built to remain trustworthy and performant on varied devices:</Text>
          <View style={styles.bulletList}>
            <Text style={styles.bullet}>• Reduced-motion mode and simplified bubble counts for low-end hardware.</Text>
            <Text style={styles.bullet}>• Large tap targets, high contrast, and gesture alternatives for accessibility.</Text>
            <Text style={styles.bullet}>• Adaptive animation throttling and GPU-friendly gradients.</Text>
            <Text style={styles.bullet}>• Offline-tolerant flows for surveys with intermittent connectivity.</Text>
          </View>
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
  title: {
    color: colors.textPrimary,
    fontSize: typography.heading,
    fontWeight: '800',
    marginTop: spacing.lg,
  },
  subtitle: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
  cardRow: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  cardColumn: {
    flex: 1,
    gap: spacing.sm,
  },
  divider: {
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255,255,255,0.06)',
    paddingLeft: spacing.lg,
  },
  sectionTitle: {
    color: colors.textPrimary,
    fontSize: typography.subheading,
    fontWeight: '700',
  },
  copy: {
    color: colors.textSecondary,
    lineHeight: 22,
    fontSize: typography.body,
  },
  card: {
    gap: spacing.md,
  },
  bulletList: {
    gap: spacing.xs,
  },
  bullet: {
    color: colors.textSecondary,
    fontSize: typography.body,
    lineHeight: 22,
  },
});
