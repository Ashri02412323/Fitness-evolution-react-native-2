import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FormData from 'form-data';
import { router } from 'expo-router/build';

const baseUrl = 'http://fitnessevol-env.eba-uunkm3cu.us-east-1.elasticbeanstalk.com/v0/api/user';

const uploadImg = async (imageUri) => {
  const url = `http://fitnessevol-env.eba-uunkm3cu.us-east-1.elasticbeanstalk.com/v0/api/images/uploadProfile`;
  const formData = new FormData();

  // Append the image file to the form data
  const getFileType = (uri) => {
    const extension = uri.split('.').pop();
    if (extension === 'jpg' || extension === 'jpeg') {
      return 'image/jpeg';
    } else if (extension === 'png') {
      return 'image/png';
    }
    return 'application/octet-stream'; 
  }
  
  formData.append('image', {
    uri: imageUri,
    name: `profile.${imageUri.split('.').pop()}`,
    type: getFileType(imageUri), 
  });

  try {
    const response = await axios.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
  
}
const LoginUser = async (email, password,setHasSignedUp) => {
  const url = `${baseUrl}/login`;
  const data = {
    email,
    password,
  };

  try {
    const response = await axios.post(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const { token } = response.data;
    await AsyncStorage.setItem('jwt', token); // Store JWT in AsyncStorage
    setHasSignedUp(false);
    router.push('/home');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const SignUpUser = async (fullName, email, password,setHasSignedUp) => {
    const url = `${baseUrl}/register`;
    const data = {
      fullName,
      email,
      password,
      "trainerAssigned": "66d8478acf1f6d035340e8c6"
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
            "Content-Type": "application/json",
            },
        });
        const { token } = response.data;
        await AsyncStorage.setItem('jwt', token); // Store JWT in AsyncStorage
        setHasSignedUp(true);
        router.push('/home');
        return response.data;
        } catch (error) {
        throw error;
    }
}
const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('jwt');
    if (token !== null) {
      return token;
    }
    return null;
  } catch (error) {
    throw error;
  }
};

const logoutUser = async (setToken,setUser,setChats,setAllUsers,setChatUsers,setLastMessages) => {
  try {
    await AsyncStorage.removeItem('jwt'); // Remove JWT from AsyncStorage
    setChats({});
    setUser(null);
    setToken(null);
    setAllUsers([]);
    setChatUsers([]);
    setLastMessages([]);
    router.push('/signIn');
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
const VerifyEmail = async (email) => {
  const url = `${baseUrl}/verifyEmail?email=${encodeURIComponent(email)}`;
  try {
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
const setNewPass = async (email, password) => {
  const url = `${baseUrl}/changePassword`;  
  const data = {
    email,
    password
  };
  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}

const validatePassword = (password) => {
  return password.length >= 4 && !/\s/.test(password);
};
const validateFullName = (fullName) => {
  return fullName.length >= 4;
};
const getUser = async (token) => {
  try {
    const url = `${baseUrl}/me`;
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  }
  catch (error) {
    throw error;
  }
}
const checkIfLoggedIn = async (setUser) => {
  try {
    const token = await getToken();
    
    if (token) {
      const user = await getUser(token);
      setUser(user);
      return true;
    }else {
      return false;
    }
  } catch (error) {
    console.error('Error checking login status:', error);
    return false;
  }
};
const allUsersUnderTrainer = async (token) => {
  const url = `${baseUrl}/allUsersUnderTrainer`;
  try {
      const response = await axios.get(url, {
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          }
      });
      return response.data;
  }catch(error){
      throw error;
  }
}
const updateUser = async (token, data,previousImgUri) => {
  const url = `${baseUrl}/me`;
  try {
    if(data.profileImage !== previousImgUri){
      const {imageUrl} = await uploadImg(data.profileImage);
      data.profileImage = imageUrl;
    }
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("Error in here: ", error);
    throw error;
  }
}
const deleteMyAccount = async (token) => {
  const url = `${baseUrl}/me`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
const deleteUser = async (token, userId) => {
  const url = `${baseUrl}/deleteUser/${userId}`;
  try {
    const response = await axios.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
const updateRole = async (token, userId, role) => {
  const url = `${baseUrl}/changeRole/${userId}`;
  const data = {
    role,
  };
  try {
    const response = await axios.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
}
export { LoginUser, SignUpUser, VerifyEmail, validateEmail, validatePassword,validateFullName, setNewPass, getToken, logoutUser, checkIfLoggedIn,allUsersUnderTrainer,updateUser,deleteMyAccount,deleteUser,updateRole };