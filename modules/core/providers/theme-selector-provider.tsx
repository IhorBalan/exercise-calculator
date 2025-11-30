import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme as useNativeWindColorScheme } from 'nativewind';
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { ColorSchemeName } from 'react-native';

const THEME_STORAGE_KEY = '@app_theme';

export type ThemeMode = 'light' | 'dark' | 'system';

type ThemeSelectorContextType = {
  themeMode: ThemeMode;
  setThemeMode: (mode: ThemeMode) => void;
  colorScheme: ColorSchemeName;
};

const ThemeSelectorContext = createContext<ThemeSelectorContextType | undefined>(undefined);

export function ThemeSelectorProvider({ children }: { children: React.ReactNode }) {
  const { setColorScheme, colorScheme } = useNativeWindColorScheme();
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');

  const loadTheme = useCallback(async () => {
    try {
      const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
      if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
        setColorScheme(savedTheme as ThemeMode);
        setThemeModeState(savedTheme as ThemeMode);
      } else {
        // Default to system mode if no theme is saved
        setColorScheme('system');
        setThemeModeState('system');
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  }, [setColorScheme]);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const setThemeMode = async (mode: ThemeMode) => {
    try {
      setColorScheme(mode);
      setThemeModeState(mode);
      await AsyncStorage.setItem(THEME_STORAGE_KEY, mode);
    } catch (error) {
      console.error('Failed to save theme:', error);
    }
  };

  return (
    <ThemeSelectorContext.Provider value={{ themeMode, setThemeMode, colorScheme }}>
      {children}
    </ThemeSelectorContext.Provider>
  );
}

export function useThemeSelector() {
  const context = useContext(ThemeSelectorContext);
  if (context === undefined) {
    throw new Error('useThemeSelector must be used within a ThemeSelectorProvider');
  }
  return context;
}
