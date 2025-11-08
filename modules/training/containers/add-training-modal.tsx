import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { BottomModal } from '@/components/bottom-modal';
import { Button } from '@/components/button';
import { Dropdown, type DropdownOption } from '@/components/dropdown';
import { Input } from '@/components/input';
import { useMuscleGroupListQuery } from '@/modules/muscle-group/hooks/use-muscle-group-list-query';

// const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core'];

const exercisesByMuscle: Record<string, string[]> = {
  Chest: ['Bench Press', 'Incline Press', 'Dumbbell Fly'],
  Back: ['Deadlift', 'Pull-ups', 'Barbell Row', 'Lat Pulldown'],
  Shoulders: ['Overhead Press', 'Lateral Raise'],
  Legs: ['Squat', 'Lunges', 'Leg Curl'],
  Arms: ['Tricep Dips', 'Hammer Curl'],
  Core: ['Plank', 'Crunches'],
};

export interface AddWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AddWorkoutModal({ isOpen, onClose }: AddWorkoutModalProps) {
  const { data: muscleGroupList } = useMuscleGroupListQuery();
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [weight, setWeight] = useState('0');
  const [reps, setReps] = useState(0);
  const [sets, setSets] = useState(0);

  // Convert muscle groups to dropdown options
  const muscleGroupOptions: DropdownOption[] =
    muscleGroupList?.map(group => ({
      label: group.name,
      value: group.id,
    })) || [];

  // Get exercise options based on selected muscle group
  const exerciseOptions: DropdownOption[] = selectedMuscleGroup
    ? exercisesByMuscle[selectedMuscleGroup]?.map(exercise => ({
        label: exercise,
        value: exercise,
      })) || []
    : [];

  const resetForm = () => {
    setSelectedMuscleGroup('');
    setSelectedExercise('');
    setWeight('0');
    setReps(0);
    setSets(0);
  };

  const handleSave = () => {
    // Handle save logic here
    console.log({
      muscleGroup: selectedMuscleGroup,
      exercise: selectedExercise,
      weight,
      reps,
      sets,
    });
    // Reset form
    resetForm();
    onClose();
  };

  const handleClose = () => {
    // Reset form on close
    resetForm();
    onClose();
  };

  const canSave = selectedMuscleGroup && selectedExercise && weight && reps > 0 && sets > 0;

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={handleClose}
      title="New Training"
      snapPoints={['80%', '90%']}
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
        />
        <Dropdown
          label="Exercise"
          options={exerciseOptions}
          value={selectedExercise}
          placeholder="Select exercise"
          onSelect={setSelectedExercise}
          disabled={!selectedMuscleGroup}
        />
        <Input
          label="Weight (kg)"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          placeholder="50"
        />
        {/* Reps */}
        <View className="gap-2">
          <Text className="text-neutral-950 text-sm font-medium tracking-tight">Reps</Text>
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => reps > 1 && setReps(reps - 1)}
              className="bg-white border border-black/10 rounded-xl w-12 h-12 items-center justify-center active:bg-gray-50"
            >
              <Ionicons name="remove" size={16} color="#000000" />
            </Pressable>
            <View className="flex-1 bg-gray-100 rounded-xl h-12 items-center justify-center">
              <Text className="text-neutral-950 text-base tracking-tight">{reps}</Text>
            </View>
            <Pressable
              onPress={() => setReps(reps + 1)}
              className="bg-white border border-black/10 rounded-xl w-12 h-12 items-center justify-center active:bg-gray-50"
            >
              <Ionicons name="add" size={16} color="#000000" />
            </Pressable>
          </View>
        </View>

        {/* Sets */}
        <View className="gap-2">
          <Text className="text-neutral-950 text-sm font-medium tracking-tight">Sets</Text>
          <View className="flex-row items-center gap-2">
            <Pressable
              onPress={() => sets > 1 && setSets(sets - 1)}
              className="bg-white border border-black/10 rounded-xl w-12 h-12 items-center justify-center active:bg-gray-50"
            >
              <Ionicons name="remove" size={16} color="#000000" />
            </Pressable>
            <View className="flex-1 bg-gray-100 rounded-xl h-12 items-center justify-center">
              <Text className="text-neutral-950 text-base tracking-tight">{sets}</Text>
            </View>
            <Pressable
              onPress={() => setSets(sets + 1)}
              className="bg-white border border-black/10 rounded-xl w-12 h-12 items-center justify-center active:bg-gray-50"
            >
              <Ionicons name="add" size={16} color="#000000" />
            </Pressable>
          </View>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row gap-3 pt-10 pb-4">
        <Button variant="secondary" size="md" className="flex-1" onPress={handleClose}>
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
  );
}
