import { useSignUp } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

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
      await signUp.create({emailAddress, password});

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
      setError("");
    } catch (err: any) {
      setError(err.errors[0]?.message || "Sign up failed");
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({code});

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        router.replace("/(apps)");
      }
    } catch (err: any) {
      setError(err.errors[0]?.message || "Verification failed");
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 px-6">
        {!pendingVerification ? (
          <>
            {/* HEADER Section */}
            <View className="items-center mt-12 mb-8">
              <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="fitness" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                FitTracker
              </Text>
              <Text className="text-base text-gray-600 text-center">
                Track your fitness journey{"\n"}and reach your goals
              </Text>
            </View>

            {/* FORM Section */}
            <View className="flex-1">
              <Text className="text-2xl font-semibold text-gray-900 mb-6">
                Sign up
              </Text>
              
              <TextInput autoCapitalize="none" value={emailAddress} 
                placeholder="Enter email" keyboardType="email-address" className="border border-gray-300 rounded-2xl px-4 py-3 mb-4 text-base" 
                onChangeText={setEmailAddress}/>
              
              <TextInput value={password} placeholder="Enter password" 
                secureTextEntry={true} className="border border-gray-300 rounded-2xl px-4 py-3 mb-4 text-base" onChangeText={setPassword} />

              {error ? (<Text className="text-red-500 text-sm mb-4 text-center"> {error} </Text>) : null}
              
              <TouchableOpacity onPress={onSignUpPress} className="bg-[#111827] rounded-2xl py-4 items-center mb-4">
                <Text className="text-white font-semibold text-base">
                  Sign Up
                </Text>
              </TouchableOpacity>
              
              <View className="flex-row items-center justify-center">
                <Text className="text-gray-600 mr-1">Already have an account?</Text>
                <Link href="/sign-in">
                  <Text className="text-blue-600 font-semibold">Sign in</Text>
                </Link>
              </View>
            </View>
          </>
        ) : (
          <>
            {/* VERIFICATION Section */}
            <View className="items-center mt-12 mb-8">
              <View className="w-20 h-20 bg-blue-600 rounded-2xl items-center justify-center mb-4">
                <Ionicons name="mail" size={40} color="white" />
              </View>
              <Text className="text-3xl font-bold text-gray-900 mb-2">
                Verify Email
              </Text>
              <Text className="text-base text-gray-600 text-center">
                Enter the code sent to{"\n"}{emailAddress}
              </Text>
            </View>

            <View className="flex-1">
              <TextInput value={code}  placeholder="000000" keyboardType="number-pad" maxLength={6}
                className="border border-gray-300 rounded-2xl px-4 py-3 mb-4 text-base text-center text-2xl tracking-widest"
                onChangeText={setCode}/>

              {error ? (<Text className="text-red-500 text-sm mb-4 text-center"> {error} </Text>) : null}

              <TouchableOpacity onPress={onPressVerify} className="bg-[#111827] rounded-2xl py-4 items-center mb-4">
                <Text className="text-white font-semibold text-base">
                  Verify Email
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}