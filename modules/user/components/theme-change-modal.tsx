import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

import { BottomModal } from '@/modules/core/components/bottom-modal';
import { ThemeMode, useThemeSelector } from '@/modules/core/providers/theme-selector-provider';

interface ThemeChangeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const themeOptions: { mode: ThemeMode; label: string; icon: string; description: string }[] = [
  {
    mode: 'light',
    label: 'Light',
    icon: 'sunny-outline',
    description: 'Always use light theme',
  },
  {
    mode: 'dark',
    label: 'Dark',
    icon: 'moon-outline',
    description: 'Always use dark theme',
  },
  {
    mode: 'system',
    label: 'System',
    icon: 'phone-portrait-outline',
    description: 'Match system settings',
  },
];

export function ThemeChangeModal({ isOpen, onClose }: ThemeChangeModalProps) {
  const { themeMode, setThemeMode } = useThemeSelector();

  const handleThemeSelect = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  return (
    <BottomModal isOpen={isOpen} onClose={onClose} title="Choose Theme" enableDynamicSizing={true}>
      <View className="pb-4">
        <Text className="text-body text-sm tracking-tight mb-4">Select your preferred theme</Text>

        {/* Theme Options */}
        <View className="gap-2">
          {themeOptions.map(option => (
            <Pressable
              key={option.mode}
              onPress={() => handleThemeSelect(option.mode)}
              className="flex-row items-center p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 active:bg-slate-100 dark:active:bg-slate-700"
            >
              <View className="w-12 h-12 bg-blue-50 dark:bg-blue-900 rounded-full items-center justify-center">
                <Ionicons name={option.icon as any} size={24} color="#3b82f6" />
              </View>
              <View className="flex-1 ml-4">
                <Text className="text-accent text-base font-medium tracking-tight">
                  {option.label}
                </Text>
                <Text className="text-body text-sm tracking-tight">{option.description}</Text>
              </View>
              {themeMode === option.mode && (
                <Ionicons name="checkmark-circle" size={24} color="#3b82f6" />
              )}
            </Pressable>
          ))}
        </View>
      </View>
    </BottomModal>
  );
}
