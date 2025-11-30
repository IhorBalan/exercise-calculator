# Styling Guide

This document describes the theming and styling system used in this Expo React Native application.

## Table of Contents

- [Overview](#overview)
- [Theme Configuration](#theme-configuration)
- [Adding New Colors](#adding-new-colors)
- [Using Custom Colors](#using-custom-colors)
- [Theme Wrapper](#theme-wrapper)
- [Theme Selection](#theme-selection)
- [Styling Third-Party Components](#styling-third-party-components)
- [Type Definitions for Third-Party Components](#type-definitions-for-third-party-components)

---

## Overview

This project uses **NativeWind v4** (Tailwind CSS for React Native) for styling. The theming system supports:

- Light and Dark modes
- CSS variables for dynamic theming
- Type-safe color system
- System theme detection
- Persistent theme preferences

---

## Theme Configuration

### 1. Theme Definition (`modules/core/theme/default.ts`)

This file contains the color definitions for light and dark themes using CSS custom properties (variables).

> **Note**: While this example shows the `default` theme, you can create multiple theme files in the `modules/core/theme/` directory (e.g., `ocean.ts`, `forest.ts`, etc.). Each theme should export both light and dark variants. See the [Adding Multiple Themes](#adding-multiple-themes) section for details.

```typescript
export const defaultThemeLight = {
  '--color-primary': '59 130 246', // Blue
  '--color-secondary': '255 255 0', // Yellow
  '--color-text-body': '71 85 105', // Slate gray
  '--color-text-accent': '15 23 42', // Dark slate
  '--color-background': '255 255 255', // White
  '--color-page-background': '239 246 255', // Light blue
  '--color-modal-background': '255 255 255', // White
  '--color-divider': '243 244 246', // Light gray
};

export const defaultThemeDark = {
  '--color-primary': '59 130 246',
  '--color-secondary': '255 255 0',
  '--color-text-body': '236 237 238',
  '--color-text-accent': '248 250 252',
  '--color-background': '0 15 43',
  '--color-page-background': '15 23 42',
  '--color-modal-background': '209 213 219',
  '--color-divider': '31 41 55',
};
```

**Important**: Colors are defined as RGB values **without** the `rgb()` wrapper. This format allows for alpha channel manipulation:

```tsx
// Example: Using with opacity
<View className="bg-primary/50" /> // 50% opacity
```

### 2. Tailwind Configuration (`tailwind.config.js`)

The Tailwind config connects CSS variables to Tailwind color classes:

```javascript
module.exports = {
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Single colors
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        secondary: 'rgb(var(--color-secondary) / <alpha-value>)',

        // Nested color groups
        background: {
          DEFAULT: 'rgb(var(--color-background) / <alpha-value>)',
          page: 'rgb(var(--color-page-background) / <alpha-value>)',
          modal: 'rgb(var(--color-modal-background) / <alpha-value>)',
        },

        // Text colors
        body: 'rgb(var(--color-text-body) / <alpha-value>)',
        accent: 'rgb(var(--color-text-accent) / <alpha-value>)',

        divider: 'rgb(var(--color-divider) / <alpha-value>)',
      },
    },
  },
  plugins: [
    // Set default theme on :root
    ({ addBase }) =>
      addBase({
        ':root': defaultThemeLight,
      }),
  ],
};
```

---

## Adding New Colors

To add a new color to your theme:

### Step 1: Define CSS Variable

Add the color to both theme definitions in `modules/core/theme/default.ts`:

```typescript
export const defaultThemeLight = {
  // ... existing colors
  '--color-success': '34 197 94', // Green
  '--color-error': '239 68 68', // Red
  '--color-warning': '251 146 60', // Orange
};

export const defaultThemeDark = {
  // ... existing colors
  '--color-success': '34 197 94',
  '--color-error': '239 68 68',
  '--color-warning': '251 146 60',
};
```

### Step 2: Add to Tailwind Config

Register the color in `tailwind.config.js`:

```javascript
colors: {
  // ... existing colors
  success: 'rgb(var(--color-success) / <alpha-value>)',
  error: 'rgb(var(--color-error) / <alpha-value>)',
  warning: 'rgb(var(--color-warning) / <alpha-value>)',
}
```

### Step 3: Use in Components

```tsx
<View className="bg-success p-4">
  <Text className="text-white">Success message</Text>
</View>

<Text className="text-error">Error message</Text>
<View className="border-warning border-2" />
```

---

## Using Custom Colors

Once defined, custom colors can be used with all Tailwind utilities:

```tsx
// Backgrounds
<View className="bg-primary" />
<View className="bg-background-page" />

// Text
<Text className="text-body" />
<Text className="text-accent" />

// Borders
<View className="border-primary border-2" />
<View className="border-divider border-b" />

// With opacity
<View className="bg-primary/20" />
<Text className="text-error/80" />

// Dark mode variants
<View className="bg-white dark:bg-background" />
<Text className="text-slate-900 dark:text-accent" />
```

---

## Theme Wrapper

The `ThemeWrapper` component applies the theme to your app:

### Location

`modules/core/containers/theme-wrapper.tsx`

### Usage

```tsx
import { ThemeWrapper } from '@/modules/core/containers/theme-wrapper';

export default function RootLayout() {
  return (
    <ThemeWrapper name="default">
      <YourApp />
    </ThemeWrapper>
  );
}
```

### How It Works

```typescript
import { vars } from 'nativewind';

const themes = {
  default: {
    light: vars(defaultThemeLight),
    dark: vars(defaultThemeDark),
  },
};

export function ThemeWrapper({ name = 'default', children }) {
  const { colorScheme } = useColorScheme();
  return (
    <View style={themes[name][colorScheme ?? 'light']} className="flex-1">
      {children}
    </View>
  );
}
```

The `vars()` function from NativeWind converts the CSS variables object into inline styles that React Native can understand.

### Adding Multiple Themes {#adding-multiple-themes}

```typescript
// modules/core/theme/ocean.ts
export const oceanThemeLight = {
  '--color-primary': '14 165 233', // Sky blue
  '--color-secondary': '6 182 212', // Cyan
  // ... other colors
};

export const oceanThemeDark = {
  '--color-primary': '14 165 233',
  '--color-secondary': '6 182 212',
  // ... other colors
};

// modules/core/containers/theme-wrapper.tsx
import { oceanThemeLight, oceanThemeDark } from '@/modules/core/theme/ocean';

const themes = {
  default: {
    light: vars(defaultThemeLight),
    dark: vars(defaultThemeDark),
  },
  ocean: {
    light: vars(oceanThemeLight),
    dark: vars(oceanThemeDark),
  },
};

// Usage - Apply to entire app
<ThemeWrapper name="ocean">
  <YourApp />
</ThemeWrapper>
```

### Using Different Themes in Specific Areas

You can nest `ThemeWrapper` components to apply different themes to specific sections of your app while keeping the default theme for the rest.

#### Example: Different Theme for Settings Page

```tsx
// app/_layout.tsx
export default function RootLayout() {
  return (
    <ThemeWrapper name="default">
      <Stack>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="settings" />
      </Stack>
    </ThemeWrapper>
  );
}

// app/settings.tsx
export default function SettingsScreen() {
  return (
    <ThemeWrapper name="ocean">
      <View className="flex-1 bg-background">
        <Text className="text-primary">This screen uses the ocean theme!</Text>
        <Text className="text-body">Primary color is cyan instead of blue</Text>
      </View>
    </ThemeWrapper>
  );
}
```

#### Example: Themed Modal

```tsx
function MyComponent() {
  return (
    <View className="flex-1 bg-background">
      {/* Main content uses default theme */}
      <Text className="text-primary">Default theme content</Text>

      {/* Modal with different theme */}
      <Modal visible={isVisible}>
        <ThemeWrapper name="ocean">
          <View className="flex-1 bg-background">
            <Text className="text-primary">Ocean themed modal</Text>
          </View>
        </ThemeWrapper>
      </Modal>
    </View>
  );
}
```

#### Example: Themed Component Section

```tsx
export default function DashboardScreen() {
  return (
    <ScrollView className="flex-1 bg-background">
      {/* Default theme section */}
      <View className="p-4">
        <Text className="text-primary text-xl">Dashboard</Text>
      </View>

      {/* Ocean themed premium section */}
      <ThemeWrapper name="ocean">
        <View className="p-4 bg-background rounded-lg">
          <Text className="text-primary text-lg">Premium Features</Text>
          <Text className="text-body">This section has a different visual theme</Text>
        </View>
      </ThemeWrapper>

      {/* Back to default theme */}
      <View className="p-4">
        <Text className="text-body">Regular content continues here</Text>
      </View>
    </ScrollView>
  );
}
```

#### Key Points

- **Nesting**: ThemeWrapper can be nested at any level of your component tree
- **Scoped**: Theme changes only affect children of that ThemeWrapper
- **Performance**: Minimal overhead - themes are just CSS variable changes
- **Responsive**: Nested themes still respect light/dark mode preferences
- **Use Cases**:
  - Premium/special sections with distinct branding
  - Different themes for different user roles
  - Seasonal or promotional themed areas
  - A/B testing different color schemes

#### Best Practices

```tsx
// ✅ Good: Clear theme boundaries
<View className="flex-1">
  <Header /> {/* Uses parent theme */}
  <ThemeWrapper name="ocean">
    <PremiumSection /> {/* Uses ocean theme */}
  </ThemeWrapper>
  <Footer /> {/* Uses parent theme */}
</View>

// ⚠️ Caution: Avoid excessive nesting
<ThemeWrapper name="ocean">
  <ThemeWrapper name="forest">
    <ThemeWrapper name="sunset">
      {/* Too many nested themes can be confusing */}
    </ThemeWrapper>
  </ThemeWrapper>
</ThemeWrapper>

// ✅ Good: Use for distinct sections
const PremiumCard = () => (
  <ThemeWrapper name="premium">
    <View className="bg-background p-6 rounded-xl">
      <Text className="text-primary">Premium Content</Text>
    </View>
  </ThemeWrapper>
);
```

---

## Theme Selection

The app includes a theme selector that allows users to choose between Light, Dark, and System modes.

### Provider

`modules/core/providers/theme-selector-provider.tsx`

This provider manages:

- Current theme mode (light, dark, system)
- Persistent storage of user preference
- System theme detection via `Appearance` API
- Automatic updates when system theme changes

### Usage

```tsx
import { useThemeSelector } from '@/modules/core/providers/theme-selector-provider';

function MyComponent() {
  const { themeMode, colorScheme, setThemeMode } = useThemeSelector();

  return (
    <View>
      <Text>Current mode: {themeMode}</Text>
      <Text>Active scheme: {colorScheme}</Text>

      <Button onPress={() => setThemeMode('light')}>Light</Button>
      <Button onPress={() => setThemeMode('dark')}>Dark</Button>
      <Button onPress={() => setThemeMode('system')}>System</Button>
    </View>
  );
}
```

### Theme Selection Modal

Location: `modules/user/components/theme-change-modal.tsx`

A pre-built modal component for theme selection:

```tsx
import { ThemeChangeModal } from '@/modules/user/components/theme-change-modal';

function Settings() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Button onPress={() => setShowModal(true)}>Change Theme</Button>

      <ThemeChangeModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </>
  );
}
```

---

## Styling Third-Party Components

Many third-party React Native components don't support the `className` prop. NativeWind provides `cssInterop` to add className support.

### Using cssInterop

**Step 1**: Import cssInterop and the component

```tsx
import { cssInterop } from 'nativewind';
import { LinearGradient } from 'expo-linear-gradient';
```

**Step 2**: Apply cssInterop

```tsx
// Map className to style prop
cssInterop(LinearGradient, {
  className: 'style',
});
```

**Step 3**: Use with className

```tsx
<LinearGradient
  className="flex-1 items-center justify-center"
  colors={['#4c669f', '#3b5998', '#192f6a']}
>
  <Text>Gradient Background</Text>
</LinearGradient>
```

### Advanced cssInterop Mapping

```tsx
import { Ionicons } from '@expo/vector-icons';

// Map multiple props
cssInterop(Ionicons, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true, // Maps color style to color prop
      fontSize: 'size', // Maps fontSize to size prop
    },
  },
});

// Now you can use:
<Ionicons
  name="home"
  className="text-primary text-2xl" // color and size work!
/>;
```

### Common Patterns

#### Icon Components

```tsx
import { MaterialIcons } from '@expo/vector-icons';

cssInterop(MaterialIcons, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
      fontSize: 'size',
    },
  },
});
```

#### Animation Libraries

```tsx
import Animated from 'react-native-reanimated';

cssInterop(Animated.View, {
  className: 'style',
});
cssInterop(Animated.Text, {
  className: 'style',
});
```

#### Bottom Sheet

```tsx
import { BottomSheetModal } from '@gorhom/bottom-sheet';

cssInterop(BottomSheetModal, {
  backgroundClassName: 'backgroundStyle',
  indicatorClassName: 'handleIndicatorStyle',
});
```

---

## Type Definitions for Third-Party Components

When you add custom props (like `className`) to third-party components, TypeScript won't recognize them. You need to extend the type definitions.

### Creating Type Declaration Files

**Step 1**: Create a `.d.ts` file in the root directory

Example: `bottom-sheet-env.d.ts`

```typescript
/// <reference types="@gorhom/bottom-sheet" />

declare module '@gorhom/bottom-sheet' {
  // Re-export all existing types
  export * from '@gorhom/bottom-sheet/lib/typescript/types';

  // Extend the interface with new props
  export interface BottomSheetModalProps {
    /**
     * Custom className for the bottom sheet background.
     * This can be used with NativeWind for styling.
     */
    backgroundClassName?: string;

    /**
     * Custom className for the bottom sheet handle indicator.
     * This can be used with NativeWind for styling.
     */
    indicatorClassName?: string;
  }
}
```

**Step 2**: Add to `tsconfig.json`

```json
{
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "nativewind-env.d.ts",
    "svg-env.d.ts",
    "bottom-sheet-env.d.ts" // Add your declaration file
  ]
}
```

**Step 3**: Restart TypeScript Server

In VS Code: `Cmd/Ctrl + Shift + P` → "TypeScript: Restart TS Server"

### Examples

#### Adding className to Icon Component

`icon-env.d.ts`:

```typescript
declare module '@expo/vector-icons' {
  import { IconProps } from '@expo/vector-icons/build/createIconSet';

  export interface IconProps {
    className?: string;
  }
}
```

#### Adding className to React Native Components

`react-native-env.d.ts`:

```typescript
import 'react-native';

declare module 'react-native' {
  export interface ViewProps {
    className?: string;
  }

  export interface TextProps {
    className?: string;
  }

  export interface ImageProps {
    className?: string;
  }
}
```

### Best Practices

1. **Name consistently**: Use `[library-name]-env.d.ts` format
2. **Re-export types**: Always include `export *` to preserve original types
3. **Add JSDoc comments**: Document your custom props
4. **Update tsconfig**: Add declaration files to the `include` array
5. **Restart TS server**: After creating/modifying `.d.ts` files

---

## Dark Mode Best Practices

### Using Dark Mode Variants

```tsx
<View className="bg-white dark:bg-slate-900">
  <Text className="text-slate-900 dark:text-white">This text adapts to dark mode</Text>
</View>
```

### Conditional Styling

```tsx
import { useColorScheme } from 'nativewind';

function MyComponent() {
  const { colorScheme } = useColorScheme();

  return (
    <View>
      <Text>Current theme: {colorScheme}</Text>
      {colorScheme === 'dark' && <MoonIcon />}
      {colorScheme === 'light' && <SunIcon />}
    </View>
  );
}
```

### Testing Dark Mode

```tsx
import { useColorScheme } from 'nativewind';

function ThemeToggle() {
  const { setColorScheme, colorScheme } = useColorScheme();

  return (
    <Button onPress={() => setColorScheme(colorScheme === 'dark' ? 'light' : 'dark')}>
      Toggle Theme
    </Button>
  );
}
```

---

## Troubleshooting

### Colors Not Updating

1. Check that `ThemeWrapper` is wrapping your app
2. Verify CSS variables are defined in both light and dark themes
3. Ensure Tailwind config includes the color mapping
4. Restart Metro bundler: `yarn start --reset-cache`

### TypeScript Errors with className

1. Verify `.d.ts` file is in `tsconfig.json` include
2. Restart TypeScript server
3. Check that you're extending the correct interface

### Dark Mode Not Working

1. Confirm `darkMode: 'class'` is set in `tailwind.config.js`
2. Check that theme provider is properly initialized
3. Verify `useColorScheme` is from 'nativewind', not 'react-native'

---

## Additional Resources

- [NativeWind Documentation](https://www.nativewind.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [React Native Documentation](https://reactnative.dev/)
- [Expo Documentation](https://docs.expo.dev/)
