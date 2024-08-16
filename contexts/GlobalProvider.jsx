import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import profileImg from "../assets/images/profilePic.png";
import io from 'socket.io-client';

const SOCKET_URL = 'http://192.168.1.12:3000'; // Replace with your server URL

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forgottonEmail, setForgottonEmail] = useState(null);
  const [firstLetter, setFirstLetter] = useState('');
  const [index, setIndex] = useState(0);
  const [currReceiver, setCurrReceiver] = useState(null);
  const [chats, setChats] = useState([
  ]);
  const [allUsers, setAllUsers] = useState([]);
  const [detailName, setDetailName] = useState('');
  const [detailAge, setDetailAge] = useState('');
  const [detailGender, setDetailGender] = useState('');
  const [detailRole, setDetailRole] = useState('');
  const [detailProfile, setDetailProfile] = useState('');
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [detailEmail, setDetailEmail] = useState('');
  const [intialRoute, setIntialRoute] = useState('Upcoming');
  const [token, setToken] = useState('');
  const [blogID, setBlogID] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const [socket, setSocket] = useState(null);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [received, setReceived] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const scrollRef = useRef(null);
  // Profile states
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userRole, setUserRole] = useState('');
  const [userGender, setUserGender] = useState('');
  const [userAge, setUserAge] = useState('');
  const [userProfile, setUserProfile] = useState('');
  
  useEffect(()=>{
    if(!socket)
        return;
    const allUserIDs = chatUsers.map((user) => user.id);
    socket?.emit("allUsers",allUserIDs);
    socket?.on("lastMessages", (messages) => {
        setLastMessages(messages);
    });
    socket?.on('user connected', (users, receivedMessages) => {
        setConnectedUsers(users);
        setReceived(receivedMessages);
    });
    socket?.on('user disconnected', (users) => {
        setConnectedUsers(users);
    });
    
},[allUsers, chatUsers, socket]);

useEffect(() => {   
    socket?.on('new msg', (msg) => {
        setReceived((prevReceived) => {
            let newReceived = [...prevReceived, msg];
            return newReceived;
        });
    })
},[socket])

  const extractFirstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  }
  useEffect(()=>{
    let fullName = user?.fullName;
    if(fullName){
      setFirstLetter(extractFirstLetter(fullName));
    }
  },[user?.fullName])

  useEffect(()=>{
    if(user){
      setUserName(user.fullName);
      setUserEmail(user.email);
      setUserRole(user.role);
      setUserGender(user.gender);
      setUserAge(user.age);
      setUserProfile(user.profileImage);
    }
  },[user])

useEffect(() => {
  if (user?.role === "user" && user?.trainerAssigned) {
    setChatUsers([{
      userName: user.trainerAssigned.fullName,
      lastMessage: "Hello, how are you?",
      profile: user.trainerAssigned.profileImage,
      role: "Trainer",
      noOfMsg: 3,
      id: user.trainerAssigned._id
    }]);
  } else if (user?.role === "admin" && Array.isArray(allUsers)) {
    const chatUsers = allUsers.map(user => ({
      userName: user.fullName,
      lastMessage: "Hello, how are you?",
      profile: user.profileImage,
      role: "User",
      noOfMsg: 3,
      id: user._id
    }));
    setChatUsers(chatUsers);
  }
}, [user, allUsers, profileImg, setChatUsers]);


  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ['websocket'],
      jsonp: false,
      query:{
        userId: user?._id
      }
    });
    setSocket(newSocket);
    // return () => newSocket.close();
  }, [user]);

  return (
    <GlobalContext.Provider
      value={{
        isLogged,
        setIsLogged,
        user,
        setUser,
        loading,
        setLoading,
        forgottonEmail,
        setForgottonEmail,
        firstLetter,
        setFirstLetter,
        index,
        setIndex, chats, setChats, detailName, setDetailName, detailAge, setDetailAge, detailGender, setDetailGender, detailRole, setDetailRole, detailProfile, setDetailProfile, isDetailVisible, setIsDetailVisible, blogID, setBlogID, token, setToken, intialRoute, setIntialRoute, chatUsers, setChatUsers,
        allUsers, setAllUsers, currReceiver, setCurrReceiver, socket, setSocket, connectedUsers, setConnectedUsers, received, setReceived, lastMessages, setLastMessages, scrollRef,
        userName, setUserName, userEmail, setUserEmail, userRole, setUserRole, userGender, setUserGender, userAge, setUserAge, userProfile, setUserProfile,
        detailEmail, setDetailEmail
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

