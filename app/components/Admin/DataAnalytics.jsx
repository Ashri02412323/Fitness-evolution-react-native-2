import React, { memo, useMemo, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const DataAnalytics = ({ upcoming, completed, requested }) => {
  const upcomingInt = useMemo(() => parseInt(upcoming, 10), [upcoming]);
  const completedInt = useMemo(() => parseInt(completed, 10), [completed]);
  const requestedInt = useMemo(() => parseInt(requested, 10), [requested]);

  const allValuesZero = useMemo(() => upcomingInt === 0 && completedInt === 0 && requestedInt === 0, [upcomingInt, completedInt, requestedInt]);

  useEffect(() => {
    console.log("allValuesZero: ", allValuesZero);
  }, [allValuesZero]);

  const data = useMemo(() => ({
    labels: ['Upcoming', 'Completed', 'Requested'],
    datasets: [
      {
        data: [upcomingInt, completedInt, requestedInt],
        strokeWidth: 2,
      },
    ],
  }), [upcomingInt, completedInt, requestedInt]);

  return (
    <View>
      <View className="flex flex-row items-center justify-between mb-6 mt-4">
        <Text className="text-white_87 text-xl font-inter_SemiBold">Data Analytics</Text>
      </View>

      <View className="relative overflow-hidden rounded-lg">
        <View className="absolute top-0 left-0 w-full h-full bg-mint-100 opacity-10" />
        <LineChart
          data={data}
          width={Dimensions.get('window').width + 60} // from react-native
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            fillShadowGradientFrom: '#00C7BE',
            fillShadowGradientTo: '#2EB793',
            fillShadowGradientFromOpacity: 0.5,
            fillShadowGradientToOpacity: 0.1,
            fillShadowGradientToOffset: 0.7,
            backgroundGradientFrom: '#0B1215',
            backgroundGradientTo: '#0B1215',
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(0, 199, 190, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '4',
              strokeWidth: '0',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </View>
    </View>
  );
};

export default memo(DataAnalytics);