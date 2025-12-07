import { BottomModal } from '@/modules/core/components/bottom-modal';
import { Button } from '@/modules/core/components/button';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export interface ProgressionRuleInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProgressionRuleInfoModal({ isOpen, onClose }: ProgressionRuleInfoModalProps) {
  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title="About Progression Rules"
      snapPoints={['90%']}
      enableScrollableContent
    >
      <View className="gap-6 pb-4">
        {/* Introduction */}
        <View className="flex-row items-center pb-6 border-b border-divider">
          <Text className="text-body text-sm text-center leading-5 tracking-tight">
            Progression rules help you systematically increase your strength over time through
            progressive overload. By gradually increasing either repetitions or weight, you ensure
            continuous muscle adaptation and growth.
          </Text>
        </View>

        <View className="gap-4 pb-6 border-b border-divider">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900 items-center justify-center">
              <Ionicons name="repeat" size={18} color="#16a34a" />
            </View>
            <Text className="text-accent text-lg font-semibold tracking-tight">
              Reps Progression
            </Text>
          </View>
          <View className="gap-2">
            <Text className="text-body text-base leading-6 tracking-tight">
              <Text className="font-semibold">Reps to add per week:</Text> This determines how many
              repetitions you&apos;ll add to each set every week. For example, if set to 1,
              you&apos;ll add 1 rep to each set every week.
            </Text>
            <Text className="text-body text-base leading-6 tracking-tight">
              <Text className="font-semibold">Min/Max Reps:</Text> Define your rep range. When you
              reach the maximum repetitions for all sets, you should increase the weight and drop
              back to the minimum repetitions. This creates a cycle of progressive overload.
            </Text>
            <View className="mt-2 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-100 dark:border-blue-800">
              <Text className="text-blue-700 dark:text-blue-200 text-sm leading-5 tracking-tight">
                Example: If min is 8 and max is 12, you&apos;ll work from 8 reps up to 12 reps, then
                increase weight and start over at 8 reps.
              </Text>
            </View>
          </View>
        </View>

        {/* Weight Progression Section */}
        <View className="gap-4">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-900 items-center justify-center">
              <Ionicons name="barbell" size={18} color="#9333ea" />
            </View>
            <Text className="text-accent text-base font-semibold tracking-tight">
              Weight Progression
            </Text>
          </View>
          <View className="gap-2">
            <Text className="text-body text-base leading-6 tracking-tight">
              <Text className="font-semibold">Weight increment:</Text> The amount of weight (in kg)
              to add when you&apos;ve reached your maximum repetitions. Common increments are 2.5kg
              for upper body and 5kg for lower body exercises.
            </Text>
            <Text className="text-body text-base leading-6 tracking-tight">
              <Text className="font-semibold">Progression Priority:</Text> Choose your strategy for
              balancing rep increases versus weight increases:
            </Text>
            <View className="mt-2 gap-2">
              <View className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-100 dark:border-blue-800">
                <Text className="text-blue-900 dark:text-blue-300 text-sm font-semibold tracking-tight mb-1">
                  Increase reps first
                </Text>
                <Text className="text-blue-700 dark:text-blue-200 text-sm leading-5 tracking-tight">
                  Focus on adding repetitions before increasing weight. Better for building
                  endurance and technique.
                </Text>
              </View>
              <View className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-100 dark:border-blue-800">
                <Text className="text-blue-900 dark:text-blue-300 text-sm font-semibold tracking-tight mb-1">
                  Increase weight first
                </Text>
                <Text className="text-blue-700 dark:text-blue-200 text-sm leading-5 tracking-tight">
                  Prioritize weight increases over rep increases. Better for building maximum
                  strength.
                </Text>
              </View>
              <View className="p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-100 dark:border-blue-800">
                <Text className="text-blue-900 dark:text-blue-300 text-sm font-semibold tracking-tight mb-1">
                  Balanced approach
                </Text>
                <Text className="text-blue-700 dark:text-blue-200 text-sm leading-5 tracking-tight">
                  Balance between rep and weight increases. Good for overall strength and muscle
                  development.
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Set Progression Section */}
        <View className="gap-4 pt-6 border-t border-divider">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900 items-center justify-center">
              <Ionicons name="layers" size={18} color="#ea580c" />
            </View>
            <Text className="text-accent text-base font-semibold tracking-tight">
              Set Progression
            </Text>
          </View>
          <View className="gap-2">
            <Text className="text-body text-base leading-6 tracking-tight">
              <Text className="font-semibold">Volume-based set addition:</Text> When your total
              training volume (reps × weight × sets) reaches a threshold where adding a new set
              would be more beneficial than continuing to increase weight or reps, the system
              suggests adding another set.
            </Text>
            <Text className="text-body text-base leading-6 tracking-tight">
              This approach helps you accumulate more total volume without pushing single sets to
              exhaustion, promoting better muscle growth and recovery.
            </Text>
            <View className="mt-2 p-3 bg-orange-50 dark:bg-orange-900 rounded-lg border border-orange-100 dark:border-orange-800">
              <Text className="text-orange-900 dark:text-orange-300 text-sm font-semibold tracking-tight mb-1">
                Example:
              </Text>
              <Text className="text-orange-700 dark:text-orange-200 text-sm leading-5 tracking-tight">
                You start with 10 reps × 10kg × 1 set = 100 volume. As you progress to 10 reps ×
                20kg × 1 set = 200 volume, the system suggests adding a second set. You would then
                reset to 10 reps × 10kg × 2 sets = 200 volume, maintaining the same total volume but
                distributed across more sets. This allows for better form and recovery between sets.
              </Text>
            </View>
            <View className="mt-2 p-3 bg-blue-50 dark:bg-blue-900 rounded-lg border border-blue-100 dark:border-blue-800">
              <Text className="text-blue-700 dark:text-blue-200 text-sm leading-5 tracking-tight">
                💡 Tip: Adding sets is particularly effective when you&apos;ve plateaued on weight
                or rep progression, as it provides a new stimulus for muscle growth through
                increased total volume.
              </Text>
            </View>
          </View>
        </View>

        <Button variant="primary" size="md" onPress={onClose} className="mt-6">
          Close
        </Button>
      </View>
    </BottomModal>
  );
}
