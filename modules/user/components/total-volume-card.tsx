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
    <View className="mx-4 bg-blue-500 rounded-3xl shadow-md relative">
      <View className="relative p-6 pb-12 flex-1 rounded-3xl overflow-hidden">
        <View className="absolute -left-[100px] -top-[240px] w-[350px] h-[350px] bg-white/10 rounded-full" />

        <View className="flex-row justify-between items-start">
          <View className="gap-2">
            <Text className="text-blue-100 text-base tracking-tight">Total Volume</Text>
            <Text className="text-white text-3xl font-medium">{volume}</Text>
          </View>
          <View className="items-center">
            <View className="bg-white/20 px-3 py-1.5 rounded-xl flex-row items-center gap-1">
              <Ionicons name="trending-up" size={16} color="white" />
              <Text className="text-white text-base tracking-tight">{growth}</Text>
            </View>
            <Text className="text-blue-100 text-sm mt-1 tracking-tight">{comparisonText}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
