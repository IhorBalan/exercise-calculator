import { getAllTrainings, getTrainings } from '@/modules/training/api/training.api';
import { getUser } from '@/modules/user/api/user.api';
import { getTrainingsVolume, getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { addDays, endOfWeek, format, getDay, isSameDay, startOfWeek } from 'date-fns';

type TotalVolumeResponse = {
  totalVolume: number;
  improvementPercentage: number;
};

export const getTotalUserVolume = async (): Promise<TotalVolumeResponse> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const trainings = await getAllTrainings();

  const currentDayOfWeek = getDay(new Date());

  const currentWeekTrainings = await getTrainings({
    startDate: startOfWeek(new Date()).toISOString(),
    endDate: endOfWeek(new Date()).toISOString(),
  });

  const previousWeekTrainings = await getTrainings({
    startDate: startOfWeek(addDays(new Date(), -7)).toISOString(),
    // we take same amount of days as the current week. For example, if the current week day is Wednesday, we take the previous week from Monday to Wednesday.
    endDate: addDays(startOfWeek(addDays(new Date(), -7)), currentDayOfWeek).toISOString(),
  });

  const currentWeekVolume = getTrainingsVolume(currentWeekTrainings);
  const previousWeekVolume = getTrainingsVolume(previousWeekTrainings);

  let improvementPercentage = 0;

  if (previousWeekVolume === 0) {
    if (currentWeekVolume > 0) {
      improvementPercentage = 100;
    }
  } else {
    improvementPercentage = ((currentWeekVolume - previousWeekVolume) / previousWeekVolume) * 100;
  }

  return { totalVolume: getTrainingsVolume(trainings), improvementPercentage };
};

export type WeeklyVolumeData = {
  day: string;
  value: number;
};

export const getWeeklyVolumeData = async (): Promise<WeeklyVolumeData[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const trainings = await getTrainings({
    startDate: addDays(new Date(), -7).toISOString(),
    endDate: new Date().toISOString(),
  });

  const weeklyData: WeeklyVolumeData[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), -i);
    const trainingsForDate = trainings.filter(training => isSameDay(new Date(training.date), date));

    const volume = trainingsForDate.reduce((acc, training) => acc + getTrainingVolume(training), 0);

    weeklyData.push({ day: format(date, 'EE'), value: volume });
  }

  return weeklyData.reverse();
};

export const getWeeklyVolumeChartByMuscleGroupId = async (
  muscleGroupId: string
): Promise<WeeklyVolumeData[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const trainings = await getTrainings({
    startDate: addDays(new Date(), -7).toISOString(),
    endDate: new Date().toISOString(),
  }).then(trainings => trainings.filter(training => training.muscleGroupId === muscleGroupId));

  const weeklyData: WeeklyVolumeData[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(new Date(), -i);
    const trainingsForDate = trainings.filter(training => isSameDay(new Date(training.date), date));

    const volume = trainingsForDate.reduce((acc, training) => acc + getTrainingVolume(training), 0);

    weeklyData.push({ day: format(date, 'EE'), value: volume });
  }

  return weeklyData.reverse();
};
