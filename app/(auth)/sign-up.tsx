import { AuthButton } from "@/components/AuthButton";
import { AuthHeader } from "@/components/AuthHeader";
import { AuthLink } from "@/components/AuthLink";
import { ErrorAlert } from "@/components/ErrorAlert";
import { FormInput } from "@/components/FormInput";
import { validateEmail, validatePassword, validatePasswordConfirm } from "@/lib/validation";
import { useAuth, useSignUp } from "@clerk/expo";
import { type Href, useRouter } from "expo-router";
import { styled } from "nativewind";
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type SignUpStep = "form" | "verification";

const StyledSafeAreaView = styled(SafeAreaView);

export default function SignUpScreen() {
  let signUpHook;
  let setActiveHook;
  let isLoadedHook;
  try {
    const signUpHooks = useSignUp() as any;
    signUpHook = signUpHooks?.signUp;
    setActiveHook = signUpHooks?.setActive;
    const authHooks = useAuth();
    isLoadedHook = authHooks?.isLoaded;
  } catch (error) {
    signUpHook = null;
    setActiveHook = null;
    isLoadedHook = false;
  }

  const router = useRouter();
  const [step, setStep] = useState<SignUpStep>("form");

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  // Error state
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [codeError, setCodeError] = useState("");
  const [generalError, setGeneralError] = useState("");

  // UI state
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<string[]>([]);

  // Clear errors when user starts typing
  const handleEmailChange = (text: string) => {
    setEmail(text);
    setEmailError("");
    setGeneralError("");
  };

  const handlePasswordChange = (text: string) => {
    setPassword(text);
    setPasswordError("");
    setGeneralError("");
    
    // Real-time password validation
    if (text.length > 0) {
      const validation = validatePassword(text);
      setPasswordValidationErrors(validation.errors);
    } else {
      setPasswordValidationErrors([]);
    }
  };

  const handleConfirmPasswordChange = (text: string) => {
    setConfirmPassword(text);
    setConfirmPasswordError("");
    setGeneralError("");
  };

  const handleCodeChange = (text: string) => {
    setCode(text.replace(/\D/g, "").slice(0, 6)); // Only numbers, max 6 digits
    setCodeError("");
    setGeneralError("");
  };

  // Validate sign-up form
  const validateSignUpForm = (): boolean => {
    let isValid = true;

    if (!email.trim()) {
      setEmailError("Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email");
      isValid = false;
    }

    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      setPasswordError(passwordValidation.errors[0]);
      isValid = false;
    }

    if (!confirmPassword.trim()) {
      setConfirmPasswordError("Please confirm your password");
      isValid = false;
    } else if (!validatePasswordConfirm(password, confirmPassword)) {
      setConfirmPasswordError("Passwords do not match");
      isValid = false;
    }

    return isValid;
  };

  // Handle sign-up form submission
  const handleSignUp = async () => {
    Keyboard.dismiss();
    setGeneralError("");
    setEmailError("");
    setPasswordError("");
    setConfirmPasswordError("");

    if (!validateSignUpForm()) {
      return;
    }

    if (!signUpHook || !setActiveHook || !isLoadedHook) {
      setGeneralError("Authentication service is unavailable");
      return;
    }

    setIsLoading(true);

    try {
      // Attempt to create the sign-up
      await signUpHook.create({
        emailAddress: email.trim(),
        password: password,
      });

      // Send verification email
      await signUpHook.prepareEmailAddressVerification({ strategy: "email_code" });

      // Move to verification step
      setStep("verification");
    } catch (error: any) {
      const errorMessage = error?.errors?.[0]?.message || error?.message || "Failed to create account";
      
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

  // Handle email verification
  const handleVerifyEmail = async () => {
    Keyboard.dismiss();
    setCodeError("");
    setGeneralError("");

    if (!code.trim()) {
      setCodeError("Verification code is required");
      return;
    }

    if (code.length !== 6) {
      setCodeError("Verification code must be 6 digits");
      return;
    }

    if (!signUpHook || !setActiveHook) {
      setGeneralError("Authentication service is unavailable");
      return;
    }

    setIsLoading(true);

    try {
      // Verify the email code
      await signUpHook.attemptEmailAddressVerification({ code });

      // If verification successful, complete sign-up
      if (signUpHook.status === "complete") {
        // Set active session and navigate
        await setActiveHook({ session: signUpHook.createdSessionId! });
        router.replace("/(tabs)" as Href);
      } else {
        setGeneralError("Verification failed. Please try again.");
      }
    } catch (error: any) {
      const errorMessage = error?.errors?.[0]?.message || error?.message || "Verification failed";
      setCodeError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  // Render verification step
  if (step === "verification") {
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
                title="Verify your email"
                subtitle={`We sent a 6-digit code to ${email}`}
              />

              <ErrorAlert error={generalError || codeError} />

              <FormInput
                label="Verification Code"
                placeholder="000000"
                value={code}
                onChangeText={handleCodeChange}
                error={codeError}
                editable={!isLoading}
                keyboardType="numeric"
                maxLength={6}
              />

              <AuthButton
                title="Verify"
                onPress={handleVerifyEmail}
                loading={isLoading}
                disabled={isLoading || code.length !== 6}
              />

              <Pressable
                onPress={() => {
                  if (!signUpHook) {
                    setGeneralError("Authentication service is unavailable");
                    return;
                  }
                  setIsLoading(true);
                  signUpHook.prepareEmailAddressVerification({ strategy: "email_code" }).then(() => {
                    setIsLoading(false);
                    setCode("");
                  }).catch((error: any) => {
                    setGeneralError(error?.message || "Failed to resend code");
                    setIsLoading(false);
                  });
                }}
                disabled={isLoading}
                className="mt-4"
              >
                <Text className="text-center text-sm text-accent font-sans-semibold">
                  Didn't receive a code? Resend
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setStep("form")}
                disabled={isLoading}
                className="mt-4"
              >
                <Text className="text-center text-sm text-muted-foreground font-sans">
                  Go back
                </Text>
              </Pressable>

              <View className="flex-1" />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </StyledSafeAreaView>
    );
  }

  // Render sign-up form
  return (
    <StyledSafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <View className="flex-1 px-5 py-8">
            <AuthHeader
              title="Create account"
              subtitle="Start managing your subscriptions"
            />

            <ErrorAlert error={generalError} />

            {/* Email Input */}
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

            {/* Password Input */}
            <View className="mb-4">
              <Text className="text-sm font-sans-semibold text-primary mb-2">
                Password
              </Text>
              <View className="flex-row items-center border border-border rounded-lg bg-card px-4 py-3">
                <FormInput
                  label=""
                  placeholder="Create a password"
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

              {/* Password requirements */}
              {password.length > 0 && (
                <View className="mt-3 space-y-1">
                  {passwordValidationErrors.map((error, index) => (
                    <Text key={index} className="text-xs text-destructive font-sans">
                      • {error}
                    </Text>
                  ))}
                </View>
              )}
            </View>

            {/* Confirm Password Input */}
            <View className="mb-4">
              <Text className="text-sm font-sans-semibold text-primary mb-2">
                Confirm Password
              </Text>
              <View className="flex-row items-center border border-border rounded-lg bg-card px-4 py-3">
                <FormInput
                  label=""
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChangeText={handleConfirmPasswordChange}
                  secureTextEntry={!showConfirmPassword}
                  editable={!isLoading}
                  autoCapitalize="none"
                />
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  disabled={isLoading}
                >
                  <Text className="text-accent font-sans-semibold text-xs">
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Text>
                </Pressable>
              </View>
              {confirmPasswordError && (
                <Text className="text-xs font-sans-medium text-destructive mt-1.5">
                  {confirmPasswordError}
                </Text>
              )}
            </View>

            {/* Sign Up Button */}
            <AuthButton
              title="Create account"
              onPress={handleSignUp}
              loading={isLoading}
              disabled={isLoading || !email || !password || !confirmPassword}
            />

            {/* Sign In Link */}
            <AuthLink
              question="Already have an account?"
              linkText="Sign in"
              href="/(auth)/sign-in"
            />

            {/* Spacer */}
            <View className="flex-1" />

            {/* Terms & Privacy */}
            <View className="py-4">
              <Text className="text-xs text-muted-foreground font-sans text-center leading-5">
                By creating an account, you agree to our Terms of Service and Privacy Policy.
              </Text>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
}