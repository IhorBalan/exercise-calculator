import { useEffect } from 'react';
import { AppState, Platform } from 'react-native';
import type { AppStateStatus } from 'react-native';
import { focusManager, onlineManager } from '@tanstack/react-query';
import * as Network from 'expo-network';

/**
 * Configure online status management for React Query
 * This should be called once at app startup
 */
export function setupOnlineManager() {
  onlineManager.setEventListener(setOnline => {
    const eventSubscription = Network.addNetworkStateListener(state => {
      setOnline(!!state.isConnected);
    });
    return eventSubscription.remove;
  });
}

/**
 * Hook to setup app focus handling for React Query
 * This should be used in the root component
 */
export function useAppFocusManager() {
  useEffect(() => {
    function onAppStateChange(status: AppStateStatus) {
      if (Platform.OS !== 'web') {
        focusManager.setFocused(status === 'active');
      }
    }

    const subscription = AppState.addEventListener('change', onAppStateChange);

    return () => subscription.remove();
  }, []);
}
