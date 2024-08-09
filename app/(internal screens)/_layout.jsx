import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";


const InternalLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="AdminUsers"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BlogDetails"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ChatScreen"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ScheduleDetail"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            headerShown: false,
          }}
          />
          <Stack.Screen
          name="BlogPage"
          options={{
            headerShown: false,
          }}
        />
      </Stack>

      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default InternalLayout;
