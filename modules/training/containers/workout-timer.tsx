import DecorationIcon from '@/assets/icons/decoration.svg';
import { AnimatedModal } from '@/modules/core/components/animated-modal';
import { Button } from '@/modules/core/components/button';
import { PlayButton } from '@/modules/core/components/play-button';
import { WorkoutTimerSessionCompleteModal } from '@/modules/training/containers/workout-timer-session-complete-modal';
import { Ionicons } from '@expo/vector-icons';
import { format, set } from 'date-fns';
import { millisecondsInSecond } from 'date-fns/constants';
import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { v4 } from 'uuid';
import { useTrainingCreateMutation } from '../hooks/use-training-create-mutation';

type CompletedSession = {
  id: string;
  duration: number;
  reps: number;
  weight: number;
  completedAt: number;
};

type WorkoutTimerProps = {
  muscleGroupId: string;
  exerciseId: string;
};

const useClockTime = () => {
  const [time, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return time;
};

type AnimatedTimerDisplayProps = {
  title: string;
  formattedTime: string;
};

const AnimatedTimerDisplay = ({ title, formattedTime }: AnimatedTimerDisplayProps) => {
  // Animation values
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(20);
  const timeOpacity = useSharedValue(0);
  const timeTranslateY = useSharedValue(20);

  // Animate on mount
  useEffect(() => {
    // Animate title
    titleOpacity.value = withTiming(1, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });
    titleTranslateY.value = withTiming(0, {
      duration: 400,
      easing: Easing.out(Easing.cubic),
    });

    // Animate time with delay
    timeOpacity.value = withDelay(
      100,
      withTiming(1, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      })
    );
    timeTranslateY.value = withDelay(
      100,
      withTiming(0, {
        duration: 400,
        easing: Easing.out(Easing.cubic),
      })
    );
  }, [titleOpacity, titleTranslateY, timeOpacity, timeTranslateY]);

  const titleAnimatedStyle = useAnimatedStyle(() => ({
    opacity: titleOpacity.value,
    transform: [{ translateY: titleTranslateY.value }],
  }));

  const timeAnimatedStyle = useAnimatedStyle(() => ({
    opacity: timeOpacity.value,
    transform: [{ translateY: timeTranslateY.value }],
  }));

  return (
    <View className="flex-1 items-center justify-center gap-6">
      <Animated.Text
        style={titleAnimatedStyle}
        className="text-white text-3xl font-semibold tracking-tight"
      >
        {title}
      </Animated.Text>
      <Animated.Text style={timeAnimatedStyle} className="text-slate-300 text-2xl font-regular">
        {formattedTime}
      </Animated.Text>
    </View>
  );
};

export const WorkoutTimer = ({ muscleGroupId, exerciseId }: WorkoutTimerProps) => {
  const [completedSessions, setCompletedSessions] = useState<CompletedSession[]>([]);
  const [sessionTime, setSessionTime] = useState(0);
  const [isSessionInProgress, setIsSessionInProgress] = useState(false);
  const [isSessionCompleteModalOpen, setIsSessionCompleteModalOpen] = useState(false);
  const [isSessionCompletedModalOpen, setIsSessionCompletedModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<'next' | 'finish' | null>(null);
  const [workoutStartedAt, setWorkoutStartedAt] = useState<number | null>(null);
  const clockTime = useClockTime();
  const lastCompletedSession = completedSessions[completedSessions.length - 1];
  const trainingCreateMutation = useTrainingCreateMutation();

  const totalDuration = useMemo(() => {
    return completedSessions.reduce(
      (sum, session) => sum + session.duration / millisecondsInSecond,
      0
    );
  }, [completedSessions]);

  const breakTime = useMemo(() => {
    if (!lastCompletedSession) return 0;
    return format(
      set(new Date(), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: clockTime - lastCompletedSession.completedAt,
      }),
      'mm:ss'
    );
  }, [clockTime, lastCompletedSession]);

  const title = useMemo(() => {
    return `Session ${completedSessions.length + 1}`;
  }, [completedSessions.length]);

  const formattedTime = useMemo(() => {
    const hours = Math.floor(sessionTime / 3600);
    const minutes = Math.floor((sessionTime % 3600) / 60);
    const seconds = sessionTime % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }, [sessionTime]);

  const handleTrainingToggle = () => {
    setWorkoutStartedAt(prev => (prev ? prev : Date.now()));
    setIsSessionInProgress(prev => !prev);
  };

  const handleSessionComplete = () => {
    setIsSessionInProgress(false);
    setIsSessionCompleteModalOpen(true);
  };

  const handleSessionCompleted = (values: { reps: number; weight: number }) => {
    setCompletedSessions(prev => [
      ...prev,
      {
        id: v4(),
        duration: sessionTime * millisecondsInSecond,
        reps: values.reps,
        weight: values.weight,
        completedAt: Date.now(),
      },
    ]);
    setSessionTime(0);
    setIsSessionCompleteModalOpen(false);
    setIsSessionCompletedModalOpen(true);
  };

  const handleNextSession = () => {
    setPendingAction('next');
    setIsSessionCompletedModalOpen(false);
  };

  const handleFinishWorkout = () => {
    setPendingAction('finish');
    setIsSessionCompletedModalOpen(false);
  };

  const handleModalAnimationComplete = () => {
    if (pendingAction === 'next') {
      setIsSessionInProgress(true);
      setPendingAction(null);
    } else if (pendingAction === 'finish') {
      trainingCreateMutation.mutate(
        {
          muscleGroupId,
          exerciseId,
          sessions: completedSessions.map(session => ({
            id: session.id,
            weight: session.weight,
            reps: session.reps,
          })),
          date: new Date().toISOString(),
        },
        {
          onSuccess: ({ id }) => {
            router.push({
              pathname: '/workout-timer-summary',
              params: {
                trainingId: id,
              },
            });
          },
          onError: error => {
            console.error('Create training error:', error);
          },
        }
      );
      setPendingAction(null);
    }
  };

  useEffect(() => {
    if (isSessionInProgress) {
      const interval = setInterval(() => {
        setSessionTime(prev => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isSessionInProgress]);

  return (
    <>
      <View className="relative flex-1 px-4 gap-8">
        {sessionTime === 0 && completedSessions.length === 0 && (
          <AnimatedTimerDisplay title="Start Workout" formattedTime="00:00" />
        )}
        {sessionTime > 0 && <AnimatedTimerDisplay title={title} formattedTime={formattedTime} />}
        <View className="flex-row justify-between items-center mt-auto px-8">
          <View className="items-center justify-center mb-16">
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <View className="items-center h-[50px] w-[50px] rounded-full bg-slate-800 justify-center">
                <Ionicons name="close" size={24} color="#f1f5f9" />
              </View>
            </Pressable>
          </View>
          <View className="relative items-center justify-center gap-12">
            <PlayButton onPress={handleTrainingToggle} isPlaying={isSessionInProgress} />
            <Text className="text-slate-300 text-sm font-regular">
              {sessionTime === 0 && 'Start Session'}
              {sessionTime > 0 && !isSessionInProgress && 'Continue Session'}
            </Text>

            <View className="absolute top-1/2 opacity-70 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10">
              <DecorationIcon width={250} height={250} />
            </View>
          </View>
          <View className="items-center justify-center mb-16">
            <Pressable onPress={handleSessionComplete}>
              <View className="items-center h-[50px] w-[50px] rounded-full bg-slate-800 justify-center">
                <Ionicons name="checkmark" size={24} color="#f1f5f9" />
              </View>
            </Pressable>
          </View>
        </View>
      </View>
      <WorkoutTimerSessionCompleteModal
        isOpen={isSessionCompleteModalOpen}
        onClose={() => setIsSessionCompleteModalOpen(false)}
        onSubmit={handleSessionCompleted}
        sessions={completedSessions}
        exerciseId={exerciseId}
      />
      {lastCompletedSession && (
        <AnimatedModal
          isOpen={isSessionCompletedModalOpen}
          onAnimationComplete={handleModalAnimationComplete}
          backdropColor="black"
          backdropOpacity={0.8}
          className="gap-6"
          contentClassName="items-center justify-center gap-6"
        >
          <Text className="text-white text-xl font-semibold tracking-tight">
            Session {completedSessions.length} Completed!
          </Text>
          <Text className="text-slate-300 text-base font-regular">
            You completed the session in{' '}
            {Math.floor(lastCompletedSession.duration / millisecondsInSecond)}
            seconds.
          </Text>
          <View className="flex-row gap-3">
            <Button variant="primary" size="md" className="" onPress={handleNextSession}>
              Next Session
            </Button>
            <Button
              variant="secondary"
              size="md"
              className=""
              isLoading={trainingCreateMutation.isPending}
              onPress={handleFinishWorkout}
            >
              Finish Workout
            </Button>
          </View>
          <View>
            <Text className="text-slate-300 text-base font-regular">Break time: {breakTime}</Text>
          </View>
        </AnimatedModal>
      )}
    </>
  );
};
