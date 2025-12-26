import { Dropdown, DropdownOption } from '@/modules/core/components/dropdown';
import { useExercisesListQuery } from '@/modules/exercise/hooks/use-exercises-list-query';
import { useMuscleGroupListQuery } from '@/modules/muscle-group/hooks/use-muscle-group-list-query';
import { Ionicons } from '@expo/vector-icons';
import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

type ExerciseSelectProps = {
  onMuscleGroupSelect: (muscleGroupId: string) => void;
  onExerciseSelect: (exerciseId: string) => void;
  selectedMuscleGroupId?: string;
  selectedExerciseId?: string;
};

export function ExerciseSelect({
  onMuscleGroupSelect,
  onExerciseSelect,
  selectedMuscleGroupId,
  selectedExerciseId,
}: ExerciseSelectProps) {
  const [localMuscleGroupId, setLocalMuscleGroupId] = useState<string>(selectedMuscleGroupId || '');

  const { data: muscleGroupList } = useMuscleGroupListQuery();
  const { data: exercisesList } = useExercisesListQuery(localMuscleGroupId);

  const muscleGroupOptions: DropdownOption[] =
    muscleGroupList?.map(group => ({
      label: group.name,
      value: group.id,
    })) || [];

  const exerciseOptions: DropdownOption[] = useMemo(() => {
    if (!localMuscleGroupId) return [];

    return (
      exercisesList?.map(exercise => ({
        label: exercise.name,
        value: exercise.id,
      })) || []
    );
  }, [localMuscleGroupId, exercisesList]);

  const handleMuscleGroupSelect = (value: string) => {
    setLocalMuscleGroupId(value);
    onMuscleGroupSelect(value);
    // Reset exercise when muscle group changes
    onExerciseSelect('');
  };

  return (
    <View className="gap-4 p-5 bg-background rounded-2xl shadow-sm border border-divider">
      <View className="flex-row items-center gap-2 mb-1">
        <Ionicons name="body" size={18} color="#3b82f6" />
        <Text className="text-accent text-base font-semibold tracking-tight">
          Exercise Selection
        </Text>
      </View>
      <View className="gap-6 pt-2">
        <Dropdown
          label="Muscle Group"
          options={muscleGroupOptions}
          placeholder="Select muscle group"
          onSelect={handleMuscleGroupSelect}
          value={selectedMuscleGroupId || localMuscleGroupId}
        />
        <Dropdown
          label="Exercise"
          options={exerciseOptions}
          placeholder="Select exercise"
          onSelect={onExerciseSelect}
          value={selectedExerciseId}
          disabled={!localMuscleGroupId}
        />
      </View>
    </View>
  );
}
