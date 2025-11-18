import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Keyboard, StyleSheet, Text, View } from 'react-native';
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
}: BottomModalProps) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  // Default snap points: 50% and 90% of screen height
  const defaultSnapPoints = useMemo(() => ['50%', '90%'], []);

  // Listen to keyboard events to get keyboard height
  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener('keyboardWillShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardDidShow = Keyboard.addListener('keyboardDidShow', e => {
      setKeyboardHeight(e.endCoordinates.height);
    });
    const keyboardWillHide = Keyboard.addListener('keyboardWillHide', () => {
      setKeyboardHeight(0);
    });
    const keyboardDidHide = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardWillShow.remove();
      keyboardDidShow.remove();
      keyboardWillHide.remove();
      keyboardDidHide.remove();
    };
  }, []);

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
      // Reset keyboard height when modal closes
      setKeyboardHeight(0);
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

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      snapPoints={snapPoints || defaultSnapPoints}
      onChange={handleSheetChanges}
      enablePanDownToClose={enablePanDownToClose}
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
