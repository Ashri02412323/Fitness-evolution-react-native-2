import React, { createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./GlobalProvider";
import { fetchCompleted, fetchRequested, fetchUpcoming } from "../lib/Users/Schedule";
import Toast from 'react-native-toast-message';
import { allUsersUnderTrainer } from "../lib/Users/User";

const ScheduleContext = createContext();
export const useScheduleContext = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  const { token,user } = useGlobalContext();
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [requested, setRequested] = useState([]);
  const [upcomingLoading, setUpcomingLoading] = useState(true);
  const [completedLoading, setCompletedLoading] = useState(true);
  const [requestedLoading, setRequestedLoading] = useState(true);
  const [upcomingLength, setUpcomingLength] = useState(0);
  const [completedLength, setCompletedLength] = useState(0);
  const [requestedLength, setRequestedLength] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [userCountLoading, setUserCountLoading] = useState(true);
  const [allUsers, setAllUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  useEffect(() => {
    const fetchUpcomingSchedules = async () => {
      setUpcomingLoading(true);
      try {
        let response = await fetchUpcoming(token);
        setUpcoming(response);
        
        let length = response.length;
        length = length < 10 ? `0${length}` : length;
        setUpcomingLength(length);
      } catch (error) {
        console.error('Error fetching upcoming schedules:', error);
        const errorMessage = error.response?.data?.message || 'Error fetching Upcoming schedules';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage
        });
      } finally {
        setUpcomingLoading(false);
      }
    };

    const fetchCompletedSchedules = async () => {
      setCompletedLoading(true);
      try {
        let response = await fetchCompleted(token);
        setCompleted(response);

        let length = response.length;
        length = length < 10 ? `0${length}` : length;
        setCompletedLength(length);
      } catch (error) {
        console.error('Error fetching completed schedules:', error);
        const errorMessage = error.response?.data?.message || 'Error fetching Completed schedules';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage
        });
      } finally {
        setCompletedLoading(false);
      }
    };

    const fetchRequestedSchedules = async () => {
      setRequestedLoading(true);
      try {
        let response = await fetchRequested(token);
        setRequested(response);
        
        let length = response.length;
        length = length < 10 ? `0${length}` : length;
        setRequestedLength(length);
      } catch (error) {
        console.error('Error fetching requested schedules:', error);
        const errorMessage = error.response?.data?.message || 'Error fetching requested schedules';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage
        });
      } finally {
        setRequestedLoading(false);
      }
    };

    const fetchUserCount = async () => {
      setUserCountLoading(true);
      try {
        let response = await allUsersUnderTrainer(token);
        setAllUsers(response);
        let length = response.length;
        length = length < 10 ? `0${length}` : length;
        setUserCount(length);
      } catch (error) {
        console.error('Error fetching user count:', error);
        const errorMessage = error.response?.data?.message || 'Error fetching user count';
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: errorMessage
        });
      } finally {
        setUserCountLoading(false);
      }
    };

    if (token) {
      fetchUpcomingSchedules();
      fetchCompletedSchedules();
      if(user.role==='admin'){
        fetchRequestedSchedules();
        fetchUserCount();
      }
    }

    if (refreshing) {
      fetchUpcomingSchedules();
      fetchCompletedSchedules();
      if(user.role==='admin'){
        fetchRequestedSchedules();
        fetchUserCount();
      }
      setRefreshing(false);
    }
  }, [token, refreshing]);

  return (
    <ScheduleContext.Provider
      value={{
        upcoming,
        completed,
        requested,
        upcomingLoading,
        completedLoading,
        requestedLoading,
        userCountLoading,
        setUpcoming,
        setCompleted,
        setRequested,
        setUpcomingLoading,
        setCompletedLoading,
        setRequestedLoading, 
        setUserCountLoading,
        upcomingLength, completedLength, requestedLength,
        setUpcomingLength, setCompletedLength, setRequestedLength, userCount, setUserCount,
        refreshing, setRefreshing, allUsers, setAllUsers, 
      }}
    >
      {children}
      <Toast />
    </ScheduleContext.Provider>
  );
};
