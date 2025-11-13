import { ColumnChart } from '@/modules/core/components/column-chart';
import { useWeeklyVolumeChartQuery } from '@/modules/volume/hooks/use-weekly-volume-chart-query';
import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Text, View } from 'react-native';

export function WeeklyVolumeChart() {
  const { data = [] } = useWeeklyVolumeChartQuery();

  const formattedData = useMemo(() => {
    return data.map(item => ({
      label: item.day,
      value: item.value,
    }));
  }, [data]);

  return (
    <View className="mx-4 mt-6 p-6 bg-white rounded-3xl shadow-sm">
      {data.length === 0 || data.every(item => item.value === 0) ? (
        <View className="items-center justify-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="bar-chart-outline" size={32} color="#3b82f6" />
          </View>
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-1">
            No activity for last 7 days
          </Text>
          <Text className="text-slate-500 text-sm max-w-[250px] text-center tracking-tight">
            Log workouts for a few days to see your activity progress
          </Text>
        </View>
      ) : (
        <View className="gap-2 h-40">
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-5">Activity</Text>
          <ColumnChart data={formattedData} />
        </View>
      )}
    </View>
  );
}
