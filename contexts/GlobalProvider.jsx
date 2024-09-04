import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import profileImg from "../assets/images/profilePic.png";
import io from 'socket.io-client';

// const SOCKET_URL = 'http://fitnessevolution-env.eba-5itjpppf.us-east-1.elasticbeanstalk.com'; 
const SOCKET_URL = 'http://fitnessevol-env.eba-uunkm3cu.us-east-1.elasticbeanstalk.com'; 
const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [hasSignedUp, setHasSignedUp] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forgottonEmail, setForgottonEmail] = useState(null);
  const [firstLetter, setFirstLetter] = useState('');
  const [index, setIndex] = useState(0);
  const [currReceiver, setCurrReceiver] = useState(null);
  const [chats, setChats] = useState({});
  const [allUsers, setAllUsers] = useState([]);
  const [detailName, setDetailName] = useState('');
  const [detailAge, setDetailAge] = useState('');
  const [detailGender, setDetailGender] = useState('');
  const [detailRole, setDetailRole] = useState('');
  const [detailProfile, setDetailProfile] = useState('');
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [detailEmail, setDetailEmail] = useState('');
  const [detailId, setDetailId] = useState('');
  const [intialRoute, setIntialRoute] = useState('Upcoming');
  const [token, setToken] = useState('');
  const [blogID, setBlogID] = useState('');
  const [chatUsers, setChatUsers] = useState([]);
  const [isChatUsersLoading, setIsChatUsersLoading] = useState(true);
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
  const [currentReceiver, setCurrentReceiver] = useState(null);
  
  useEffect(() => {
      if (!socket) return;
    if(!user) return;
    if(!user?._id) return;
      const allUserIDs = chatUsers?.map((user) => user.id)
      socket.emit("allUsers", allUserIDs);
  
      const handleLastMessages = (messages) => {
          setLastMessages(messages);
      };
  
      const handleUserConnected = (users, receivedMessages) => {
          setConnectedUsers(users);
          setReceived(receivedMessages);
      };
  
      const handleUserDisconnected = (users) => {
          setConnectedUsers(users);
      };
  
      socket.on("lastMessages", handleLastMessages);
      socket.on("user connected", handleUserConnected);
      socket.on("user disconnected", handleUserDisconnected);
  
      return () => {
          socket.off("lastMessages", handleLastMessages);
          socket.off("user connected", handleUserConnected);
          socket.off("user disconnected", handleUserDisconnected);
      };
  }, [chatUsers, socket,user]);
  
  useEffect(() => {
    if (!user?._id) return;
    const newSocket = io(SOCKET_URL, {
      transports: ["polling", "websocket", "webtransport"],
      upgrade: false,
      jsonp: false,
      query: {
        userId: user?._id
      },
      reconnection: true, 
      reconnectionAttempts: Infinity, 
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
    });


    newSocket.on('disconnect', (reason, details) => {
      console.log('Disconnected from socket server:', reason, details);
    });

    newSocket.on('connect_error', (error) => {
      console.error('Connection error:', error);
    });

    newSocket.on('reconnect_attempt', (attemptNumber) => {
      console.log(`Reconnection attempt #${attemptNumber}`);
    });

    newSocket.on('reconnect', (attemptNumber) => {
      console.log(`Reconnected on attempt #${attemptNumber}`);
    });

    setSocket(newSocket);

    return () => {
    };
  }, [user]);
  useEffect(() => {
    const handleMessage = (msg) => {
      if (msg.senderId === currentReceiver?.id) {
        return;
      } else {
        setChats((prevChats) => {
          let userId1 = msg.receiverId;
          let userId2 = msg.senderId;
      
          if (!prevChats[msg.senderId]) {
            console.log('Loading messages as it was not loaded before');
            socket.emit('loadMessages', { userId1, userId2 });
      
            // Move the event listener outside of the state update function
            const handleMessages = (fetchedMessages) => {
              console.log("messages fetched!!");
              setChats((prev) => {
                let newObj = { ...prev, [userId2]: fetchedMessages };
                return newObj;
              });
            };
            socket.once('messages', handleMessages); 
          }
          else{
            let ifExisted = prevChats[msg.senderId].find((m) => m.timeStamp === msg.timeStamp);
            if (ifExisted) {
              return prevChats;
            }
            let newArr = (prevChats[msg.senderId]).concat(msg);
          return { ...prevChats, [msg.senderId]: newArr };
        }});
      
        setReceived((prevReceived) => {
          let ifExisted = prevReceived.find((m) => m.timeStamp === msg.timeStamp);
          if (ifExisted) {
            return prevReceived;
          }
          let newReceived = [...prevReceived, msg];
          return newReceived;
        });
      }
    }
    socket?.on('new msg', handleMessage);
  
    return () => {
      socket?.off('new msg', handleMessage);
    };
  }, [socket, currentReceiver, user]);

  const extractFirstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  }
  useEffect(()=>{
    let fullName = user?.fullName;
    console.log("Full Name: ", fullName);
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
    setIsChatUsersLoading(false);
  } else if (user?.role === "admin" && Array.isArray(allUsers)) {
    const chatUsers = allUsers?.map(user => ({
      userName: user.fullName,
      lastMessage: "Hello, how are you?",
      profile: user.profileImage,
      role: "User",
      noOfMsg: 3,
      id: user._id
    }));
    setChatUsers(chatUsers);
  }
}, [user, allUsers, profileImg, setChatUsers, setIsChatUsersLoading]);

const sendMsgFromTrainer = (msg, userName, userId) => {
  let trainerName = user?.role === 'admin' ? user.fullName : user.trainerAssigned.fullName;
  let trainerId = user?.role === 'admin' ? user._id : user.trainerAssigned._id;

  const newMsg = {
    senderName: trainerName,
    receiverName: userName,
    message: msg,
    senderId: trainerId,
    receiverId: userId,
    status: 'pending',
    timeStamp: new Date().toISOString(),
  };

  setChats((prevChats) => {
    let userId1 = newMsg.senderId;
    let userId2 = newMsg.receiverId;

    if (!prevChats[userId2]) {
      socket.emit('loadMessages', { userId1, userId2 });

      // Move the event listener outside of the state update function
      const handleMessages = (fetchedMessages) => {
        fetchedMessages.push(newMsg);
        setChats((prev) => {
          let newObj = { ...prev, [userId2]: fetchedMessages };
          return newObj;
        });
      };
      socket.once('messages', handleMessages);
    } else {
      let newArr = prevChats[newMsg.receiverId].concat(newMsg);
      return { ...prevChats, [newMsg.receiverId]: newArr };
    }
  });

  socket?.emit('chat message', newMsg);
};

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
        detailEmail, setDetailEmail,
        detailId, setDetailId,
        currentReceiver, setCurrentReceiver, extractFirstLetter, isChatUsersLoading, setIsChatUsersLoading,
        hasSignedUp, setHasSignedUp, sendMsgFromTrainer
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

