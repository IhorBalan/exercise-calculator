import { Input } from '@/modules/core/components/input';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { Text, View } from 'react-native';
import { z } from 'zod';

const repsProgressionFormSchema = z.object({
  increment: z.number().min(1),
  min: z.number().min(1),
  max: z.number().min(1),
});

type RepsProgressionFormProps = {
  increment: number;
  min: number;
  max: number;
  onIncrementChange: (value: number) => void;
  onMinChange: (value: number) => void;
  onMaxChange: (value: number) => void;
};

export function RepsProgressionForm({
  increment,
  min,
  max,
  onIncrementChange,
  onMinChange,
  onMaxChange,
}: RepsProgressionFormProps) {
  const { control, watch } = useForm<z.infer<typeof repsProgressionFormSchema>>({
    resolver: zodResolver(repsProgressionFormSchema),
    defaultValues: {
      increment,
      min,
      max,
    },
    values: {
      increment,
      min,
      max,
    },
  });

  const watchedMin = watch('min');
  const watchedMax = watch('max');

  return (
    <View className="gap-6 p-5 bg-background rounded-2xl shadow-sm border border-divider">
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center gap-3">
          <View className="w-9 h-9 rounded-xl bg-green-100 dark:bg-green-900 items-center justify-center">
            <Ionicons name="repeat" size={18} color="#16a34a" />
          </View>
          <View>
            <Text className="text-accent text-base font-semibold tracking-tight">
              Reps Progression
            </Text>
            <Text className="text-body text-xs tracking-tight mt-0.5">Repetition increases</Text>
          </View>
        </View>
      </View>

      <View className="gap-6 pt-4 border-t border-divider">
        <Controller
          control={control}
          name="increment"
          render={({ field: { onChange, value } }) => (
            <Input
              label="Reps increment"
              value={value.toString()}
              onChangeText={text => {
                const numValue = Number(text) || 0;
                onChange(numValue);
                onIncrementChange(numValue);
              }}
              keyboardType="numeric"
              placeholder="1"
              helperText="Number of repetitions to add when progressing"
            />
          )}
        />
        <View className="gap-4">
          <View className="flex-row gap-3">
            <View className="flex-1">
              <Controller
                control={control}
                name="min"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Min Reps"
                    value={value.toString()}
                    onChangeText={text => {
                      const numValue = Number(text) || 0;
                      onChange(numValue);
                      onMinChange(numValue);
                    }}
                    keyboardType="numeric"
                    placeholder="8"
                  />
                )}
              />
            </View>
            <View className="flex-1">
              <Controller
                control={control}
                name="max"
                render={({ field: { onChange, value } }) => (
                  <Input
                    label="Max Reps"
                    value={value.toString()}
                    onChangeText={text => {
                      const numValue = Number(text) || 0;
                      onChange(numValue);
                      onMaxChange(numValue);
                    }}
                    keyboardType="numeric"
                    placeholder="12"
                  />
                )}
              />
            </View>
          </View>

          {/* <View className="p-3 bg-green-50 dark:bg-green-900 rounded-xl border border-green-100 dark:border-green-800">
            <View className="flex-row items-start gap-2">
              <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
              <Text className="flex-1 text-green-700 dark:text-green-300 text-xs leading-4 tracking-tight">
                When you reach {watchedMax || '12'} repetitions, increase weight and drop back to{' '}
                {watchedMin || '8'} repetitions
              </Text>
            </View>
          </View> */}
        </View>
      </View>
    </View>
  );
}
