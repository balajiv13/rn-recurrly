import { Link, type Href } from 'expo-router';
import { Pressable, Text } from 'react-native';

interface AuthLinkProps {
  question: string;
  linkText: string;
  href: Href;
}

export const AuthLink = ({ question, linkText, href }: AuthLinkProps) => {
  return (
    <Link href={href} asChild>
      <Pressable className="flex-row items-center justify-center gap-1 mt-5">
        <Text className="text-sm text-muted-foreground font-sans">{question}</Text>
        <Text className="text-sm text-accent font-sans-semibold">{linkText}</Text>
      </Pressable>
    </Link>
  );
};
