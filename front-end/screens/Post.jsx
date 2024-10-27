import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useContext } from 'react';

import Authentication from './Authentication';
import Login from './Login';
import Signup from './Signup';
import UserContext from '../components/UserProvider';

const windowWidth = Dimensions.get('window').width;
const Stack = createStackNavigator();

function Post() {
  const [user, setUser] = useContext(UserContext);

  if (user._id) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Post</Text>
      </View>
    );
  } else {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animationEnabled: true,
          cardStyle: { backgroundColor: '#121212' },
          cardStyleInterpolator: ({ current }) => ({
            cardStyle: {
              opacity: current.progress,
            },
          }),
          transitionSpec: {
            open: {
              animation: 'timing',
              config: {
                duration: 100,
              },
            },
            close: {
              animation: 'timing',
              config: {
                duration: 100,
              },
            },
          },
        }}
      >
        <Stack.Screen name="Authentication" component={Authentication} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
      </Stack.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#121212',
  },
  button: {
    backgroundColor: '#4493F8',
    borderRadius: 10,
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  text: {
    color: '#6c6c6c',
  },
  textBlue: {
    color: '#4493F8',
  },
  profileContainer: {
    flex: 0.6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: 100,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 75,
    resizeMode: 'cover',
  },
  userHandle: {
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  metricText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  userInfo: {
    flexDirection: 'row',
  },
  infoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: windowWidth,
  },
  login: {
    flex: 0.9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signup: {
    flex: 0.1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default Post;
