import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { cssInterop } from 'nativewind';
import { ReactNode, useCallback, useEffect, useMemo, useRef } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface BottomModalProps extends BottomSheetModalProps {
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

cssInterop(BottomSheetModal, {
  backgroundClassName: 'backgroundStyle',
  handleIndicatorClassName: 'handleIndicatorStyle',
});

export function BottomModal({
  children,
  isOpen,
  onClose,
  title,
  enablePanDownToClose = true,
  enableDismissOnClose = true,
  enableScrollableContent = false,
  maxDynamicContentSize,
  ...props
}: BottomModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get('window').height;

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
    if (props.snapPoints && props.snapPoints.length > 0) {
      const maxSnapPoint = props.snapPoints[props.snapPoints.length - 1];
      if (typeof maxSnapPoint === 'string' && maxSnapPoint.endsWith('%')) {
        const percentage = parseFloat(maxSnapPoint) / 100;
        return screenHeight * percentage;
      }
    }
    return undefined;
  }, [maxDynamicContentSize, props.snapPoints, screenHeight]);

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      onChange={handleSheetChanges}
      enablePanDownToClose={enablePanDownToClose}
      enableOverDrag={false}
      maxDynamicContentSize={calculatedMaxDynamicContentSize}
      backdropComponent={renderBackdrop}
      backgroundClassName={'bg-background-modal rounded-t-3xl'}
      handleIndicatorClassName={'bg-[#d1d5db] w-10 h-1'}
      keyboardBehavior="interactive"
      keyboardBlurBehavior="restore"
      android_keyboardInputMode="adjustResize"
      {...props}
    >
      {enableScrollableContent ? (
        <BottomSheetScrollView
          style={styles.scrollContent}
          contentContainerStyle={[styles.scrollContentContainer, { paddingBottom: insets.bottom }]}
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
