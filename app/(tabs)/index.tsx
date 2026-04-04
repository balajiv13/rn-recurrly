import "@/global.css";
import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Text className="text-xl font-bold text-success">
        Welcome to Nativewind!
      </Text>
      <Link href="./Onboarding" className="mt-4 px-4 py-2 bg-primary rounded text-white">Go to Onboarding</Link>
      <Link href="./(auth)/sign-in" className="mt-4 px-4 py-2 bg-primary rounded text-white">Already Have an Account</Link>
      <Link href="./(auth)/sign-up" className="mt-4 px-4 py-2 bg-primary rounded text-white">Create Account</Link>


      <Link href="./subscriptions/spotify">Spotify Subscription</Link>
      <Link href={{ pathname: "./subscriptions/[id]", params: { id: "cluade" } }}>Clude Max Subscription</Link>

    </View>
  );
}