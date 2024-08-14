import { router, useGlobalSearchParams } from 'expo-router';
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
import { useScheduleContext } from '../../contexts/ScheduleProvider';
import Entypo from '@expo/vector-icons/Entypo';
import { useFormContext } from '../../contexts/FormProivder';
// import Toast from 'react-native-toast-message';
import ToastManager, { Toast } from 'toastify-react-native';

const ScheduleDetail = () => {
  const { title, date, time, link, userName, noLink, profileImg,descr,isUser,isProfileLink,status,id,startTime,endTime,userId,rawDate} = useGlobalSearchParams();
  const [markingLoad, setMarkingLoad] = useState(false);
  const [currStatus, setCurrStatus] = useState(status);
  const {token} = useGlobalContext();
  const {setUpcoming,appendUpcoming,appendCompleted,setCompleted} = useScheduleContext();
  const {handleApprove} =useFormContext();

  const insets = useSafeAreaInsets();

  const handleMarkCompleted = async(status) => {
    setMarkingLoad(true);
    try{
    const response = await markAsCompleted(token,id,status);
    if(response){
      if(status === "completed"){
        setCurrStatus("Completed");
        setUpcoming((prev)=>prev.filter((item)=>item._id!==id));
        appendCompleted(response);
      }else {
        setCurrStatus("Upcoming");
        setCompleted((prev)=>prev.filter((item)=>item._id!==id));
        appendUpcoming(response);
      }
    }
    } catch(err){
      console.log(err);
      const errorMessage = err.response?.data?.message || 'Error marking as ' + status;
      Toast.error(errorMessage,'top')
    }finally{
      setMarkingLoad(false);
    }
  }
  // const handleApproveHere = () => {
  //   handleApprove(id,rawDate,startTime,endTime,link,title,descr,userId,userName);
  // }
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
          <DetailInstance title="Status" value={currStatus} isLast={true}/>
        </View>
        <View className="flex flex-col items-center justify-center mt-8 mb-8">
          {isUser==="true"?
          <CustomButton title="Request Reschedule" handlePress={()=> router.push("/chat")} isDetail={true} 
          customStyle={"bg-mint-87"}
          endIcon={<MaterialIcons name="restart-alt" 
            size={24} color="#fff" />}
            />
          :
          <>
          { status==='Requested' ? 
            <CustomButton title="Approve it" handlePress={()=>{
              handleApprove(id,rawDate,startTime,endTime,link,title,descr,userId,userName,"toApprove");
            }} isDetail={true} 
            customStyle={"bg-mint-87 mb-2"}
            textStyle={"mr-3"}
            endIcon={<FontAwesome6 name="circle-check" size={22} color="#fff" />}
              />
          :
          <CustomButton title="Reschedule it" handlePress={()=>{
            handleApprove(id,rawDate,startTime,endTime,link,title,descr,userId,userName,"toReschedule");
          }} isDetail={true} 
          customStyle={"bg-mint-87 mb-2"}
          endIcon={<MaterialIcons name="restart-alt" 
            size={24} color="#fff" />}
            />
          }
          { currStatus === "Upcoming" ?
          <CustomButton title="Markd as Completed" handlePress={()=>handleMarkCompleted("completed")} isDetail={true}
            customStyle={"bg-mint-87"}
            endIcon={<Ionicons name="checkmark-done" size={24} color="#fff" />} isLoading={markingLoad}
          />:
          <CustomButton title="Mark as incompleted" handlePress={()=>handleMarkCompleted("pending")} isDetail={true}
            customStyle={"bg-mint-87"}
            endIcon={<Entypo name="cross" size={24} color="#fff" />} isLoading={markingLoad}
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