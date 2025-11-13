import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { z } from 'zod';

import { Button } from '@/modules/core/components/button';
import { Input } from '@/modules/core/components/input';
import { BottomFixedContent } from '@/modules/core/components/bottom-fixed-content';
import { getUser } from '@/modules/user/api/user.api';
import { useUserProfileQuery } from '@/modules/user/hooks/use-user-profile-query';
import { useUserProfileUpdateMutation } from '@/modules/user/hooks/use-user-profile-update-mutation';
import { queryClient } from '@/store';

const editProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .trim(),
  lastName: z
    .string()
    .min(1, 'Name is required')
    .min(2, 'Name must be at least 2 characters')
    .trim(),
  weight: z.string().refine(
    value => {
      if (!value || !value.trim()) return true;
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue > 0 && numValue <= 500;
    },
    {
      message: 'Please enter a valid weight (0-500 kg)',
    }
  ),
  height: z.string().refine(
    value => {
      if (!value || !value.trim()) return true;
      const numValue = parseFloat(value);
      return !isNaN(numValue) && numValue > 0 && numValue <= 300;
    },
    {
      message: 'Please enter a valid height (0-300 cm)',
    }
  ),
  birthday: z.string().refine(
    value => {
      if (!value || !value.trim()) return true;
      const date = new Date(value);
      if (isNaN(date.getTime())) return false;
      const today = new Date();
      return date <= today;
    },
    {
      message: 'Please enter a valid date that is not in the future',
    }
  ),
});

type FormData = z.infer<typeof editProfileSchema>;

export default function EditProfileScreen() {
  // const { user } = useAuth();
  const userProfileQuery = useUserProfileQuery();
  const updateUserProfileMutation = useUserProfileUpdateMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(editProfileSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      weight: '',
      height: '',
      birthday: '',
    },
  });

  // Sync form with user profile data from Firestore
  useEffect(() => {
    if (userProfileQuery.data) {
      const { firstName, lastName, weight, height, birthday } = userProfileQuery.data;

      reset({
        firstName: firstName || '',
        lastName: lastName || '',
        weight: weight?.toString() || '',
        height: height?.toString() || '',
        birthday: birthday || '',
      });
    }
  }, [userProfileQuery.data, reset]);

  const onSubmit = (data: FormData) => {
    updateUserProfileMutation.mutate(
      {
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
        weight: data.weight?.trim() ? parseFloat(data.weight.trim()) : undefined,
        height: data.height?.trim() ? parseFloat(data.height.trim()) : undefined,
        birthday: data.birthday?.trim() || undefined,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['USER_PROFILE'] });
          router.back();
        },
        onError: error => {
          console.error('Update user profile error:', error);
        },
      }
    );
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    const displayName = `${userProfileQuery.data?.firstName} ${userProfileQuery.data?.lastName}`;

    if (!displayName) return 'U';

    return displayName
      .split(' ')
      .map(name => name[0].toUpperCase())
      .join('');
  };

  return (
    <SafeAreaView className="flex-1 relative bg-blue-50" edges={['top']}>
      <ScrollView
        contentContainerClassName="px-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="flex-row items-center pt-8 pb-4 justify-between">
          <Pressable
            onPress={() => router.back()}
            className="w-9 h-9 rounded-xl bg-white items-center shadow-sm justify-center mb-4 active:opacity-80"
          >
            <Ionicons name="arrow-back" size={16} color="#000000" />
          </Pressable>

          <View className="flex-row items-center gap-3 mb-3">
            <Text className="text-slate-900 text-base tracking-tight">Edit Profile</Text>
          </View>
          <View className="w-10" />
        </View>

        {/* Profile Card */}
        <View className="" style={{ paddingBottom: 120 }}>
          {/* Avatar Section */}
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-blue-500 rounded-full border-4 border-blue-100 items-center justify-center mb-4">
              {userProfileQuery.data?.image ? (
                <Text className="text-white text-2xl font-normal">IMG</Text>
              ) : (
                <Text className="text-white text-3xl font-normal">{getUserInitials()}</Text>
              )}
            </View>
            <Pressable className="px-4 py-2 bg-slate-50 rounded-xl active:opacity-70">
              <Text className="text-slate-700 text-sm font-medium tracking-tight">
                Change Photo
              </Text>
            </Pressable>
          </View>

          {/* Form Fields */}
          <View className="gap-4">
            <Controller
              control={control}
              name="firstName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="light"
                  label="First Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your first name"
                  autoCapitalize="words"
                  error={errors.firstName?.message}
                  leftElement={<Ionicons name="person-outline" size={20} color="#9CA3AF" />}
                />
              )}
            />
            <Controller
              control={control}
              name="lastName"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="light"
                  label="Last Name"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter your last name"
                  autoCapitalize="words"
                  error={errors.lastName?.message}
                  leftElement={<Ionicons name="person-outline" size={20} color="#9CA3AF" />}
                />
              )}
            />

            <Input
              variant="light"
              label="Email"
              value={userProfileQuery.data?.email || getUser()?.email || ''}
              editable={false}
              placeholder="Email address"
              leftElement={<Ionicons name="mail-outline" size={20} color="#9CA3AF" />}
              helperText="Email cannot be changed"
            />

            <Controller
              control={control}
              name="weight"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="light"
                  label="Weight"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter weight (kg)"
                  keyboardType="decimal-pad"
                  error={errors.weight?.message}
                  leftElement={<Ionicons name="scale-outline" size={20} color="#9CA3AF" />}
                />
              )}
            />

            <Controller
              control={control}
              name="height"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="light"
                  label="Height"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="Enter height (cm)"
                  keyboardType="decimal-pad"
                  error={errors.height?.message}
                  leftElement={<Ionicons name="resize-outline" size={20} color="#9CA3AF" />}
                />
              )}
            />

            <Controller
              control={control}
              name="birthday"
              render={({ field: { onChange, onBlur, value } }) => (
                <Input
                  variant="light"
                  label="Birthday"
                  value={value || ''}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  placeholder="YYYY-MM-DD"
                  keyboardType="default"
                  error={errors.birthday?.message}
                  leftElement={<Ionicons name="calendar-outline" size={20} color="#9CA3AF" />}
                  helperText="Format: YYYY-MM-DD"
                />
              )}
            />
          </View>
        </View>

        {/* Save Button */}
      </ScrollView>
      <BottomFixedContent>
        <Button
          onPress={handleSubmit(onSubmit)}
          disabled={updateUserProfileMutation.isPending || userProfileQuery.isLoading}
          fullWidth
          variant="primary"
          size="md"
        >
          {updateUserProfileMutation.isPending ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            'Save Changes'
          )}
        </Button>
      </BottomFixedContent>
    </SafeAreaView>
  );
}
