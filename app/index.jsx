import { Redirect } from 'expo-router';
import 'react-native-reanimated';
import { useCheckLoginStatus } from './useCheckLoginStatus'; // Adjust the import path as needed

export default function Index() {
  const { isLoggedIn, delayCompleted, NotLoggedInComponent } = useCheckLoginStatus();

  if (isLoggedIn === null) {
    return NotLoggedInComponent;
  }

  return (
    <>
      {isLoggedIn ? (
        <Redirect href="/home" /> // Redirect to home if logged in
      ) : (
        <Redirect href="/signIn" /> // Redirect to sign-in if not logged in
      )}
    </>
  );
}