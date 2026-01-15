import { Text, View } from "react-native";
import "../global.css";

export default function RootLayout() {
  return (
    <View className="flex-1 items-center justify-center bg-blue-500">
      <Text className="text-white text-2xl font-bold">
        Hello from NativeWind!
      </Text>
    </View>
  );
}
