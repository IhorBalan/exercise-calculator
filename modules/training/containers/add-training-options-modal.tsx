import { BottomModal } from '@/modules/core/components/bottom-modal';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, Text, View } from 'react-native';

type AddTrainingOptionsModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddTrainingOptionsModal = ({ isOpen, onClose }: AddTrainingOptionsModalProps) => {
  return (
    <BottomModal isOpen={isOpen} onClose={onClose}>
      <View className="">
        <Pressable
          onPress={() => {
            onClose();
            router.push('/workout-process');
          }}
          className="bg-white py-4 rounded-2xl flex-row items-center justify-between active:opacity-80 border-b border-slate-100"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-blue-50 rounded-xl items-center justify-center">
              <Ionicons name="barbell-outline" size={20} color="#3b82f6" />
            </View>
            <Text className="text-slate-900 text-base font-medium tracking-tight">
              Start Workout
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </Pressable>

        <Pressable
          onPress={() => {
            onClose();
            router.push('/add-training');
          }}
          className="bg-white py-4 rounded-2xl flex-row items-center justify-between active:opacity-80"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-purple-50 rounded-xl items-center justify-center">
              <Ionicons name="flash-outline" size={20} color="#a855f7" />
            </View>
            <Text className="text-slate-900 text-base font-medium tracking-tight">Quick Add</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
        </Pressable>
      </View>
    </BottomModal>
  );
};
