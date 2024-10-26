import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AuthenticationPage from '../components/AuthenticationPage';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../components/Login';
import Signup from '../components/Signup';

const windowWidth = Dimensions.get('window').width;

signup = false;
const Stack = createStackNavigator();

function Profile() {
  if (signup) {
    return (
      <View style={styles.container}>
        <View style={styles.profileContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.profilePicture}
              source={require('../assets/profile_pic.png')}
            />
          </View>
          <Text style={styles.userHandle}>@jasutiin</Text>
          <View style={styles.userInfo}>
            <View style={styles.infoContainer}>
              <Text style={styles.metricText}>1,560</Text>
              <Text style={styles.text}>Following</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.metricText}>789</Text>
              <Text style={styles.text}>Following</Text>
            </View>
            <View style={styles.infoContainer}>
              <Text style={styles.metricText}>52.6K</Text>
              <Text style={styles.text}>Following</Text>
            </View>
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.text}>content</Text>
        </View>
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
        <Stack.Screen name="Authentication" component={AuthenticationPage} />
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

export default Profile;
