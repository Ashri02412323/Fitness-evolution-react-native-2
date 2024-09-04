import React, { useEffect } from 'react';
import { SafeAreaView, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useNavigation, useRoute } from '@react-navigation/native';
import UpcomingSchedules from '../components/MySchedules/UpcomingSchedule';
import CompletedSchedules from '../components/MySchedules/CompletedSchedule';
import RequestedSchedule from '../components/MySchedules/RequestedSchedules';
import PendingSchedule from '../components/MySchedules/PendingSchedule';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import { useFormContext } from '../../contexts/FormProivder';

const Tab = createMaterialTopTabNavigator();

const MySchedules2 = () => {
  const insets = useSafeAreaInsets();
  const { user, intialRoute, } = useGlobalContext();
const {setTabsChanged, tabsChanged} = useFormContext();
  const navigation = useNavigation();

  useEffect(() => {
    if (intialRoute && tabsChanged) {
      navigation.navigate('mySchedules', { screen: intialRoute });
      setTabsChanged(false);
    }
  }, [intialRoute, navigation, tabsChanged]);


  if (!user) return null;

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="My Schedules" />
      <Tab.Navigator

        initialLayout={{
          width: Dimensions.get('window').width,
        }}
        screenOptions={({ route }) => ({
          tabBarStyle: { backgroundColor: '#0B1215' }, // Change the background color of the tab bar
          tabBarActiveTintColor: 
            route.name === 'Upcoming' ? '#D8730A' : 
            route.name === 'Completed' ? '#73C34D' : 
            route.name === 'Requested' ? '#1F67FF' :
            route.name === 'Pending' ? '#FFEB7E' :
            'white', // Change the color of the active tab label
          tabBarInactiveTintColor: 'gray', // Change the color of the inactive tab label
          tabBarIndicatorStyle: { 
            backgroundColor: 
              route.name === 'Upcoming' ? '#D8730A' : 
              route.name === 'Completed' ? '#73C34D' : 
              route.name === 'Requested' ? '#1F67FF' :
              route.name === 'Pending' ? '#FFEB7E' :
              'white', // Change the color of the indicator
            height: 3, // Makes the indicator thicker
          },
          tabBarLabelStyle: {
            fontFamily: 'DMSans-SemiBold', // Change the font family of the labels
            fontSize: 14, // Change the font size of the labels
          },
        })}
      >
        <Tab.Screen name="Upcoming" component={UpcomingSchedules} />
        <Tab.Screen name="Completed" component={CompletedSchedules} />
        {user.role === 'admin' && (
          <Tab.Screen name="Requested" component={RequestedSchedule} />
        )}
        {user.role === 'user' && (
          <Tab.Screen name="Pending" component={PendingSchedule} />
        )}
      </Tab.Navigator>
    </SafeAreaView>
  );
};

export default MySchedules2;
