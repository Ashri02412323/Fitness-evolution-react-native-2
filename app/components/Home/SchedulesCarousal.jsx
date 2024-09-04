import { View, Text, ImageBackground, FlatList, Pressable, ActivityIndicator } from 'react-native'
import React, { useCallback, useState } from 'react'
import UpcomingBg from '../../../assets/images/UpcomingBg.png'
import PendingBg from '../../../assets/images/PendingBg.png'
import CompletedBg from '../../../assets/images/CompletedBg.png'
import * as Animatable from "react-native-animatable";
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router'
import { useGlobalContext } from '../../../contexts/GlobalProvider'
import { useScheduleContext } from '../../../contexts/ScheduleProvider'
import { useFormContext } from '../../../contexts/FormProivder'

const zoomIn = {
  0: {
    scale: 0.95,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.95,
  },
};

const ScheduleCard = ({ activeItem, item,route}) => {
const {setIntialRoute} = useGlobalContext();
const {setTabsChanged} = useFormContext();

// const valuePaddingZero = item.value < 10 ? `0${item.value}` : item.value;
  return (
    <Pressable onPress={()=>{
      setIntialRoute(route)
      setTabsChanged(true);
      router.push("/mySchedules")
      }}>
    <Animatable.View
      className="mr-2"
      animation={activeItem === item.title ? zoomIn : zoomOut}
      duration={500}
    >
      <ImageBackground 
        source={item.bg} 
        style={{height: 180, width: 280, borderRadius: 10}}
        imageStyle={{borderRadius: 10}}
      >
        <View style={{margin:0, gap:20}} className="flex flex-col w-[170px] p-4 justify-center items-center h-full">
          <Text className="text-2xl text-white text-center font-dm_SemiBold" >{item.title}</Text>
          {item.isLoading ? <ActivityIndicator size="large" color="#00C7BE" />:
          <Text className="text-[50px] font-cinzel_Bold text-white text-center" >{item.value}</Text>
        }
        </View>
      </ImageBackground>
    </Animatable.View>
    </Pressable>
  );
};

const Indicator = ({ isActive }) => {
  return (
    <View
      style={{
      }}
      className={`${isActive ? 'bg-mint-100' : 'bg-gray-400'} w-8 h-1`}
    />
  );
};
const SchedulesCarousal = () => {
  const {upcomingLoading,completedLoading,upcomingLength,completedLength,pendingLength,pendingLoading} = useScheduleContext();
    const data = [
        {
            title: 'Upcoming Schedules',
            bg: UpcomingBg,
            value: upcomingLength,
            tab:"Upcoming",
            isLoading : upcomingLoading
        },
        {
            title: 'Pending Schedules',
            bg: PendingBg,
            value: pendingLength,
            tab:"Pending",
            isLoading: pendingLoading
        },
        {
            title: 'Completed Schedules',
            bg: CompletedBg,
            value: completedLength,
            tab:"Completed",
            isLoading: completedLoading
        }
    ]
    const [activeItem, setActiveItem] = useState(data[0]?.title);
      const handleScroll = (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / 300); // Assuming each item is 150px wide
      setActiveItem(data[index]?.title || data[0]?.title);
    };
  return (
    <View className="mx-4" style={{
      margin:0,
      marginTop: 20,
      overflow: 'visible',
    }}>
      <View className="flex flex-row items-center justify-between mb-6">
        <Text className="text-white_87 text-xl font-inter_SemiBold ">Workout Schedules</Text>
        <Pressable onPress={()=> {
          
          router.push("/mySchedules")
          }}>
          <AntDesign name="arrowright" size={30} color="#9DA0A1" />
        </Pressable>
      </View>

      <FlatList
        data={data}
        horizontal
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <ScheduleCard activeItem={activeItem} item={item} route={item.tab}/>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
      />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap:6 }}>
          {data.map((item) => (
            <Indicator key={item.title} isActive={item.title === activeItem} />
          ))}
        </View>
    </View>
  )
}

export default SchedulesCarousal