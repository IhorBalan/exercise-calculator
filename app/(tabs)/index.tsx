import { MuscleGroupListContainer } from '@/modules/muscle-group/containers/muscle-group-list-container';
import { TotalVolumeCard } from '@/modules/volume/containers/total-volume-card';
import { WeeklyVolumeChart } from '@/modules/volume/containers/weekly-volume-chart';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Pressable, ScrollView, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AddWorkoutModal } from '@/modules/training/containers/add-training-modal';

export default function HomeScreen() {
  const [isAddWorkoutOpen, setIsAddWorkoutOpen] = useState(false);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(20);

  // Content wrapper animation
  const contentOpacity = useSharedValue(0);

  useEffect(() => {
    // Animate "Welcome back!" text
    titleOpacity.value = withTiming(1, { duration: 600 });
    titleTranslateY.value = withTiming(0, { duration: 600 });

    // Animate "Here's your progress this week" text with delay
    subtitleOpacity.value = withDelay(200, withTiming(1, { duration: 600 }));
    subtitleTranslateY.value = withDelay(200, withTiming(0, { duration: 600 }));

    // Animate content sections after welcome text
    // "Welcome back" takes 600ms, subtitle finishes at 800ms, so delay by 1000ms
    contentOpacity.value = withDelay(1000, withTiming(1, { duration: 200 }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const subtitleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: subtitleOpacity.value,
    transform: [{ translateY: subtitleTranslateY.value }],
  }));

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-6 gap-1">
          <Animated.Text
            style={titleAnimatedStyle}
            className="text-slate-900 text-xl font-medium tracking-tight"
          >
            Welcome back!
          </Animated.Text>
          <Animated.Text
            style={subtitleAnimatedStyle}
            className="text-slate-600 text-base tracking-tight"
          >
            Here&apos;s your progress this week
          </Animated.Text>
        </View>

        <Animated.View style={[contentAnimatedStyle, { paddingBottom: 30 }]}>
          <TotalVolumeCard />

          <WeeklyVolumeChart />

          {/* Muscle Groups Section */}
          <MuscleGroupListContainer />
        </Animated.View>
      </ScrollView>

      {/* Floating Action Button */}
      <Animated.View style={contentAnimatedStyle}>
        <Pressable
          onPress={() => setIsAddWorkoutOpen(true)}
          className="absolute bottom-10 right-4 w-16 h-16 bg-blue-500 rounded-full shadow-xl items-center justify-center active:opacity-80"
        >
          <Ionicons name="add" size={24} color="white" />
        </Pressable>
      </Animated.View>

      {/* Add Workout Modal */}
      <AddWorkoutModal isOpen={isAddWorkoutOpen} onClose={() => setIsAddWorkoutOpen(false)} />
    </SafeAreaView>
  );
}
