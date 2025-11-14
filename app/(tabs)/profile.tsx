import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '@/modules/auth/context/auth-context';
import { useUserProfileQuery } from '@/modules/user/hooks/use-user-profile-query';

const trainingStats = [
  { label: 'Total Workouts', value: '87', fullWidth: false },
  { label: 'This Month', value: '16', fullWidth: false },
  { label: 'Total Volume', value: '384k', subtitle: 'kg lifted', fullWidth: false },
  { label: 'Avg/Week', value: '25.1k', subtitle: 'kg lifted', fullWidth: false },
];

const settingsOptions = [
  { icon: 'person-outline', label: 'Edit Profile', color: 'bg-blue-50', iconColor: '#3b82f6' },
  { icon: 'trophy-outline', label: 'Fitness Goals', color: 'bg-purple-50', iconColor: '#a855f7' },
  { icon: 'settings-outline', label: 'Preferences', color: 'bg-slate-50', iconColor: '#64748b' },
];

export default function ProfileScreen() {
  const { logout } = useAuth();
  const { data: userProfile } = useUserProfileQuery();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const displayName = `${userProfile?.firstName || ''} ${userProfile?.lastName || ''}`;

  const handleSignOut = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!userProfile?.firstName || !userProfile?.lastName) return 'U';
    return `${userProfile.firstName[0]}${userProfile.lastName[0]}`.toUpperCase();
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top']}>
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="px-4 pt-8 pb-1 gap-1">
          <Text className="text-slate-900 text-xl font-medium tracking-tight">Profile</Text>
          <Text className="text-slate-600 text-base tracking-tight">
            Manage your account and settings
          </Text>
        </View>

        {/* Profile Card */}
        <View className="mx-4 mt-3 p-6 bg-white rounded-3xl shadow-sm">
          {/* User Info */}
          <View className="flex-row items-center gap-4">
            {/* Avatar */}
            <View className="w-20 h-20 bg-blue-500 rounded-full border-4 border-blue-100 items-center justify-center">
              {userProfile?.image ? (
                <Text className="text-white text-2xl font-normal">IMG</Text>
              ) : (
                <Text className="text-white text-2xl font-normal">{getUserInitials()}</Text>
              )}
            </View>

            {/* Name and Email */}
            <View className="flex-1 gap-1">
              <Text className="text-slate-900 text-lg font-medium tracking-tight">
                {!displayName || displayName.trim() === '' ? 'User' : displayName}
              </Text>
              <Text className="text-slate-500 text-base tracking-tight">
                {userProfile?.email || 'No email'}
              </Text>
            </View>
          </View>
        </View>

        {/* Training Stats Section */}
        <View className="px-4 mt-6">
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-4">
            Training Stats
          </Text>

          <View className="flex-row flex-wrap justify-between gap-y-4">
            {trainingStats.map((stat, index) => (
              <View key={index} className={'bg-white p-4 w-[48%] rounded-2xl shadow-sm'}>
                <Text className="text-slate-600 text-sm tracking-tight mb-7">{stat.label}</Text>
                <Text className="text-slate-900 text-2xl tracking-tight mb-1">{stat.value}</Text>
                {stat.subtitle && (
                  <Text className="text-slate-500 text-xs tracking-tight">{stat.subtitle}</Text>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Settings Section */}
        <View className="px-4 mt-6">
          <Text className="text-slate-900 text-base font-medium tracking-tight mb-4">Settings</Text>

          <View className="gap-3">
            {settingsOptions.map((option, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  if (option.label === 'Edit Profile') {
                    router.push('/edit-profile');
                  }
                }}
                className="bg-white p-4 rounded-2xl shadow-sm flex-row items-center justify-between active:opacity-80"
              >
                <View className="flex-row items-center gap-3">
                  <View
                    className={`w-10 h-10 ${option.color} rounded-xl items-center justify-center`}
                  >
                    <Ionicons name={option.icon as any} size={20} color={option.iconColor} />
                  </View>
                  <Text className="text-slate-900 text-base tracking-tight">{option.label}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9ca3af" />
              </Pressable>
            ))}
          </View>
        </View>

        {/* Sign Out Button */}
        <View className="px-4 mt-6 mb-6">
          <Pressable
            onPress={handleSignOut}
            disabled={isLoggingOut}
            className="bg-white border border-red-100 rounded-2xl h-14 flex-row items-center justify-center gap-2 active:opacity-80 disabled:opacity-50"
          >
            <Ionicons name="log-out-outline" size={16} color="#e7000b" />
            <Text className="text-red-600 text-sm font-medium tracking-tight">
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
