import { Button } from '@/modules/core/components/button';
import { Dropdown, DropdownOption } from '@/modules/core/components/dropdown';
import { useExercisesListQuery } from '@/modules/exercise/hooks/use-exercises-list-query';
import { useMuscleGroupListQuery } from '@/modules/muscle-group/hooks/use-muscle-group-list-query';
import { useMemo, useState } from 'react';
import { Text, View } from 'react-native';

export const WorkoutTimerDetails = ({
  onSubmit,
}: {
  onSubmit: (values: { muscleGroup: string; exercise: string }) => void;
}) => {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<string>('');

  const { data: muscleGroupList } = useMuscleGroupListQuery();
  const { data: exercisesList } = useExercisesListQuery(selectedMuscleGroup);

  const muscleGroupOptions: DropdownOption[] =
    muscleGroupList?.map(group => ({
      label: group.name,
      value: group.id,
    })) || [];

  const exerciseOptions: DropdownOption[] = useMemo(() => {
    if (!selectedMuscleGroup) return [];

    return (
      exercisesList?.map(exercise => ({
        label: exercise.name,
        value: exercise.id,
      })) || []
    );
  }, [selectedMuscleGroup, exercisesList]);

  const handleSubmit = () => {
    if (!selectedMuscleGroup || !selectedExercise) {
      return;
    }

    onSubmit({ muscleGroup: selectedMuscleGroup, exercise: selectedExercise });
  };

  return (
    <View className="flex-1 px-4 gap-8">
      <Text className="text-slate-800 text-base font-regular">
        Select the muscle group and exercise you want to train.
      </Text>
      <Dropdown
        label="Muscle Group"
        options={muscleGroupOptions}
        value={selectedMuscleGroup}
        placeholder="Select muscle group"
        onSelect={value => setSelectedMuscleGroup(value)}
        disabled={false}
      />
      <Dropdown
        label="Exercise"
        options={exerciseOptions}
        value={selectedExercise}
        placeholder="Select exercise"
        onSelect={value => setSelectedExercise(value)}
        disabled={false}
      />
      <Button
        variant="primary"
        size="md"
        disabled={!selectedMuscleGroup || !selectedExercise}
        className="mt-auto"
        onPress={handleSubmit}
      >
        Start Workout
      </Button>
      <Text className="text-slate-500 text-center text-sm tracking-tight">
        Read more about Workout Timer here.
      </Text>
    </View>
  );
};
