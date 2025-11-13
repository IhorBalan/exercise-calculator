import { ReactNode } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: ReactNode;
  rightElement?: ReactNode;
  className?: string;
  containerClassName?: string;
  variant?: 'light' | 'default';
}

export function Input({
  label,
  error,
  helperText,
  leftElement,
  rightElement,
  className = '',
  containerClassName = '',
  variant = 'default',
  ...textInputProps
}: InputProps) {
  const isLight = variant === 'light';

  return (
    <View className={`gap-2 ${containerClassName}`}>
      {label && (
        <Text className="text-neutral-950 text-sm font-medium tracking-tight">{label}</Text>
      )}
      <View
        className={`relative h-14 gap-3 rounded-2xl px-4 text-base text-neutral-950 tracking-tight flex-row items-center ${
          isLight ? 'bg-white border border-gray-200' : 'bg-gray-100'
        } ${error ? 'border-red-400' : ''}`}
      >
        {leftElement && <View className="justify-center z-10">{leftElement}</View>}
        <TextInput
          placeholderTextColor="#717182"
          style={{
            flex: 1,
          }}
          {...textInputProps}
        />
        {rightElement && <View className="justify-center z-10">{rightElement}</View>}
      </View>
      {error && <Text className="text-red-500 text-sm tracking-tight">{error}</Text>}
      {helperText && !error && (
        <Text className="text-gray-500 text-sm tracking-tight">{helperText}</Text>
      )}
    </View>
  );
}
