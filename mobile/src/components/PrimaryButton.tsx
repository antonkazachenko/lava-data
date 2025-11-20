import React from 'react';
import {TouchableOpacity, Text, StyleSheet, GestureResponderEvent} from 'react-native';
import {colors, radius, spacing, typography} from '../theme';

type PrimaryButtonProps = {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
  variant?: 'primary' | 'secondary';
};

export function PrimaryButton({label, onPress, variant = 'primary'}: PrimaryButtonProps) {
  const isSecondary = variant === 'secondary';
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, isSecondary && styles.secondary]}
      activeOpacity={0.9}>
      <Text style={[styles.label, isSecondary && styles.secondaryLabel]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.accent,
  },
  label: {
    color: '#0B0F1A',
    fontWeight: '700',
    fontSize: typography.body,
  },
  secondaryLabel: {
    color: colors.accent,
  },
});
