import { BottomModal } from '@/modules/core/components/bottom-modal';
import { Button } from '@/modules/core/components/button';
import { Counter } from '@/modules/core/components/counter';
import { Input } from '@/modules/core/components/input';
import { useState } from 'react';
import { View } from 'react-native';

type WorkoutTimerSessionCompleteModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (values: { reps: number; weight: number }) => void;
};

export const WorkoutTimerSessionCompleteModal = ({
  isOpen,
  onClose,
  onSubmit,
}: WorkoutTimerSessionCompleteModalProps) => {
  const [reps, setReps] = useState(0);
  const [weight, setWeight] = useState('');

  const handleSubmit = () => {
    onSubmit({ reps, weight: +weight });
    onClose();
  };
  return (
    <BottomModal isOpen={isOpen} onClose={onClose} title="Push Up Session 1 Complete">
      <View className="gap-6">
        <Input label="Weight" value={weight} onChangeText={setWeight} keyboardType="numeric" />
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
