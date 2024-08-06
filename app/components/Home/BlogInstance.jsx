import { View, Text, Image } from 'react-native'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';

const BlogInstance = ({profileImg, blogImg,title, slugs, date,isLast,authorName}) => {
  return (
    <View className="flex flex-row items-center h-[120px]" style={{margin:0, gap:16}} >
        <Image source={blogImg} className="w-[110px] h-[100px] rounded-lg" resizeMethod='cover' style={{margin:0}} />

        <View className="flex flex-col items-start h-full justify-center w-[63%] " style={{margin:0, rowGap:2}}>
            <Text className="text-white_60 text-sm font-inter_regular">
                {slugs.map((slug,index) => (
                    slug + " "
                ))}
            </Text>

            <Text className=" text-white_87 text-base font-dm_Medium ml-0"
            style={{
                lineHeight: 24,
            }} numberOfLines={2} 
            ellipsizeMode="tail">{title}</Text>

            <View className="flex flex-row items-center ml-0" style={{columnGap:6}}>
                <Image source={profileImg} className="w-[25px] hidden h-[25] rounded-full" resizeMethod='cover'  style={{margin:0}}/>

                <Text className="text-white_60 text-xs font-inter_regular" style={{margin:0}}>{authorName}</Text>
                <Entypo name="dot-single" size={14} color="#fff" />
                <Text className="text-white_60 text-xs font-inter_regular" style={{margin:0}}>{date}</Text>
            </View>
        </View>
        {!isLast && (
            <View style={{
                width: '100%',
                position: 'absolute',
                top: '110%',
                left: '0',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View
                style={{
                    width: '90%',
                    height: 1,
                    backgroundColor: '#686C6E',
                }}
                />
        </View>
      )}
    </View>
  )
}

export default BlogInstance