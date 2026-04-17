import { colors } from '@/constants/theme';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  icon?: React.ReactNode;
}

export const FormInput = ({ label, error, icon, ...props }: FormInputProps) => {
  return (
    <View className="mb-4">
      <Text className="text-sm font-sans-semibold text-primary mb-2">{label}</Text>
      <View className="flex-row items-center border border-border rounded-lg bg-card px-4 py-3">
        {icon && <View className="mr-2">{icon}</View>}
        <TextInput
          {...props}
          className="flex-1 text-base text-primary font-sans"
          placeholderTextColor={colors.mutedForeground}
          cursorColor={colors.accent}
        />
      </View>
      {error && (
        <Text className="text-xs font-sans-medium text-destructive mt-1.5">
          {error}
        </Text>
      )}
    </View>
  );
};
