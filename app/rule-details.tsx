import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

const progressionPriorityOptions = [
  'Increase reps first',
  'Increase weight first',
  'Balanced approach',
];

export default function RuleDetailsModal() {
  const params = useLocalSearchParams();
  const muscleGroup = (params.muscleGroup as string) || 'Chest';
  const initialReps = (params.reps as string) || '1';
  const initialMinReps = (params.minReps as string) || '8';
  const initialMaxReps = (params.maxReps as string) || '12';

  const [repsToAdd, setRepsToAdd] = useState(initialReps);
  const [minReps, setMinReps] = useState(initialMinReps);
  const [maxReps, setMaxReps] = useState(initialMaxReps);
  const [weightIncrement, setWeightIncrement] = useState('2.5');
  const [volumeIncrease, setVolumeIncrease] = useState('5');
  const [selectedPriority, setSelectedPriority] = useState('Increase reps first');
  const [showPriorityPicker, setShowPriorityPicker] = useState(false);

  const handleSave = () => {
    // Handle save logic here
    console.log({
      muscleGroup,
      repsToAdd,
      minReps,
      maxReps,
      weightIncrement,
      volumeIncrease,
      selectedPriority,
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-black/50 justify-end">
      <View className="bg-white rounded-t-3xl border-t border-black/10">
        {/* Header */}
        <View className="flex-row items-center justify-center pt-6 pb-4 px-6 relative">
          <Text className="text-neutral-950 text-lg font-semibold tracking-tight">
            Edit Progression Rule
          </Text>
          <Pressable
            onPress={handleCancel}
            className="absolute right-6 top-6 w-4 h-4 items-center justify-center active:opacity-70"
          >
            <Ionicons name="close" size={16} color="#000000" />
          </Pressable>
        </View>

        <ScrollView className="px-6 pb-6" showsVerticalScrollIndicator={false}>
          {/* Muscle Group - Disabled */}
          <View className="gap-2 mb-4">
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">
              Muscle Group
            </Text>
            <View className="bg-gray-100 rounded-xl h-9 px-3 flex-row items-center opacity-50">
              <Text className="text-neutral-950 text-base tracking-tight">{muscleGroup}</Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-black/10 mb-4" />

          {/* Rep Progression Section */}
          <View className="gap-4 mb-4">
            <Text className="text-slate-900 text-base tracking-tight">Rep Progression</Text>

            {/* Reps to add per week */}
            <View className="gap-2">
              <Text className="text-neutral-950 text-sm font-medium tracking-tight">
                Reps to add per week
              </Text>
              <TextInput
                className="bg-gray-100 rounded-xl h-9 px-3 text-base text-gray-500 tracking-tight"
                value={repsToAdd}
                onChangeText={setRepsToAdd}
                keyboardType="numeric"
                placeholder="1"
                placeholderTextColor="#717182"
              />
              <Text className="text-slate-500 text-sm tracking-tight">
                How many reps to add each week
              </Text>
            </View>

            {/* Min and Max Reps */}
            <View className="flex-row gap-3">
              <View className="flex-1 gap-2">
                <Text className="text-neutral-950 text-sm font-medium tracking-tight">
                  Min Reps
                </Text>
                <TextInput
                  className="bg-gray-100 rounded-xl h-9 px-3 text-base text-gray-500 tracking-tight"
                  value={minReps}
                  onChangeText={setMinReps}
                  keyboardType="numeric"
                  placeholder="8"
                  placeholderTextColor="#717182"
                />
              </View>
              <View className="flex-1 gap-2">
                <Text className="text-neutral-950 text-sm font-medium tracking-tight">
                  Max Reps
                </Text>
                <TextInput
                  className="bg-gray-100 rounded-xl h-9 px-3 text-base text-gray-500 tracking-tight"
                  value={maxReps}
                  onChangeText={setMaxReps}
                  keyboardType="numeric"
                  placeholder="12"
                  placeholderTextColor="#717182"
                />
              </View>
            </View>

            <Text className="text-slate-500 text-sm tracking-tight">
              When you reach {maxReps} reps, increase weight and drop back to {minReps} reps
            </Text>
          </View>

          {/* Divider */}
          <View className="h-px bg-black/10 mb-4" />

          {/* Weight Progression Section */}
          <View className="gap-4 mb-4">
            <Text className="text-slate-900 text-base tracking-tight">Weight Progression</Text>

            {/* Weight increment */}
            <View className="gap-2">
              <Text className="text-neutral-950 text-sm font-medium tracking-tight">
                Weight increment (kg)
              </Text>
              <TextInput
                className="bg-gray-100 rounded-xl h-9 px-3 text-base text-gray-500 tracking-tight"
                value={weightIncrement}
                onChangeText={setWeightIncrement}
                keyboardType="decimal-pad"
                placeholder="2.5"
                placeholderTextColor="#717182"
              />
              <Text className="text-slate-500 text-sm tracking-tight">
                How much weight to add when increasing
              </Text>
            </View>

            {/* Progression Priority */}
            <View className="gap-2">
              <Text className="text-neutral-950 text-sm font-medium tracking-tight">
                Progression Priority
              </Text>
              <Pressable
                onPress={() => setShowPriorityPicker(!showPriorityPicker)}
                className="bg-gray-100 rounded-xl h-9 px-3 flex-row items-center justify-between"
              >
                <Text className="text-neutral-950 text-sm tracking-tight">{selectedPriority}</Text>
                <Ionicons name="chevron-down" size={16} color="#717182" />
              </Pressable>

              {showPriorityPicker && (
                <View className="bg-white border border-gray-200 rounded-xl overflow-hidden mt-1">
                  {progressionPriorityOptions.map(option => (
                    <Pressable
                      key={option}
                      onPress={() => {
                        setSelectedPriority(option);
                        setShowPriorityPicker(false);
                      }}
                      className="px-3 py-2.5 active:bg-gray-50"
                    >
                      <Text className="text-neutral-950 text-sm tracking-tight">{option}</Text>
                    </Pressable>
                  ))}
                </View>
              )}

              <Text className="text-slate-500 text-sm tracking-tight">
                Add more reps before adding weight
              </Text>
            </View>
          </View>

          {/* Divider */}
          <View className="h-px bg-black/10 mb-4" />

          {/* Weekly Volume Increase */}
          <View className="gap-2 mb-6">
            <Text className="text-neutral-950 text-sm font-medium tracking-tight">
              Weekly Volume Increase (%)
            </Text>
            <TextInput
              className="bg-gray-100 rounded-xl h-9 px-3 text-base text-gray-500 tracking-tight"
              value={volumeIncrease}
              onChangeText={setVolumeIncrease}
              keyboardType="numeric"
              placeholder="5"
              placeholderTextColor="#717182"
            />
            <Text className="text-slate-500 text-sm tracking-tight">
              Target percentage increase in total volume per week
            </Text>
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
              className="flex-1 bg-blue-500 rounded-xl h-9 items-center justify-center active:opacity-80"
            >
              <Text className="text-white text-sm font-medium tracking-tight">Save Changes</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
