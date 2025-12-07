# Lava Data Survey (Mobile): Interactive vs. Static Visualizations on Small Screens

> _Testing how touch-first, on-the-go experiences shape comprehension, engagement, and trust in modern interactive visualizations compared to traditional static views._

## Mobile Research Question
How do modern, interactive data visualizations compare to traditional static visualizations in terms of user comprehension, engagement, and trust across diverse populations and data literacy levels on mobile devices?

## Why Mobile
- **Ubiquity**: Many participants encounter data on phones, not desktops.
- **Constraints**: Limited screen real estate, touch input, variable connectivity, and battery pressure change how visualizations perform.
- **Context**: Mobile contexts (in-transit, multitasking) stress-test clarity and cognitive load differently from desktop use.

## Study Focus
- **Populations**: Diverse demographics and data literacy levels; includes varied device classes (small/large phones, tablets).
- **Modalities Under Test**:
  - Traditional static: word-frequency lists, bar charts, pie charts optimized for narrow viewports.
  - Modern interactive: bubble visualizations with touch-friendly gestures (tap, long-press, drag) and adaptive animations.
- **Outcomes**: Comprehension (accuracy, recall), engagement (time on task, interaction depth), trust (self-reported confidence), and perceived effort.

## Mobile Comparative Lens
| Dimension | Traditional (Mobile-Static) | Modern (Mobile-Interactive) |
|-----------|-----------------------------|-----------------------------|
| Layout | Single-column charts/lists; minimal overlays | Fluid bubble clusters with responsive reflow |
| Interaction | Scroll + tap for tooltips | Tap, drag, pinch to focus; micro-animations for state changes |
| Feedback | Static values/labels | Progressive disclosure, haptics (where available) |
| Performance | Lightweight rendering | Adaptive animation throttling; GPU-accelerated effects |
| Accessibility | High-contrast, large tap targets | Same, plus gesture alternatives and motion-reduction modes |

## Mobile-Specific Method
- **Experience Design**: React + TypeScript UI tuned for mobile breakpoints; CSS media queries and touch-hit-area standards.
- **Instrumentation**: Touch event telemetry (taps, drags), viewport resize, orientation changes, and network quality observations.
- **Experimental Flow**: Participants alternate between static and interactive views on mobile, completing timed comprehension tasks with post-task trust and effort ratings.
- **Performance Guardrails**: Measure first meaningful paint, input latency, and animation smoothness on mid/low-tier devices; fall back to reduced-motion and simplified bubble counts when needed.

## Data Collection & Analysis
- Quantitative: task accuracy, time on task, interaction counts, scroll depth, error rates, and trust/confidence ratings.
- Qualitative: short post-task prompts on clarity, delight, and perceived credibility.
- Comparative Analysis: segment results by device class, OS, browser, and self-reported data literacy to detect where interactivity helps or hinders on mobile.

## Anticipated Contributions (Mobile)
- Evidence on when interactive bubbles improve mobile understanding versus when static charts remain clearer.
- Guidelines for touch-first visual encoding (hit target sizing, labeling strategies, motion thresholds).
- Recommendations for adaptive behavior (reduced-motion defaults, data thinning) that maintain trust and comprehension on constrained screens.

## Next Steps
- Pilot on a range of devices (small Android, large iPhone, tablet) to tune hit targets, font scales, and motion settings.
- Validate accessibility: screen reader flow, focus order, color contrast, and motion-reduction adherence.
- Refine instrumentation to balance fidelity (interaction metrics) with performance and privacy.

For the desktop/web overview, see `docs/DESCRIPTION.md`. This mobile addendum sharpens the protocol for touch-first contexts to ensure findings generalize across the devices people use most.
