import { BottomActions } from '@/modules/core/components/bottom-actions';
import { useToast } from '@/modules/core/components/toast-container';
import { useExerciseByIdQuery } from '@/modules/exercise/hooks/use-exercise-by-id-query';
import { useTrainingDeleteMutation } from '@/modules/training/hooks/use-training-delete-mutation';
import { TRAINING_LIST_QUERY_KEY } from '@/modules/training/hooks/use-training-list-query';
import { Training } from '@/modules/training/types/training.types';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { format } from 'date-fns';
import { useMemo, useState } from 'react';
import { ActivityIndicator, Pressable, Text, View } from 'react-native';

type TrainingCardProps = {
  training: Training;
};

export const TrainingCard = ({ training }: TrainingCardProps) => {
  const { data: exercise, isLoading: isLoadingExercise } = useExerciseByIdQuery(
    training.exerciseId
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const queryClient = useQueryClient();
  const { showToast } = useToast();
  const { mutate: deleteTrainingMutation, isPending: isDeleting } = useTrainingDeleteMutation();

  const handleActionSelect = (actionId: string) => {
    if (actionId === 'delete') {
      deleteTrainingMutation(training.id, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: [TRAINING_LIST_QUERY_KEY] });
          setIsMenuOpen(false);
          showToast('Training deleted successfully', 'success');
        },
        onError: (error: Error) => {
          showToast(error.message, 'error');
        },
      });
    }
  };

  const actions = useMemo(
    () => [
      {
        id: 'delete',
        text: 'Delete Training',
        variant: 'danger' as const,
        icon: 'trash-outline',
        isLoading: isDeleting,
      },
    ],
    [isDeleting]
  );
  const trainingStats = useMemo(() => {
    if (!training.sessions || training.sessions.length === 0) {
      return {
        sessionsCount: 0,
        totalReps: 0,
        avgWeight: 0,
        totalVolume: 0,
        maxWeight: 0,
      };
    }

    const sessionsCount = training.sessions.length;
    const totalReps = training.sessions.reduce((acc, session) => acc + session.reps, 0);
    const totalVolume = getTrainingVolume(training);
    const avgWeight = totalReps > 0 ? totalVolume / totalReps : 0;
    const maxWeight = Math.max(...training.sessions.map(s => s.weight));

    return {
      sessionsCount,
      totalReps,
      avgWeight: Math.round(avgWeight * 10) / 10,
      totalVolume: Math.round(totalVolume),
      maxWeight,
    };
  }, [training]);

  if (isLoadingExercise) {
    return (
      <View className="bg-white p-4 rounded-2xl shadow-sm items-center justify-center">
        <ActivityIndicator size="small" color="#3b82f6" />
      </View>
    );
  }

  if (!exercise) {
    return null;
  }

  return (
    <Pressable
      className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden active:opacity-95"
      style={{
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      }}
    >
      <View className="px-4 pt-4 pb-3">
        <View className="flex-row items-center justify-between mb-2">
          <View className="flex-row items-center gap-3 flex-1">
            <View className="flex-1">
              <Text
                className="text-slate-900 text-base font-medium tracking-tight"
                numberOfLines={1}
              >
                {exercise.name}
              </Text>
            </View>
          </View>
          <View className="flex-row items-center gap-2">
            <View className="flex-row items-center gap-1.5">
              <Ionicons name="time-outline" size={14} color="#94a3b8" />
              <Text className="text-slate-500 text-xs tracking-tight">
                {format(new Date(training.date), 'h:mm a')}
              </Text>
            </View>
            <Pressable
              onPress={() => setIsMenuOpen(true)}
              className="w-8 h-8 items-center justify-center active:opacity-70"
            >
              <Ionicons name="ellipsis-vertical" size={18} color="#64748b" />
            </Pressable>
          </View>
        </View>
      </View>
      <View className="px-4 pb-4">
        <View className="bg-slate-50 rounded-xl p-3">
          <View className="flex-row gap-3">
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5 mb-1">
                <Ionicons name="layers-outline" size={14} color="#64748b" />
                <Text className="text-slate-500 text-xs tracking-tight">Sessions</Text>
              </View>
              <Text className="text-slate-900 text-lg font-medium tracking-tight">
                {trainingStats.sessionsCount}
              </Text>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5 mb-1">
                <Ionicons name="repeat-outline" size={14} color="#64748b" />
                <Text className="text-slate-500 text-xs tracking-tight">Reps</Text>
              </View>
              <Text className="text-slate-900 text-lg font-medium tracking-tight">
                {trainingStats.totalReps}
              </Text>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center gap-1.5 mb-1">
                <Ionicons name="barbell-outline" size={14} color="#64748b" />
                <Text className="text-slate-500 text-xs tracking-tight">Volume</Text>
              </View>
              <Text className="text-slate-900 text-lg font-medium tracking-tight">
                {trainingStats.totalVolume} kg
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Actions Menu Modal */}
      <BottomActions
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        actions={actions}
        onSelect={handleActionSelect}
      />
    </Pressable>
  );
};
