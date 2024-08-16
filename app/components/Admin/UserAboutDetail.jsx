import { View, Text, ImageBackground } from 'react-native'
import React from 'react'
import AboutInstance from './AboutInstance'
import Wave2 from '../../../assets/images/Wave3.png'

const UserAboutDetail = ({name,email,gender,age,role}) => {
  return (
    <View className="mx-4" style={{
        margin:0,
        marginTop: 15,
        overflow: 'visible',
      }}>
          <View className="flex flex-row items-center justify-between mb-3">
            <Text className="text-white_87 text-xl font-inter_Medium ">User Details</Text>
          </View>
          <View className="bg-tertiary rounded-2xl overflow-hidden">
          <ImageBackground source={Wave2} style={{width: '100%', height: 230,}}
          imageStyle={{
            
          }}
            >
            <View className="relative flex flex-col border-[0.5px] border-lava rounded-2xl overflow-hidden h-full px-6 py-4 justify-center ">
                <AboutInstance title="Full Name" value={name} />
                <AboutInstance title="Email" value={email} />
                <AboutInstance title="Role" value={role} />
                <AboutInstance title="Age" value={age} />
                <AboutInstance title="Gender" value={gender} />
            </View>
          </ImageBackground>
          </View>
      </View>
  )
}

export default UserAboutDetail