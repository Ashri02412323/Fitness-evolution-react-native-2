import { View, Text, Dimensions } from 'react-native';
import React from 'react';
import { LineChart } from 'react-native-chart-kit';

const DataAnalytics = () => {
  const data = {
    labels: ['Completed','Requested','Upcoming'],
    datasets: [
      {
        data: [30,  5,  28,], // Example data points with null values for spacing
        strokeWidth: 2,
      },
    ],
  };

  return (
    <View>
      <View className="flex flex-row items-center justify-between mb-6 mt-4">
        <Text className="text-white_87 text-xl font-inter_SemiBold">Data Analytics</Text>
      </View>

      {/* Bezier line chart below */}
      <View className="relative overflow-hidden rounded-lg">
        <View className="absolute top-0 left-0 w-full h-full bg-mint-100 opacity-10" />
      <LineChart
        data={data}
        width={Dimensions.get('window').width +60} // from react-native
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

export default DataAnalytics;