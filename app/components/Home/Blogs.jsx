import { View, Text, Pressable } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import BlogInstance from './BlogInstance'
import { router } from 'expo-router'
import { formatDate2 } from '../../../lib/Users/Schedule'
const Blogs = ({title ="Blogs",hideSeeAll,isBlogDetail,blogs}) => {
  const [blogsToDisplay, setBlogsToDisplay] = useState([]);

  const memoizedBlogsToDisplay = useMemo(() => {
    if (isBlogDetail) {
      return blogs.slice(0, 3);
    } else {
      return blogs;
    }
  }, [blogs, isBlogDetail]);

  useEffect(() => {
    setBlogsToDisplay(memoizedBlogsToDisplay);
  }, [memoizedBlogsToDisplay]);
    if (!blogs) return null;
  return (
    <View className="mx-4 mt-4 ">

      <View className={`flex flex-row items-center justify-between mb-4 ${isBlogDetail && "mb-1 mt-2"}`}>
        <Text className={`text-white_87 text-xl font-inter_SemiBold ${isBlogDetail && "text-lg font-inter_Medium"}`}>{title}</Text>
        <Pressable className="" onPress={()=>router.push('/BlogDetails')}>
            <Text className={`text-blue-500 text-base font-inter_semiBold ${hideSeeAll && "hidden"}`}>
                See All
            </Text>
        </Pressable>
      </View>

      <View className="w-[98%] mx-auto flex flex-col justify-center mb-4" style={{gap:15}}>
        {blogsToDisplay.map((blog,index) => (
          <BlogInstance
            key={`${blog.title}${index}`}
            title={blog.title}
            date={formatDate2(blog.publishedAt)}
            profileImg={blog.authorImage}
            authorName={blog.name}
            slugs={[blog.slug?.current]}
            blogImg={blog.mainImage}
            isLast={index === blogs.length - 1}
            id = {blog._id}
          />
        ))}
      </View>
    </View>
  )
}

export default Blogs