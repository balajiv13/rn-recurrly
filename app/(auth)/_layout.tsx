import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function AuthRoutesLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const [showStack, setShowStack] = useState(false);
  const [clerkFailed, setClerkFailed] = useState(false);

  // Timeout fallback - if Clerk doesn't load in 5 seconds, mark as failed
  useEffect(() => {
    if (isLoaded) {
      setShowStack(true);
    } else {
      const timer = setTimeout(() => {
        setShowStack(true);
        setClerkFailed(true);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded]);

  // If loading and haven't hit timeout, show spinner
  if (!isLoaded && !showStack) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" color="#ea7a53" />
      </View>
    );
  }

  // If Clerk failed to load, show error message
  if (clerkFailed && !isLoaded) {
    return (
      <View className="flex-1 items-center justify-center bg-background px-5">
        <Text className="text-lg font-sans-bold text-primary text-center mb-3">
          Authentication Service Unavailable
        </Text>
        <Text className="text-sm text-muted-foreground text-center">
          The authentication service is temporarily unavailable. Please try again in a moment.
        </Text>
      </View>
    );
  }

  // If signed in, redirect
  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  // Show the auth stack (sign-in, sign-up)
  return <Stack screenOptions={{ headerShown: false }} />;
}
