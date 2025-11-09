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
}

export function Input({
  label,
  error,
  helperText,
  leftElement,
  rightElement,
  className = '',
  containerClassName = '',
  ...textInputProps
}: InputProps) {
  return (
    <View className={`gap-2 ${containerClassName}`}>
      {label && (
        <Text className="text-neutral-950 text-sm font-medium tracking-tight">{label}</Text>
      )}
      <View className="relative h-12 gap-3 bg-gray-100 rounded-xl px-4 text-base text-neutral-950 tracking-tight flex-row items-center">
        {leftElement && (
          <View className="left-3 top-0 bottom-0 justify-center z-10">{leftElement}</View>
        )}
        <TextInput
          placeholderTextColor="#717182"
          style={{
            flex: 1,
          }}
          {...textInputProps}
        />
        {rightElement && (
          <View className="right-3 top-0 bottom-0 justify-center z-10">{rightElement}</View>
        )}
      </View>
      {error && <Text className="text-red-500 text-sm tracking-tight">{error}</Text>}
      {helperText && !error && (
        <Text className="text-gray-500 text-sm tracking-tight">{helperText}</Text>
      )}
    </View>
  );
}
