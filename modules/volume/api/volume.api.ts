import { getAllTrainings, getTrainings } from '@/modules/training/api/training.api';
import { getUser } from '@/modules/user/api/user.api';
import { getTrainingVolume } from '@/modules/volume/utils/volume.utils';
import { addDays, format, isSameDay } from 'date-fns';

export const getTotalUserVolume = async () => {
  const user = getUser();

  if (!user) {
    throw new Error('User not found');
  }

  const trainings = await getAllTrainings();

  return trainings.reduce((acc, training) => acc + getTrainingVolume(training), 0);
};

// const weeklyData = [
//   { day: 'Mon', value: 65, percentage: 0.65 },
//   { day: 'Tue', value: 80, percentage: 0.8 },
//   { day: 'Wed', value: 55, percentage: 0.55 },
//   { day: 'Thu', value: 95, percentage: 0.95 },
//   { day: 'Fri', value: 75, percentage: 0.75 },
//   { day: 'Sat', value: 0, percentage: 0 },
//   { day: 'Sun', value: 0, percentage: 0 },
// ];

export type WeeklyVolumeData = {
  day: string;
  value: number;
  // percentage: number;
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
