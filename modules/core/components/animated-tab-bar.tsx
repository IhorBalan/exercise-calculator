import { BottomTabBarButtonProps, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

function HapticTabButton(props: BottomTabBarButtonProps) {
  return (
    <PlatformPressable
      {...props}
      onPressIn={ev => {
        if (process.env.EXPO_OS === 'ios') {
          // Add a soft haptic feedback when pressing down on the tabs.
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        props.onPressIn?.(ev);
      }}
    />
  );
}

export function AnimatedTabBar(props: BottomTabBarProps) {
  const activeRoute = props.state.routes[props.state.index];
  const isOnIndexScreen = activeRoute.name === 'index';
  const insets = useSafeAreaInsets();

  const opacity = useSharedValue(isOnIndexScreen ? 0 : 1);
  const translateY = useSharedValue(isOnIndexScreen ? 50 : 0);

  useEffect(() => {
    if (isOnIndexScreen) {
      opacity.value = 0;
      translateY.value = 50;
      opacity.value = withDelay(800, withTiming(1, { duration: 400 }));
      translateY.value = withDelay(800, withTiming(0, { duration: 400 }));
    } else {
      opacity.value = 1;
      translateY.value = 0;
    }
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6',
          paddingBottom: insets.bottom,
        },
      ]}
      className="flex-row items-center justify-around"
    >
      {props.state.routes.map((route, index) => {
        const { options } = props.descriptors[route.key];
        const isFocused = props.state.index === index;

        const onPress = () => {
          const event = props.navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            props.navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          props.navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        // Get colors from options or use defaults
        const activeColor = options.tabBarActiveTintColor || '#3B82F6';
        const inactiveColor = options.tabBarInactiveTintColor || '#9CA3AF';

        return (
          <HapticTabButton
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center py-2"
          >
            {options.tabBarIcon &&
              options.tabBarIcon({
                focused: isFocused,
                color: isFocused ? activeColor : inactiveColor,
                size: 24,
              })}
          </HapticTabButton>
        );
      })}
    </Animated.View>
  );
}
