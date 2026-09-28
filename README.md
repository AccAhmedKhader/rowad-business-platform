# ROWAD BUSINESS

Unified educational platform for:

- **المحاسبة ببساطة وإتقان** (`accounting`)
- **إدارة الأعمال ببساطة وإتقان** (`business-administration`)

## AI Studio / GitHub Import
This repository is prepared as a clean source import for GitHub and Google AI Studio.

Read first:
- `ARCHITECTURE.md`
- `AI_STUDIO_BUILD_INSTRUCTIONS.md`
- `GITHUB_SETUP.md`
- `IMPORT_MANIFEST.json`

## Current development baseline
M16 Academic Quality → M17 Adaptive Learning → M18 Platform Command Center, with prior M14/M15 foundations preserved.

## Install and validate
```bash
npm ci
npm run lint
npm test
npm run build
```

## Development
```bash
npm run dev
```

## Environment
Copy `.env.example` to `.env` locally. Never commit secrets.

## Important
This is an existing platform. Changes must preserve academic IDs, answer keys, source provenance, domain boundaries, authorization, and existing routes unless an explicit migration says otherwise.
