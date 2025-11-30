import { defaultThemeDark, defaultThemeLight } from '@/modules/core/theme/default';
import { useColorScheme, vars } from 'nativewind';
import { View } from 'react-native';

const themes = {
  default: {
    light: vars(defaultThemeLight),
    dark: vars(defaultThemeDark),
  },
};

export function ThemeWrapper({
  name = 'default',
  children,
}: {
  name?: keyof typeof themes;
  children: React.ReactNode;
}) {
  const { colorScheme } = useColorScheme();
  return (
    <View style={themes[name][colorScheme ?? 'light']} className="flex-1">
      {children}
    </View>
  );
}
