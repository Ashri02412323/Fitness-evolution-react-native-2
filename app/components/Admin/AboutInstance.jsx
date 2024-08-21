import { View, Text } from 'react-native';
import React from 'react';

const AboutInstance = ({ title, value }) => {
  return (
    <View className="flex flex-row ">
      <View className="w-[90px] mr-6 relative  flex justify-center">
        <Text className="text-white_87 font-inter_Regular text-base flex items-center justify-center">
          {title}
        </Text>
        <View className="h-full w-[1px] bg-stroke_38 opacity-50 absolute right-0 top-0 bottom-0" />
      </View>
        <Text
          className={`${value ? "text-white_87" : "text-white_60"} font-inter_Regular text-base py-2 h-full  w-[60%]`}
        >
          {value ?? "Not Defined"}
        </Text>
    </View>
  );
};

export default AboutInstance;