import { BottomModal } from '@/modules/core/components/bottom-modal';
import { Button } from '@/modules/core/components/button';
import { useTrainingByIdQuery } from '@/modules/training/hooks/use-training-by-id-query';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export interface RecordCelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainingId?: string | null;
}

export function RecordCelebrationModal({
  isOpen,
  onClose,
  trainingId,
}: RecordCelebrationModalProps) {
  const { data: training } = useTrainingByIdQuery(trainingId ?? undefined);

  return (
    <BottomModal isOpen={isOpen} onClose={onClose} snapPoints={['60%']} enablePanDownToClose={true}>
      <View className="items-center justify-center gap-6 py-8">
        {/* Trophy Icon */}
        <View className="w-24 h-24 bg-orange-100 rounded-full items-center justify-center">
          <Ionicons name="trophy" size={48} color="#f97316" />
        </View>

        {/* Title */}
        <View className="items-center gap-2">
          <Text className="text-slate-900 text-2xl font-semibold tracking-tight text-center">
            New Record!
          </Text>
          <Text className="text-slate-600 text-sm tracking-tight text-center px-4">
            Congratulations! You&apos;ve set a new record for this exercise
          </Text>
        </View>

        {/* Record Details */}
        <View className="w-full bg-white rounded-2xl p-6 shadow-lg gap-5">
          <View className="items-center gap-1">
            <Text className="text-slate-900 text-lg font-medium tracking-tight">
              {'Bench Press'}
            </Text>
          </View>

          <View className="flex-row items-center justify-around">
            <View className="items-center gap-1">
              <Text className="text-slate-500 text-sm tracking-tight">Volume</Text>
              <Text className="text-slate-900 text-xl font-medium tracking-tight">
                {training ? getTrainingVolume(training) : '0'} kg
              </Text>
            </View>
            <View className="w-px h-10 bg-slate-200" />
            <View className="items-center gap-1">
              <Text className="text-slate-500 text-sm tracking-tight">Weight</Text>
              <Text className="text-slate-900 text-xl font-medium tracking-tight">
                {training?.weight} kg
              </Text>
            </View>
            <View className="w-px h-10 bg-slate-200" />
            <View className="items-center gap-1">
              <Text className="text-slate-500 text-sm tracking-tight">Sets × Reps</Text>
              <Text className="text-slate-900 text-xl font-medium tracking-tight">
                {training?.sets} × {training?.reps}
              </Text>
            </View>
          </View>
        </View>

        {/* Action Button */}
        <Button variant="primary" size="md" className="w-full mt-8" onPress={onClose}>
          Awesome!
        </Button>
      </View>
    </BottomModal>
  );
}
