import { View, Text, ImageBackground, FlatList, Pressable, Dimensions } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import * as Animatable from "react-native-animatable";
import { router } from 'expo-router'
import { useGlobalContext } from '../../../contexts/GlobalProvider'
import ShadowEffect from '../../../assets/images/ShadowEffect.png';
import Swimming from '../../../assets/images/swimming.png';
import Hiking from '../../../assets/images/hiking.png';
import Dumbell from '../../../assets/images/ForgotPassword.png';

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

const ScheduleCard = ({ activeItem, item }) => {

  return (
    <Pressable onPress={()=>{
      router.push({
        pathname: '/BlogPage',
        params: {id: item._id}
    })
      }}>
    <Animatable.View
      className="mr-2"
      animation={activeItem === item.title ? zoomIn : zoomOut}
      duration={500}
    >
      <ImageBackground 
        source={{uri: item.mainImage}} 
        style={{height: 210, width: 310, borderRadius: 10,position:'relative'}}
        imageStyle={{borderRadius: 8,borderColor:'#352F36',borderWidth:1}}
      >
        <View className="absolute bottom-0 left-0 w-full h-[60px] flex items-center">
            <View className="absolute top-0 left-0 w-full h-full border border-lava border-t-0 rounded-b-lg"
            style={{
            backgroundColor: "rgba(0,0,0,1)"
            }}
            />
            <Text className="text-white_87 font-pop_Regular py-2 px-4 w-full" numberOfLines={2}>{item.title}</Text>
            {/* </ImageBackground> */}
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
const BlogCaraousal = ({blogs}) => {

    const [activeItem, setActiveItem] = useState(blogs[0]?.title);
      const handleScroll = (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / 300); // Assuming each item is 150px wide
      setActiveItem(blogs[index]?.title || blogs[0]?.title);
    };
    const { width } = Dimensions.get('window');
    const ITEM_WIDTH = width * 0.85; 
    const flatListRef = useRef(null);

    const handleMomentumScrollEnd = (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / ITEM_WIDTH);
      flatListRef?.current?.scrollToIndex({ index, animated: true });
    };
  return (
    <View className="mx-4" style={{
      margin:0,
      marginTop: 0,
      overflow: 'visible',
    }}>
      <View className="flex flex-row items-center justify-between mb-6">
        <Text className="text-white_87 text-xl font-inter_SemiBold ">Most Recent Blogs</Text>
      </View>

      <FlatList
        data={blogs}
        horizontal
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <ScheduleCard activeItem={activeItem} item={item}/>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
      />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap:6 }}>
          {blogs.map((item) => (
            <Indicator key={item.title} isActive={item.title === activeItem} />
          ))}
        </View>
    </View>
  )
}

export default BlogCaraousal