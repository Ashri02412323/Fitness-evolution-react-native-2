import { View, Text, Image } from 'react-native'
import React from 'react'
import { useGlobalContext } from '../../../contexts/GlobalProvider';

const ProfileDefault = ({sizeClass,textStyle, parentStyle}) => {
    const {firstLetter,userProfile} = useGlobalContext();

  return (
    <View className={`bg-lava ${sizeClass} flex-row justify-center items-center rounded-full mb-8 ${parentStyle}`}>
      {userProfile ? <Image source={{uri:userProfile}} className="w-full h-full rounded-full" /> : 
        <Text className={`text-white font-pop_Medium text-[120px] relative bottom-3 mt-0 ${textStyle}`}>{firstLetter ?? 'A'}
        </Text>
        }
    </View>
  )
}

export default ProfileDefault