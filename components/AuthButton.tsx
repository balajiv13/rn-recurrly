import { colors } from '@/constants/theme';
import { ActivityIndicator, Pressable, PressableProps, Text } from 'react-native';

interface AuthButtonProps extends PressableProps {
  title: string;
  loading?: boolean;
  variant?: 'primary' | 'secondary';
}

export const AuthButton = ({
  title,
  loading,
  variant = 'primary',
  disabled,
  ...props
}: AuthButtonProps) => {
  const isPrimary = variant === 'primary';
  const isDisabled = disabled || loading;

  return (
    <Pressable
      {...props}
      disabled={isDisabled}
      className={`rounded-lg py-3.5 px-4 items-center justify-center mt-2 ${
        isPrimary
          ? 'bg-accent'
          : 'border border-accent bg-transparent'
      } ${isDisabled ? 'opacity-50' : 'opacity-100'}`}
    >
      {loading ? (
        <ActivityIndicator color={isPrimary ? '#fff' : colors.accent} />
      ) : (
        <Text
          className={`text-base font-sans-semibold ${
            isPrimary ? 'text-white' : 'text-accent'
          }`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
};
