import { FadeInView } from "@/components/animated/FadeInView";
import { authStyles } from "@/styles/authStyles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function SignUp() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        emailAddress,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      setError(err.errors[0]?.message || "Sign up failed");
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(apps)");
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Verification failed");
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={authStyles.container}>
      <ScrollView contentContainerStyle={authStyles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={authStyles.centerContainer}>
          <FadeInView style={authStyles.card}>
            
            {!pendingVerification ? (
              <>
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

                <View style={authStyles.welcomeContainer}>
                  <Text style={authStyles.welcomeText}>Join</Text>
                  <Text style={authStyles.titleText}>BeeHive Club</Text>
                  <Text style={authStyles.subtitleText}>Start your fitness journey today.</Text>
                </View>

                <View style={authStyles.inputWrapper}>
                  <TextInput autoCapitalize="none" value={emailAddress} placeholder="Email"
                    placeholderTextColor="#9CA3AF" onChangeText={setEmailAddress} style={authStyles.input} keyboardType="email-address"/>
                </View>

                <View style={authStyles.inputWrapper}>
                  <TextInput value={password} placeholder="Password" placeholderTextColor="#9CA3AF"
                    secureTextEntry onChangeText={setPassword} style={authStyles.input}/>
                </View>

                {error ? (
                  <Text style={authStyles.errorText}>{error}</Text>
                ) : null}

                <TouchableOpacity onPress={onSignUpPress} style={authStyles.button}>
                  <Text style={authStyles.buttonText}>Sign Up</Text>
                </TouchableOpacity>

                <View style={authStyles.linkContainer}>
                  <Text style={authStyles.linkText}>Already a member? </Text>
                  <Link href="/(auth)/sign-in" asChild>
                    <TouchableOpacity>
                      <Text style={authStyles.linkButton}>Sign In</Text>
                    </TouchableOpacity>
                  </Link>
                </View>
              </>
            ) : (
              <>
                <View style={authStyles.welcomeContainer}>
                  <Text style={authStyles.titleText}>Verify Email</Text>
                  <Text style={authStyles.subtitleText}>Enter the code sent to {emailAddress}</Text>
                </View>

                <View style={authStyles.inputWrapper}>
                  <TextInput value={code} placeholder="Verification Code" placeholderTextColor="#9CA3AF"
                    onChangeText={setCode} style={[authStyles.input, authStyles.codeInput]} keyboardType="number-pad" maxLength={6}/>
                </View>

                {error ? (
                  <Text style={authStyles.errorText}>{error}</Text>
                ) : null}

                <TouchableOpacity onPress={onPressVerify} style={authStyles.button}>
                  <Text style={authStyles.buttonText}>Verify Email</Text>
                </TouchableOpacity>
              </>
            )}
          </FadeInView>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}