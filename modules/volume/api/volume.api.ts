import { getTrainings } from '@/modules/training/api/training.api';
import { getUser } from '@/modules/user/api/user.api';
import { getTrainingsVolume, getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import {
  addDays,
  endOfISOWeek,
  endOfWeek,
  format,
  getDay,
  isSameDay,
  startOfISOWeek,
  startOfWeek,
} from 'date-fns';

type TotalVolumeResponse = {
  totalVolume: number;
  improvementPercentage: number;
};

export const getWeeklyVolume = async (): Promise<TotalVolumeResponse> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const trainings = await getTrainings({
    startDate: startOfWeek(new Date()).toISOString(),
    endDate: endOfWeek(new Date()).toISOString(),
  });

  const currentDayOfWeek = getDay(new Date());

  const improvementPercentage = await getImprovementPercentage(
    {
      startDate: startOfWeek(new Date()).toISOString(),
      endDate: endOfWeek(new Date()).toISOString(),
    },
    {
      startDate: startOfWeek(addDays(new Date(), -7)).toISOString(),
      endDate: addDays(startOfWeek(addDays(new Date(), -7)), currentDayOfWeek).toISOString(),
    }
  );

  return { totalVolume: getTrainingsVolume(trainings), improvementPercentage };
};

export type WeeklyVolumeData = {
  day: string;
  value: number;
};

export const getWeeklyVolumeChartData = async (): Promise<WeeklyVolumeData[]> => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const trainings = await getTrainings({
    startDate: startOfISOWeek(new Date()).toISOString(),
    endDate: endOfISOWeek(new Date()).toISOString(),
  });

  const weeklyData: WeeklyVolumeData[] = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(startOfISOWeek(new Date()), i);
    const trainingsForDate = trainings.filter(training => isSameDay(new Date(training.date), date));

    const volume = trainingsForDate.reduce((acc, training) => acc + getTrainingVolume(training), 0);

    weeklyData.push({ day: format(date, 'EE'), value: volume });
  }

  return weeklyData;
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

export const getImprovementPercentage = async (
  a: { startDate: string; endDate: string; muscleGroupId?: string },
  b: { startDate: string; endDate: string; muscleGroupId?: string }
): Promise<number> => {
  const trainingsA = await getTrainings({
    startDate: a.startDate,
    endDate: a.endDate,
  }).then(trainings =>
    trainings.filter(training =>
      a.muscleGroupId ? training.muscleGroupId === a.muscleGroupId : true
    )
  );
  const trainingsB = await getTrainings({
    startDate: b.startDate,
    endDate: b.endDate,
  }).then(trainings =>
    trainings.filter(training =>
      b.muscleGroupId ? training.muscleGroupId === b.muscleGroupId : true
    )
  );

  const volumeA = getTrainingsVolume(trainingsA);
  const volumeB = getTrainingsVolume(trainingsB);

  if (volumeB === 0) {
    if (volumeA > 0) {
      return 100;
    }
    return 0;
  }

  return ((volumeA - volumeB) / volumeB) * 100;
};

export const getWeeklyVolumeByMuscleGroupId = async (
  muscleGroupId: string
): Promise<{
  volume: number;
  improvementPercentage: number;
}> => {
  const trainings = await getTrainings({
    startDate: startOfWeek(new Date()).toISOString(),
    endDate: endOfWeek(new Date()).toISOString(),
  }).then(trainings => trainings.filter(training => training.muscleGroupId === muscleGroupId));

  const currentDayOfWeek = getDay(new Date());

  const improvementPercentage = await getImprovementPercentage(
    {
      startDate: startOfWeek(new Date()).toISOString(),
      endDate: endOfWeek(new Date()).toISOString(),
      muscleGroupId,
    },
    {
      startDate: startOfWeek(addDays(new Date(), -7)).toISOString(),
      endDate: addDays(startOfWeek(addDays(new Date(), -7)), currentDayOfWeek).toISOString(),
      muscleGroupId,
    }
  );

  return { volume: getTrainingsVolume(trainings), improvementPercentage };
};
