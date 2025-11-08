import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Muscle group progression rules data
const muscleGroupRules = [
  {
    name: 'Chest',
    emoji: '💪',
    color: 'bg-blue-50',
    rules: [
      { label: '+1 reps/week', color: 'bg-green-50', textColor: 'text-green-700' },
      { label: 'Max 12 reps', color: 'bg-blue-50', textColor: 'text-blue-700' },
      { label: '+2.5 kg', color: 'bg-purple-50', textColor: 'text-purple-700' },
    ],
  },
  {
    name: 'Back',
    emoji: '🏋️',
    color: 'bg-emerald-50',
    rules: [
      { label: '+1 reps/week', color: 'bg-green-50', textColor: 'text-green-700' },
      { label: 'Max 12 reps', color: 'bg-blue-50', textColor: 'text-blue-700' },
      { label: '+5 kg', color: 'bg-purple-50', textColor: 'text-purple-700' },
    ],
  },
  {
    name: 'Shoulders',
    emoji: '🎯',
    color: 'bg-purple-50',
    rules: [
      { label: '+1 reps/week', color: 'bg-green-50', textColor: 'text-green-700' },
      { label: 'Max 15 reps', color: 'bg-blue-50', textColor: 'text-blue-700' },
      { label: '+2.5 kg', color: 'bg-purple-50', textColor: 'text-purple-700' },
    ],
  },
  {
    name: 'Legs',
    emoji: '🦵',
    color: 'bg-amber-50',
    rules: [
      { label: '+1 reps/week', color: 'bg-green-50', textColor: 'text-green-700' },
      { label: 'Max 10 reps', color: 'bg-blue-50', textColor: 'text-blue-700' },
      { label: '+5 kg', color: 'bg-purple-50', textColor: 'text-purple-700' },
    ],
  },
  {
    name: 'Arms',
    emoji: '💪',
    color: 'bg-pink-50',
    rules: [
      { label: '+2 reps/week', color: 'bg-green-50', textColor: 'text-green-700' },
      { label: 'Max 15 reps', color: 'bg-blue-50', textColor: 'text-blue-700' },
      { label: '+2.5 kg', color: 'bg-purple-50', textColor: 'text-purple-700' },
    ],
  },
  {
    name: 'Core',
    emoji: '⭐',
    color: 'bg-cyan-50',
    rules: [
      { label: '+3 reps/week', color: 'bg-green-50', textColor: 'text-green-700' },
      { label: 'Max 20 reps', color: 'bg-blue-50', textColor: 'text-blue-700' },
      { label: '+2.5 kg', color: 'bg-purple-50', textColor: 'text-purple-700' },
    ],
  },
];

export default function RulesScreen() {
  const [deloadWeek, setDeloadWeek] = useState(true);
  const [restDays, setRestDays] = useState(true);
  const [autoSuggest, setAutoSuggest] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-1 gap-1">
          <Text className="text-slate-900 text-xl font-medium tracking-tight">
            Progression Rules
          </Text>
          <Text className="text-slate-600 text-base tracking-tight">
            Customize your progressive overload strategy
          </Text>
        </View>

        {/* Info Card */}
        <View className="mx-4 mt-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl flex-row gap-3">
          <Ionicons name="information-circle" size={20} color="#1c398e" />
          <Text className="flex-1 text-blue-900 text-sm leading-5 tracking-tight">
            Progressive overload is key to building strength. Set your weekly rep increases, weight
            thresholds, and progression priorities.
          </Text>
        </View>

        {/* Muscle Group Rules Section */}
        <View className="px-4 mt-6">
          <Text className="text-slate-900 text-base tracking-tight mb-4">Muscle Group Rules</Text>

          <View className="gap-3">
            {muscleGroupRules.map((group, index) => {
              // Parse rule data from labels
              const repsPerWeek = group.rules[0].label.match(/\+(\d+)/)?.[1] || '1';
              const maxReps = group.rules[1].label.match(/\d+/)?.[0] || '12';
              const weightIncrement = group.rules[2].label.match(/[\d.]+/)?.[0] || '2.5';

              return (
                <Pressable
                  key={index}
                  onPress={() =>
                    router.push({
                      pathname: '/rule-details',
                      params: {
                        muscleGroup: group.name,
                        reps: repsPerWeek,
                        minReps: '8',
                        maxReps: maxReps,
                        weightIncrement: weightIncrement,
                      },
                    })
                  }
                  className="bg-white p-4 rounded-2xl shadow-sm flex-row items-center justify-between active:opacity-80"
                >
                  {/* Left side - Icon and rules */}
                  <View className="flex-row items-center gap-3 flex-1">
                    <View
                      className={`w-12 h-12 ${group.color} rounded-xl items-center justify-center`}
                    >
                      <Text className="text-xl">{group.emoji}</Text>
                    </View>
                    <View className="flex-1 gap-1">
                      <Text className="text-slate-900 text-base tracking-tight">{group.name}</Text>
                      <View className="flex-row flex-wrap gap-2">
                        {group.rules.map((rule, ruleIndex) => (
                          <View key={ruleIndex} className={`${rule.color} px-2 py-0.5 rounded-lg`}>
                            <Text
                              className={`${rule.textColor} text-xs font-medium tracking-tight`}
                            >
                              {rule.label}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  </View>

                  {/* Right side - Edit icon */}
                  <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Custom Rules Section */}
        <View className="px-4 mt-6">
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-slate-900 text-base tracking-tight">Custom Rules</Text>
            <Pressable className="bg-blue-500 flex-row items-center gap-2 px-3 py-2 rounded-xl active:opacity-80">
              <Ionicons name="add" size={16} color="white" />
              <Text className="text-white text-sm font-medium tracking-tight">Add Rule</Text>
            </Pressable>
          </View>

          <View className="gap-3">
            {/* Deload Week */}
            <View className="bg-white p-4 rounded-2xl shadow-sm flex-row items-start justify-between">
              <View className="flex-1 gap-1">
                <Text className="text-slate-900 text-base tracking-tight">Deload Week</Text>
                <Text className="text-slate-500 text-sm tracking-tight">
                  Reduce volume by 40% every 4 weeks
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Switch
                  value={deloadWeek}
                  onValueChange={setDeloadWeek}
                  trackColor={{ false: '#cbd5e1', true: '#030213' }}
                  thumbColor="#ffffff"
                />
                <Ionicons name="settings-outline" size={16} color="#9ca3af" />
              </View>
            </View>

            {/* Rest Days */}
            <View className="bg-white p-4 rounded-2xl shadow-sm flex-row items-start justify-between">
              <View className="flex-1 gap-1">
                <Text className="text-slate-900 text-base tracking-tight">Rest Days</Text>
                <Text className="text-slate-500 text-sm tracking-tight">
                  Minimum 48 hours between same muscle group
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Switch
                  value={restDays}
                  onValueChange={setRestDays}
                  trackColor={{ false: '#cbd5e1', true: '#030213' }}
                  thumbColor="#ffffff"
                />
                <Ionicons name="settings-outline" size={16} color="#9ca3af" />
              </View>
            </View>

            {/* Auto-suggest */}
            <View className="bg-white p-4 rounded-2xl shadow-sm flex-row items-start justify-between">
              <View className="flex-1 gap-1">
                <Text className="text-slate-900 text-base tracking-tight">Auto-suggest</Text>
                <Text className="text-slate-500 text-sm tracking-tight">
                  Get suggestions when you hit a plateau
                </Text>
              </View>
              <View className="flex-row items-center gap-3">
                <Switch
                  value={autoSuggest}
                  onValueChange={setAutoSuggest}
                  trackColor={{ false: '#cbd5e1', true: '#030213' }}
                  thumbColor="#ffffff"
                />
                <Ionicons name="settings-outline" size={16} color="#9ca3af" />
              </View>
            </View>
          </View>
        </View>

        {/* Bottom spacing */}
        <View className="h-6" />
      </ScrollView>
    </SafeAreaView>
  );
}
