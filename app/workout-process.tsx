import { useExerciseByIdQuery } from '@/modules/exercise/hooks/use-exercise-by-id-query';
import { WorkoutTimer } from '@/modules/training/containers/workout-timer';
import { WorkoutTimerDetails } from '@/modules/training/containers/workout-timer-details';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useColorScheme } from 'nativewind';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WorkoutProcessScreen() {
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation();
  const [workoutDetails, setWorkoutDetails] = useState<{
    muscleGroup: string;
    exercise: string;
  } | null>(null);

  const { data: exercise } = useExerciseByIdQuery(workoutDetails?.exercise || '');

  const step = useMemo(() => {
    return !!workoutDetails ? 'timer' : 'details';
  }, [workoutDetails]);

  // Timer step is always dark, details step respects theme
  const isDark = useMemo(() => {
    return step === 'timer' || colorScheme === 'dark';
  }, [step, colorScheme]);

  // Animation values for background color
  const backgroundColorProgress = useSharedValue(isDark ? 1 : 0);

  useEffect(() => {
    backgroundColorProgress.value = withTiming(isDark ? 1 : 0, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
  }, [isDark, backgroundColorProgress]);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    // Define colors based on theme
    // Light mode details: white (#ffffff = 255, 255, 255)
    // Dark mode details: slate-900 (#0f172a = 15, 23, 42)
    // Timer mode: slate-950 (#020617 = 2, 6, 23)
    const detailsR = colorScheme === 'dark' ? 15 : 255;
    const detailsG = colorScheme === 'dark' ? 23 : 255;
    const detailsB = colorScheme === 'dark' ? 42 : 255;

    const timerR = 2;
    const timerG = 6;
    const timerB = 23;

    // Interpolate between details and timer colors
    const r = Math.round(
      detailsR * (1 - backgroundColorProgress.value) + timerR * backgroundColorProgress.value
    );
    const g = Math.round(
      detailsG * (1 - backgroundColorProgress.value) + timerG * backgroundColorProgress.value
    );
    const b = Math.round(
      detailsB * (1 - backgroundColorProgress.value) + timerB * backgroundColorProgress.value
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
            className={`text-lg font-semibold tracking-tight ${
              step === 'timer' ? 'text-slate-300' : 'text-accent'
            }`}
          >
            {step === 'details' ? 'Workout Timer' : exercise?.name}
          </Text>
          {step === 'details' && (
            <Pressable
              onPress={() => navigation.goBack()}
              className="w-10 h-10 items-center justify-center active:opacity-80"
            >
              <Ionicons
                name="close"
                size={24}
                color={colorScheme === 'dark' ? '#94a3b8' : '#1e293b'}
              />
            </Pressable>
          )}
        </View>
        {step === 'details' && <WorkoutTimerDetails onSubmit={setWorkoutDetails} />}
        {step === 'timer' && workoutDetails && (
          <WorkoutTimer
            muscleGroupId={workoutDetails.muscleGroup}
            exerciseId={workoutDetails.exercise}
          />
        )}
      </SafeAreaView>
    </Animated.View>
  );
}
