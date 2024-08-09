import { View, Text, Dimensions, ActivityIndicator } from 'react-native';
import React from 'react';
import { ProgressChart } from 'react-native-chart-kit';

const ScheduleAttended = ({upcomingLength = 2,completedLength=4,upcomingLoad=true,completedLoad=true}) => {
  
  const upcomingLengthNum = parseInt(upcomingLength, 10);
  const completedLengthNum = parseInt(completedLength, 10);

  const total = upcomingLengthNum + completedLengthNum;
  let percentage = 0;
  if (total) {
    percentage = completedLengthNum / total;
  }

  const data = {
    labels: ["Progress"], // optional
    data: [percentage]
  };

  return (
    <View className="rounded-mg bg-lava py-2 px-4 flex flex-row justify-between items-center rounded-md">
      <View className="flex flex-col items-start justify-center">
        <Text className="text-white_87 font-dm_SemiBold text-lg">Schedules Attended</Text>
        <Text className="text-white_60 font-inter_Regular ">
          {!upcomingLoad ? (upcomingLength ? `${upcomingLength} left` : "No Upcoming Schedules") : "..."}
        </Text>
      </View>
      <View className="h-16 w-16 rounded-full flex items-center justify-center relative left-0">
        {upcomingLoad || completedLoad ? (
          <ActivityIndicator size="large" color="#00ffbc" />
        ) : (
          <>
            <ProgressChart
              data={data}
              width={Dimensions.get('window').width / 5} // from react-native
              height={Dimensions.get('window').width / 5}
              strokeWidth={8}
              radius={28}
              chartConfig={{
                backgroundGradientFrom: '#352F36',
                backgroundGradientTo: '#352F36',
                color: (opacity = 1) => `rgba(0, 255, 188, ${opacity})`,
                strokeWidth: 2,
              }}
              hideLegend={true}
            />
            <Text style={{
              position: 'absolute',
              fontSize: 14,
              fontWeight: 'bold',
              color: '#fff',
            }}>
              {`${Math.round(percentage * 100)}%`}
            </Text>
          </>
        )}
      </View>
    </View>
  );
};

export default ScheduleAttended;
