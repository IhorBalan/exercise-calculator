/// <reference types="@gorhom/bottom-sheet" />

import { BottomSheetModalProps as BottomSheetModalPropsOriginal } from '@gorhom/bottom-sheet';

declare module '@gorhom/bottom-sheet' {
  // Import the original type so you can augment it
  interface BottomSheetModalProps extends BottomSheetModalPropsOriginal {
    /**
     * Custom background className to pass for styling.
     */
    backgroundClassName?: string;

    /**
     * Custom handle indicator className to pass for styling.
     */
    handleIndicatorClassName?: string;
  }
}
