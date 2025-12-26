import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export interface MuscleGroupRule {
  label: string;
  color: string;
  textColor: string;
}

export interface MuscleGroupRuleCardProps {
  name: string;
  emoji: string;
  color: string;
  rules: MuscleGroupRule[];
  onPress: () => void;
}

export function MuscleGroupRuleCard({
  name,
  emoji,
  color,
  rules,
  onPress,
}: MuscleGroupRuleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      className="bg-background p-4 rounded-2xl shadow-sm flex-row items-center justify-between active:opacity-80"
    >
      {/* Left side - Icon and rules */}
      <View className="flex-row items-center gap-3 flex-1">
        <View
          className={`w-12 h-12 ${color} dark:bg-gray-800 rounded-xl items-center justify-center`}
        >
          <Text className="text-xl">{emoji}</Text>
        </View>
        <View className="flex-1 gap-1">
          <Text className="text-accent text-base tracking-tight">{name}</Text>
          <View className="flex-row flex-wrap gap-2">
            {rules.map((rule, ruleIndex) => (
              <View key={ruleIndex} className={`${rule.color} px-2 py-0.5 rounded-lg`}>
                <Text className={`${rule.textColor} text-xs font-medium tracking-tight`}>
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
}
