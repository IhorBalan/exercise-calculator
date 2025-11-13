import { Text, View } from 'react-native';

type ColumnChartProps = {
  data: {
    label: string;
    value: number;
  }[];
};

export const ColumnChart = ({ data }: ColumnChartProps) => {
  const maxValue = Math.max(...data.map(item => item.value));

  return (
    <View className="flex-1 flex-row items-end justify-between gap-3">
      {data.map((item, index) => {
        const heightPercent = (item.value / maxValue) * 100;
        return (
          <View key={index} className="flex-1 items-center gap-2">
            <View className="flex-1 justify-end items-center w-full">
              <View
                className="w-full bg-blue-500 rounded-lg"
                style={{ height: `${heightPercent}%` }}
              />
            </View>
            <Text className="text-slate-400 text-xs">{item.label}</Text>
          </View>
        );
      })}
    </View>
  );
};
