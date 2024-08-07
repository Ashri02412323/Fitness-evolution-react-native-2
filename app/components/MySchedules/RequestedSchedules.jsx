import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ScheduleInstance from './ScheduleInstance';
import { formatDate, formatTime } from '../../../lib/Users/Schedule';

const RequestedSchedules = () => {
    const data = [
        {
          "title": "Yoga Class",
          "date": "2023-10-01T00:00:00.000Z",
          "startTime": "2023-10-01T06:00:00.000Z",
          "endTime": "2023-10-01T07:00:00.000Z",
          "link": "https://example.com/yoga-class",
          "trainer": "John Doe",
          "isCompleted": false
        },
        {
          "title": "Pilates Session",
          "date": "2023-10-02T00:00:00.000Z",
          "startTime": "2023-10-02T08:00:00.000Z",
          "endTime": "2023-10-02T09:00:00.000Z",
          "link": "https://example.com/pilates-session",
          "trainer": "Jane Smith",
          "isCompleted": true
        },
        {
          "title": "Cardio Workout",
          "date": "2023-10-03T00:00:00.000Z",
          "startTime": "2023-10-03T10:00:00.000Z",
          "endTime": "2023-10-03T11:00:00.000Z",
          "link": "https://example.com/cardio-workout",
          "trainer": "Mike Johnson",
          "isCompleted": false
        }
      ];

  return (
    <View className="flex w-[98%] mx-auto px-2 flex-col items-center mt-4" style={{gap:10}}>
      <FlatList
        data={data}
        renderItem={({item}) => {
            const formattedDate = formatDate(item.date);
            const formattedTime = formatTime(item.startTime, item.endTime);
            return (
              <ScheduleInstance 
                title={item.title} 
                date={formattedDate} 
                time={formattedTime} 
                link={item.link} 
                trainer={item.trainer} 
                noLink={true}
              />
            );
        }}
        keyExtractor={item => item.link + item.title}
        contentContainerStyle={{ width:'100%' }}
      />
    </View>
  );
};

export default RequestedSchedules;