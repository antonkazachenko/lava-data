# Lava Data Visualization Research 🌋📊

# A modern interactive visualization research platform comparing traditional and dynamic data approaches

📡 Designed to empirically evaluate user comprehension, engagement, and preference across static charts versus interactive bubble visualizations through scalable web-based surveys.

# Understanding Data Visualization Effectiveness at Scale 🌐

## Project Description 🗺️

Lava Data Survey is an interactive research platform that investigates how users perceive and interact with different data visualization paradigms. The system pairs traditional static visualization methods (word frequencies, bar charts, pie charts) with modern, web-based interactive approaches featuring dynamic bubble visualizations and animated content. Our platform ingests participant responses through an accessible web interface, captures qualitative and quantitative feedback on visualization effectiveness, and produces reproducible analyses of comprehension, engagement, and user preference patterns across demographic segments.

## Demo

- https://lava-data-lamp.netlify.app/
- https://github.com/antonkazachenko/lava-data

## Quickstart 🧭

Spin up the development environment from the repository root:

```bash
npm install                                      # Install project dependencies
npm start                                        # Launch development server via Create React App
npm run build                                    # Build production assets into ./build
npm run deploy                                   # Deploy to Netlify (configure script or use Netlify CLI)
```

Once the development server boots, you should see terminal output similar to:

```text
Compiled successfully!

You can now view lava-data in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://172.29.162.157:3000

Note that the development build is not optimized.
To create a production build, use npm run build.

webpack compiled successfully
No issues found.
```

### Survey Data Collection & Export

Generate survey response summaries and export aggregated user feedback for analysis:

```bash
npm run export-survey-data \
  --format json \
  --group-by demographics \
  --outdir reports/survey_responses
```

- Outputs JSON/CSV artifacts describing participant counts, visualization preference distributions, comprehension scores, and demographic breakdowns.
- Verifies that the response collection pipeline (form validation, data persistence, response anonymization) runs without errors.

_Tip:_ Add the `export-survey-data` script to `package.json` or trigger the underlying Node script directly if you prefer more granular control over export parameters.

### Expected Output

Running the survey platform displays interactive visualizations and captures participant feedback. Analysis scripts generate:

- Console shows aggregate preference percentages, mean comprehension scores, and engagement metrics per visualization type.
- `reports/figures/preference_distribution.png` visualizes user preference across traditional vs. modern approaches.
- `reports/figures/comprehension_comparison.png` provides side-by-side comprehension scores by visualization method.
- `reports/figures/engagement_heatmap.png` plots interaction frequency and time-on-task metrics.
- `reports/figures/demographic_analysis.png` segments preference and comprehension patterns by user characteristics.
- `reports/survey_responses.json` captures raw and aggregated response data including metadata (timestamp, device, visualization type) plus summary statistics.

### Prerequisites 📋

- Node.js 18+
- npm 9+ (or yarn/pnpm)
- Git for version control
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Access to the hosted survey platform or local development environment

### Frameworks

- React (component architecture)
- TypeScript (strong typing across UI and research logic)
- Create React App (bundling and dev server)
- React Router (multi-stage survey flow routing)
- Matter.js + Granim (bubble physics and immersive gradients)

### Packages

- Radix UI (accessible primitives for survey controls)
- React Router DOM (page-to-page navigation)
- Axios (HTTP client for survey submission APIs)
- ESLint + Prettier (quality and formatting guardrails)
- Husky + Commitlint (commit hygiene and conventions)

## Skills Demonstrated 🖌️

Lava Data Survey emphasizes empirical visualization research methodology and interactive web design for user studies, showcasing how modern front-end technologies can facilitate rigorous data visualization evaluation at scale.

- **Survey Design**: Intuitive, accessible participant flow for comparing visualization paradigms; balanced counterbalancing to minimize order bias; clear consent and data privacy workflows.
- **Interactive Visualizations**: Custom React components rendering traditional charts (bar, pie, line) and dynamic bubble visualizations; smooth animations and responsive interactions for real-time data exploration.
- **Data Collection Pipeline**: Secure, anonymous response capture with validation; demographic stratification for sub-group analysis; temporal tracking for engagement metrics.
- **Evaluation Rigor**: Preference distribution analysis, comprehension score aggregation, statistical comparisons across visualization types, demographic-stratified insights, and effect size quantification.
- **User Experience**: Mobile-responsive design, accessibility compliance (WCAG), intuitive navigation, and clear visual feedback throughout the survey experience.
- **Automation**: Continuous integration (ESLint, Prettier, test suites) and automated data export pipelines for reproducible analysis workflows.

## Contributing ⚙️

We welcome thoughtful pull requests, study design refinements, new visualization prototypes, and statistical analysis improvements. Fork the repository, branch from `main`, and submit focused, well-tested changes. Please review `docs/CONTRIBUTING.md` and include updated survey instruments or analysis figures when modifying evaluation logic so the team can validate research validity shifts quickly.

## License 🪪

This project is distributed under the [MIT License](LICENSE) © 2025 Lava Data Survey team. Feel free to use, modify, and share the code with attribution.

---

Crafted with care by Anton Kazachenko and Ariel Tyson.
