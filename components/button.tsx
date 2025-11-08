import { ReactNode } from 'react';
import { Pressable, PressableProps, Text } from 'react-native';

export interface ButtonProps extends Omit<PressableProps, 'children'> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...pressableProps
}: ButtonProps) {
  const baseClasses =
    'rounded-xl items-center justify-center active:opacity-80 disabled:opacity-50';

  const variantClasses = {
    primary: 'bg-blue-500',
    secondary: 'bg-white border border-black/10',
    outline: 'bg-white border border-black/10',
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
    secondary: 'text-neutral-950',
    outline: 'text-neutral-950',
  };

  return (
    <Pressable
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        fullWidth ? 'w-full' : ''
      } ${className}`}
      disabled={disabled}
      {...pressableProps}
    >
      {typeof children === 'string' ? (
        <Text
          className={`${textSizeClasses[size]} font-medium tracking-tight ${textColorClasses[variant]}`}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}
