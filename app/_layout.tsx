import { useEffect } from 'react';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { setupOnlineManager, useAppFocusManager } from '@/lib/react-query-setup';
import { queryClient } from '@/store';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  // Setup React Query for React Native
  useEffect(() => {
    setupOnlineManager(); // Online status management (call once)
  }, []);
  useAppFocusManager(); // App focus handling

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="add-workout"
              options={{
                presentation: 'transparentModal',
                headerShown: false,
                animation: 'fade',
              }}
            />
            <Stack.Screen
              name="rule-details"
              options={{
                presentation: 'transparentModal',
                headerShown: false,
                animation: 'fade',
              }}
            />
            <Stack.Screen name="muscle-details" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}
