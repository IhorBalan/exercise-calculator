import { BottomModal } from '@/modules/core/components/bottom-modal';
import { Button } from '@/modules/core/components/button';
import { Ionicons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

export interface ProgressionRuleDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ProgressionRuleDetailsModal({ isOpen, onClose }: ProgressionRuleDetailsModalProps) {
  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title="Bench Press"
      snapPoints={['90%']}
      enableScrollableContent
    >
      <View className="gap-6 pb-4">
        {/* Introduction */}
        <View className="flex-row items-center pb-6">
          <Text className="text-body mx-auto text-base text-center font-medium leading-6 tracking-tight">
            Progression rule for Bench Press
          </Text>
        </View>

        {/* Next Training Suggestion Section */}
        <View className="bg-blue-500 dark:bg-blue-900/20 p-5 rounded-2xl shadow-md border border-blue-400 dark:border-blue-800/50">
          <View className="flex-row items-center justify-between mb-4">
            <View className="flex-row items-center gap-3">
              <View className="w-10 h-10 rounded-xl shadow-sm border border-blue-300 dark:border-blue-800 bg-blue-400 dark:bg-blue-900 items-center justify-center">
                <Ionicons name="calendar" size={18} color="#ffffff" />
              </View>
              <Text className="text-white dark:text-accent text-lg font-semibold tracking-tight">
                Next Training Suggestion (Week 1)
              </Text>
            </View>
          </View>
          <View className="gap-3">
            <View className="flex-row items-center gap-2">
              <Text className="text-white dark:text-body text-base font-medium leading-6 tracking-tight">
                <Text className="font-semibold">Sets: 3</Text>
              </Text>
              <Ionicons name="arrow-up" size={16} color="#86efac" />
              <Text className="text-white/80 dark:text-body text-xs tracking-tight">
                +1 compared to latest training
              </Text>
            </View>
            <Text className="text-white dark:text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-semibold">Reps: 10</Text>
            </Text>
            <Text className="text-white dark:text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-semibold">Weight: 15kg</Text>
            </Text>
          </View>
        </View>

        <View className="gap-6 pb-6 mt-4 border-b border-divider">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 rounded-xl shadow-sm border border-green-200 dark:border-green-800 bg-green-100 dark:bg-green-900 items-center justify-center">
              <Ionicons name="repeat" size={18} color="#16a34a" />
            </View>
            <Text className="text-accent text-lg font-semibold tracking-tight">
              Reps Progression
            </Text>
          </View>
          <View className="gap-4">
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Reps increment: 1</Text>
            </Text>
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Min Reps: 8</Text>
            </Text>
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Max Reps: 12</Text>
            </Text>
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
          <View className="gap-4">
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Weight increment: 2.5kg</Text>
            </Text>
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Min Weight: 10kg</Text>
            </Text>
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Max Weight: 20kg</Text>
            </Text>
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
          <View className="gap-4">
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Sets increment: 1</Text>
            </Text>
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Min Sets: 3</Text>
            </Text>
            <Text className="text-body text-base font-medium leading-6 tracking-tight">
              <Text className="font-regular text-accent">Max Weight: 5 </Text>
            </Text>
          </View>
        </View>

        <View className="gap-4 mt-6 flex-row">
          <Button variant="outline" size="md" onPress={onClose} className="flex-1">
            Close
          </Button>
          <Button variant="primary" size="md" onPress={onClose} className="flex-1">
            Edit
          </Button>
        </View>
      </View>
    </BottomModal>
  );
}
