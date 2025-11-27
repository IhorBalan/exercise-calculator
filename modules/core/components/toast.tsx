import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef } from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  onDismiss?: () => void;
}

export function Toast({ message, type = 'info', duration = 3000, onDismiss }: ToastProps) {
  const insets = useSafeAreaInsets();
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const handleDismiss = useCallback(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onDismiss?.();
    });
  }, [translateY, opacity, onDismiss]);

  useEffect(() => {
    // Animate in
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    // Auto dismiss
    const timer = setTimeout(() => {
      handleDismiss();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, handleDismiss, translateY, opacity]);

  const getToastStyles = () => {
    switch (type) {
      case 'error':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          iconColor: '#ef4444',
          iconName: 'close-circle' as const,
          textColor: 'text-red-800',
        };
      case 'success':
        return {
          bg: 'bg-green-50',
          border: 'border-green-200',
          iconColor: '#22c55e',
          iconName: 'checkmark-circle' as const,
          textColor: 'text-green-800',
        };
      case 'warning':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          iconColor: '#eab308',
          iconName: 'warning' as const,
          textColor: 'text-yellow-800',
        };
      default:
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          iconColor: '#3b82f6',
          iconName: 'information-circle' as const,
          textColor: 'text-blue-800',
        };
    }
  };

  const styles = getToastStyles();

  return (
    <Animated.View
      style={{
        transform: [{ translateY }],
        opacity,
        position: 'absolute',
        top: insets.top + 16,
        left: 16,
        right: 16,
        zIndex: 9999,
      }}
    >
      <Pressable onPress={handleDismiss}>
        <View
          className={`${styles.bg} ${styles.border} border rounded-2xl shadow-lg px-4 py-3 flex-row items-center gap-3`}
        >
          <Ionicons name={styles.iconName} size={24} color={styles.iconColor} />
          <Text className={`${styles.textColor} flex-1 text-sm font-medium tracking-tight`}>
            {message}
          </Text>
          <Pressable onPress={handleDismiss} className="ml-2">
            <Ionicons name="close" size={18} color={styles.iconColor} />
          </Pressable>
        </View>
      </Pressable>
    </Animated.View>
  );
}
