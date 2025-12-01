import { BottomModal } from '@/modules/core/components/bottom-modal';
import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, View } from 'react-native';

export type ActionVariant = 'default' | 'danger';

export type BottomAction = {
  id: string;
  text: string;
  variant?: ActionVariant;
  icon?: string;
  isLoading?: boolean;
};

export interface BottomActionsProps {
  isOpen: boolean;
  onClose: () => void;
  actions: BottomAction[];
  onSelect: (id: string) => void;
  title?: string;
}

export function BottomActions({ isOpen, onClose, actions, onSelect, title }: BottomActionsProps) {
  const handleActionPress = (actionId: string) => {
    onSelect(actionId);
  };

  const getActionStyles = (variant: ActionVariant = 'default') => {
    if (variant === 'danger') {
      return {
        container: 'bg-red-50 items-center',
        text: 'text-red-600',
        iconColor: '#dc2626',
      };
    }
    return {
      container: 'bg-slate-50',
      text: 'text-slate-900',
      iconColor: '#0f172a',
    };
  };

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={onClose}
      snapPoints={title ? ['30%'] : ['25%']}
      enablePanDownToClose
      title={title}
    >
      <View className="gap-3 pb-4 pt-2">
        {actions.map(action => {
          const styles = getActionStyles(action.variant);
          return (
            <Pressable
              key={action.id}
              onPress={() => handleActionPress(action.id)}
              disabled={action.isLoading}
              className={`flex-row items-center justify-center gap-3 p-4 ${styles.container} rounded-xl active:opacity-80 disabled:opacity-50`}
            >
              {action.icon && (
                <Ionicons name={action.icon as any} size={20} color={styles.iconColor} />
              )}
              <Text className={`${styles.text} text-base font-medium tracking-tight`}>
                {action.isLoading ? 'Loading...' : action.text}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </BottomModal>
  );
}
