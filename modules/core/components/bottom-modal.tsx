import { useKeyboardHeight } from '@/modules/core/hooks/use-keyboard-height';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BottomModalProps {
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  snapPoints?: (string | number)[];
  title?: string;
  enablePanDownToClose?: boolean;
  enableDismissOnClose?: boolean;
  enableScrollableContent?: boolean;
  maxDynamicContentSize?: number;
}

export function BottomModal({
  children,
  isOpen,
  onClose,
  snapPoints,
  title,
  enablePanDownToClose = true,
  enableDismissOnClose = true,
  enableScrollableContent = false,
  maxDynamicContentSize,
}: BottomModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const keyboardHeight = useKeyboardHeight();
  const screenHeight = Dimensions.get('window').height;

  // Default snap points: 50% and 90% of screen height
  const defaultSnapPoints = useMemo(() => ['50%', '90%'], []);

  // Handle sheet changes
  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1 && enableDismissOnClose) {
        onClose();
      }
    },
    [onClose, enableDismissOnClose]
  );

  // Open/close the sheet based on isOpen prop
  useEffect(() => {
    if (isOpen) {
      bottomSheetModalRef.current?.present();
    } else {
      bottomSheetModalRef.current?.dismiss();
    }
  }, [isOpen]);

  // Backdrop component
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
        onPress={onClose}
      />
    ),
    [onClose]
  );

  // Calculate max dynamic content size if provided, otherwise use screen height
  const calculatedMaxDynamicContentSize = useMemo(() => {
    if (maxDynamicContentSize !== undefined) {
      return maxDynamicContentSize;
    }
    // If snapPoints are provided and the max is a percentage, calculate it
    if (snapPoints && snapPoints.length > 0) {
      const maxSnapPoint = snapPoints[snapPoints.length - 1];
      if (typeof maxSnapPoint === 'string' && maxSnapPoint.endsWith('%')) {
        const percentage = parseFloat(maxSnapPoint) / 100;
        return screenHeight * percentage;
      }
    }
    return undefined;
  }, [maxDynamicContentSize, snapPoints, screenHeight]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints || defaultSnapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={enablePanDownToClose}
      enableOverDrag={false}
      maxDynamicContentSize={calculatedMaxDynamicContentSize}
      backdropComponent={renderBackdrop}
      backgroundStyle={styles.background}
      handleIndicatorStyle={styles.indicator}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
    >
      {enableScrollableContent ? (
        <BottomSheetScrollView
          style={styles.scrollContent}
          contentContainerStyle={[
            styles.scrollContentContainer,
            { paddingBottom: insets.bottom + keyboardHeight },
          ]}
          keyboardShouldPersistTaps="handled"
        >
          {/* Header */}
          {title && (
            <View className="flex-row items-center justify-center pt-6 pb-4 relative">
              <Text className="text-neutral-950 text-lg font-semibold tracking-tight">{title}</Text>
            </View>
          )}

          {/* Content */}
          {children}
        </BottomSheetScrollView>
      ) : (
        <BottomSheetView style={[styles.content, { paddingBottom: insets.bottom }]}>
          {/* Header */}
          {title && (
            <View className="flex-row items-center justify-center pt-6 pb-4 relative">
              <Text className="text-neutral-950 text-lg font-semibold tracking-tight">{title}</Text>
            </View>
          )}

          {/* Content */}
          {children}
        </BottomSheetView>
      )}
    </BottomSheetModal>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  indicator: {
    backgroundColor: '#d1d5db',
    width: 40,
    height: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollContent: {
    flex: 1,
  },
  scrollContentContainer: {
    paddingHorizontal: 24,
  },
});
