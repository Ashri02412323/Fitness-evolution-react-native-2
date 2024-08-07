import { View, Text, SafeAreaView, ScrollView } from 'react-native'
import React from 'react'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BlogCarousal from '../components/Blogs/BlogCarousal';
import CreateBlogCard from '../components/Blogs/CreateBlogCard';
import BlogInstance from '../components/Home/BlogInstance';
import swimmingImg from '../../assets/images/swimming.png'
import ProfilePic from '../../assets/images/profilePic.png'
import Blogs from '../components/Home/Blogs';

const BlogDetails = () => {
  const insets = useSafeAreaInsets();
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
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Blogs" />
        <ScrollView className="">
          <BlogCarousal />
          {/* <CreateBlogCard /> */}
          <Blogs title="Other Blogs" hideSeeAll={true} isBlogDetail/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default BlogDetails