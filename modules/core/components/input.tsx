import { ReactNode } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { useColorScheme } from 'nativewind';

export interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string | boolean;
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
  editable = true,
  ...textInputProps
}: InputProps) {
  const { colorScheme } = useColorScheme();
  const isLight = variant === 'light';

  // Theme-aware colors
  const placeholderColor = colorScheme === 'dark' ? '#9CA3AF' : '#717182';
  const inputTextColor = colorScheme === 'dark' ? '#F8FAFC' : '#0F172A';

  return (
    <View className={`gap-2 ${containerClassName}`}>
      {label && <Text className="text-accent text-sm font-medium tracking-tight">{label}</Text>}
      <View
        className={`relative h-14 gap-3 rounded-2xl px-4 text-base tracking-tight flex-row items-center ${
          isLight ? 'bg-background border border-divider' : 'bg-gray-100 dark:bg-gray-800'
        } ${error ? 'border-red-400' : ''} ${editable ? '' : 'opacity-50'}`}
      >
        {leftElement && <View className="justify-center z-10">{leftElement}</View>}
        <TextInput
          editable={editable}
          placeholderTextColor={placeholderColor}
          style={{
            flex: 1,
            color: inputTextColor,
          }}
          {...textInputProps}
        />
        {rightElement && <View className="justify-center z-10">{rightElement}</View>}
      </View>
      {error && <Text className="text-red-500 text-sm tracking-tight">{error}</Text>}
      {helperText && !error && (
        <Text className="text-body text-sm tracking-tight">{helperText}</Text>
      )}
    </View>
  );
}
