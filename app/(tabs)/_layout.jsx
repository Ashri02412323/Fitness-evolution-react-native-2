import { StatusBar } from "expo-status-bar";
import { Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import defaultIcon from "../../assets/images/icon.png";
import Ionicons from '@expo/vector-icons/Ionicons';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      {/* <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

const AuthLayout = () => {
  return (
    <>
    <View className="
    absolute top-0 left-0 right-0 -z-20 bg-primary h-full"
    />
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            marginTop: 0,
            backgroundColor: "#232323",
            borderTopWidth: 0,
            borderBottomWidth: 2.5,
            // borderBottomColor: "#686C6E",
            height: 60,
            borderRadius: 50,
            width: "90%",
            margin: "auto",
            marginBottom: 10,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name="home-outline" size={28} color={focused?"#00C7BE":"#DFE0E1"} />
            ),
          }}
        />
        <Tabs.Screen
          name="mySchedules"
          options={{
            title: "My Schedules",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name="time-outline" size={28} color={focused?"#00C7BE":"#DFE0E1"} />

            ),
          }}
        />

        <Tabs.Screen
          name="addSchedule"
          options={{
            title: "Add Schedule",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name="add-circle-outline" size={28} color={focused?"#00C7BE":"#DFE0E1"} />

            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
                <Ionicons name="chatbubble-ellipses-outline" size={28} color={focused?"#00C7BE":"#DFE0E1"} />
            ),
          }}
        />
      </Tabs>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;
