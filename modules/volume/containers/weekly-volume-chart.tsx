import { Ionicons } from '@expo/vector-icons';
import { useMemo } from 'react';
import { Text, View } from 'react-native';
import { WeeklyVolumeData } from '../api/volume.api';
import { useWeeklyVolumeQuery } from '../hooks/use-weekly-volume-query';

export function WeeklyVolumeChart() {
  const { data = [] } = useWeeklyVolumeQuery();

  const formattedData: (WeeklyVolumeData & { percentage: number })[] = useMemo(() => {
    return data.map(item => ({
      day: item.day,
      value: item.value,
      percentage: item.value / Math.max(...data.map(item => item.value)),
    }));
  }, [data]);

  return (
    <View className="mx-4 mt-6 p-6 bg-white rounded-3xl shadow-sm">
      {data.length === 0 || data.every(item => item.value === 0) ? (
        <View className="items-center justify-center">
          <View className="w-16 h-16 bg-blue-100 rounded-full items-center justify-center mb-4">
            <Ionicons name="bar-chart-outline" size={32} color="#3b82f6" />
          </View>
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-1">Activity</Text>
          <Text className="text-slate-500 text-sm max-w-[250px] text-center tracking-tight">
            Log workouts for a few days to see your activity progress
          </Text>
        </View>
      ) : (
        <View>
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-5">Activity</Text>
          <View className="flex-row items-end justify-between h-28 mb-3">
            {formattedData.map((item, index) => (
              <View key={index} className="flex-1 items-center justify-end h-full gap-2">
                <View className="flex-1 justify-end w-full items-center">
                  <View
                    className="w-8 bg-blue-500 rounded-t-lg"
                    style={{ height: `${item.percentage * 100}%` }}
                  />
                </View>
                <Text className="text-slate-400 text-xs">{item.day}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
}
