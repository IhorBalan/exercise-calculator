import { ReactNode, useEffect, useState } from 'react';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

export interface AnimatedModalProps {
  isOpen: boolean;
  onClose?: () => void;
  children: ReactNode;
  backdropColor?: string;
  backdropOpacity?: number;
  className?: string;
  contentClassName?: string;
  onAnimationComplete?: () => void;
}

export function AnimatedModal({
  isOpen,
  onClose,
  children,
  backdropColor = 'black',
  backdropOpacity = 0.8,
  className = '',
  contentClassName = '',
  onAnimationComplete,
}: AnimatedModalProps) {
  const [shouldShowModal, setShouldShowModal] = useState(false);

  // Animation values
  const backdropOpacityValue = useSharedValue(0);
  const contentOpacity = useSharedValue(0);
  const contentScale = useSharedValue(0.95);
  const contentTranslateY = useSharedValue(20);

  // Show modal when opening
  useEffect(() => {
    if (isOpen) {
      setShouldShowModal(true);
    }
  }, [isOpen]);

  // Animate modal appearance - iOS style
  useEffect(() => {
    if (isOpen && shouldShowModal) {
      // Opening animation
      backdropOpacityValue.value = withTiming(1, {
        duration: 300,
        easing: Easing.out(Easing.ease),
      });
      contentOpacity.value = withDelay(
        80,
        withTiming(1, {
          duration: 400,
          easing: Easing.out(Easing.cubic),
        })
      );
      contentScale.value = withDelay(
        80,
        withTiming(1, {
          duration: 400,
          easing: Easing.out(Easing.cubic),
        })
      );
      contentTranslateY.value = withDelay(
        80,
        withTiming(0, {
          duration: 400,
          easing: Easing.out(Easing.cubic),
        })
      );
    } else if (!isOpen && shouldShowModal) {
      // Closing animation
      backdropOpacityValue.value = withTiming(0, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
      contentOpacity.value = withTiming(0, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
      contentScale.value = withTiming(0.95, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });
      contentTranslateY.value = withTiming(20, {
        duration: 250,
        easing: Easing.in(Easing.ease),
      });

      // Hide modal after animation completes
      const timer = setTimeout(() => {
        setShouldShowModal(false);
        onAnimationComplete?.();
      }, 250);

      return () => clearTimeout(timer);
    }
  }, [
    isOpen,
    shouldShowModal,
    backdropOpacityValue,
    contentOpacity,
    contentScale,
    contentTranslateY,
    onAnimationComplete,
  ]);

  const backdropAnimatedStyle = useAnimatedStyle(() => {
    const opacity = backdropOpacityValue.value * backdropOpacity;
    return {
      opacity,
      backgroundColor: backdropColor,
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
    transform: [{ scale: contentScale.value }, { translateY: contentTranslateY.value }],
  }));

  if (!shouldShowModal) {
    return null;
  }

  return (
    <Animated.View
      style={[
        backdropAnimatedStyle,
        {
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          top: 0,
        },
      ]}
      className={`items-center justify-center ${className}`}
    >
      <Animated.View style={contentAnimatedStyle} className={contentClassName}>
        {children}
      </Animated.View>
    </Animated.View>
  );
}
