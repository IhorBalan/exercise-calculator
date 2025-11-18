import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/modules/core/components/button';
import { Dropdown } from '@/modules/core/components/dropdown';
import { Input } from '@/modules/core/components/input';
import { Ionicons } from '@expo/vector-icons';

const progressionPriorityOptions = [
  { label: 'Increase reps first', value: 'Increase reps first' },
  { label: 'Increase weight first', value: 'Increase weight first' },
  { label: 'Balanced approach', value: 'Balanced approach' },
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
    <SafeAreaView className="bg-white" edges={['top']}>
      <ScrollView className="" showsVerticalScrollIndicator={false}>
        <View className="gap-8">
          <View className="flex-row px-4 items-center justify-between pt-6 pb-8 relative">
            <Pressable
              onPress={() => router.back()}
              className="w-10 h-10 rounded-xl bg-white items-center  justify-center active:opacity-80"
            >
              <Ionicons name="arrow-back" size={16} color="#000000" />
            </Pressable>
            <View className="flex-1 items-center">
              <Text className="text-neutral-950 text-lg font-semibold tracking-tight">
                Edit Progression Rule
              </Text>
            </View>
            <View className="w-10" />
          </View>

          <View className="gap-4 px-4">
            <Dropdown
              label="Muscle Group"
              options={[]}
              placeholder="Select muscle group"
              onSelect={() => {}}
            />

            <Dropdown
              label="Exercise"
              options={[]}
              placeholder="Select exercise"
              onSelect={() => {}}
            />
          </View>

          <View className="gap-6 p-4 mx-4 shadow-lg bg-white rounded-2xl">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="repeat" size={24} color="#000" />
                <Text className="text-slate-900 text-base tracking-tight">Reps Progression</Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
                thumbColor="#ffffff"
              />
            </View>

            <View className="gap-4">
              <Input
                label="Reps to add per week"
                value={repsToAdd}
                onChangeText={setRepsToAdd}
                keyboardType="numeric"
                placeholder="1"
                helperText="How many reps to add each week"
              />

              <View className="gap-2">
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Input
                      label="Min Reps"
                      value={minReps}
                      onChangeText={setMinReps}
                      keyboardType="numeric"
                      placeholder="8"
                    />
                  </View>
                  <View className="flex-1">
                    <Input
                      label="Max Reps"
                      value={maxReps}
                      onChangeText={setMaxReps}
                      keyboardType="numeric"
                      placeholder="12"
                    />
                  </View>
                </View>

                <Text className="text-slate-500 text-sm tracking-tight">
                  When you reach {maxReps} reps, increase weight and drop back to {minReps} reps
                </Text>
              </View>
            </View>
          </View>

          <View className="gap-4 p-4 mx-4 shadow-lg bg-white rounded-2xl">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-2">
                <Ionicons name="barbell" size={24} color="#000000" />
                <Text className="text-slate-900 text-base tracking-tight">Weight Progression</Text>
              </View>
              <Switch
                value={true}
                onValueChange={() => {}}
                trackColor={{ false: '#cbd5e1', true: '#3b82f6' }}
                thumbColor="#ffffff"
              />
            </View>

            <View className="gap-4"></View>
            {/* Weight increment */}
            <Input
              label="Weight increment (kg)"
              value={weightIncrement}
              onChangeText={setWeightIncrement}
              keyboardType="decimal-pad"
              placeholder="2.5"
              helperText="How much weight to add when increasing"
            />

            {/* Progression Priority */}
            <View className="gap-2">
              <Dropdown
                label="Progression Priority"
                options={progressionPriorityOptions}
                value={selectedPriority}
                placeholder="Select priority"
                onSelect={setSelectedPriority}
              />
              <Text className="text-slate-500 text-sm tracking-tight">
                Add more reps before adding weight
              </Text>
            </View>
          </View>

          <View className="mb-6 px-4">
            <Input
              label="Weekly Volume Increase (%)"
              value={volumeIncrease}
              onChangeText={setVolumeIncrease}
              keyboardType="numeric"
              placeholder="5"
              helperText="Target percentage increase in total volume per week"
            />
          </View>

          <View className="flex-row gap-3 pt-2 pb-14 px-4">
            <Button variant="outline" className="flex-1" size="md" onPress={handleCancel}>
              Cancel
            </Button>
            <Button variant="primary" className="flex-1" size="md" onPress={handleSave}>
              Save Changes
            </Button>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
