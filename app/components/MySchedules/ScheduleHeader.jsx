import { View, Text, Pressable } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../../contexts/GlobalProvider'
import AntDesign from '@expo/vector-icons/AntDesign';
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DropDown from '../Profile/DropDown';
import { logoutUser } from '../../../lib/Users/User';
import ProfileDefault from '../Profile/ProfileDefault';

const ScheduleHeader = ({isDetail,isProfile,title,onPress,isIconVisible =true,textColor,setDeleteVisible}) => {
  const {setToken,setUser} = useGlobalContext();
  const [isVisible, setIsVisible] = useState(false);
  const handleLogout = async () => {
    try {
      await logoutUser(setToken,setUser);
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
    {isVisible && <Pressable onPress={()=>setIsVisible(false)} className="absolute top-0 left-0 w-full bg-black h-full z-10 opacity-40"/>}
    <View className="flex flex-row items-center gap-2 justify-between h-20 px-2 relative z-20" style={{margin:0}}>
      <View className="flex flex-row items-center gap-x-2 relative -left-2" style={{
        margin: 0,
      }}>
        <Pressable className=" px-2 py-2" onPress={onPress?onPress:()=> router.back()}>
          <AntDesign name="arrowleft" size={24} color={textColor?textColor:"#01AFA8"} style={{margin:0}} />
        </Pressable>
        <View className="flex flex-col" style={{margin:0}}>
          <Text className={`font-dm_SemiBold text-xl capitalize `} style={{color:textColor?textColor:"#01AFA8"}}
          >{title}</Text>
        </View>
      </View>

      {isProfile?
      <Pressable onPress={()=> setIsVisible(true)} className={`${!isProfile && "bg-lava"} h-12 w-12 flex-row justify-center items-center rounded-full `}
      style={{ margin: 0 }}
      >
        <Entypo name="dots-three-vertical" size={20} color={textColor?textColor:"#DFE0E1"} />
      </Pressable>
      
      :
      isIconVisible ?
      <Pressable onPress={()=> router.push("/profile")} >
        <ProfileDefault sizeClass={"h-12 w-12"} textStyle={"text-2xl bottom-0"} parentStyle={"mb-0 mt-3 mr-1"} />
      </Pressable>
      : null
      }
    </View>
    {(isVisible) ? (
        <View className="absolute top-12 right-5 z-30">
          <DropDown
            items={[
              { label: 'Logout', value: 'logout',icon:<MaterialIcons name="logout" size={24} color="#DFE0E1" />,
               onSelect:handleLogout },
              { label: 'Delete Account', value: 'deactivate',isRed:true,
                icon:<AntDesign name="warning" size={24} color="#FF3B30" />,
                onSelect:()=>setDeleteVisible(true)
               },
            ]}
            placeholder="Select an option"
            isVisible={isVisible}
            setIsVisible={setIsVisible}
          />
        </View>
      ):
      null
    }
    </>
  )
}

export default ScheduleHeader