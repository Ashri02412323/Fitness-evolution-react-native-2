import { Redirect } from 'expo-router';
import 'react-native-reanimated';
import useCheckLoginStatus from './useCheckLoginStatus';

function Index() {
  const { isLoggedIn,  NotLoggedInComponent } = useCheckLoginStatus();
//I have added a comment
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

export default Index;