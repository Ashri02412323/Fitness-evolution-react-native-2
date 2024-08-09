import React, { useEffect, useState } from 'react';
import { Text, SafeAreaView, Dimensions } from 'react-native';
import { useSafeAreaInsets} from 'react-native-safe-area-context';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import UpcomingSchedules from '../components/MySchedules/UpcomingSchedule';
import CompletedSchedules from '../components/MySchedules/CompletedSchedule';
import RequestedSchedules from '../components/MySchedules/RequestedSchedules';
import { useGlobalContext } from '../../contexts/GlobalProvider';

const MySchedules = () => {
  const insets = useSafeAreaInsets();
  const layout = Dimensions.get('window');
  const { index, setIndex, user } = useGlobalContext();
  if (!user || !UpcomingSchedules || !CompletedSchedules || !RequestedSchedules || !ScheduleHeader) {
    return (
      <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top, flex: 1 }}>
       <View className="flex w-[98%] mx-auto px-2 flex-col items-center mt-4">
        <Text className="text-lg text-center text-white font-dm_Medium">Loading...</Text>
      </View>
      </SafeAreaView>
    );
  }
  const [routes] = useState([
    { key: 'upcoming', title: 'Upcoming' },
    { key: 'completed', title: 'Completed' },
    ...(user?.role === 'admin' ? [{ key: 'requested', title: 'Requested' }] : [])
  ]);

  const renderScene = SceneMap({
    upcoming: UpcomingSchedules,
    completed: CompletedSchedules,
    ...(user?.role === 'admin' ? { requested: RequestedSchedules } : {})
  });

  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top, flex: 1 }}>
      <ScheduleHeader title={"My Schedules"} />
      
      {/* <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{ width: layout.width }}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: index === 2 && user?.role === 'admin' ? '#1F67FF' : index === 0 ? '#D8730A' : '#73C34D', height: 3 }}
            className="bg-primary"
            renderLabel={({ route, focused, color }) => (
              <Text className={`font-inter_Medium text-base mb-2 ${focused ? (route.key === 'requested' && user?.role === 'admin' ? 'text-[#1F67FF]' : index === 0 ? 'text-upcoming' : 'text-completed') : 'text-white_60'}`}>
                {route.title}
              </Text>
            )}
          />
        )}
      /> */}
    </SafeAreaView>
  );
};

export default MySchedules;