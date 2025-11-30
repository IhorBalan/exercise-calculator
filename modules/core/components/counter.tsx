import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

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
  const canDecrement = value > min;
  const canIncrement = max === undefined || value < max;

  return (
    <View className={`gap-2 ${className}`}>
      {label && (
        <Text className="text-neutral-950 text-sm font-medium tracking-tight">{label}</Text>
      )}
      <View className="flex-row items-center gap-2">
        <Pressable
          onPress={() => canDecrement && onDecrement()}
          disabled={!canDecrement}
          className={`bg-white border border-black/10 rounded-xl w-12 h-12 items-center justify-center active:bg-gray-50 ${
            !canDecrement ? 'opacity-50' : ''
          }`}
        >
          <Ionicons name="remove" size={16} color="#000000" />
        </Pressable>
        <View className="flex-1 bg-gray-100 rounded-xl h-12 items-center justify-center">
          <Text className="text-neutral-950 text-base tracking-tight">{value}</Text>
        </View>
        <Pressable
          onPress={() => canIncrement && onIncrement()}
          disabled={!canIncrement}
          className={`bg-white border border-black/10 rounded-xl w-12 h-12 items-center justify-center active:bg-gray-50 ${
            !canIncrement ? 'opacity-50' : ''
          }`}
        >
          <Ionicons name="add" size={16} color="#000000" />
        </Pressable>
      </View>
    </View>
  );
}
