import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

export interface DropdownOption {
  label: string;
  value: string;
}

export interface DropdownProps {
  label: string;
  options: DropdownOption[];
  value?: string;
  placeholder?: string;
  onSelect: (value: string) => void;
  disabled?: boolean;
  className?: string;
}

export function Dropdown({
  label,
  options,
  value,
  placeholder = 'Select an option',
  onSelect,
  disabled = false,
  className = '',
}: DropdownProps) {
  const { colorScheme } = useColorScheme();
  const [isOpen, setIsOpen] = useState(false);
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(-10);

  const selectedOption = options.find(option => option.value === value);
  const displayText = selectedOption?.label || placeholder;
  const hasValue = !!value;

  // Theme-aware colors
  const iconColor = colorScheme === 'dark' ? '#9CA3AF' : '#717182';

  useEffect(() => {
    if (isOpen && !disabled) {
      opacity.value = withTiming(1, { duration: 200 });
      translateY.value = withTiming(0, { duration: 200 });
    } else {
      opacity.value = withTiming(0, { duration: 150 });
      translateY.value = withTiming(-10, { duration: 150 });
    }
  }, [isOpen, disabled, opacity, translateY]);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setIsOpen(false);
  };

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View className={`gap-2 relative ${className}`}>
      <Text className="text-accent text-sm font-medium tracking-tight">{label}</Text>
      <Pressable
        onPress={() => !disabled && setIsOpen(!isOpen)}
        className={`bg-gray-100 dark:bg-gray-800 rounded-2xl h-14 px-4 flex-row items-center justify-between ${
          disabled ? 'opacity-50' : ''
        }`}
        disabled={disabled}
      >
        <Text
          className={`text-base tracking-tight ${hasValue ? 'text-accent' : 'text-body opacity-70'}`}
        >
          {displayText}
        </Text>
        <Ionicons name="chevron-down" size={16} color={iconColor} />
      </Pressable>

      <Animated.View
        style={[
          animatedStyle,
          {
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            zIndex: 50,
            marginTop: 4,
          },
        ]}
        className="bg-background rounded-xl shadow-md"
        pointerEvents={isOpen && !disabled ? 'auto' : 'none'}
      >
        {options.map(option => (
          <Pressable
            key={option.value}
            onPress={() => handleSelect(option.value)}
            className={`px-4 justify-center h-12 active:opacity-80`}
          >
            <Text className="text-accent text-base tracking-tight">{option.label}</Text>
          </Pressable>
        ))}
      </Animated.View>
    </View>
  );
}
