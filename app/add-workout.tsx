import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const muscleGroups = ['Chest', 'Back', 'Shoulders', 'Legs', 'Arms', 'Core'];

const exercisesByMuscle: Record<string, string[]> = {
  Chest: ['Bench Press', 'Incline Press', 'Dumbbell Fly'],
  Back: ['Deadlift', 'Pull-ups', 'Barbell Row', 'Lat Pulldown'],
  Shoulders: ['Overhead Press', 'Lateral Raise'],
  Legs: ['Squat', 'Lunges', 'Leg Curl'],
  Arms: ['Tricep Dips', 'Hammer Curl'],
  Core: ['Plank', 'Crunches'],
};

export default function AddWorkoutModal() {
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedExercise, setSelectedExercise] = useState<string>('');
  const [weight, setWeight] = useState('50');
  const [reps, setReps] = useState(12);
  const [sets, setSets] = useState(5);
  const [showMuscleGroupPicker, setShowMuscleGroupPicker] = useState(false);
  const [showExercisePicker, setShowExercisePicker] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log({
      muscleGroup: selectedMuscleGroup,
      exercise: selectedExercise,
      weight,
      reps,
      sets,
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  const canSave = selectedMuscleGroup && selectedExercise && weight && reps > 0 && sets > 0;

  return (
    <View className="flex-1 bg-black/50 justify-end">
      <View className="bg-white rounded-t-3xl border-t border-black/10">
        {/* Header */}
        <View className="flex-row items-center justify-center pt-6 pb-4 px-6 relative">
          <Text className="text-neutral-950 text-lg font-semibold tracking-tight">Log Workout</Text>
          <Pressable
            onPress={handleCancel}
            className="absolute right-6 top-6 w-4 h-4 items-center justify-center active:opacity-70"
          >
            <Ionicons name="close" size={16} color="#000000" />
          </Pressable>
        </View>

        <ScrollView className="px-6 pb-6" showsVerticalScrollIndicator={false}>
          {/* Muscle Group */}
          <View className="gap-2 mb-4">
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">
              Muscle Group
            </Text>
            <Pressable
              onPress={() => setShowMuscleGroupPicker(!showMuscleGroupPicker)}
              className="bg-gray-100 rounded-xl h-9 px-3 flex-row items-center justify-between"
            >
              <Text
                className={`text-sm tracking-tight ${selectedMuscleGroup ? 'text-neutral-950' : 'text-gray-500'}`}
              >
                {selectedMuscleGroup || 'Select muscle group'}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#717182" />
            </Pressable>

            {showMuscleGroupPicker && (
              <View className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-1">
                {muscleGroups.map(group => (
                  <Pressable
                    key={group}
                    onPress={() => {
                      setSelectedMuscleGroup(group);
                      setSelectedExercise('');
                      setShowMuscleGroupPicker(false);
                    }}
                    className="px-3 py-2.5 active:bg-gray-50"
                  >
                    <Text className="text-neutral-950 text-sm tracking-tight">{group}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Exercise */}
          <View className="gap-2 mb-4">
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">Exercise</Text>
            <Pressable
              onPress={() => {
                if (selectedMuscleGroup) {
                  setShowExercisePicker(!showExercisePicker);
                }
              }}
              className={`bg-gray-100 rounded-xl h-9 px-3 flex-row items-center justify-between ${!selectedMuscleGroup ? 'opacity-50' : ''}`}
              disabled={!selectedMuscleGroup}
            >
              <Text
                className={`text-sm tracking-tight ${selectedExercise ? 'text-neutral-950' : 'text-gray-500'}`}
              >
                {selectedExercise || 'Select exercise'}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#717182" />
            </Pressable>

            {showExercisePicker && selectedMuscleGroup && (
              <View className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-1">
                {exercisesByMuscle[selectedMuscleGroup]?.map(exercise => (
                  <Pressable
                    key={exercise}
                    onPress={() => {
                      setSelectedExercise(exercise);
                      setShowExercisePicker(false);
                    }}
                    className="px-3 py-2.5 active:bg-gray-50"
                  >
                    <Text className="text-neutral-950 text-sm tracking-tight">{exercise}</Text>
                  </Pressable>
                ))}
              </View>
            )}
          </View>

          {/* Weight */}
          <View className="gap-2 mb-4">
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">Weight (kg)</Text>
            <TextInput
              className="bg-gray-100 rounded-xl h-9 px-3 text-base text-gray-500 tracking-tight"
              value={weight}
              onChangeText={setWeight}
              keyboardType="numeric"
              placeholder="50"
              placeholderTextColor="#717182"
            />
          </View>

          {/* Reps */}
          <View className="gap-2 mb-4">
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">Reps</Text>
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => reps > 1 && setReps(reps - 1)}
                className="bg-white border border-black/10 rounded-xl w-9 h-9 items-center justify-center active:bg-gray-50"
              >
                <Ionicons name="remove" size={16} color="#000000" />
              </Pressable>
              <View className="flex-1 bg-gray-100 rounded-xl h-9 items-center justify-center">
                <Text className="text-neutral-950 text-base tracking-tight">{reps}</Text>
              </View>
              <Pressable
                onPress={() => setReps(reps + 1)}
                className="bg-white border border-black/10 rounded-xl w-9 h-9 items-center justify-center active:bg-gray-50"
              >
                <Ionicons name="add" size={16} color="#000000" />
              </Pressable>
            </View>
          </View>

          {/* Sets */}
          <View className="gap-2 mb-6">
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">Sets</Text>
            <View className="flex-row items-center gap-2">
              <Pressable
                onPress={() => sets > 1 && setSets(sets - 1)}
                className="bg-white border border-black/10 rounded-xl w-9 h-9 items-center justify-center active:bg-gray-50"
              >
                <Ionicons name="remove" size={16} color="#000000" />
              </Pressable>
              <View className="flex-1 bg-gray-100 rounded-xl h-9 items-center justify-center">
                <Text className="text-neutral-950 text-base tracking-tight">{sets}</Text>
              </View>
              <Pressable
                onPress={() => setSets(sets + 1)}
                className="bg-white border border-black/10 rounded-xl w-9 h-9 items-center justify-center active:bg-gray-50"
              >
                <Ionicons name="add" size={16} color="#000000" />
              </Pressable>
            </View>
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-3 pt-2 pb-4">
            <Pressable
              onPress={handleCancel}
              className="flex-1 bg-white border border-black/10 rounded-xl h-9 items-center justify-center active:bg-gray-50"
            >
              <Text className="text-neutral-950 text-sm font-medium tracking-tight">Cancel</Text>
            </Pressable>
            <Pressable
              onPress={handleSave}
              disabled={!canSave}
              className={`flex-1 ${canSave ? 'bg-blue-500' : 'bg-blue-500 opacity-50'} rounded-xl h-9 items-center justify-center active:opacity-80`}
            >
              <Text className="text-white text-sm font-medium tracking-tight">Save Workout</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
