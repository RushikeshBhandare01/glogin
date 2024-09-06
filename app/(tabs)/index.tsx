import { Image, StyleSheet, Platform, View, Text } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { GoogleSignin, GoogleSigninButton, isErrorWithCode, isSuccessResponse, statusCodes } from '@react-native-google-signin/google-signin';


GoogleSignin.configure();

export default function HomeScreen() {

  const signIn = async () => {
    console.log("calling ")
    try {
      await GoogleSignin.hasPlayServices();
      const response = await GoogleSignin.signIn();
      console.log("response ", response)
      if (isSuccessResponse(response)) {
        console.log("Response ", response)
        // setState({ userInfo: response.data });
      } else {
        // sign in was cancelled by user
      }
    } catch (error) {
      console.log('error ', error)
      if (isErrorWithCode(error)) {
        switch (error.code) {
          case statusCodes.IN_PROGRESS:
            // operation (eg. sign in) already in progress
            break;
          case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
            // Android only, play services not available or outdated
            break;
          default:
          // some other error happened
        }
      } else {
        // an error that's not related to google sign in occurred
      }
    }
  }
  return (

    <View style={styles.Container}>
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => {
          signIn()
          // initiate sign in
        }}
        // disabled={isInProgress}
      />
      <Text>HI world</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  Container: {
   flex: 1,
   alignItems: 'center',
   justifyContent: 'center'
  },

});
