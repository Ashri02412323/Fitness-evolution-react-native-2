import { View, Text, Pressable } from 'react-native'
import React from 'react'
import swimmingImg from '../../../assets/images/swimming.png'
import ProfilePic from '../../../assets/images/profilePic.png'
import BlogInstance from './BlogInstance'
const Blogs = ({title ="Blogs",hideSeeAll,isBlogDetail}) => {
    const blogSample = [
        {
            title: "Blog Title1 This is a long blo title. How are you doing?",
            date: "12/12/2021",
            authorProfile: ProfilePic,
            authorName: "Author Name",
            slugs: ["blog-title"],
            blogImage: swimmingImg
        },
        {
            title: "Blog Title 2",
            date: "12/12/2021",
            authorProfile: ProfilePic,
            authorName: "Author Name",
            slugs: ["blog-title", "blog-title-2"],
            blogImage: swimmingImg
        },
        {
            title: "Blog Title 3",
            date: "12/12/2021",
            authorProfile: ProfilePic,
            authorName: "Author Name",
            slugs: ["blog-title"],
            blogImage: swimmingImg
        },
    ];
  return (
    <View className="mx-4 mt-4">

      <View className={`flex flex-row items-center justify-between mb-4 ${isBlogDetail && "mb-1"}`}>
        <Text className={`text-white_87 text-xl font-inter_SemiBold ${isBlogDetail && "text-lg font-inter_Medium"}`}>{title}</Text>
        <Pressable className="">
            <Text className={`text-blue-500 text-base font-inter_semiBold ${hideSeeAll && "hidden"}`}>
                See All
            </Text>
        </Pressable>
      </View>

      <View className="w-[98%] mx-auto flex flex-col justify-center mb-4" style={{gap:20}}>
        {blogSample.map((blog,index) => (
          <BlogInstance
            key={`${blog.title}${index}`}
            title={blog.title}
            date={blog.date}
            profileImg={blog.authorProfile}
            authorName={blog.authorName}
            slugs={blog.slugs}
            blogImg={blog.blogImage}
            isLast={index === blogSample.length - 1}
          />
        ))}
      </View>
    </View>
  )
}

export default Blogs