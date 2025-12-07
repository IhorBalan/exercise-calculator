import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';

export interface CounterProps {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  min?: number;
  max?: number;
  label?: string;
  className?: string;
}

export function Counter({
  value,
  onIncrement,
  onDecrement,
  min = 1,
  max,
  label,
  className = '',
}: CounterProps) {
  const { colorScheme } = useColorScheme();
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

  // Theme-aware icon color
  const iconColor = colorScheme === 'dark' ? '#F8FAFC' : '#000000';

  return (
    <View className={`gap-2 ${className}`}>
      {label && <Text className="text-accent text-sm font-medium tracking-tight">{label}</Text>}
      <View className="flex-row items-center gap-2">
        <Pressable
          onPress={() => canDecrement && onDecrement()}
          disabled={!canDecrement}
          className={`bg-background border border-divider rounded-xl w-12 h-12 items-center justify-center active:opacity-80 ${
            !canDecrement ? 'opacity-50' : ''
          }`}
        >
          <Ionicons name="remove" size={16} color={iconColor} />
        </Pressable>
        <View className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-xl h-12 items-center justify-center">
          <Text className="text-accent text-base tracking-tight">{value}</Text>
        </View>
        <Pressable
          onPress={() => canIncrement && onIncrement()}
          disabled={!canIncrement}
          className={`bg-background border border-divider rounded-xl w-12 h-12 items-center justify-center active:opacity-80 ${
            !canIncrement ? 'opacity-50' : ''
          }`}
        >
          <Ionicons name="add" size={16} color={iconColor} />
        </Pressable>
      </View>
    </View>
  );
}
