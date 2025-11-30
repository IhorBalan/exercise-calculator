import { BottomModal } from '@/modules/core/components/bottom-modal';
import { Button } from '@/modules/core/components/button';
import { Counter } from '@/modules/core/components/counter';
import { Dropdown, type DropdownOption } from '@/modules/core/components/dropdown';
import { Input } from '@/modules/core/components/input';
import { useExercisesListQuery } from '@/modules/exercise/hooks/use-exercises-list-query';
import {
  MUSCLE_GROUP_LIST_QUERY_KEY,
  useMuscleGroupListQuery,
} from '@/modules/muscle-group/hooks/use-muscle-group-list-query';
import { getIsTrainingRecord } from '@/modules/training/api/training.api';
import { RecordCelebrationModal } from '@/modules/training/components/record-celebration-modal';
import { useTrainingCreateMutation } from '@/modules/training/hooks/use-training-create-mutation';
import { TRAINING_HISTORY_OF_EXERCISE_QUERY_KEY } from '@/modules/training/hooks/use-training-history-of-exercise-query';
import { TRAINING_HISTORY_OF_MUSCLE_GROUP_QUERY_KEY } from '@/modules/training/hooks/use-training-history-of-muscle-group-query';
import { TRAINING_RECORDS_QUERY_KEY } from '@/modules/training/hooks/use-training-records-query';
import { useUserProfileQuery } from '@/modules/user/hooks/use-user-profile-query';
import { WEEKLY_VOLUME_QUERY_KEY } from '@/modules/volume/hooks/use-weekly-volume-query';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { Keyboard, View } from 'react-native';
export interface AddWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  frozenFields?: {
    muscleGroupId?: string;
    exerciseId?: string;
  };
}

export function AddWorkoutModal({ isOpen, onClose, frozenFields }: AddWorkoutModalProps) {
  const queryClient = useQueryClient();
  const { data: muscleGroupList } = useMuscleGroupListQuery();
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>(
    frozenFields?.muscleGroupId || ''
  );
  const [selectedExercise, setSelectedExercise] = useState<string>(frozenFields?.exerciseId || '');
  const [weight, setWeight] = useState('0');
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);
  const [newTrainingRecordId, setNewTrainingRecordId] = useState<string | null>(null);
  const { data: exercisesList } = useExercisesListQuery(selectedMuscleGroup);
  const trainingCreateMutation = useTrainingCreateMutation();
  const { data: userProfile } = useUserProfileQuery();

  const selectedExerciseData = useMemo(() => {
    return exercisesList?.find(exercise => exercise.id === selectedExercise) || null;
  }, [selectedExercise, exercisesList]);

  const weightFieldConfig = useMemo(() => {
    switch (selectedExerciseData?.type) {
      case 'BODYWEIGHT_EXERCISE':
        return {
          editable: true,
          info: 'Bodyweight exercise. Set your own weight by defult. You can change it if you are using a weightlifting belt or other equipment.',
        };
      case 'EQUIPMENT_EXERCISE':
        return {
          editable: true,
        };
    }

    return {
      editable: false,
    };
  }, [selectedExerciseData]);

  useEffect(() => {
    if (userProfile && selectedExerciseData?.type === 'BODYWEIGHT_EXERCISE') {
      console.log('userProfile', userProfile);
      setWeight(userProfile.weight?.toString() || '0');
    }
  }, [userProfile, selectedExerciseData]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    if (frozenFields?.muscleGroupId) {
      setSelectedMuscleGroup(frozenFields.muscleGroupId);
    }
    if (frozenFields?.exerciseId) {
      setSelectedExercise(frozenFields.exerciseId);
    }
  }, [frozenFields?.muscleGroupId, frozenFields?.exerciseId, isOpen]);

  // Convert muscle groups to dropdown options
  const muscleGroupOptions: DropdownOption[] =
    muscleGroupList?.map(group => ({
      label: group.name,
      value: group.id,
    })) || [];

  // Get exercise options based on selected muscle group
  const exerciseOptions: DropdownOption[] = useMemo(() => {
    if (!selectedMuscleGroup) return [];

    return (
      exercisesList?.map(exercise => ({
        label: exercise.name,
        value: exercise.id,
      })) || []
    );
  }, [selectedMuscleGroup, exercisesList]);

  const resetForm = () => {
    setSelectedMuscleGroup('');
    setSelectedExercise('');
    setWeight('0');
    setReps(0);
    setSets(0);
  };

  const handleSave = async () => {
    trainingCreateMutation.mutate(
      {
        muscleGroupId: selectedMuscleGroup,
        exercienseId: selectedExercise,
        sets,
        reps,
        weight: parseFloat(weight),
        date: new Date().toISOString(),
      },
      {
        onSuccess: async data => {
          resetForm();
          onClose();

          const isNewRecord = await getIsTrainingRecord(data.id);

          if (isNewRecord) {
            setNewTrainingRecordId(data.id);
          }

          queryClient.invalidateQueries({ queryKey: [WEEKLY_VOLUME_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [TRAINING_HISTORY_OF_MUSCLE_GROUP_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [TRAINING_HISTORY_OF_EXERCISE_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [MUSCLE_GROUP_LIST_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [TRAINING_RECORDS_QUERY_KEY] });
        },
        onError: error => {
          console.error('Create training error:', error);
        },
      }
    );
  };

  const handleClose = () => {
    // Dismiss keyboard before closing
    Keyboard.dismiss();
    // Reset form on close
    resetForm();
    onClose();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const canSave = selectedMuscleGroup && selectedExercise && weight && reps > 0 && sets > 0;

  return (
    <>
      <BottomModal
        isOpen={isOpen}
        onClose={handleClose}
        title="New Training"
        snapPoints={['80%', '90%']}
        enableScrollableContent={true}
      >
        <View className="gap-6">
          <Dropdown
            label="Muscle Group"
            options={muscleGroupOptions}
            value={selectedMuscleGroup}
            placeholder="Select muscle group"
            onSelect={value => {
              setSelectedMuscleGroup(value);
              setSelectedExercise(''); // Reset exercise when muscle group changes
            }}
            disabled={!!frozenFields?.muscleGroupId}
          />
          <Dropdown
            label="Exercise"
            options={exerciseOptions}
            value={selectedExercise}
            placeholder="Select exercise"
            onSelect={setSelectedExercise}
            disabled={!selectedMuscleGroup || !!frozenFields?.exerciseId}
          />
          <Input
            label="Weight (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
            editable={weightFieldConfig.editable}
            helperText={weightFieldConfig.info}
            placeholder="50"
            returnKeyType="done"
            onSubmitEditing={dismissKeyboard}
          />
          <Counter
            label="Reps"
            value={reps}
            onIncrement={() => setReps(reps + 1)}
            onDecrement={() => setReps(reps - 1)}
            min={1}
          />
          <Counter
            label="Sets"
            value={sets}
            onIncrement={() => setSets(sets + 1)}
            onDecrement={() => setSets(sets - 1)}
            min={1}
          />
        </View>
        <View className="flex-row gap-3 pt-10 pb-4">
          <Button variant="outline" size="md" className="flex-1" onPress={handleClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            className="flex-1"
            onPress={handleSave}
            disabled={!canSave}
          >
            Save Training
          </Button>
        </View>
      </BottomModal>

      <RecordCelebrationModal
        isOpen={!!newTrainingRecordId}
        trainingId={newTrainingRecordId}
        onClose={() => {
          setNewTrainingRecordId(null);
        }}
      />
    </>
  );
}
