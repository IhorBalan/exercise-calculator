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
          <Text className="text-body text-sm text-center font-regular leading-5 tracking-tight">
            Progression rules help you systematically increase your strength over time through
            progressive overload. By gradually increasing either repetitions, weight or sets, you
            ensure continuous muscle adaptation and growth.
          </Text>
        </View>

        <View className="gap-6 pb-6 border-b border-divider">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl shadow-sm border border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900 items-center justify-center">
              <Ionicons name="repeat" size={18} color="#16a34a" />
            </View>
            <Text className="text-accent text-lg font-semibold tracking-tight">
              Reps Progression
            </Text>
          </View>
          <View className="gap-4 pt-2">
            <View className="gap-2">
              <Text className="text-accent text-sm font-semibold tracking-tight">
                Reps increment
              </Text>
              <Text className="text-body text-sm leading-5 tracking-tight">
                Determines how many repetitions you&apos;ll add to each set when progressing.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-accent text-sm font-semibold tracking-tight">Min Reps</Text>
              <Text className="text-body text-sm leading-5 tracking-tight">
                The minimum number of repetitions you should aim for. The rule algorithm will
                determine the number of repetitions to do but not less than this number.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-accent text-sm font-semibold tracking-tight">Max Reps</Text>
              <Text className="text-body text-sm leading-5 tracking-tight">
                The maximum number of repetitions you should aim for. The rule algorithm will
                determine the number of repetitions to do but not more than this number.
              </Text>
            </View>
          </View>
        </View>

        {/* Weight Progression Section */}
        <View className="gap-6">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl shadow-sm border border-purple-200 dark:border-purple-800 bg-purple-100 dark:bg-purple-900 items-center justify-center">
              <Ionicons name="barbell" size={18} color="#9333ea" />
            </View>
            <Text className="text-accent text-lg font-semibold tracking-tight">
              Weight Progression
            </Text>
          </View>
          <View className="gap-4 pt-2">
            <View className="gap-2">
              <Text className="text-accent text-sm font-semibold tracking-tight">
                Weight increment
              </Text>
              <Text className="text-body text-sm leading-5 tracking-tight">
                Determines the amount of weight to add when progressing. Common increments are 2.5kg
                for upper body and 5kg for lower body exercises.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-accent text-sm font-semibold tracking-tight">Min Weight</Text>
              <Text className="text-body text-sm leading-5 tracking-tight">
                The minimum weight you should aim for. The rule algorithm will determine the weight
                to do but not less than this number.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-accent text-sm font-semibold tracking-tight">Max Weight</Text>
              <Text className="text-body text-sm leading-5 tracking-tight">
                The maximum weight you should aim for. The rule algorithm will determine the weight
                to do but not more than this number.
              </Text>
            </View>
          </View>
        </View>

        {/* Set Progression Section */}
        <View className="gap-4 pt-6 border-t border-divider">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl bg-orange-100 dark:bg-orange-900 items-center justify-center">
              <Ionicons name="layers" size={18} color="#ea580c" />
            </View>
            <Text className="text-accent text-lg font-semibold tracking-tight">
              Set Progression
            </Text>
          </View>
          <View className="gap-4 pt-2">
            <View className="gap-2">
              <Text className="text-accent text-sm font-semibold tracking-tight">Min Sets</Text>
              <Text className="text-body text-sm leading-5 tracking-tight">
                The minimum number of sets you should aim for. The rule algorithm will determine the
                number of sets to do but not less than this number.
              </Text>
            </View>
            <View className="gap-2">
              <Text className="text-accent text-sm font-semibold tracking-tight">Max Sets</Text>
              <Text className="text-body text-sm leading-5 tracking-tight">
                The maximum number of sets you should aim for. The rule algorithm will determine the
                number of sets to do but not more than this number.
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
