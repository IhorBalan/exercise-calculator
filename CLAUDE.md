# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an Expo React Native application using Expo Router (file-based routing) and TypeScript. The app uses NativeWind (Tailwind CSS for React Native) for styling instead of traditional StyleSheet.

## Build & Development Commands

**Package Manager**: This project uses **Yarn** (specified in package.json).

### Running the app

```bash
yarn start             # Start Expo dev server
yarn ios               # Start on iOS simulator
yarn android           # Start on Android emulator
yarn web               # Start web version
```

### Code Quality

```bash
yarn lint              # Run ESLint
yarn format            # Format all files with Prettier
yarn format:check      # Check formatting without modifying files
```

### Testing

```bash
yarn test              # Run Jest tests
yarn test:watch        # Run tests in watch mode
```

### Native Builds

The project uses `expo prebuild` for native code generation. **Never commit ios/ or android/ folders** - they are generated at build time and excluded in .gitignore.

## Project Architecture

### Routing

- Uses Expo Router (v6) with file-based routing in the `app/` directory
- Routes are automatically generated from the file structure
- TypeScript route typing is enabled via `experiments.typedRoutes` in app.json

### Module Structure

The codebase follows a modular architecture:

```
/app                    # Expo Router pages (file-based routing)
/modules                # Feature modules
  /[moduleName]
    /components         # Module-specific components
    /providers          # Module-specific providers/contexts
    /helpers            # Module-specific helper functions
    /utils              # Module-specific utilities
    index.ts            # Re-exports module's public API
/shared                 # Shared/common code
  /components           # Shared UI components
  /providers            # Shared providers/contexts
  /helpers              # Shared helper functions
  /utils                # Shared utilities
  index.ts              # Re-exports shared public API
/assets                 # Static assets (images, fonts, icons)
```

### Styling with NativeWind

- **Always use NativeWind classes** instead of StyleSheet.create
- Tailwind CSS configuration is in `tailwind.config.js`
- Global styles are imported in `app/_layout.tsx` via `global.css`
- Use `className` prop for styling components

Example:

```tsx
<View className="flex-1 items-center justify-center bg-white">
  <Text className="text-lg font-bold text-blue-600">Hello</Text>
</View>
```

### Path Aliases

- `@/*` maps to the root directory (configured in tsconfig.json)
- Use absolute imports: `import { Button } from '@/shared/components'`

## Testing Setup

- Framework: Jest with jest-expo preset
- Testing Library: @testing-library/react-native
- Test files should be colocated with components or in `__tests__` folders
- Jest matchers from @testing-library/react-native are available via jest.setup.js

## Pre-commit Hooks

Husky is configured to run lint-staged on pre-commit:

- JavaScript/TypeScript files: ESLint auto-fix + Prettier
- JSON/CSS/Markdown files: Prettier formatting

## Key Configuration Files

- `app.json` - Expo configuration (plugins, native settings)
- `babel.config.js` - Babel config with NativeWind plugin
- `tailwind.config.js` - Tailwind CSS configuration
- `eslint.config.js` - ESLint flat config with Prettier integration
- `jest.config.js` - Jest configuration with jest-expo preset
- `tsconfig.json` - TypeScript configuration with path aliases

## Important Notes

- **React version**: 19.1.0 (newer than typical Expo apps)
- **New Architecture enabled**: `newArchEnabled: true` in app.json
- Native builds are handled via `expo prebuild` - never manually edit ios/ or android/
- Always use NativeWind classNames instead of inline styles or StyleSheet
