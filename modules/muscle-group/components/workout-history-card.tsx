import { type Exercise } from '@/modules/exercise/types/exercise.types';
import { Training } from '@/modules/training/types/training.types';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export interface WorkoutHistoryCardProps {
  date: string;
  trainingCount: number;
  trainings: (Training & { exercise: Exercise })[];
}

interface SwipeableTrainingItemProps {
  training: Training & { exercise: Exercise };
}

function SwipeableTrainingItem({ training }: SwipeableTrainingItemProps) {
  const translateX = useSharedValue(0);
  const SWIPE_THRESHOLD = -80;
  const DELETE_BUTTON_WIDTH = 80;

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10]) // Only activate when horizontal movement exceeds 10px
    .failOffsetY([-10, 10]) // Fail if vertical movement exceeds 10px (allows vertical scroll)
    .onUpdate(e => {
      // Only allow swiping left (negative values)
      if (e.translationX < 0) {
        translateX.value = e.translationX;
      }
    })
    .onEnd(e => {
      // If swiped past threshold, snap to delete position
      if (e.translationX < SWIPE_THRESHOLD) {
        translateX.value = withSpring(-DELETE_BUTTON_WIDTH);
      } else {
        // Otherwise, snap back to original position
        translateX.value = withSpring(0);
      }
    });

  const animatedCardStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  const animatedDeleteStyle = useAnimatedStyle(() => {
    return {
      opacity: translateX.value < -10 ? 1 : 0,
      transform: [{ translateX: translateX.value + DELETE_BUTTON_WIDTH }],
    };
  });

  const handleDelete = () => {
    translateX.value = withSpring(0);
  };

  const description = useMemo(() => {
    if (!training.sessions || training.sessions.length === 0) {
      return 'No sessions recorded';
    }

    const sessionsCount = training.sessions.length;
    const totalReps = training.sessions.reduce((acc, session) => acc + session.reps, 0);
    const avgWeight = getTrainingVolume(training) / totalReps;

    return `${sessionsCount} sessions • ${totalReps} reps • ${avgWeight} kg avg `;
  }, [training]);

  return (
    <View className="overflow-hidden rounded-xl">
      <Animated.View
        style={[
          animatedDeleteStyle,
          {
            position: 'absolute',
            right: 0,
            top: 0,
            bottom: 0,
            width: DELETE_BUTTON_WIDTH,
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}
      >
        <Pressable
          onPress={handleDelete}
          className="w-full h-full bg-red-500 items-center rounded-r-xl justify-center active:opacity-80"
        >
          <Ionicons name="trash" size={20} color="#ffffff" />
        </Pressable>
      </Animated.View>

      {/* Main Content */}
      <GestureDetector gesture={panGesture}>
        <Animated.View
          style={animatedCardStyle}
          className="bg-slate-50 p-3 gap-2 border border-slate-100 rounded-xl"
        >
          <View className="flex-row items-start justify-between">
            <View className="flex-1 gap-1">
              <Text className="text-slate-900 text-base tracking-tight">
                {training.exercise.name}
              </Text>
              <Text className="text-slate-500 text-sm tracking-tight">{description}</Text>
            </View>
            <Text className="text-slate-600 text-base tracking-tight">
              {getTrainingVolume(training)} kg
            </Text>
          </View>
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

export function WorkoutHistoryCard({ date, trainingCount, trainings }: WorkoutHistoryCardProps) {
  return (
    <View className="bg-white p-4 rounded-3xl shadow-sm gap-6">
      <View className="flex-row items-center justify-between">
        <Text className="text-slate-900 text-base tracking-tight">
          {format(date, 'MMM d, yyyy')}
        </Text>
        <View className="bg-blue-100 px-2 py-1 rounded-lg">
          <Text className="text-blue-500 text-xs font-medium">{trainingCount} trainings</Text>
        </View>
      </View>

      <View className="gap-3">
        {trainings.map((training, trainingIndex) => (
          <SwipeableTrainingItem key={trainingIndex} training={training} />
        ))}
      </View>
    </View>
  );
}
