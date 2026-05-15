# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start           # Start Expo dev server
npm run android     # Launch in Android emulator
npm run ios         # Launch in iOS simulator
npm run web         # Launch in browser
npm run lint        # Run ESLint
npm run reset-project  # Reset to blank Expo boilerplate
```

There is no test suite configured yet.

## Architecture

GhanaHub is a React Native/Expo app targeting Ghanaian users with news, weather, community, and profile features. It uses **Expo Router** (file-based routing, similar to Next.js) with **TypeScript** strict mode.

### Navigation

Three-layer navigation defined entirely in `app/`:

```
Root Stack (app/_layout.tsx)
└── Auth screens: index, login, onboarding
└── (drawer)/_layout.tsx  — 4 drawer tabs: News, Weather, Community, Profile
    ├── (news)/       — Stack: list → [id] detail
    ├── (weather)/    — Stack: index only
    ├── (community)/  — Stack: list → [id] detail
    └── (profile)/    — Stack: index → edit
```

`app.json` enables `typedRoutes` (Expo typed routes experiment) and the React compiler.

### API Layer

`api/index.ts` exports four pre-configured Axios instances:

| Instance | Base URL | Auth |
|---|---|---|
| `newsApi` | `https://newsapi.org/v1` | `NEWS_API_KEY` env var |
| `communityApi` | `https://jsonplaceholder.typicode.com` | none (mock) |
| `weatherApi` | `https://api.open-meteo.com/v1` | none (free) |
| `countriesApi` | `https://restcountries.com/v3.1` | none |

Feature-specific files (`api/newsApi.ts`, `api/communityApi.ts`, `api/weatherApi.ts`) export functions that call these instances.

### Data Fetching

All screens use the generic `useFetch<T>(asyncFn, deps)` hook (`hooks/useFetch.ts`), which returns `{ data, isLoading, error, refetch }`. This is the standard pattern — do not use `useEffect` + `useState` directly for API calls.

`useDebounce(value, delay)` (`hooks/useDebounce.ts`) is available for search inputs.

### Key Conventions

- **Path alias**: `@/*` resolves to the project root (defined in `tsconfig.json`).
- **Icons**: Use `Ionicons` from `@expo/vector-icons` — already imported in navigation layouts.
- **Images**: Use `expo-image`'s `<Image>` component, not React Native's.
- **Persistence**: `utils/storage.ts` wraps `@react-native-async-storage/async-storage` — use this, don't call AsyncStorage directly.
- **Environment variables**: API keys live in `.env` and are accessed as `process.env.NEWS_API_KEY` (Expo injects these at build time — prefix with `EXPO_PUBLIC_` only if they need to be exposed to the client bundle explicitly).

### External APIs

- **Weather**: hardcoded to Accra coordinates `(5.6037, -0.1870)` in `api/weatherApi.ts`.
- **Community**: backed by JSONPlaceholder (mock) — replace with a real endpoint before production.
- **Countries**: `countriesApi` instance is configured but not yet wired to any screen.

### Implementation Status

Navigation scaffolding, API layer, custom hooks, and UI component library are in place. Most screen bodies (`app/(drawer)/**/index.tsx`) and utility functions (`utils/storage.ts`, `utils/formatDate.ts`) are stubs awaiting implementation. Constants (`constants/color.ts`, `constants/typography.ts`, `constants/ghanaianCities.ts`) are also stubs.
