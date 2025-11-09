import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { useAuth } from '@/modules/auth/context/auth-context';
import { useUserUpdateMutation } from '@/modules/user/hooks/use-user-update-mutation';
import { queryClient } from '@/store';

export default function EditProfileScreen() {
  const { user } = useAuth();
  const updateUserMutation = useUserUpdateMutation();
  const [name, setName] = useState(user?.name || '');
  const [nameError, setNameError] = useState('');

  // Sync name with user prop
  useEffect(() => {
    if (user?.name) {
      setName(user.name);
    }
  }, [user?.name]);

  const validateName = (nameValue: string) => {
    if (!nameValue.trim()) {
      setNameError('Name is required');
      return false;
    }
    if (nameValue.trim().length < 2) {
      setNameError('Name must be at least 2 characters');
      return false;
    }
    setNameError('');
    return true;
  };

  const handleSave = () => {
    const isNameValid = validateName(name);

    if (!isNameValid) {
      return;
    }

    // UI only - simulate save
    updateUserMutation.mutate(
      {
        displayName: name.trim(),
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ['user'] });
          router.back();
        },
        onError: error => {
          console.error('Update user error:', error);
        },
      }
    );
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (!name) return 'U';
    const names = name.split(' ');
    if (names.length >= 2) {
      return `${names[0][0]}${names[1][0]}`.toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <SafeAreaView className="flex-1 bg-blue-50" edges={['top', 'bottom']}>
      <ScrollView
        contentContainerClassName="flex-1 px-4"
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View className="pt-8 pb-6 flex-row items-center gap-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 items-center justify-center active:opacity-70"
          >
            <Ionicons name="arrow-back" size={24} color="#0f172a" />
          </Pressable>
          <Text className="text-slate-900 text-xl font-medium tracking-tight flex-1">
            Edit Profile
          </Text>
        </View>

        {/* Profile Card */}
        <View className="bg-white rounded-3xl shadow-sm p-6 mb-6">
          {/* Avatar Section */}
          <View className="items-center mb-6">
            <View className="w-24 h-24 bg-blue-500 rounded-full border-4 border-blue-100 items-center justify-center mb-4">
              {user?.image ? (
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
            <Input
              variant="light"
              label="Name"
              value={name}
              onChangeText={text => {
                setName(text);
                if (nameError) {
                  validateName(text);
                }
              }}
              onBlur={() => validateName(name)}
              placeholder="Enter your name"
              autoCapitalize="words"
              error={nameError}
              leftElement={<Ionicons name="person-outline" size={20} color="#9CA3AF" />}
            />

            <Input
              variant="light"
              label="Email"
              value={user?.email || ''}
              editable={false}
              placeholder="Email address"
              leftElement={<Ionicons name="mail-outline" size={20} color="#9CA3AF" />}
              helperText="Email cannot be changed"
            />
          </View>
        </View>

        {/* Save Button */}
        <View className="mb-6">
          <Button
            onPress={handleSave}
            disabled={updateUserMutation.isPending || name.trim() === user?.name}
            fullWidth
            variant="primary"
            size="lg"
          >
            {updateUserMutation.isPending ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              'Save Changes'
            )}
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
