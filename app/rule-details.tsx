import { BottomFixedContent } from '@/modules/core/components/bottom-fixed-content';
import { ScreenHeader } from '@/modules/core/components/screen-header';
import { ProgressionRuleInfoModal } from '@/modules/progression-rule/containers/progression-rule-info-modal';
import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/modules/core/components/button';
import { Dropdown } from '@/modules/core/components/dropdown';
import { Input } from '@/modules/core/components/input';
import { useKeyboardHeight } from '@/modules/core/hooks/use-keyboard-height';
import { Ionicons } from '@expo/vector-icons';

const progressionPriorityOptions = [
  { label: 'Increase reps first', value: 'Increase reps first' },
  { label: 'Increase weight first', value: 'Increase weight first' },
  { label: 'Balanced approach', value: 'Balanced approach' },
];

export default function RuleDetailsModal() {
  const params = useLocalSearchParams();
  const ruleId = (params.ruleId as string) || null;
  const isNewRule = ruleId === null;
  const keyboardHeight = useKeyboardHeight();
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);

  const [repsToAddPerWeek, setRepsToAdd] = useState(0);
  const [minReps, setMinReps] = useState(0);
  const [maxReps, setMaxReps] = useState(0);
  const [weightIncrement, setWeightIncrement] = useState('2.5');
  const [priority, setPriority] = useState('Increase reps first');

  const handleSave = () => {
    // Handle save logic here
    console.log({
      repsToAddPerWeek,
      minReps,
      maxReps,
      weightIncrement,
      priority,
    });
    router.back();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView
        className="flex-1"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: keyboardHeight + 120 }}
      >
        {/* Header */}
        <ScreenHeader
          title={isNewRule ? 'New Progression Rule' : 'Progression Rule'}
          subtitle="Configure how your strength progresses over time"
          rightAction={
            <Pressable
              onPress={() => setIsInfoModalOpen(true)}
              className="w-10 h-10 items-center justify-center bg-white rounded-xl shadow-sm active:opacity-80"
            >
              <Ionicons name="information-circle-outline" size={18} color="#000000" />
            </Pressable>
          }
        />

        {/* Form Fields */}
        <View className="px-4 gap-5">
          {/* Exercise Selection */}
          <View className="gap-4 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
            <View className="flex-row items-center gap-2 mb-1">
              <Ionicons name="body" size={18} color="#3b82f6" />
              <Text className="text-slate-900 text-base font-semibold tracking-tight">
                Exercise Selection
              </Text>
            </View>
            <View className="gap-6 pt-2">
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
          </View>

          {/* Reps Progression Card */}
          <View className="gap-6 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-green-100 items-center justify-center">
                  <Ionicons name="repeat" size={18} color="#16a34a" />
                </View>
                <View>
                  <Text className="text-slate-900 text-base font-semibold tracking-tight">
                    Reps Progression
                  </Text>
                  <Text className="text-slate-500 text-xs tracking-tight mt-0.5">
                    Weekly repetition increases
                  </Text>
                </View>
              </View>
            </View>

            <View className="gap-6 pt-4 border-t border-slate-100">
              <Input
                label="Reps to add per week"
                value={repsToAddPerWeek.toString()}
                onChangeText={text => setRepsToAdd(Number(text))}
                keyboardType="numeric"
                placeholder="1"
                helperText="Number of repetitions to add each week"
              />

              <View className="gap-4">
                <View className="flex-row gap-3">
                  <View className="flex-1">
                    <Input
                      label="Min Reps"
                      value={minReps.toString()}
                      onChangeText={text => setMinReps(Number(text))}
                      keyboardType="numeric"
                      placeholder="8"
                    />
                  </View>
                  <View className="flex-1">
                    <Input
                      label="Max Reps"
                      value={maxReps.toString()}
                      onChangeText={text => setMaxReps(Number(text))}
                      keyboardType="numeric"
                      placeholder="12"
                    />
                  </View>
                </View>

                <View className="p-3 bg-green-50 rounded-xl border border-green-100">
                  <View className="flex-row items-start gap-2">
                    <Ionicons name="checkmark-circle" size={16} color="#16a34a" />
                    <Text className="flex-1 text-green-700 text-xs leading-4 tracking-tight">
                      When you reach {maxReps || '12'} repetitions, increase weight and drop back to{' '}
                      {minReps || '8'} repetitions
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Weight Progression Card */}
          <View className="gap-6 p-5 bg-white rounded-2xl shadow-sm border border-slate-100">
            <View className="flex-row items-center justify-between">
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 rounded-xl bg-purple-100 items-center justify-center">
                  <Ionicons name="barbell" size={18} color="#9333ea" />
                </View>
                <View>
                  <Text className="text-slate-900 text-base font-semibold tracking-tight">
                    Weight Progression
                  </Text>
                  <Text className="text-slate-500 text-xs tracking-tight mt-0.5">
                    Weight increases
                  </Text>
                </View>
              </View>
            </View>

            <View className="gap-6 pt-4 border-t border-slate-100">
              <Input
                label="Weight increment (kg)"
                value={weightIncrement}
                onChangeText={setWeightIncrement}
                keyboardType="decimal-pad"
                placeholder="2.5"
                helperText="Amount of weight to add when progressing"
              />

              <View className="gap-2">
                <Dropdown
                  label="Progression Priority"
                  options={progressionPriorityOptions}
                  value={priority}
                  placeholder="Select priority"
                  onSelect={value => setPriority(value)}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Fixed Bottom Buttons */}
      <BottomFixedContent className="flex-row gap-3">
        <Button
          variant="outline"
          className="flex-1"
          size="md"
          onPress={handleCancel}
          startAdornment={<Ionicons name="close" size={16} color="#0f172a" />}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          className="flex-1"
          size="md"
          onPress={handleSave}
          startAdornment={<Ionicons name="checkmark" size={16} color="white" />}
        >
          Save Rule
        </Button>
      </BottomFixedContent>

      {/* Info Modal */}
      <ProgressionRuleInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
    </SafeAreaView>
  );
}
