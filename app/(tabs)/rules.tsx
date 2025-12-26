import { Button } from '@/modules/core/components/button';
import { Ionicons } from '@expo/vector-icons';
import { useColorScheme } from 'nativewind';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { MuscleGroupRuleCard } from '@/modules/muscle-group/components/muscle-group-rule-card';
import { ProgressionRuleDetailsModal } from '@/modules/progression-rule/containers/progression-rule-details-modal';
import { ProgressionRuleInfoModal } from '@/modules/progression-rule/containers/progression-rule-info-modal';
import { router } from 'expo-router';

// Muscle group progression rules data
const muscleGroupRules = [
  {
    name: 'Bench Press',
    emoji: '💪',
    color: 'bg-blue-50',
    rules: [
      {
        label: '+1 reps/week',
        color: 'bg-green-50 dark:bg-green-900',
        textColor: 'text-green-700 dark:text-green-300',
      },
      {
        label: 'Max 12 reps',
        color: 'bg-blue-50 dark:bg-blue-900',
        textColor: 'text-blue-700 dark:text-blue-300',
      },
      {
        label: '+2.5 kg',
        color: 'bg-purple-50 dark:bg-purple-900',
        textColor: 'text-purple-700 dark:text-purple-300',
      },
    ],
  },
];

export default function RulesScreen() {
  const { colorScheme } = useColorScheme();
  const [deloadWeek, setDeloadWeek] = useState(true);
  const [restDays, setRestDays] = useState(true);
  const [autoSuggest, setAutoSuggest] = useState(false);
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const [isProgressionRuleDetailsModalOpen, setIsProgressionRuleDetailsModalOpen] = useState(false);

  // Theme-aware colors
  const infoIconColor = colorScheme === 'dark' ? '#60A5FA' : '#3B82F6';
  const switchTrackColorFalse = colorScheme === 'dark' ? '#475569' : '#CBD5E1';
  const switchTrackColorTrue = colorScheme === 'dark' ? '#60A5FA' : '#3B82F6';

  return (
    <SafeAreaView className="flex-1 bg-background-page" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <View className="px-4 pt-8 pb-6 gap-1">
          <Text className="text-accent text-xl font-medium tracking-tight">Progression Rules</Text>
          <Text className="text-body text-base tracking-tight">
            Customize your progressive overload strategy
          </Text>
        </View>
        <Pressable onPress={() => setIsInfoModalOpen(true)}>
          <View className="mx-4 p-4 bg-background rounded-2xl shadow-sm gap-4">
            <View className="flex-row gap-4 items-center">
              <View className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl items-center justify-center">
                <Ionicons name="information-circle-outline" size={24} color={infoIconColor} />
              </View>
              <View className="flex-1 gap-2">
                <Text className="text-body text-sm leading-5 tracking-tight font-regular">
                  Set simple rules that tell you when to add more reps and when to increase weight.
                </Text>
                {/* <Button
                variant="outline"
                size="sm"
                onPress={() => setIsInfoModalOpen(true)}
                className="self-start border-slate-200"
              >
                More info
              </Button> */}
              </View>
            </View>
          </View>
        </Pressable>

        <View className="px-4 mt-8">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-accent font-medium text-base tracking-tight">
              Your Exercise Rules
            </Text>
            <Button
              variant="primary"
              size="sm"
              startAdornment={<Ionicons name="add" size={16} color="white" />}
              onPress={() => router.push('/rule-details')}
            >
              Add Rule
            </Button>
          </View>

          <View className="gap-4">
            {muscleGroupRules.map((group, index) => (
              <MuscleGroupRuleCard
                key={index}
                name={group.name}
                emoji={group.emoji}
                color={group.color}
                rules={group.rules}
                onPress={() => setIsProgressionRuleDetailsModalOpen(true)}
              />
            ))}
          </View>
        </View>
        <View className="px-4 mt-8">
          <View className="flex-row items-center justify-between mb-6">
            <Text className="text-accent text-base font-medium tracking-tight">
              Advanced Settings
            </Text>
          </View>

          <View className="gap-3">
            <View className="bg-background p-4 rounded-2xl shadow-sm flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="text-accent text-base tracking-tight">Deload Week</Text>
                <Text className="text-body text-sm tracking-tight">
                  Reduce volume by 40% every 4 weeks
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Switch
                  value={deloadWeek}
                  onValueChange={setDeloadWeek}
                  trackColor={{ false: switchTrackColorFalse, true: switchTrackColorTrue }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>

            <View className="bg-background p-4 rounded-2xl shadow-sm flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="text-accent text-base tracking-tight">Rest Days</Text>
                <Text className="text-body text-sm tracking-tight">
                  Minimum 48 hours between same muscle group
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Switch
                  value={restDays}
                  onValueChange={setRestDays}
                  trackColor={{ false: switchTrackColorFalse, true: switchTrackColorTrue }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>

            {/* Auto-suggest */}
            <View className="bg-background p-4 rounded-2xl shadow-sm flex-row items-center justify-between">
              <View className="flex-1 gap-1">
                <Text className="text-accent text-base tracking-tight">Auto-suggest</Text>
                <Text className="text-body text-sm tracking-tight">
                  Get suggestions when you hit a plateau
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Switch
                  value={autoSuggest}
                  onValueChange={setAutoSuggest}
                  trackColor={{ false: switchTrackColorFalse, true: switchTrackColorTrue }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>

      {/* Progression Rule Info Modal */}
      <ProgressionRuleInfoModal
        isOpen={isInfoModalOpen}
        onClose={() => setIsInfoModalOpen(false)}
      />
      <ProgressionRuleDetailsModal
        isOpen={isProgressionRuleDetailsModalOpen}
        onClose={() => setIsProgressionRuleDetailsModalOpen(false)}
      />
    </SafeAreaView>
  );
}
