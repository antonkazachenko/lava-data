# Lava Data Mobile (React Native)

Touch-first variant of the Lava Data Survey, exploring how interactive bubble visualizations and traditional static charts perform on mobile devices across comprehension, engagement, and trust.

## Feature Goals
- Compare traditional vs. interactive visualizations on small screens with gesture-rich interactions.
- Capture telemetry for taps, drags, scroll depth, orientation change, and latency to link UX quality with comprehension.
- Provide accessibility guardrails: large tap targets, contrast, reduced-motion fallback, and gesture alternatives.
- Stay performant on mid/low-tier devices via adaptive animation throttling and simplified bubble counts.

## Stack
- React Native 0.76 + React 18
- TypeScript
- React Navigation (native stack)
- Gesture Handler, Reanimated, Safe Area Context, Screens
- Jest + Testing Library for React Native
- ESLint + TypeScript strict mode

## Project Structure
```
mobile/
  app.json
  babel.config.js
  metro.config.js
  tsconfig.json
  index.js       # AppRegistry entry
  src/
    App.tsx
    navigation/  # Navigation container + stack
    screens/     # Welcome, Comparison flows
    components/  # Surface, buttons, metric tags
    theme/       # Color/spacing/typography tokens
    hooks/       # Reserved for telemetry + preferences
```

## Prerequisites
- Node.js 18+
- Watchman (macOS)
- Xcode + CocoaPods (for iOS)
- Android Studio + Android SDK (for Android)
- Java 17 (for Android builds)

## Setup
```bash
cd mobile
npm install
```

### iOS
```bash
cd ios && pod install && cd ..
npm run ios
```

### Android
```bash
npm run android
```

### Start Metro Bundler
```bash
npm start
```

### Lint, Types, Tests
```bash
npm run lint
npm run typecheck
npm test
```

## Research Flow (Mobile)
- Welcome screen summarizes objectives and metrics (comprehension, engagement, trust).
- Comparison screen outlines traditional vs. interactive modalities with mobile-specific guardrails.
- Next iteration: integrate survey tasks, telemetry (gesture density, latency), and data export aligned with the web study.

## Next Steps
- Wire real survey tasks and API/export endpoints.
- Add reduced-motion and low-power modes that downshift bubble density automatically.
- Instrument analytics: gesture counts, time-on-task, orientation/network changes (respecting privacy).
- Implement accessibility audits (screen reader labels, focus order, dynamic type).
- Add CI jobs for lint, typecheck, and tests.
