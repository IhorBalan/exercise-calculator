import { WorkoutTimer } from '@/modules/training/containers/workout-timer';
import { WorkoutTimerDetails } from '@/modules/training/containers/workout-timer-details';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutProcessScreen() {
  const navigation = useNavigation();
  const [workoutDetails, setWorkoutDetails] = useState<{
    muscleGroup: string;
    exercise: string;
  } | null>(null);

  const step = useMemo(() => {
    return !!workoutDetails ? 'timer' : 'details';
  }, [workoutDetails]);

  const isDark = useMemo(() => {
    return step === 'timer';
  }, [step]);

  // Animation values for background color
  const backgroundColorProgress = useSharedValue(isDark ? 1 : 0);

  useEffect(() => {
    backgroundColorProgress.value = withTiming(isDark ? 1 : 0, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  }, [isDark, backgroundColorProgress]);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    // Interpolate between white (#ffffff) and slate-950 (#020617)
    const r = Math.round(
      255 * (1 - backgroundColorProgress.value) + 2 * backgroundColorProgress.value
    );
    const g = Math.round(
      255 * (1 - backgroundColorProgress.value) + 6 * backgroundColorProgress.value
    );
    const b = Math.round(
      255 * (1 - backgroundColorProgress.value) + 23 * backgroundColorProgress.value
    );

    return {
      backgroundColor: `rgb(${r}, ${g}, ${b})`,
    };
  });

  return (
    <Animated.View style={[{ flex: 1 }, animatedBackgroundStyle]}>
      <SafeAreaView className="flex-1 pb-4" edges={['top', 'bottom']}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        {/* Header */}
        <View className="px-4 pt-4 pb-6 flex-row items-center justify-between">
          <Text
            className={`text-lg font-semibold tracking-tight ${isDark ? 'text-slate-300' : 'text-slate-900'}`}
          >
            {step === 'details' ? 'Workout Timer' : 'Push Up'}
          </Text>
          {step === 'details' && (
            <Pressable
              onPress={() => navigation.goBack()}
              className="w-10 h-10 items-center justify-center active:opacity-80"
            >
              <Ionicons name="close" size={24} color={isDark ? '#94a3b8' : '#1e293b'} />
            </Pressable>
          )}
        </View>
        {step === 'details' && <WorkoutTimerDetails onSubmit={setWorkoutDetails} />}
        {step === 'timer' && <WorkoutTimer />}
      </SafeAreaView>
    </Animated.View>
  );
}
