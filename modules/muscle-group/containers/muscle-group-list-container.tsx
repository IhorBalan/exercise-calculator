import { Text, View } from 'react-native';

import { MuscleGroupCard } from '../components/muscle-group-card';
import { useMuscleGroupListQuery } from '../hooks/use-muscle-group-list-query';

export function MuscleGroupListContainer() {
  const { data: muscleGroups = [], isLoading } = useMuscleGroupListQuery();

  return (
    <View className="px-4 mt-6">
      <Text className="text-slate-900 text-base tracking-tight mb-4">Muscle Groups</Text>

      {isLoading ? (
        <Text className="text-slate-500 text-sm">Loading muscle groups...</Text>
      ) : (
        <View className="gap-3">
          {muscleGroups.map(group => (
            <MuscleGroupCard key={group.id} {...group} />
          ))}
        </View>
      )}
    </View>
  );
}
