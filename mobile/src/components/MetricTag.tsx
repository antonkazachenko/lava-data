import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors, radius, spacing, typography} from '../theme';

type MetricTagProps = {
  label: string;
  value: string;
  tone?: 'default' | 'success' | 'warning';
};

export function MetricTag({label, value, tone = 'default'}: MetricTagProps) {
  const toneStyle = {
    default: styles.chip,
    success: styles.chipSuccess,
    warning: styles.chipWarning,
  }[tone];

  return (
    <View style={[styles.chip, toneStyle]}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    backgroundColor: 'rgba(255,255,255,0.06)',
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  chipSuccess: {
    borderWidth: 1,
    borderColor: colors.success,
  },
  chipWarning: {
    borderWidth: 1,
    borderColor: colors.warning,
  },
  label: {
    color: colors.textSecondary,
    fontSize: typography.caption,
    letterSpacing: 0.4,
  },
  value: {
    color: colors.textPrimary,
    fontWeight: '700',
    fontSize: typography.body,
  },
});
