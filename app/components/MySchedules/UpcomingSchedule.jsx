import { View, Text, FlatList } from 'react-native';
import React from 'react';
import ScheduleInstance from './ScheduleInstance';
import { formatDate, formatTime } from '../../../lib/Users/Schedule';

const UpcomingSchedule = () => {
    const data = [
        {
          "title": "Strength Training",
          "date": "2023-10-04T00:00:00.000Z",
          "startTime": "2023-10-04T12:00:00.000Z",
          "endTime": "2023-10-04T13:00:00.000Z",
          "link": "https://examplesdfsddsfdsjd.com/strength-training",
          "trainer": "Alice Brown",
          "isCompleted": true
        },
        {
          "title": "HIIT Session",
          "date": "2023-10-05T00:00:00.000Z",
          "startTime": "2023-10-05T14:00:00.000Z",
          "endTime": "2023-10-05T15:00:00.000Z",
          "link": "https://example.com/hiit-session",
          "trainer": "Bob White",
          "isCompleted": false
        }
        ,
        {
          "title": "Meditation Class",
          "date": "2023-10-06T00:00:00.000Z",
          "startTime": "2023-10-06T16:00:00.000Z",
          "endTime": "2023-10-06T17:00:00.000Z",
          "link": "https://example.com/meditation-class",
          "trainer": "Charlie Green",
          "isCompleted": true
        }
        ,
        {
          "title": "Meditation Class 3",
          "date": "2023-10-06T00:00:00.000Z",
          "startTime": "2023-10-06T16:00:00.000Z",
          "endTime": "2023-10-06T17:00:00.000Z",
          "link": "https://example.com/meditation-class",
          "trainer": "Charlie Green",
          "isCompleted": true
        }
        ,
        {
          "title": "Meditation Class 2",
          "date": "2023-10-06T00:00:00.000Z",
          "startTime": "2023-10-06T16:00:00.000Z",
          "endTime": "2023-10-06T17:00:00.000Z",
          "link": "https://example.com/meditation-class",
          "trainer": "Charlie Green",
          "isCompleted": true
        }
        ,
        {
          "title": "Meditation Class 5",
          "date": "2023-10-06T00:00:00.000Z",
          "startTime": "2023-10-06T16:00:00.000Z",
          "endTime": "2023-10-06T17:00:00.000Z",
          "link": "https://example.com/meditation-class",
          "trainer": "Charlie Green",
          "isCompleted": true
        }
        ,
        {
          "title": "Meditation Class 33",
          "date": "2023-10-06T00:00:00.000Z",
          "startTime": "2023-10-06T16:00:00.000Z",
          "endTime": "2023-10-06T17:00:00.000Z",
          "link": "https://example.com/meditation-class",
          "trainer": "Charlie Green",
          "isCompleted": true
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
                noLink={false}
              />
            );
        }}
        keyExtractor={item => item.link + item.title}
        contentContainerStyle={{ width:'100%' }}
      />
    </View>
  );
};

export default UpcomingSchedule;