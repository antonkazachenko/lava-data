import React, {ReactNode} from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {colors, radius, spacing} from '../theme';

type SurfaceProps = {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
};

export function Surface({children, style}: SurfaceProps) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.05)',
  },
});
