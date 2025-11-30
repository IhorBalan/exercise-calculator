import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { TouchableOpacity, View } from 'react-native';

export const PlayButton = ({ onPress, isPlaying }: { onPress: () => void; isPlaying: boolean }) => {
  const iconName = isPlaying ? 'pause' : 'play';
  const iconClassNames = isPlaying ? '' : 'ml-1';

  return (
    <View className="items-center justify-center relative">
      <View
        style={{
          position: 'absolute',
          top: -30,
          left: -30,
          width: 140,
          height: 140,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.1)',
          borderRadius: 100,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      />

      <View
        style={{
          position: 'absolute',
          top: -14,
          left: -14,
          width: 108,
          height: 108,
          borderWidth: 1,
          borderColor: 'rgba(255,255,255,0.2)',
          borderRadius: 100,
          zIndex: 2,
          pointerEvents: 'none',
        }}
      />

      <TouchableOpacity
        onPress={onPress}
        activeOpacity={0.8}
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
          overflow: 'hidden',
        }}
      >
        <LinearGradient
          colors={['#64C4FD', '#172554']}
          style={{ flex: 1, padding: 1, borderRadius: 100 }}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        >
          <LinearGradient
            colors={['#334155', '#0f172a']}
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 100,
            }}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <Ionicons name={iconName} size={38} color="#f1f5f9" className={iconClassNames} />
          </LinearGradient>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
