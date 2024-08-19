import { View, Text, SafeAreaView, ScrollView, Dimensions, Linking } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalSearchParams } from 'expo-router'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import ProfilePic from '../../assets/images/profilePic.png';
import {PortableText} from '@portabletext/react'
import Octicons from '@expo/vector-icons/Octicons';
import { fetchSingleBlog } from '../../lib/Users/Blog';
import { formatDate2 } from '../../lib/Users/Schedule';
// import { customSerializers } from '../../lib/Users/Blog';
const customSerializers = {
  types: {
    block: (props) => {
      const { style = 'normal' } = props.value;
      const { children,markDefs } = props.value;
      const { marks } = children[0];
      // Function to apply marks
      const applyMarks = (text, marks,markDefs) => {
        let markedText = text;
        marks.forEach(mark => {
          switch (mark) {
            case 'strong':
            markedText = <Text className="text-white-87 font-bold">{markedText}</Text>;
            break;
            case 'em':
              markedText = <Text className="font-dm_italic">{markedText}</Text>;
              break;
            case 'code':
              markedText = <Text className="font-mono_regular">{markedText}</Text>;
              break;
            case 'underline':
              markedText = <Text style={{ textDecorationLine: 'underline' }}>{markedText}</Text>;
              break;
            case 'link':
              markedText = <Text className="text-blue-500 underline" onPress={() => {
                return Linking.openURL(markDefs[0].href)}}>{markedText}</Text>;
              break;
             default:
              markedText =  <Text className="text-blue-500 underline" onPress={() => {
                return Linking.openURL(markDefs[0].href)}}>{markedText}</Text>;
              break;
          }
        });
        return markedText;
      };

      const markedChildren = applyMarks(children[0].text, marks,markDefs);

      switch (style) {
        case 'h1':
          return <Text className="text-mint-87 text-3xl font-dm_SemiBold my-2">{markedChildren}</Text>;
        case 'h2':
          return <Text className="text-white_87 text-2xl font-dm_SemiBold my-2">{markedChildren}</Text>;
        case 'h3':
          return <Text className="text-white_87 text-xl font-dm_SemiBold my-2">{markedChildren}</Text>;
        case 'h4':
          return <Text className="text-white_87 text-lg font-dm_SemiBold my-2">{markedChildren}</Text>;
        case 'h5':
          return <Text className="text-white_87 text-md font-dm_SemiBold my-2">{markedChildren}</Text>;
        case 'h6':
          return <Text className="text-white_87 text-sm font-dm_SemiBold my-2">{markedChildren}</Text>;
        case 'blockquote':
          return <Text className="text-white_87 text-base italic my-2 dm_Regular">{markedChildren}</Text>;
        case 'normal':
        default:
          return <Text className="text-white_87 text-base my-2 dm_Regular">{markedChildren}</Text>;
      }
    }
  },
  marks: {
    strong: (props) => {
      const { children } = props.value;
    return <Text className=" font-dm_Bold text-mint-87">{children}</Text>},
    em: ({ children }) => <Text className="italic">{children}</Text>,
    code: ({ children }) => <Text className="font-mono">{children}</Text>,
    underline: ({ children }) => <Text style={{textDecorationLine: 'underline'}}>{children}</Text>,
    link: ({ children, mark }) => <Text className="text-blue-500" onPress={() => Linking.openURL(mark.href)}>{children}</Text>,
  },
      list: {
    bullet: ({ children }) => <View className="pl-2 flex flex-col flex-wrap mt-2">{children}</View>,
    number: ({ children }) => <View className="pl-2 flex flex-col flex-wrap mt-2">{children}</View>,
  },
  listItem: {
    bullet: ({ children }) => (
      <View className="flex-row items-start mt-0 mb-2 ">
      <Text className="text-white_87 mr-2 mt-1"> 
        <Octicons name="dot-fill" size={12} color="#fff" />
      </Text>
      <View className="flex flex-col flex-wrap justify-between ">
      {children.map((item,index)=>{
        const isNumber = item.props?.value?.children[0].listItem==="number";
        return isNumber ? item: <Text className={`text-white_87 font-inter_Regular leading-5`} key={index+item}
        style={{width:width-70}}
        >{item}</Text>
      })}
      </View>
    </View>
    ),
    number: ({ children, index }) => (
        <View className="flex-row items-start mt-0 mb-2">
          <Text className="text-white_87 mr-1">{index+1}. </Text>
          <View className="flex flex-col flex-wrap justify-between ">
          {children.map((item,index)=>{
            const isBullet = item.props?.value?.children[0].listItem==="bullet";
            return isBullet ? item: <Text className={`text-white_87 font-inter_Regular leading-5`} key={index+item}
            style={{width:width-50}}
            >{item}</Text>
          })}
          </View>
        </View>
    ),
  },
};
const BlogPage = () => {
    const {id} = useGlobalSearchParams();
    const insets = useSafeAreaInsets();
    const [width, setWidth] = useState(Dimensions.get('window').width);
    useEffect(() => {
      setWidth(Dimensions.get('window').width);
    }, [Dimensions.get('window').width]);
    
    const [fetchedBlog, setFetchedBlog] = useState(null);
    useEffect(() => {
      const fetchBlog = async () => {
        const blog = await fetchSingleBlog(id);
        setFetchedBlog(blog[0]);
      }
      fetchBlog();
      return () => {
        setFetchedBlog(null);
      }
    }, [id]);
    if (!fetchedBlog) return null;

  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Blog Page" />
        <ScrollView className="px-4 mt-2">
          <View className="flex flex-col">
            {fetchedBlog?.mainImage ? <Image source={{uri: fetchedBlog.mainImage}} style={{height: 200}} className="rounded-lg w-full" />:
            <Image source={require('../../assets/images/swimming.png')} style={{height: 200}} className="rounded-lg w-full" />
          }
            <View className="flex flex-col">
              
              <Text className="text-white_87 font-pop_SemiBold text-lg mt-4">{fetchedBlog.title}</Text>
              <View className="flex flex-row mt-2 items-center ">
                {fetchedBlog?.authorImage ? <Image source={{uri: fetchedBlog.authorImage}} style={{height: 25, width: 25}} className="rounded-full mr-2" />:
                <Image source={ProfilePic} style={{height: 25, width: 25}} className="rounded-full mr-2" />
              }
                <Text className="text-white_38 font-inter_Regular text-xs">{fetchedBlog.name}</Text>
                <View className="flex-grow"></View> 
                <Text className="text-white_38 font-inter_Regular text-xs ml-1 justify-self-end pr-1">{formatDate2(fetchedBlog.publishedAt)}</Text>
              </View>

              <View className="h-px opacity-50 bg-white_38 w-full mt-4"></View>
              <Text className="text-mint-87 font-inter_Medium text-2xl mt-2">Brief Intro</Text>
              <Text className="text-white_87 font-inter_Regular text-base mt-2">{fetchedBlog.excerpt}</Text>
              <View className="h-px opacity-50 bg-white_38 w-full mt-6"></View>
              <View className="flex flex-col mt-2">
                <PortableText value={fetchedBlog?.body} components={customSerializers}
                className="text-white_87 font-inter_Regular"
                />
              </View>

             

              <View className="h-6"/>
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default BlogPage