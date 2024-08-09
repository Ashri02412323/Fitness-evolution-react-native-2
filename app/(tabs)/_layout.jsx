import React, { useEffect } from 'react';
import { View, StatusBar } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
// Import your tab screens explicitly
import HomeScreen from './home';
import MySchedulesScreen from './mySchedules2';
import AddScheduleScreen from './addSchedules';
import ChatScreen from './chat';
import AdminScreen from './admin';

const Tabs = createBottomTabNavigator();

const AuthLayout = () => {
  const { user } = useGlobalContext();
  return (
    <>
      <View className="absolute top-0 left-0 right-0 -z-20 bg-primary h-full" />
      <Tabs.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            marginTop: 0,
            backgroundColor: "#232323",
            borderTopWidth: 0,
            borderBottomWidth: 2.5,
            height: 60,
            borderRadius: 50,
            width: "90%",
            margin: "auto",
            marginBottom: 10,
          },
        }}
      >
        {user?.role !== "admin" && (
          <Tabs.Screen
            name="home"
            component={HomeScreen}
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name="home-outline" size={28} color={focused ? "#00C7BE" : "#DFE0E1"} />
              ),
            }}
          />
        )}
        {user?.role === "admin" && (
          <Tabs.Screen
            name="admin"
            component={AdminScreen}
            options={{
              title: "Admin",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <MaterialIcons name="dashboard" size={28} color={focused ? "#00C7BE" : "#DFE0E1"} />
              ),
            }}
          />
        )}
        <Tabs.Screen
          name="mySchedules"
          component={MySchedulesScreen}
          options={{
            title: "My Schedules",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="time-outline" size={28} color={focused ? "#00C7BE" : "#DFE0E1"} />
            ),
          }}
        />
        <Tabs.Screen
          name="addSchedule"
          component={AddScheduleScreen}
          options={{
            title: "Add Schedule",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="add-circle-outline" size={28} color={focused ? "#00C7BE" : "#DFE0E1"} />
            ),
          }}
        />
        <Tabs.Screen
          name="chat"
          component={ChatScreen}
          options={{
            title: "Chat",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <Ionicons name="chatbubble-ellipses-outline" size={28} color={focused ? "#00C7BE" : "#DFE0E1"} />
            ),
          }}
        />
      </Tabs.Navigator>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default AuthLayout;