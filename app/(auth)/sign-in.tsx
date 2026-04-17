import { AuthButton } from "@/components/AuthButton";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthLink } from "@/components/AuthLink";
import { ErrorAlert } from "@/components/ErrorAlert";
import { FormInput } from "@/components/FormInput";
import { validateEmail } from "@/lib/validation";
import { useSignIn } from "@clerk/expo";
import { type Href, useRouter } from "expo-router";
import { styled } from "nativewind";
import { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const StyledSafeAreaView = styled(SafeAreaView);

export default function SignInScreen() {
  let signInHook;
  let setActiveHook;
  try {
    const hooks = useSignIn() as any;
    signInHook = hooks?.signIn;
    setActiveHook = hooks?.setActive;
  } catch (error) {
    signInHook = null;
    setActiveHook = null;
  }

  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError("");
    setGeneralError("");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError("");
    setGeneralError("");
  };

  const handleSignIn = async () => {
    Keyboard.dismiss();
    setEmailError("");
    setPasswordError("");
    setGeneralError("");

    if (!signInHook || !setActiveHook) {
      setGeneralError("Authentication service is unavailable");
      return;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      return;
    }

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      return;
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      return;
    }

    setIsLoading(true);

    try {
      const result = await signInHook.create({
        identifier: email.trim(),
        password,
      });

      if (result.status === "complete") {
        await setActiveHook({ session: result.createdSessionId });
        router.replace("/(tabs)" as Href);
      } else {
        setGeneralError("Sign in failed. Please try again.");
      }
    } catch (error: any) {
      const errorMessage = error?.errors?.[0]?.message || error?.message || "Failed to sign in";
      
      if (errorMessage.includes("email") || errorMessage.includes("identifier")) {
        setEmailError(errorMessage);
      } else if (errorMessage.includes("password")) {
        setPasswordError(errorMessage);
      } else {
        setGeneralError(errorMessage);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-5 py-8">
            <AuthHeader
              title="Welcome back"
              subtitle="Sign in to manage your subscriptions"
            />

            <ErrorAlert error={generalError} />

            <FormInput
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={handleEmailChange}
              error={emailError}
              editable={!isLoading}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            <View className="mb-4">
              <Text className="text-sm font-sans-semibold text-primary mb-2">
                Password
              </Text>
              <View className="flex-row items-center border border-border rounded-lg bg-card px-4 py-3">
                {/* <FormInput
                className="w-full"
                  label=""
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                  autoCapitalize="none"
                /> */}
                <TextInput
                  className="flex-1 text-base text-primary"
                  placeholder="Enter your password"
                  value={password}
                  onChangeText={handlePasswordChange}
                  secureTextEntry={!showPassword}
                  editable={!isLoading}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                >
                  <Text className="text-accent font-sans-semibold text-xs">
                    {showPassword ? "Hide" : "Show"}
                  </Text>
                </Pressable>
              </View>
              {passwordError && (
                <Text className="text-xs font-sans-medium text-destructive mt-1.5">
                  {passwordError}
                </Text>
              )}
            </View>

            <AuthButton
              title="Sign in"
              onPress={handleSignIn}
              loading={isLoading}
              disabled={isLoading || !email || !password}
            />

            <AuthLink
              question="Don't have an account?"
              linkText="Sign up"
              href="/(auth)/sign-up"
            />

            <View className="flex-1" />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}
