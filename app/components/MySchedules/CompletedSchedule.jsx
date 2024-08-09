import { View, Text, FlatList, ScrollView } from 'react-native';
import React from 'react';
import ScheduleInstance from './ScheduleInstance';
import { formatDate, formatTime } from '../../../lib/Users/Schedule';
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import { useScheduleContext } from '../../../contexts/ScheduleProvider';

const CompletedSchedule = () => {
  const { user } = useGlobalContext();
  const { completedLoading, completed } = useScheduleContext();

  if (completedLoading) {
    return (
      <View className="flex w-full h-full bg-primary mx-auto px-2 flex-col items-center mt-0">
      <Text className="text-lg text-center text-white font-dm_Medium mt-4">Loading...</Text>
    </View>
    );
  }

  if (completed.length === 0) {
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
        data={completed}
        style={{ width: '100%' }}
        renderItem={({ item }) => {
          const formattedDate = formatDate(item.date);
          const formattedTime = formatTime(item.startTime, item.endTime);

          return (
            <ScheduleInstance
              title={item.scheduleSubject}
              date={formattedDate}
              time={formattedTime}
              link={item.scheduleLink}
              userName={user?.role === "user" ? item.trainerId.fullName : item.userId.fullName}
              noLink={true}
              isUser={user?.role === "user"}
              descr={item.scheduleDescription}
              profileImg={item.scheduleImg}
              status={"Completed"}
              id={item._id}
              startTime={item.startTime}
              endTime={item.endTime}
              userId={user?.role === "user" ? item.userId : item.userId._id}
              rawDate={item.date}
            />
          );
        }}
        keyExtractor={item => item._id}
        contentContainerStyle={{ width: '100%' }}
      />
      </View>
    </View>
  );
};

export default CompletedSchedule;