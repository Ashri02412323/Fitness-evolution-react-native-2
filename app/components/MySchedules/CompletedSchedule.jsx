import { View, Text, FlatList, ScrollView } from 'react-native';
import React from 'react';
import ScheduleInstance from './ScheduleInstance';
import { formatDate, formatTime } from '../../../lib/Users/Schedule';
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import { useScheduleContext } from '../../../contexts/ScheduleProvider';

const CompletedSchedule = () => {
      const {user} = useGlobalContext();
      const {completedLoading,completed} = useScheduleContext();
      if(completedLoading){
        return (
          <View className="flex w-[98%] mx-auto px-2 flex-col items-center mt-4">
            <Text className="text-lg text-center text-white font-dm_Medium">Loading...</Text>
          </View>
        );
      }
  return (
      <View className="flex w-[98%] mx-auto px-2 flex-col items-center mt-4" style={{gap:10}}>
        <FlatList
          data={completed}
          style={{width:'100%'}}
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
                noLink={true}
                isUser={user?.role==="user"}
                descr={item.scheduleDescription}
                profileImg={item.scheduleImg}
                status={"Completed"}
                id={item._id}
              />
            );
          }}
          keyExtractor={item => item._id}
          contentContainerStyle={{width:'100%'}}
        />
      </View>
  );
};

export default CompletedSchedule;