import React, { createContext, useContext, useEffect, useState } from "react";

const GlobalContext = createContext();
export const useGlobalContext = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [forgottonEmail, setForgottonEmail] = useState(null);
  const [firstLetter, setFirstLetter] = useState('');
  const [index, setIndex] = useState(0);
  const [chats, setChats] = useState([
    "Hello there!",
    "Hello, how are you?",
  ]);
  const [detailName, setDetailName] = useState('');
  const [detailAge, setDetailAge] = useState('');
  const [detailGender, setDetailGender] = useState('');
  const [detailRole, setDetailRole] = useState('');
  const [detailProfile, setDetailProfile] = useState('');
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const [intialRoute, setIntialRoute] = useState('Upcoming');
  const [token, setToken] = useState('');
  const [blogID, setBlogID] = useState('');
  const extractFirstLetter = (name) => {
    return name.charAt(0).toUpperCase();
  }
  useEffect(()=>{
    let fullName = user?.fullName;
    if(fullName){
      setFirstLetter(extractFirstLetter(fullName));
    }
  },[user?.fullName])
    
useEffect(() => {
  if(user)
  console.log("User: ", user);
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
        setIndex, chats, setChats, detailName, setDetailName, detailAge, setDetailAge, detailGender, setDetailGender, detailRole, setDetailRole, detailProfile, setDetailProfile, isDetailVisible, setIsDetailVisible, blogID, setBlogID, token, setToken, intialRoute, setIntialRoute
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

