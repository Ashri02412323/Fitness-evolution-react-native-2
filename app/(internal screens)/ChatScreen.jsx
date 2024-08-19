import { View, TextInput, SafeAreaView, ScrollView, Text, Pressable, ActivityIndicator } from 'react-native';
import React, { useEffect, useRef, useState} from 'react';
import ScheduleHeader from '../components/MySchedules/ScheduleHeader';
import { router, useGlobalSearchParams } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useGlobalContext } from '../../contexts/GlobalProvider';
import MessageInstance from '../components/Chat/MessageInstance';
import { Toast } from 'toastify-react-native';

const ChatScreen = () => {
  const { receiver, userName} = useGlobalSearchParams();
  let objReceiver ;
  try {
    if(receiver){
    objReceiver = JSON.parse(receiver);
    }
  } catch (error) {
    console.error("Failed to parse receiver JSON:", error,receiver);
    objReceiver = null;
  }
  let objReeiverRef = useRef(objReceiver);
  const insets = useSafeAreaInsets();
  const { chats, setChats ,user,socket,setLastMessages,setReceived,scrollRef,setCurrentReceiver} = useGlobalContext();
  const [msg, setMsg] = useState("");
  const userId1 = user?._id;
  const userId2 = objReceiver?.id;
  const [isSending, setIsSending] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);

  useEffect(() => {
    const checkScrollRef = setInterval(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollToEnd({ animated: true });
        clearInterval(checkScrollRef);
      }
    }, 100); // Check every 100ms

    return () => clearInterval(checkScrollRef);
  }, [scrollRef.current]);
  useEffect(() => {
    setCurrentReceiver(objReceiver);
    return () => {
      setCurrentReceiver(null);
    }
  }, []);
useEffect(()=>{
  if (scrollRef.current) {
    scrollRef.current.scrollToEnd({ animated: true});
  }
  if(loadingMessages){
    setLoadingMessages(false);
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true});
    }
  }
},[chats])
useEffect(()=>{
  setReceived((prevReceived) => {
    let newReceived = prevReceived.filter((m) => m.senderId !== objReeiverRef.current.id);
    return newReceived;
  });
},[])
  useEffect(() => {
    if (!socket) return;
    let ifChatAlreadyExists = chats[userId2];
    if (!ifChatAlreadyExists){
    socket.emit('loadMessages', { userId1, userId2 })
  }
     socket.on('messages', (fetchedMessages) => {
      setChats((prev) => {
        let newObj = { ...prev, [userId2]: fetchedMessages };
        return newObj;
      }
    )
    });

    socket.on('chat message', (msg) => {
      if (objReceiver.id === msg.senderId || user._id === msg.senderId) {
        setChats((prevChats) => {
        let newArr = [...prevChats[userId2], msg];
          return { ...prevChats, [userId2]: newArr };
        });
        setLastMessages((prevMessages) => {
          let newMessages = prevMessages.filter((m) => m.senderId !== userId2 && m.receiverId !== userId2);
          newMessages.push(msg);
          return newMessages;
        });
        if (scrollRef.current) {
          scrollRef.current.scrollToEnd({ animated: true });
        }
      }
      if (socket?.connected) {
        socket.emit('message sent', msg._id);
      } else {
        console.log("Socket is not connected. Message delivered event not emitted.");
        Toast.error('Message delivered event not emitted.','top')
      }
    });

    socket.on('message status', (msg) => {
      setChats((prevChats) => {
        let newArr = prevChats[userId2].map((m) => {
          return (m.timeStamp === msg.timeStamp ? msg : m)});
        return { ...prevChats, [userId2]: newArr };
      });
    });

    socket.on('msg_ID received', (msgT) => {
      if (socket?.connected) {
        socket.emit('message sent', msgT._id);
      } else {
        console.log("Socket is not connected. Message delivered event not emitted.");
      }
    });
    return () => {
      socket.off('messages');
      socket.off('chat message');
      socket.off('message status');
    };
  }, [socket, userId1, userId2]);
useEffect(()=>{
  if(isSending){
    setIsSending(false);
  }
},[chats])
  const sendMessage = (msgTemp) => {
    setIsSending(true);
    const newMsg = {
      senderName: user.fullName,
      receiverName: objReceiver.userName,
      message: msgTemp,
      senderId: userId1,
      receiverId: userId2,
      status: 'pending',
      timeStamp: new Date().toISOString(),
    };
    setChats((prevChats) => {
      let newArr = [...prevChats[userId2], newMsg];
      return { ...prevChats, [userId2]: newArr };
    });
    socket?.emit('chat message', newMsg);
    setMsg(""); 
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
    // setLastMessages((prevMessages) => {
    //   let newMessages = prevMessages.filter((m) => m.senderId !== userId2 && m.receiverId !== userId2);
    //   newMessages.push(newMsg);
    //   return newMessages;
    // });
  }

  const handleRead = (msg) => {
    if (msg.status !== 'read') {
      socket?.emit('message read', msg._id);
    }
  };

  if(loadingMessages){
    return (
      <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
        <ScheduleHeader title={userName} onPress={()=>{
          router.back();
          }}/>
        <ActivityIndicator size="large" color="#00C7BE" style={{
          marginTop: '50%'
        }} />
        <Text className="text-white_60 font-inter_Regular text-base w-1/2 mx-auto text-center mt-2">
          Loading messages...
        </Text>
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView className="bg-primary h-full" style={{ paddingTop: insets.top }}>
      <ScheduleHeader title={userName} />
      <ScrollView className="flex flex-col px-2" ref={scrollRef}>
        <Text className="text-white_60 font-inter_Regular text-sm w-1/2 mx-auto text-center">
          Our chats are end-to-end encrypted
        </Text>
        <View className="flex flex-col mt-4">
          {chats[userId2]?.map((chat, index) => (
            <MessageInstance key={index} msg={chat} user={user} onRead={handleRead} />
          ))}
        </View>
      </ScrollView>
      <View className="flex flex-row items-center gap-x-0 py-4 px-2 mb-2 relative">
        <TextInput
          className="w-[87%] h-12 bg-white_87 rounded-lg text-black px-4"
          placeholder="Type a message"
          value={msg}
          onChangeText={(text) => setMsg(text)}
        />
        <Pressable onPress={()=>sendMessage(msg)} className={`py-3 px-2 pl-3 ${!msg && "opacity-60"}`} disabled={!msg}>
          {isSending ? <ActivityIndicator size="small" color="#00C7BE" />:
          <Ionicons name="send" size={26} color="#00C7BE" />
        }
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;