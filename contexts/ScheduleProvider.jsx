import React, { createContext, useContext, useEffect, useState } from "react";
import { useGlobalContext } from "./GlobalProvider";
import { fetchCompleted, fetchRequested, fetchUpcoming } from "../lib/Users/Schedule";
// import Toast from 'react-native-toast-message';
import ToastManager, {Toast} from 'toastify-react-native';
import { allUsersUnderTrainer, checkIfLoggedIn } from "../lib/Users/User";

const ScheduleContext = createContext();
export const useScheduleContext = () => useContext(ScheduleContext);

export const ScheduleProvider = ({ children }) => {
  const { token,user,setAllUsers,setUser,setIsChatUsersLoading,allUsers } = useGlobalContext();
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
  const [refreshing, setRefreshing] = useState(false);
  const [profileRefetch, setProfileRefetch] = useState(false);
  const [chatsRefresh, setChatsRefresh] = useState(false);
  useEffect(()=>{
    let length = upcoming.length;
    length = length < 10 ? `0${length}` : length;
    setUpcomingLength(length);
  },[upcoming])
  useEffect(()=>{
    let length = completed.length;
    length = length < 10 ? `0${length}` : length;
    setCompletedLength(length);
  },[completed])
  useEffect(()=>{
    let length = requested.length;
    length = length < 10 ? `0${length}` : length;
    setRequestedLength(length);
  },[requested])

  useEffect(()=>{
    let length = allUsers.length;
    length = length < 10 ? `0${length}` : length;
    setUserCount(length);
  },[allUsers])

  const appendUpcoming = (schedule) => {
    setUpcoming((prev)=>{
      let newUpcoming = prev.filter((item)=>item._id!==schedule._id);
      return [schedule,...newUpcoming];
    })
  };
  const appendCompleted = (schedule) => {
    setCompleted((prev)=>{
      let newCompleted = prev.filter((item)=>item._id!==schedule._id);
      return [schedule,...newCompleted];
    })
  };
  const appendRequested = (schedule) => {
    setRequested((prev)=>{
      let newRequested = prev.filter((item)=>item._id!==schedule._id);
      return [schedule,...newRequested];
    })
  };
  const fetchUpcomingSchedules = async () => {
    setUpcomingLoading(true);
    try {
      let response = await fetchUpcoming(token);
      setUpcoming(response);
      
      let length = response.length;
      length = length < 10 ? `0${length}` : length;
    } catch (error) {
      console.error('Error fetching upcoming schedules:', error);
      const errorMessage = error.response?.data?.message || 'Error fetching Upcoming schedules';
      Toast.error(errorMessage,'top')
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
    } catch (error) {
      console.error('Error fetching completed schedules:', error);
      const errorMessage = error.response?.data?.message || 'Error fetching Completed schedules';
      Toast.error(errorMessage,'top')
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
      Toast.error(errorMessage,'top')
    } finally {
      setRequestedLoading(false);
    }
  };

  const fetchUserCount = async () => {
    setUserCountLoading(true);
    setIsChatUsersLoading(true);

    try {
      let response = await allUsersUnderTrainer(token);
      setAllUsers(response);
      setIsChatUsersLoading(false);
    } catch (error) {
      console.error('Error fetching user count:', error);
      const errorMessage = error.response?.data?.message || 'Error fetching user count';
      Toast.error(errorMessage,'top')
    } finally {
      setUserCountLoading(false);
    }
  };
  useEffect(() => {
    if(!user){
      return;
    }
    if (token) {
      fetchUpcomingSchedules();
      fetchCompletedSchedules();
      checkIfLoggedIn(setUser)
      if(user?.role==='admin'){
        fetchRequestedSchedules();
        fetchUserCount();
      }
    }
  }, [token, user?.role]);

  useEffect(() => {
    if(!user){
      return;
    }
    if (refreshing) {
      fetchUpcomingSchedules();
      fetchCompletedSchedules();
      checkIfLoggedIn(setUser)
      if(user.role==='admin'){
        fetchRequestedSchedules();
        fetchUserCount();
      }
      setRefreshing(false);
    }

    if(profileRefetch){
      checkIfLoggedIn(setUser)
      setProfileRefetch(false);
    }
    if(chatsRefresh){
      if(user.role==='admin'){
        fetchUserCount();
      }
      setChatsRefresh(false);
    }
  }, [refreshing, profileRefetch, chatsRefresh,user?.role]);

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
        refreshing, setRefreshing, 
        profileRefetch, setProfileRefetch,
        chatsRefresh, setChatsRefresh,appendUpcoming,
        appendCompleted, appendRequested
      }}
    >
      {children}
      {/* <ToastManager /> */}
    </ScheduleContext.Provider>
  );
};
