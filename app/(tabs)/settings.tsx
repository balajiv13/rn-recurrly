import { AuthButton } from "@/components/AuthButton";
import "@/global.css";
import { useClerk, useUser } from "@clerk/expo";
import { useRouter } from "expo-router";
import { styled } from "nativewind";
import React, { useState } from "react";
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledSafeAreaView = styled(SafeAreaView);

const Settings = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      await signOut();
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
      setIsLoading(false);
    }
  };

  if (!user) {
    return (
      <StyledSafeAreaView className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" />
      </StyledSafeAreaView>
    );
  }

  const displayName = user.firstName || user.emailAddresses[0]?.emailAddress || "User";
  const displayEmail = user.emailAddresses[0]?.emailAddress || "";
  const lastSignInAt = user.lastSignInAt
    ? new Date(user.lastSignInAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "N/A";

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View className="px-5 py-8">
          {/* Header */}
          <Text className="text-3xl font-sans-bold text-primary mb-8">Account</Text>

          {/* Profile Card */}
          <View className="bg-card rounded-lg p-5 mb-6 border border-border">
            <View className="flex-row items-center mb-4">
              {user.imageUrl ? (
                <Image
                  source={{ uri: user.imageUrl }}
                  className="w-16 h-16 rounded-full"
                />
              ) : (
                <View className="w-16 h-16 rounded-full bg-accent items-center justify-center">
                  <Text className="text-white font-sans-bold text-lg">
                    {displayName.charAt(0).toUpperCase()}
                  </Text>
                </View>
              )}
              <View className="ml-4 flex-1">
                <Text className="text-lg font-sans-bold text-primary">
                  {displayName}
                </Text>
                <Text className="text-sm text-muted-foreground font-sans">
                  {displayEmail}
                </Text>
              </View>
            </View>
          </View>

          {/* Account Information */}
          <Text className="text-sm font-sans-semibold text-primary mb-3">
            Account Information
          </Text>
          <View className="bg-card rounded-lg p-4 mb-6 border border-border space-y-4">
            <View className="pb-4 border-b border-border">
              <Text className="text-xs font-sans-medium text-muted-foreground mb-1">
                Email Address
              </Text>
              <Text className="text-base font-sans text-primary">
                {displayEmail}
              </Text>
            </View>

            <View className="pb-4 border-b border-border">
              <Text className="text-xs font-sans-medium text-muted-foreground mb-1">
                Last Sign In
              </Text>
              <Text className="text-base font-sans text-primary">
                {lastSignInAt}
              </Text>
            </View>

            <View>
              <Text className="text-xs font-sans-medium text-muted-foreground mb-1">
                Account Status
              </Text>
              <View className="flex-row items-center">
                <View className="w-2 h-2 rounded-full bg-success mr-2" />
                <Text className="text-base font-sans text-success">
                  Active
                </Text>
              </View>
            </View>
          </View>

          {/* Sign Out Section */}
          <Text className="text-sm font-sans-semibold text-primary mb-3">
            Session
          </Text>
          <AuthButton
            title="Sign out"
            variant="primary"
            onPress={handleSignOut}
            loading={isLoading}
            disabled={isLoading}
          />

          {/* Help Section */}
          <View className="mt-8 pt-6 border-t border-border">
            <Text className="text-sm font-sans-semibold text-primary mb-3">
              Need Help?
            </Text>
            <Pressable className="mb-3">
              <Text className="text-sm text-accent font-sans-medium">
                → Contact Support
              </Text>
            </Pressable>
            <Pressable className="mb-3">
              <Text className="text-sm text-accent font-sans-medium">
                → View Privacy Policy
              </Text>
            </Pressable>
            <Pressable>
              <Text className="text-sm text-accent font-sans-medium">
                → View Terms of Service
              </Text>
            </Pressable>
          </View>

          {/* Footer Info */}
          <View className="mt-8 pt-6">
            <Text className="text-xs text-muted-foreground font-sans text-center">
              Recurly v1.0.0
            </Text>
          </View>
        </View>
      </ScrollView>
    </StyledSafeAreaView>
  );
};

export default Settings;