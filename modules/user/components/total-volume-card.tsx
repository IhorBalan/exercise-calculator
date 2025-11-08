import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export interface TotalVolumeCardProps {
  volume: string;
  growth: string;
  comparisonText?: string;
}

export function TotalVolumeCard({
  volume,
  growth,
  comparisonText = 'vs last week',
}: TotalVolumeCardProps) {
  return (
    <View className="mx-4 p-6 bg-blue-500 rounded-3xl shadow-md">
      <View className="flex-row justify-between items-start">
        <View className="gap-2">
          <Text className="text-blue-100 text-base tracking-tight">Total Volume</Text>
          <Text className="text-white text-3xl font-medium">{volume}</Text>
        </View>
        <View className="bg-white/20 px-3 py-1.5 rounded-2xl flex-row items-center gap-1">
          <Ionicons name="trending-up" size={16} color="white" />
          <Text className="text-white text-base tracking-tight">{growth}</Text>
        </View>
      </View>
      <Text className="text-blue-100 text-sm mt-2 tracking-tight">{comparisonText}</Text>
    </View>
  );
}
