import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { ProgressChart } from 'react-native-chart-kit';

const ScheduleAttended = () => {
  const completed = 4;
  const total = 5;
  const percentage = completed / total;

  const data = {
    labels: ["Progress"], // optional
    data: [percentage]
  };

  return (
    <View className="rounded-mg bg-lava py-2 px-4 flex flex-row justify-between items-center rounded-md">
      <View className="flex flex-col items-start justify-center">
        <Text className="text-white_87 font-dm_SemiBold text-lg">Schedules Attended</Text>
        <Text className="text-white_60 font-inter_Medium text-base">3 left</Text>
      </View>
        <View className="h-16 w-16 rounded-full flex items-center justify-center relative left-0">
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
        </View>
    </View>
  );
};

export default ScheduleAttended;