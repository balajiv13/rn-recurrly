import { Text, View } from 'react-native';

interface AuthHeaderProps {
  title: string;
  subtitle?: string;
}

export const AuthHeader = ({ title, subtitle }: AuthHeaderProps) => {
  return (
    <View className="mb-8 mt-8">
      <Text className="text-3xl font-sans-bold text-primary mb-2">{title}</Text>
      {subtitle && (
        <Text className="text-sm text-muted-foreground font-sans">{subtitle}</Text>
      )}
    </View>
  );
};
