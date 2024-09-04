import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../../contexts/GlobalProvider';

const ProfileDefault = ({sizeClass,textStyle, parentStyle,userName,isDefault = true}) => {
  const [finalLetter,setFinalLetter] = useState(null);
  const {firstLetter,userProfile} = useGlobalContext();
  
  useEffect(() => {
    if(isDefault){
      setFinalLetter(firstLetter?? 'Z');
    }else{
      const userFirstLetter = userName ? userName.charAt(0) : null;
      setFinalLetter(userFirstLetter ?? 'Z');
    }
  }, [userName,firstLetter,isDefault])
  return (
    <View className={`bg-lava ${sizeClass} flex-row justify-center items-center rounded-full mb-8 ${parentStyle}`}>
      {userProfile && isDefault ? <Image source={{uri:userProfile}} className="w-full h-full rounded-full" /> : 
        <Text className={`text-white font-pop_Medium text-[120px] relative bottom-3 mt-0 ${textStyle}`}>{finalLetter ?? 'A'}
        </Text>
        }
    </View>
  )
}

export default ProfileDefault