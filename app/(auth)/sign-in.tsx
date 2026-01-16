import { FadeInView } from "@/components/animated/FadeInView";
import { authStyles } from "@/styles/authStyles";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignIn() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSignInPress = async () => {
    if (!isLoaded) return;

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(apps)");
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Sign in failed");
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={authStyles.container}
    >
      <ScrollView 
        contentContainerStyle={authStyles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={authStyles.centerContainer}>
          <FadeInView style={authStyles.card}>
            
            {/* Hero Image with Rounded Diamond Shape */}
            <View style={authStyles.heroContainer}>
              <View style={authStyles.diamondOuter}>
                <View style={authStyles.diamondInner}>
                  <Image
                    source={{ uri: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400" }}
                    style={authStyles.heroImage}
                    resizeMode="cover"
                  />
                </View>
              </View>
            </View>

            {/* Welcome Text */}
            <View style={authStyles.welcomeContainer}>
              <Text style={authStyles.welcomeText}>Welcome to</Text>
              <Text style={authStyles.titleText}>BeeHive Club</Text>
              <Text style={authStyles.subtitleText}>Plan your workout instantly from the app.</Text>
            </View>

            {/* Email Input */}
            <View style={authStyles.inputWrapper}>
              <TextInput
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                onChangeText={setEmailAddress}
                style={authStyles.input}
                keyboardType="email-address"
              />
            </View>

            {/* Password Input */}
            <View style={authStyles.inputWrapper}>
              <TextInput
                value={password}
                placeholder="Password"
                placeholderTextColor="#9CA3AF"
                secureTextEntry
                onChangeText={setPassword}
                style={authStyles.input}
              />
            </View>

            {error ? (
              <Text style={authStyles.errorText}>{error}</Text>
            ) : null}

            {/* Sign In Button */}
            <TouchableOpacity
              onPress={onSignInPress}
              style={authStyles.button}
            >
              <Text style={authStyles.buttonText}>Sign In</Text>
            </TouchableOpacity>

            {/* Sign Up Link */}
            <View style={authStyles.linkContainer}>
              <Text style={authStyles.linkText}>Not a member? </Text>
              <Link href="/(auth)/sign-up" asChild>
                <TouchableOpacity>
                  <Text style={authStyles.linkButton}>Sign Up</Text>
                </TouchableOpacity>
              </Link>
            </View>
          </FadeInView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}