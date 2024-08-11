import { View, Text, FlatList, RefreshControl } from 'react-native';
import React from 'react';
import ScheduleInstance from './ScheduleInstance';
import { formatDate, formatTime } from '../../../lib/Users/Schedule';
import { useScheduleContext } from '../../../contexts/ScheduleProvider';
import { useGlobalContext } from '../../../contexts/GlobalProvider';

const UpcomingSchedule = () => {
  const {user} = useGlobalContext();
  const {upcomingLoading,upcoming,setRefreshing,refreshing} = useScheduleContext();
  const onRefresh = () => {
    setRefreshing(true);
  };
  if(upcomingLoading){
    return (
      <View className="flex w-full h-full bg-primary mx-auto px-2 flex-col items-center mt-0">
      <Text className="text-lg text-center text-white font-dm_Medium mt-4">Loading...</Text>
    </View>
    );
  }
  
  if (upcoming.length === 0) {
    return (
      <View className="flex w-full h-full bg-primary mx-auto px-2 flex-col items-center mt-0">
        <Text className="text-lg text-center text-white font-dm_Medium mt-4">No data to show</Text>
      </View>
    );
  }
  return (
    <View className="flex bg-primary h-full w-full mx-auto px-2 flex-col items-center mt-0" style={{gap:10}}>
      <View className="mt-4">
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={upcoming}
        renderItem={({item}) => {
            const formattedDate = formatDate(item.date);
            const formattedTime = formatTime(item.startTime, item.endTime);
            return (
              <ScheduleInstance 
                title={item.scheduleSubject} 
                date={formattedDate} 
                time={formattedTime} 
                link={item.scheduleLink} 
                userName={user?.role==="user"?item.trainerId.fullName:item.userId.fullName} 
                noLink={false}
                isUser={user?.role==="user"}
                descr={item.scheduleDescription}
                profileImg={item.scheduleImg}
                status={"Upcoming"}
                id={item._id}
                startTime={item.startTime}
                endTime={item.endTime}
                userId={user?.role==="user"?item.userId:item.userId._id}
                rawDate={item.date}

              />
            );
          }}
          keyExtractor={item => item._id}
          contentContainerStyle={{ width:'100%' }}
          />
        </View>
    </View>
  );
};

export default UpcomingSchedule;