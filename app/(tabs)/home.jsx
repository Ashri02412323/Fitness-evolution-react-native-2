import { View, Text, SafeAreaView, ScrollView, RefreshControl } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeHeader from '../components/Home/HomeHeader';
import SchedulesCarousal from '../components/Home/SchedulesCarousal';
import Blogs from '../components/Home/Blogs';
import useCheckLoginStatus from '../useCheckLoginStatus';
import { useScheduleContext } from '../../contexts/ScheduleProvider';
import { fetchBlogs } from '../../lib/Users/Blog';

function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { isLoggedIn, NotLoggedInComponent } = useCheckLoginStatus();
  const { refreshing, setRefreshing  } = useScheduleContext();
  const [twoBlogs, setTwoBlogs] = useState([]);
  const [refreshBlogs, setRefreshBlogs] = useState(false);

  const fetchBlogsTwoHere = useCallback(async () => {
    try {
      const response = await fetchBlogs();
      setTwoBlogs(response.slice(0, 2));

    } catch (error) {
      console.error("Blogs error: ", error);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    fetchBlogsTwoHere().then(() => {
      if (isMounted) {
      }
    });
  
    return () => {
      isMounted = false;
    };
  }, [fetchBlogsTwoHere]);
  useEffect(() => {
    if (refreshBlogs) {
      fetchBlogsTwoHere().then(() => {
        setRefreshBlogs(false);
      });
    }
  }, [refreshBlogs, fetchBlogsTwoHere]);
  if (isLoggedIn === null) {
    return NotLoggedInComponent;
  }
  const onRefresh = () => {
    setRefreshing(true);
    setRefreshBlogs(true);
  };
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top, flex: 1 }}>
        <HomeHeader />
        <ScrollView className=" pb-0"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
        <SchedulesCarousal />
        <Blogs title='Blogs' blogs={twoBlogs}/>
      </ScrollView>
    </SafeAreaView>
  );
}

export default HomeScreen