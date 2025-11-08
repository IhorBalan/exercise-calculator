import { BottomTabBar, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export function AnimatedTabBar(props: BottomTabBarProps) {
  const activeRoute = props.state.routes[props.state.index];
  const isOnIndexScreen = activeRoute.name === 'index';

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
    <Animated.View style={animatedStyle}>
      <BottomTabBar {...props} />
    </Animated.View>
  );
}
