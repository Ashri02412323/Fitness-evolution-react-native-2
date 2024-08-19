import { RefreshControl, SafeAreaView, ScrollView } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import ScheduleHeader from '../components/MySchedules/ScheduleHeader'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BlogCarousal from '../components/Blogs/BlogCarousal';
import swimmingImg from '../../assets/images/swimming.png'
import ProfilePic from '../../assets/images/profilePic.png'
import Blogs from '../components/Home/Blogs';
import { fetchBlogs } from '../../lib/Users/Blog';

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
const [blogs, setBlogs] = React.useState([])
const [recentThreeBlogs, setRecentThreeBlogs] = React.useState([])
const [otherBlogs, setOtherBlogs] = React.useState([])
const [refresh, setRefresh] = React.useState(false)

const fetchBlogsHere = useCallback(async () => {
  try {
    const response = await fetchBlogs();
    setBlogs(response);
  } catch (error) {
    console.error("Blogs error: ", error);
  }
}, []);

useEffect(() => {
  let isMounted = true;
  fetchBlogsHere().then(() => {
    if (isMounted) {
      // Only update state if the component is still mounted
    }
  });

  return () => {
    isMounted = false;
  };
}, [fetchBlogsHere]);

useEffect(() => {
  if (refresh) {
    fetchBlogsHere().then(() => {
      setRefresh(false);
    });
  }
}, [refresh, fetchBlogsHere]);

useEffect(() => {
  if(blogs.length > 0){
    setRecentThreeBlogs(blogs.slice(0,3))
    setOtherBlogs(blogs.slice(3,blogs.length))
  }
}, [blogs])
  return (
    <SafeAreaView className="bg-primary h-full relative" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title="Blogs" />
        <ScrollView className=""
        refreshControl={
          <RefreshControl refreshing={refresh} onRefresh={()=>setRefresh(true)} />
        }
        >
          <BlogCarousal blogs={recentThreeBlogs} />
          <Blogs title="Other Blogs" hideSeeAll={true} isBlogDetail blogs={otherBlogs}/>
        </ScrollView>
    </SafeAreaView>
  )
}

export default BlogDetails