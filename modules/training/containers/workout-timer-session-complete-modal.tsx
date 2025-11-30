import { BottomModal } from '@/modules/core/components/bottom-modal';
import { Button } from '@/modules/core/components/button';
import { Counter } from '@/modules/core/components/counter';
import { Input } from '@/modules/core/components/input';
import { useExerciseByIdQuery } from '@/modules/exercise/hooks/use-exercise-by-id-query';
import { WorkoutSession } from '@/modules/training/types/training.types';
import { useUserProfileQuery } from '@/modules/user/hooks/use-user-profile-query';
import { useEffect, useState } from 'react';
import { View } from 'react-native';

type WorkoutTimerSessionCompleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { reps: number; weight: number }) => void;
  sessions: WorkoutSession[];
  exerciseId: string;
};

export const WorkoutTimerSessionCompleteModal = ({
  isOpen,
  onClose,
  onSubmit,
  sessions,
  exerciseId,
}: WorkoutTimerSessionCompleteModalProps) => {
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState('0');
  const { data: exercise } = useExerciseByIdQuery(exerciseId);
  const { data: userProfile } = useUserProfileQuery();

  useEffect(() => {
    if (sessions.length > 0) {
      setReps(sessions.reduce((acc, session) => acc + session.reps, 0));
      setWeight(sessions.reduce((acc, session) => acc + session.weight, 0).toString());
    }
  }, [sessions]);

  useEffect(() => {
    if (userProfile && exercise?.type === 'BODYWEIGHT_EXERCISE') {
      setWeight(userProfile.weight?.toString() || '0');
    }
  }, [exercise, userProfile]);

  const handleSubmit = () => {
    onSubmit({ reps, weight: +weight });
    onClose();
  };

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      title={`Session ${sessions.length + 1} Complete`}
    >
      <View className="gap-6">
        <Input
          label="Weight"
          value={weight}
          onChangeText={setWeight}
          keyboardType="numeric"
          helperText={
            exercise?.type === 'BODYWEIGHT_EXERCISE' &&
            'Bodyweight exercise. Set your own weight by defult. You can change it if you are using a weightlifting belt or other equipment.'
          }
        />
        <Counter
          label="Reps"
          value={reps}
          onIncrement={() => setReps(reps + 1)}
          onDecrement={() => setReps(reps - 1)}
        />
        <Button
          variant="primary"
          size="md"
          disabled={!reps || !weight}
          className="mt-2"
          onPress={handleSubmit}
        >
          Done
        </Button>
      </View>
    </BottomModal>
  );
};
