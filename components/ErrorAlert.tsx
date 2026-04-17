import { Text, View } from 'react-native';

interface ErrorAlertProps {
  error?: string;
  visible?: boolean;
}

export const ErrorAlert = ({ error, visible = true }: ErrorAlertProps) => {
  if (!visible || !error) return null;

  return (
    <View className="bg-red-50 border border-destructive rounded-lg p-3 mb-4" accessibilityRole="alert" accessibilityLiveRegion="polite">
      <Text className="text-sm font-sans-medium text-destructive">{error}</Text>
    </View>
  );
};
