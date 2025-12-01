import { Button } from '@/modules/core/components/button';
import { Counter } from '@/modules/core/components/counter';
import { DateTimePickerComponent } from '@/modules/core/components/date-time-picker';
import { Dropdown, type DropdownOption } from '@/modules/core/components/dropdown';
import { Input } from '@/modules/core/components/input';
import { useExercisesListQuery } from '@/modules/exercise/hooks/use-exercises-list-query';
import {
  MUSCLE_GROUP_LIST_QUERY_KEY,
  useMuscleGroupListQuery,
} from '@/modules/muscle-group/hooks/use-muscle-group-list-query';
import { getIsTrainingRecord } from '@/modules/training/api/training.api';
import { RecordCelebrationModal } from '@/modules/training/components/record-celebration-modal';
import { useTrainingCreateMutation } from '@/modules/training/hooks/use-training-create-mutation';
import { TRAINING_HISTORY_OF_EXERCISE_QUERY_KEY } from '@/modules/training/hooks/use-training-history-of-exercise-query';
import { TRAINING_HISTORY_OF_MUSCLE_GROUP_QUERY_KEY } from '@/modules/training/hooks/use-training-history-of-muscle-group-query';
import { TRAINING_LIST_QUERY_KEY } from '@/modules/training/hooks/use-training-list-query';
import { TRAINING_RECORDS_QUERY_KEY } from '@/modules/training/hooks/use-training-records-query';
import { useUserProfileQuery } from '@/modules/user/hooks/use-user-profile-query';
import { WEEKLY_VOLUME_QUERY_KEY } from '@/modules/volume/hooks/use-weekly-volume-query';
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Keyboard, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { v4 } from 'uuid';
import { z } from 'zod';

const addTrainingSchema = z.object({
  muscleGroupId: z.string().min(1, 'Muscle group is required'),
  exerciseId: z.string().min(1, 'Exercise is required'),
  date: z.date(),
  time: z.date(),
  sessions: z
    .array(
      z.object({
        weight: z.string().refine(
          value => {
            if (!value || !value.trim()) return false;
            const numValue = parseFloat(value);
            return !isNaN(numValue) && numValue > 0;
          },
          {
            message: 'Please enter a valid weight',
          }
        ),
        reps: z.number().min(1, 'Reps must be at least 1'),
      })
    )
    .min(1, 'At least one session is required'),
});

type FormData = z.infer<typeof addTrainingSchema>;

export default function AddTrainingScreen() {
  const params = useLocalSearchParams();
  const navigation = useNavigation();
  const frozenMuscleGroupId = (params.muscleGroupId as string) || undefined;
  const frozenExerciseId = (params.exerciseId as string) || undefined;

  const queryClient = useQueryClient();
  const { data: muscleGroupList } = useMuscleGroupListQuery();
  const trainingCreateMutation = useTrainingCreateMutation();
  const { data: userProfile } = useUserProfileQuery();

  const now = new Date();
  const defaultDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const defaultTime = new Date(2000, 0, 1, now.getHours(), now.getMinutes());

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(addTrainingSchema),
    defaultValues: {
      muscleGroupId: frozenMuscleGroupId || '',
      exerciseId: frozenExerciseId || '',
      date: defaultDate,
      time: defaultTime,
      sessions: [{ weight: '0', reps: 10 }],
    },
    mode: 'onChange',
  });

  const selectedMuscleGroup = watch('muscleGroupId');
  const selectedExercise = watch('exerciseId');
  const sessions = watch('sessions');

  const { data: exercisesList } = useExercisesListQuery(selectedMuscleGroup);
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'sessions',
  });

  const [newTrainingRecordId, setNewTrainingRecordId] = useState<string | null>(null);

  const selectedExerciseData = useMemo(() => {
    return exercisesList?.find(exercise => exercise.id === selectedExercise) || null;
  }, [selectedExercise, exercisesList]);

  const weightFieldConfig = useMemo(() => {
    switch (selectedExerciseData?.type) {
      case 'BODYWEIGHT_EXERCISE':
        return {
          editable: true,
          info: 'Bodyweight exercise. Set your own weight by defult. You can change it if you are using a weightlifting belt or other equipment.',
        };
      case 'EQUIPMENT_EXERCISE':
        return {
          editable: true,
        };
    }

    return {
      editable: false,
    };
  }, [selectedExerciseData]);

  // Set default weight for bodyweight exercises
  useEffect(() => {
    if (
      userProfile &&
      selectedExerciseData?.type === 'BODYWEIGHT_EXERCISE' &&
      sessions.length > 0
    ) {
      const defaultWeight = userProfile.weight?.toString() || '0';
      sessions.forEach((_, index) => {
        if (!sessions[index].weight || sessions[index].weight === '0') {
          setValue(`sessions.${index}.weight`, defaultWeight);
        }
      });
    }
  }, [userProfile, selectedExerciseData, sessions, setValue]);

  // Reset exercise when muscle group changes
  useEffect(() => {
    if (selectedMuscleGroup && !frozenMuscleGroupId) {
      setValue('exerciseId', '');
    }
  }, [selectedMuscleGroup, frozenMuscleGroupId, setValue]);

  // Convert muscle groups to dropdown options
  const muscleGroupOptions: DropdownOption[] =
    muscleGroupList?.map(group => ({
      label: group.name,
      value: group.id,
    })) || [];

  // Get exercise options based on selected muscle group
  const exerciseOptions: DropdownOption[] = useMemo(() => {
    if (!selectedMuscleGroup) return [];

    return (
      exercisesList?.map(exercise => ({
        label: exercise.name,
        value: exercise.id,
      })) || []
    );
  }, [selectedMuscleGroup, exercisesList]);

  const handleAddSession = () => {
    const lastSession = sessions[sessions.length - 1];
    append({
      weight: lastSession?.weight || '0',
      reps: lastSession?.reps || 10,
    });
  };

  const handleRemoveSession = (index: number) => {
    if (sessions.length > 1) {
      remove(index);
    }
  };

  const onSubmit = async (data: FormData) => {
    // Combine date and time into a single Date object
    const combinedDate = new Date(data.date);
    combinedDate.setHours(data.time.getHours());
    combinedDate.setMinutes(data.time.getMinutes());
    combinedDate.setSeconds(0);
    combinedDate.setMilliseconds(0);

    trainingCreateMutation.mutate(
      {
        muscleGroupId: data.muscleGroupId,
        exerciseId: data.exerciseId,
        sessions: data.sessions.map(session => ({
          id: v4(),
          weight: parseFloat(session.weight),
          reps: session.reps,
        })),
        date: combinedDate.toISOString(),
      },
      {
        onSuccess: async response => {
          reset();

          const isNewRecord = await getIsTrainingRecord(response.id);

          if (isNewRecord) {
            setNewTrainingRecordId(response.id);
          } else {
            router.back();
          }

          queryClient.invalidateQueries({ queryKey: [WEEKLY_VOLUME_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [TRAINING_LIST_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [TRAINING_HISTORY_OF_MUSCLE_GROUP_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [TRAINING_HISTORY_OF_EXERCISE_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [MUSCLE_GROUP_LIST_QUERY_KEY] });
          queryClient.invalidateQueries({ queryKey: [TRAINING_RECORDS_QUERY_KEY] });
        },
        onError: error => {
          console.error('Create training error:', error);
        },
      }
    );
  };

  const handleClose = () => {
    Keyboard.dismiss();
    reset();
    router.back();
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <>
      <SafeAreaView className="flex-1 bg-white" edges={['top', 'bottom']}>
        <View className="px-4 pt-4 pb-4 flex-row items-center justify-between border-slate-100">
          <Text className="text-slate-900 text-lg font-semibold tracking-tight">New Training</Text>
          <Pressable
            onPress={handleClose}
            className="w-10 h-10 items-center justify-center active:opacity-80"
          >
            <Ionicons name="close" size={24} color="#1e293b" />
          </Pressable>
        </View>

        <ScrollView className="flex-1" keyboardShouldPersistTaps="handled">
          <View className="gap-6 px-4 pt-6">
            <Controller
              control={control}
              name="muscleGroupId"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Muscle Group"
                  options={muscleGroupOptions}
                  value={value}
                  placeholder="Select muscle group"
                  onSelect={onChange}
                  disabled={!!frozenMuscleGroupId}
                />
              )}
            />
            {errors.muscleGroupId && (
              <Text className="text-red-500 text-sm tracking-tight px-4">
                {errors.muscleGroupId.message}
              </Text>
            )}

            <Controller
              control={control}
              name="exerciseId"
              render={({ field: { onChange, value } }) => (
                <Dropdown
                  label="Exercise"
                  options={exerciseOptions}
                  value={value}
                  placeholder="Select exercise"
                  onSelect={onChange}
                  disabled={!selectedMuscleGroup || !!frozenExerciseId}
                />
              )}
            />
            {errors.exerciseId && (
              <Text className="text-red-500 text-sm tracking-tight px-4">
                {errors.exerciseId.message}
              </Text>
            )}

            <View className="flex-row gap-4">
              <View className="flex-1">
                <Controller
                  control={control}
                  name="date"
                  render={({ field: { onChange, value } }) => (
                    <DateTimePickerComponent
                      label="Date"
                      value={value}
                      onChange={onChange}
                      mode="date"
                      error={errors.date?.message}
                      maximumDate={new Date()}
                    />
                  )}
                />
              </View>
              <View className="flex-1">
                <Controller
                  control={control}
                  name="time"
                  render={({ field: { onChange, value } }) => (
                    <DateTimePickerComponent
                      label="Time"
                      value={value}
                      onChange={onChange}
                      mode="time"
                      error={errors.time?.message}
                    />
                  )}
                />
              </View>
            </View>

            <Counter
              label="Sessions"
              value={fields.length || 0}
              onIncrement={() => handleAddSession()}
              onDecrement={() => handleRemoveSession(fields.length - 1)}
              min={1}
            />

            <View className="gap-4">
              {fields.map((field, index) => (
                <View
                  key={field.id}
                  className="gap-4 shadow-sm border border-slate-100 bg-white p-4 rounded-xl"
                >
                  <View className="flex-row items-center justify-between">
                    <Text className="text-blue-600 text-sm font-medium tracking-tight">
                      Session {index + 1}
                    </Text>
                  </View>
                  <View className="flex-row gap-2">
                    <View className="flex-1">
                      <Controller
                        control={control}
                        name={`sessions.${index}.weight`}
                        render={({ field: { onChange, onBlur, value } }) => (
                          <Input
                            label="Weight (kg)"
                            value={value}
                            onChangeText={onChange}
                            onBlur={onBlur}
                            keyboardType="numeric"
                            editable={weightFieldConfig.editable}
                            helperText={index === 0 ? weightFieldConfig.info : undefined}
                            placeholder="50"
                            returnKeyType="done"
                            onSubmitEditing={dismissKeyboard}
                            error={errors.sessions?.[index]?.weight?.message}
                          />
                        )}
                      />
                    </View>
                    <View className="flex-1">
                      <Controller
                        control={control}
                        name={`sessions.${index}.reps`}
                        render={({ field: { onChange, value } }) => (
                          <Counter
                            label="Reps"
                            value={value}
                            onIncrement={() => onChange(value + 1)}
                            onDecrement={() => onChange(Math.max(1, value - 1))}
                            min={1}
                          />
                        )}
                      />
                    </View>
                  </View>
                </View>
              ))}
            </View>
            {errors.sessions && (
              <Text className="text-red-500 text-sm tracking-tight px-4">
                {errors.sessions.message}
              </Text>
            )}
          </View>
          <View className="flex-row gap-3 px-4 mt-6 pb-6">
            <Button
              variant="primary"
              size="md"
              className="flex-1"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
            >
              Save Training
            </Button>
          </View>
        </ScrollView>
      </SafeAreaView>

      <RecordCelebrationModal
        isOpen={!!newTrainingRecordId}
        trainingId={newTrainingRecordId}
        onClose={() => {
          setNewTrainingRecordId(null);
          navigation.goBack();
        }}
      />
    </>
  );
}
