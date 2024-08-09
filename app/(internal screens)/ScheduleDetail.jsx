import { useGlobalSearchParams } from 'expo-router';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import DetailInstance from '../components/MySchedules/DetailInstance';
import CustomButton from '../components/CustomButton';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { markAsCompleted } from '../../lib/Users/Schedule';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import Toast from 'react-native-toast-message';

const ScheduleDetail = () => {
  const { title, date, time, link, userName, noLink, profileImg,descr,isUser,isProfileLink,status,id } = useGlobalSearchParams();
  const [markingLoad, setMarkingLoad] = useState(false);

  const {token} = useGlobalContext();
  const insets = useSafeAreaInsets();

  const handleMarkCompleted = async() => {
    console.log("pressed")
    setMarkingLoad(true);
    try{
    const response = await markAsCompleted(token,id);
    if(response){
      console.log("Marked as Completed: ", response);
    }
    } catch(err){
      console.log(err);
      const errorMessage = err.response?.data?.message || 'Error marking as Completed';
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: errorMessage
      });
    }finally{
      setMarkingLoad(false);
    }
  }
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScrollView className="h-full"> 
        <ScheduleHeader isDetail title={"Schedule Details"} />
        {isProfileLink ? <Image source={{uri:profileImg}} className="h-32 w-32 rounded-full mx-auto mt-8" />:
          <Image source={profileImg} className="h-32 w-32 rounded-full mx-auto mt-8" />
          }
        
        <Text className="text-white_87 font-dm_Medium text-2xl capitalize text-center mt-4 px-4">{title}</Text>
        <View className="mt-6 px-4">
          <DetailInstance title="Date" value={date} />
          <DetailInstance title="Time" value={time} />
          { (!noLink || noLink === "false") &&
          <DetailInstance title="Link" value={link} isLink={true}/>
        }
          <DetailInstance title={isUser==="true"?"Trainer":"User"} value={userName}/>
          <DetailInstance title="Description" value={descr ?? "No Description Provided"}/>
          <DetailInstance title="Status" value={status} isLast={true}/>
        </View>
        <View className="flex flex-col items-center justify-center mt-8 mb-8">
          {isUser==="true"?
          <CustomButton title="Request Reschedule" onPress={()=>{}} isDetail={true} 
          customStyle={"bg-mint-87"}
          endIcon={<MaterialIcons name="restart-alt" 
            size={24} color="#fff" />}
            />
          :
          <>
          { status==='Requested' ? 
            <CustomButton title="Approve it" onPress={()=>{}} isDetail={true} 
            customStyle={"bg-mint-87 mb-2"}
            textStyle={"mr-3"}
            endIcon={<FontAwesome6 name="circle-check" size={22} color="#fff" />}
              />
          :
          <CustomButton title="Reschedule it" onPress={()=>{}} isDetail={true} 
          customStyle={"bg-mint-87 mb-2"}
          endIcon={<MaterialIcons name="restart-alt" 
            size={24} color="#fff" />}
            />
          }
          { status === "Upcoming" &&
          <CustomButton title="Mark as Completed" onPress={async()=> await handleMarkCompleted()} isDetail={true}
            customStyle={"bg-mint-87"}
            endIcon={<Ionicons name="checkmark-done" size={24} color="#fff" />} isLoading={markingLoad}
          />
          }
          </>
          }
          
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default ScheduleDetail;