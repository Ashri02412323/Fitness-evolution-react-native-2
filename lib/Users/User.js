import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router/build';

const baseUrl = 'https://evolution-erm4.onrender.com/v0/api/user';
const LoginUser = async (email, password) => {
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
    router.push('/home');
    return response.data;
  } catch (error) {
    throw error;
  }
};

const SignUpUser = async (fullName, email, password) => {
    const url = `${baseUrl}/register`;
    const data = {
      fullName,
      email,
      password,
      "trainerAssigned": "66a9004cb1a81ce392c54cdf"
    };

    try {
        const response = await axios.post(url, data, {
            headers: {
            "Content-Type": "application/json",
            },
        });
        const { token } = response.data;
        await AsyncStorage.setItem('jwt', token); // Store JWT in AsyncStorage
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

const logoutUser = async () => {
  try {
    await AsyncStorage.removeItem('jwt'); // Remove JWT from AsyncStorage
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
export { LoginUser, SignUpUser, VerifyEmail, validateEmail, validatePassword,validateFullName, setNewPass, getToken, logoutUser, checkIfLoggedIn,allUsersUnderTrainer };