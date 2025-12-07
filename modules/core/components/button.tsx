import { ReactNode } from 'react';
import { ActivityIndicator, Pressable, PressableProps, Text, View } from 'react-native';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  isLoading?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  startAdornment,
  endAdornment,
  isLoading = false,
  ...pressableProps
}: ButtonProps) {
  const baseClasses =
    'rounded-xl flex-row items-center justify-center active:opacity-80 disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-primary',
    secondary: 'bg-background shadow-sm',
    outline: 'bg-background border border-divider',
  };

  const sizeClasses = {
    sm: 'h-9 px-3',
    md: 'h-12 px-4',
    lg: 'h-14 px-6',
  };

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  };

  const textColorClasses = {
    primary: 'text-white',
    secondary: 'text-accent',
    outline: 'text-accent',
  };

  return (
    <Pressable
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      {...pressableProps}
    >
      {isLoading && (
        <ActivityIndicator size="small" color={textColorClasses[variant]} className="mr-2" />
      )}
      {startAdornment && <View className="mr-2">{startAdornment}</View>}
      {typeof children === 'string' ? (
        <Text
          className={`${textSizeClasses[size]} font-medium tracking-tight ${textColorClasses[variant]}`}
        >
          {children}
        </Text>
      ) : (
        children
      )}
      {endAdornment && <View className="ml-2">{endAdornment}</View>}
    </Pressable>
  );
}
