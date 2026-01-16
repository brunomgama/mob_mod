import { useSignIn } from '@clerk/clerk-expo'
import { Ionicons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import React from 'react'
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = async () => {
    if (!isLoaded) return

    try {
      const signInAttempt = await signIn.create({identifier: emailAddress,password})

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/(apps)')
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err) {
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} className="flex-1 px-6">
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
            Sign in
          </Text>
          
          <TextInput autoCapitalize="none"  value={emailAddress}  placeholder="Enter email"
            className="border border-gray-300 rounded-2xl px-4 py-3 mb-4 text-base"
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}/>
          
          <TextInput value={password} placeholder="Enter password" secureTextEntry={true}
            className="border border-gray-300 rounded-2xl px-4 py-3 mb-6 text-base"
            onChangeText={(password) => setPassword(password)}/>
          
          <TouchableOpacity onPress={onSignInPress} className="bg-[#111827] rounded-2xl py-4 items-center mb-4">
            <Text className="text-white font-semibold text-base">
              Continue
            </Text>
          </TouchableOpacity>
          
          <View className="flex-row items-center justify-center">
            <Text className="text-gray-600 mr-1">Don't have an account?</Text>
            <Link href="/sign-up">
              <Text className="text-blue-600 font-semibold">Sign up</Text>
            </Link>
          </View>
        </View>

        {/* FOOTER */}
        <View className='pb-6'>
          <Text className='text-center text-gray-500 text-sm'>
            Start your fitness journey today
          </Text>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}