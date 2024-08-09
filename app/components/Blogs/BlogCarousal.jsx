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

const ScheduleCard = ({ activeItem, item,route }) => {
const {setIndex} = useGlobalContext();

const valuePaddingZero = item.value < 10 ? `0${item.value}` : item.value;
const sampleData = [
  {
    "_key": "72b234323b70",
    "markDefs": [],
    "children": [
      {
        "_key": "f97b69c10032",
        "_type": "span",
        "marks": [],
        "text": "Introduction"
      }
    ],
    "_type": "block",
    "style": "h1"
  },
  {
    "_key": "510694f75da1",
    "markDefs": [],
    "children": [
      {
        "_type": "span",
        "marks": [],
        "text": "Swimming offers a wide range of physical and mental health benefits, making it an excellent exercise for people of all ages. Here are some of the key ways swimming helps:",
        "_key": "540d6ba892f00"
      }
    ],
    "_type": "block",
    "style": "normal"
  },
  {
    "children": [
      {
        "_type": "span",
        "marks": [],
        "text": "Physical Health Benefits:",
        "_key": "f31630fdd88f0"
      }
    ],
    "_type": "block",
    "style": "h3",
    "_key": "244210106278",
    "markDefs": []
  },
  {
    "children": [
      {
        "_type": "span",
        "marks": [
          "strong"
        ],
        "text": "Full-Body Workout:",
        "_key": "8e88e90c7d810"
      }
    ],
    "level": 1,
    "_type": "block",
    "style": "normal",
    "_key": "ad62cda24b33",
    "listItem": "number",
    "markDefs": []
  },
  {
    "_key": "eea9cfa37034",
    "listItem": "bullet",
    "markDefs": [],
    "children": [
      {
        "text": "Swimming engages almost all major muscle groups, providing a comprehensive workout that builds strength and endurance.",
        "_key": "2055e31769190",
        "_type": "span",
        "marks": []
      }
    ],
    "level": 2,
    "_type": "block",
    "style": "normal"
  },
  {
    "style": "normal",
    "_key": "22fbdaedae5e",
    "listItem": "number",
    "markDefs": [],
    "children": [
      {
        "_type": "span",
        "marks": [
          "strong"
        ],
        "text": "Cardiovascular Fitness:",
        "_key": "3891912ef87f0"
      }
    ],
    "level": 1,
    "_type": "block"
  },
  {
    "markDefs": [],
    "children": [
      {
        "_type": "span",
        "marks": [],
        "text": "It improves cardiovascular health by strengthening the heart and increasing lung capacity, which can lead to better overall cardiovascular endurance.",
        "_key": "bb76616bd2af0"
      }
    ],
    "level": 2,
    "_type": "block",
    "style": "normal",
    "_key": "2e699c6031d5",
    "listItem": "bullet"
  }
 
]
  return (
    <Pressable onPress={()=>{
      router.push({
        pathname: '/BlogPage',
        params: {sampleData}
    })
      }}>
    <Animatable.View
      className="mr-2"
      animation={activeItem === item.title ? zoomIn : zoomOut}
      duration={500}
    >
      <ImageBackground 
        source={item.bg} 
        style={{height: 210, width: 310, borderRadius: 10,position:'relative'}}
        imageStyle={{borderRadius: 8,borderColor:'#352F36',borderWidth:1}}
      >
        <View className="absolute bottom-0 left-0 w-full h-[60px] flex items-center">
            <View className="absolute top-0 left-0 w-full h-full border border-lava border-t-0 rounded-b-lg"
            style={{
            backgroundColor: "rgba(0,0,0,1)"
            }}
            />
            {/* <ImageBackground source={ShadowEffect} className="w-full h-full border border-lava border-t-0 rounded-b-lg flex flex-col items-end justify-end" imageStyle={{
                borderRadius: 6,
            }}> */}
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
const BlogCaraousal = () => {
    const data = [
        {
            title: 'How does Swimming helps you in keeping fit?',
            bg: Swimming,
        },
        {
            title: 'How does Hiking helps you in keeping fit?',
            bg: Hiking,
        },
        {
            title: 'How much exercise is good for growing kids? Does doing too much harm them? We ll discuss...',
            bg: Dumbell
        },
    ]
    const [activeItem, setActiveItem] = useState(data[0].title);
      const handleScroll = (event) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / 300); // Assuming each item is 150px wide
      setActiveItem(data[index]?.title || data[0].title);
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
        data={data}
        horizontal
        keyExtractor={(item) => item.title}
        renderItem={({ item }) => (
          <ScheduleCard activeItem={activeItem} item={item} route={item.tab}/>
        )}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleMomentumScrollEnd}
        snapToInterval={ITEM_WIDTH}
        decelerationRate="fast"
      />

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20, gap:6 }}>
          {data.map((item) => (
            <Indicator key={item.title} isActive={item.title === activeItem} />
          ))}
        </View>
    </View>
  )
}

export default BlogCaraousal