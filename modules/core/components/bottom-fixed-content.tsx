import { View } from 'react-native';

export function BottomFixedContent({ children }: { children: React.ReactNode }) {
  return (
    <View className="absolute bottom-0 left-0 right-0 px-4 pt-4 pb-10 bg-white shadow-sm border-t border-gray-100">
      {children}
    </View>
  );
}
