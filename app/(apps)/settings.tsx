import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

export default function Settings() {
  const {signOut} = useAuth();

  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-gray-800 text-2xl font-bold">Settings</Text>

      <View className="px-6 mb-8">
        <TouchableOpacity onPress={() => signOut()} className="bg-red-600 rounded-2xl p-4 shadow-sm" activeOpacity={0.8}>
          <View className="flex-row items-center justify-center">
            <Ionicons name="log-out-outline" size={20} color="white" />
            <Text className="text-white font-semibold text-lg ml-2">
              Sign Out
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}
