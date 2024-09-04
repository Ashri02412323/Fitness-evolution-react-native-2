import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import React from 'react';
import { router } from 'expo-router';
import { useGlobalContext } from '../../../contexts/GlobalProvider';
import { useFormContext } from '../../../contexts/FormProivder';

const ScheduleInstanc = ({title, color, value, subtitle, isLast, route, isLoading = true}) => {
  const { setIntialRoute} = useGlobalContext();
  const {setTabsChanged} = useFormContext();
  return (
    <Pressable onPress={() => {
      setIntialRoute(route);
      setTabsChanged(true);
      router.push('/mySchedules');
    }}>
      <View className={`flex flex-row items-center justify-between ${!isLast && "mb-4"} px-2`}>
        <View className="flex flex-row items-center w-[80%]">
          <View className={`h-[40px] w-[3px] ${color} rounded-full mr-2`} />
          <View>
            <Text className="text-primary opacity-70 font-pop_SemiBold text-base">{title}</Text>
            <Text className="text-white_60 font-inter_Medium text-sm">{subtitle ?? "This is a subtitle"}</Text>
          </View>
        </View>
        <View className="w-[20%] text-right">
          {isLoading ? (
            <ActivityIndicator size="small" color="#000" />
          ) : (
            <Text className="text-white_38 font-pop_SemiBold text-lg">{value}</Text>
          )}
        </View>
      </View>
    </Pressable>
  );
};

export default ScheduleInstanc;