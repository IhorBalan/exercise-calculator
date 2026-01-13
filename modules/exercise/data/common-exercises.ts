import { type Exercise } from '../types/exercise.types';

// Exercise data for seeding - uses muscle group names instead of IDs
// The seed function will look up the actual IDs from the database
export type ExerciseSeedData = Omit<Exercise, 'id' | 'image' | 'muscleGroupId'> & {
  muscleGroupName: string;
};

export const commonExercises: ExerciseSeedData[] = [
  // CHEST EXERCISES
  {
    name: 'Push Ups',
    muscleGroupName: 'Chest',
    description: 'Classic bodyweight exercise targeting chest, shoulders, and triceps',
    instructions:
      'Start in plank position, lower body until chest nearly touches floor, push back up',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Bench Press',
    muscleGroupName: 'Chest',
    description: 'Primary chest exercise performed with barbell or dumbbells',
    instructions: 'Lie on bench, lower weight to chest, press up until arms are fully extended',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Incline Bench Press',
    muscleGroupName: 'Chest',
    description: 'Chest exercise targeting upper pectorals',
    instructions: 'Perform bench press on an inclined bench (30-45 degrees)',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Dumbbell Flyes',
    muscleGroupName: 'Chest',
    description: 'Isolation exercise for chest muscles',
    instructions: 'Lie on bench, lower dumbbells in wide arc, bring back together above chest',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Dips',
    muscleGroupName: 'Chest',
    description: 'Bodyweight exercise targeting chest, shoulders, and triceps',
    instructions: 'Support body on parallel bars, lower until shoulders are below elbows, push up',
    type: 'BODYWEIGHT_EXERCISE',
  },

  // BACK EXERCISES
  {
    name: 'Pull-ups',
    muscleGroupName: 'Back',
    description: 'Bodyweight exercise targeting lats, biceps, and upper back',
    instructions: 'Hang from bar with palms facing away, pull body up until chin clears bar',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Chin-ups',
    muscleGroupName: 'Back',
    description: 'Bodyweight exercise with palms facing toward you',
    instructions: 'Hang from bar with palms facing you, pull body up until chin clears bar',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Deadlift',
    muscleGroupName: 'Back',
    description: 'Compound exercise targeting entire posterior chain',
    instructions:
      'Stand with feet hip-width, grip bar, lift by extending hips and knees, keep back straight',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Barbell Row',
    muscleGroupName: 'Back',
    description: 'Compound pulling exercise for back muscles',
    instructions: 'Bend at hips, pull bar to lower chest/upper abdomen, squeeze shoulder blades',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'One-Arm Dumbbell Row',
    muscleGroupName: 'Back',
    description: 'Unilateral rowing exercise',
    instructions: 'Support body on bench, pull dumbbell to hip, squeeze back muscle',
    type: 'EQUIPMENT_EXERCISE',
  },

  // LEG EXERCISES
  {
    name: 'Squats',
    muscleGroupName: 'legs',
    description: 'Fundamental lower body exercise',
    instructions:
      'Stand with feet shoulder-width, lower hips as if sitting, keep knees behind toes, drive up through heels',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Barbell Squat',
    muscleGroupName: 'legs',
    description: 'Weighted squat variation with barbell',
    instructions:
      'Place bar on upper back, squat down to parallel or below, drive up through heels',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Lunges',
    muscleGroupName: 'legs',
    description: 'Unilateral leg exercise',
    instructions:
      'Step forward into lunge position, lower back knee toward ground, push back to start',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Romanian Deadlift',
    muscleGroupName: 'legs',
    description: 'Hip hinge exercise targeting hamstrings and glutes',
    instructions:
      'Hold bar, hinge at hips, lower bar along legs, feel stretch in hamstrings, return to start',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Calf Raises',
    muscleGroupName: 'legs',
    description: 'Exercise targeting calf muscles',
    instructions: 'Stand on balls of feet, raise heels as high as possible, lower slowly',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Bulgarian Split Squat',
    muscleGroupName: 'legs',
    description: 'Single-leg squat variation',
    instructions: 'Place rear foot on bench, squat down on front leg, drive up through front heel',
    type: 'BODYWEIGHT_EXERCISE',
  },

  // SHOULDER EXERCISES
  {
    name: 'Overhead Press',
    muscleGroupName: 'Shoulders',
    description: 'Primary shoulder exercise pressing weight overhead',
    instructions: 'Press bar or dumbbells from shoulder height to overhead, keep core tight',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Lateral Raises',
    muscleGroupName: 'Shoulders',
    description: 'Isolation exercise for side deltoids',
    instructions: 'Raise dumbbells to sides until arms are parallel to floor, lower with control',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Front Raises',
    muscleGroupName: 'Shoulders',
    description: 'Exercise targeting front deltoids',
    instructions: 'Raise dumbbells in front until arms are parallel to floor, lower slowly',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Rear Delt Flyes',
    muscleGroupName: 'Shoulders',
    description: 'Exercise targeting rear deltoids',
    instructions: 'Bend forward, raise dumbbells to sides, squeeze rear delts',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Arnold Press',
    muscleGroupName: 'Shoulders',
    description: 'Rotating shoulder press variation',
    instructions: 'Start with palms facing you, rotate and press overhead, reverse the motion',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Upright Row',
    muscleGroupName: 'Shoulders',
    description: 'Exercise targeting shoulders and upper traps',
    instructions: 'Pull bar or dumbbells up to chest level, elbows high, lower with control',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Pike Push-ups',
    muscleGroupName: 'Shoulders',
    description: 'Bodyweight shoulder exercise',
    instructions: 'Start in downward dog position, lower head toward ground, push back up',
    type: 'BODYWEIGHT_EXERCISE',
  },

  // ARM EXERCISES (BICEPS)
  {
    name: 'Barbell Curl',
    muscleGroupName: 'Arms',
    description: 'Primary bicep exercise with barbell',
    instructions: 'Curl bar from arms extended to chest level, squeeze biceps, lower with control',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Dumbbell Curl',
    muscleGroupName: 'Arms',
    description: 'Bicep exercise with dumbbells',
    instructions: 'Curl dumbbells from arms extended to shoulder level, squeeze biceps',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Hammer Curl',
    muscleGroupName: 'Arms',
    description: 'Bicep and brachialis exercise with neutral grip',
    instructions: 'Curl dumbbells with palms facing each other, keep elbows stationary',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Concentration Curl',
    muscleGroupName: 'Arms',
    description: 'Isolation bicep exercise',
    instructions: 'Sit on bench, rest elbow on inner thigh, curl dumbbell, squeeze at top',
    type: 'EQUIPMENT_EXERCISE',
  },

  // ARM EXERCISES (TRICEPS)
  {
    name: 'Tricep Dips',
    muscleGroupName: 'Arms',
    description: 'Bodyweight tricep exercise',
    instructions: 'Support body on bench or parallel bars, lower by bending elbows, push up',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Overhead Tricep Extension',
    muscleGroupName: 'Arms',
    description: 'Tricep isolation exercise',
    instructions: 'Press dumbbell overhead, lower behind head by bending elbows, extend up',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Close-Grip Bench Press',
    muscleGroupName: 'Arms',
    description: 'Tricep-focused bench press variation',
    instructions: 'Perform bench press with hands closer than shoulder-width, focus on triceps',
    type: 'EQUIPMENT_EXERCISE',
  },
  {
    name: 'Skull Crushers',
    muscleGroupName: 'Arms',
    description: 'Tricep exercise lying down',
    instructions: 'Lie on bench, lower weight toward forehead by bending elbows, extend arms up',
    type: 'EQUIPMENT_EXERCISE',
  },

  // CORE EXERCISES
  {
    name: 'Plank',
    muscleGroupName: 'Core',
    description: 'Isometric core strengthening exercise',
    instructions: 'Hold body in straight line supported on forearms and toes, keep core tight',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Crunches',
    muscleGroupName: 'Core',
    description: 'Abdominal exercise',
    instructions: 'Lie on back, lift shoulders off ground, crunch abs, lower with control',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Seated Torso Twists',
    muscleGroupName: 'Core',
    description: 'Rotational core exercise',
    instructions: 'Sit with knees bent, lean back slightly, rotate torso side to side',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Leg Raises',
    muscleGroupName: 'Core',
    description: 'Lower ab exercise',
    instructions: 'Lie on back, raise legs straight up, lower with control without touching ground',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Mountain Climbers',
    muscleGroupName: 'Core',
    description: 'Dynamic core and cardio exercise',
    instructions: 'Start in plank position, alternate bringing knees to chest quickly',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Dead Bug',
    muscleGroupName: 'Core',
    description: 'Core stability exercise',
    instructions: 'Lie on back, extend opposite arm and leg, return to start, alternate sides',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Bicycle Crunches',
    muscleGroupName: 'Core',
    description: 'Rotational abdominal exercise',
    instructions: 'Lie on back, bring opposite elbow to knee in cycling motion',
    type: 'BODYWEIGHT_EXERCISE',
  },
  {
    name: 'Hanging Leg Raises',
    muscleGroupName: 'Core',
    description: 'Advanced lower ab exercise',
    instructions: 'Hang from bar, raise legs up, lower with control',
    type: 'BODYWEIGHT_EXERCISE',
  },
];
