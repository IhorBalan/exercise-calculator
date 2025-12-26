import { ScreenHeader } from '@/modules/core/components/screen-header';
import { ExerciseSelect } from '@/modules/progression-rule/components/exercise-select';
import { RepsProgressionForm } from '@/modules/progression-rule/components/reps-progression-form';
import { ProgressionRuleInfoModal } from '@/modules/progression-rule/containers/progression-rule-info-modal';
import { router, useLocalSearchParams } from 'expo-router';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/modules/core/components/button';
import { Input } from '@/modules/core/components/input';
import { useKeyboardHeight } from '@/modules/core/hooks/use-keyboard-height';
import { Ionicons } from '@expo/vector-icons';

export default function RuleDetailsModal() {
  const { colorScheme } = useColorScheme();
  const params = useLocalSearchParams();
  const ruleId = (params.ruleId as string) || null;
  const isNewRule = ruleId === null;
  const keyboardHeight = useKeyboardHeight();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [muscleGroupId, setMuscleGroupId] = useState('');
  const [exerciseId, setExerciseId] = useState('');
  const [repsIncrement, setRepsIncrement] = useState(0);
  const [minReps, setMinReps] = useState(0);
  const [maxReps, setMaxReps] = useState(0);
  const [minSets, setMinSets] = useState(0);
  const [maxSets, setMaxSets] = useState(0);
  const [weightIncrement, setWeightIncrement] = useState('2.5');
  const [minWeight, setMinWeight] = useState('0');
  const [maxWeight, setMaxWeight] = useState('0');

  // Theme-aware colors
  const infoIconColor = colorScheme === 'dark' ? '#F8FAFC' : '#000000';

  const handleSave = () => {
    // Handle save logic here
    const progressionRule = {
      id: ruleId || '',
      muscleGroupId,
      exerciseId,
      repsRule: {
        min: minReps,
        max: maxReps,
        increment: repsIncrement,
      },
      weightRule: {
        increment: parseFloat(weightIncrement) || 0,
        min: parseFloat(minWeight) || 0,
        max: parseFloat(maxWeight) || 0,
      },
      setsRule: {
        min: minSets,
        max: maxSets,
      },
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    console.log(progressionRule);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background-page" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: keyboardHeight + 60 }}
      >
        {/* Header */}
        <ScreenHeader
          title={isNewRule ? 'New Progression Rule' : 'Progression Rule'}
          subtitle="Configure how your strength progresses over time"
          rightAction={
            <Pressable
              onPress={() => setIsInfoModalOpen(true)}
              className="w-10 h-10 items-center justify-center bg-background rounded-xl shadow-sm active:opacity-80"
            >
              <Ionicons name="information-circle-outline" size={18} color={infoIconColor} />
            </Pressable>
          }
        />

        {/* Form Fields */}
        <View className="px-4 gap-5">
          {/* Exercise Selection */}
          <ExerciseSelect
            onMuscleGroupSelect={setMuscleGroupId}
            onExerciseSelect={setExerciseId}
            selectedMuscleGroupId={muscleGroupId}
            selectedExerciseId={exerciseId}
          />

          {/* Reps Progression Card */}
          <RepsProgressionForm
            increment={repsIncrement}
            min={minReps}
            max={maxReps}
            onIncrementChange={setRepsIncrement}
            onMinChange={setMinReps}
            onMaxChange={setMaxReps}
          />

          {/* Sets Progression Card */}
          <View className="gap-6 p-5 bg-background rounded-2xl shadow-sm border border-divider">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-blue-100 dark:bg-blue-900 items-center justify-center">
                  <Ionicons name="layers" size={18} color="#2563eb" />
                </View>
                <View>
                  <Text className="text-accent text-base font-semibold tracking-tight">
                    Sets Progression
                  </Text>
                  <Text className="text-body text-xs tracking-tight mt-0.5">Set ranges</Text>
                </View>
              </View>
            </View>

            <View className="gap-6 pt-4 border-t border-divider">
              <Input
                label="Min Sets"
                value={minSets.toString()}
                onChangeText={text => setMinSets(Number(text) || 0)}
                keyboardType="numeric"
                placeholder="3"
                helperText="Minimum number of sets"
              />
              <Input
                label="Max Sets"
                value={maxSets.toString()}
                onChangeText={text => setMaxSets(Number(text) || 0)}
                keyboardType="numeric"
                placeholder="5"
                helperText="Maximum number of sets"
              />
            </View>
          </View>

          {/* Weight Progression Card */}
          <View className="gap-6 p-5 bg-background rounded-2xl shadow-sm border border-divider">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-purple-100 dark:bg-purple-900 items-center justify-center">
                  <Ionicons name="barbell" size={18} color="#9333ea" />
                </View>
                <View>
                  <Text className="text-accent text-base font-semibold tracking-tight">
                    Weight Progression
                  </Text>
                  <Text className="text-body text-xs tracking-tight mt-0.5">Weight increases</Text>
                </View>
              </View>
            </View>

            <View className="gap-6 pt-4 border-t border-divider">
              <Input
                label="Weight increment (kg)"
                value={weightIncrement}
                onChangeText={setWeightIncrement}
                keyboardType="decimal-pad"
                placeholder="2.5"
                helperText="Amount of weight to add when progressing"
              />
              <Input
                label="Min Weight (kg)"
                value={minWeight}
                onChangeText={setMinWeight}
                keyboardType="decimal-pad"
                placeholder="10"
                helperText="Minimum weight to use"
              />
              <Input
                label="Max Weight (kg)"
                value={maxWeight}
                onChangeText={setMaxWeight}
                keyboardType="decimal-pad"
                placeholder="100"
                helperText="Maximum weight to use"
              />
            </View>
          </View>
          <Button
            variant="primary"
            size="md"
            onPress={handleSave}
            startAdornment={<Ionicons name="checkmark" size={16} color="white" />}
            className="mt-4"
          >
            Save Rule
          </Button>
        </View>
      </ScrollView>

      {/* Info Modal */}
      <ProgressionRuleInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </SafeAreaView>
  );
}
