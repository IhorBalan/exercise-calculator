import { Ionicons } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useCallback, useMemo, useState } from 'react';
import { Platform, Pressable, Text, View } from 'react-native';
import { BottomModal } from './bottom-modal';
import { Button } from './button';

export interface DateTimePickerProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
  mode: 'date' | 'time';
  error?: string;
  disabled?: boolean;
  className?: string;
  minimumDate?: Date;
  maximumDate?: Date;
}

export function DateTimePickerComponent({
  label,
  value,
  onChange,
  mode,
  error,
  disabled = false,
  className = '',
  minimumDate,
  maximumDate,
}: DateTimePickerProps) {
  const [showPicker, setShowPicker] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  const formattedDate = useMemo(() => {
    if (mode === 'date') {
      return value.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
    } else {
      return value.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
      });
    }
  }, [value, mode]);

  const handleChange = useCallback(
    (event: DateTimePickerEvent, selectedDate?: Date) => {
      if (Platform.OS === 'android') {
        setShowPicker(false);
        if (event.type === 'set' && selectedDate) {
          onChange(selectedDate);
        }
      } else {
        // iOS: Update temp value as user scrolls
        if (selectedDate) {
          setTempValue(selectedDate);
        }
      }
    },
    [onChange]
  );

  const handleConfirm = useCallback(() => {
    onChange(tempValue);
    setShowPicker(false);
  }, [onChange, tempValue]);

  const handleCancel = useCallback(() => {
    setTempValue(value); // Reset to original value
    setShowPicker(false);
  }, [value]);

  const handleOpen = useCallback(() => {
    if (!disabled) {
      setTempValue(value);
      setShowPicker(true);
    }
  }, [disabled, value]);

  const iconName = mode === 'date' ? 'calendar-outline' : 'time-outline';

  // Memoize buttons to prevent re-renders during picker scrolling
  const actionButtons = useMemo(
    () => (
      <View className="flex-row gap-3 pt-4">
        <Button variant="secondary" size="md" className="flex-1" onPress={handleCancel}>
          Cancel
        </Button>
        <Button variant="primary" size="md" className="flex-1" onPress={handleConfirm}>
          Confirm
        </Button>
      </View>
    ),
    [handleCancel, handleConfirm]
  );

  return (
    <View className={`gap-2 ${className}`}>
      <Text className="text-neutral-950 text-sm font-medium tracking-tight">{label}</Text>
      <Pressable
        onPress={handleOpen}
        className={`bg-gray-100 rounded-2xl h-14 px-4 flex-row items-center justify-between ${
          disabled ? 'opacity-50' : ''
        } ${error ? 'border border-red-400' : ''}`}
        disabled={disabled}
      >
        <View className="flex-row items-center gap-3 flex-1">
          <Ionicons name={iconName} size={20} color="#717182" />
          <Text className="text-base tracking-tight text-neutral-950">{formattedDate}</Text>
        </View>
        <Ionicons name="chevron-forward" size={16} color="#717182" />
      </Pressable>
      {error && <Text className="text-red-500 text-sm tracking-tight">{error}</Text>}
      {Platform.OS === 'android' && showPicker && (
        <DateTimePicker
          value={value}
          mode={mode}
          display="default"
          onChange={handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      )}
      {Platform.OS === 'ios' && (
        <BottomModal
          isOpen={showPicker}
          onClose={handleCancel}
          snapPoints={[420]}
          title={mode === 'date' ? 'Select Date' : 'Select Time'}
        >
          <View className="gap-4">
            <View style={{ height: 200, justifyContent: 'center' }}>
              <DateTimePicker
                value={tempValue}
                mode={mode}
                display="spinner"
                onChange={handleChange}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
                textColor="#000"
              />
            </View>
            {actionButtons}
          </View>
        </BottomModal>
      )}
    </View>
  );
}
