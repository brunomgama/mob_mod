import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false, tabBarActiveTintColor: "#000", 
        tabBarInactiveTintColor: "#9CA3AF", tabBarShowLabel: false,
        tabBarStyle: {backgroundColor: "#fff", borderTopWidth: 0, elevation: 0, 
              height: 70, paddingBottom: 10, paddingTop: 10,},
      }}>
      <Tabs.Screen name="index" options={{tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center ${focused ? "bg-gray-100" : ""} rounded-full w-12 h-12`}>
              <Ionicons name={focused ? "home" : "home-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="discover" options={{tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center ${focused ? "bg-gray-100" : ""} rounded-full w-12 h-12`}>
              <Ionicons name={focused ? "flame" : "flame-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="history" options={{tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center ${focused ? "bg-gray-100" : ""} rounded-full w-12 h-12`}>
              <Ionicons name={focused ? "bar-chart" : "bar-chart-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen name="settings" options={{tabBarIcon: ({ color, focused }) => (
            <View className={`items-center justify-center ${focused ? "bg-gray-100" : ""} rounded-full w-12 h-12`}>
              <Ionicons name={focused ? "person" : "person-outline"} size={24} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}
