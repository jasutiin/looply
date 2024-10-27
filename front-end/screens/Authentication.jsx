import { View, Text, StyleSheet, Pressable, Dimensions } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const windowWidth = Dimensions.get('window').width;

function Authentication({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.login}>
        <AntDesign name="user" color="grey" size={100} />
        <Text style={styles.boldText}>Log into existing account</Text>
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>
      <View style={styles.signup}>
        <Text style={styles.text}>Don't have an account? </Text>
        <Pressable onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.textBlue}>Sign Up!</Text>
        </Pressable>
      </View>
    </View>
  );
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
    margin: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  boldText: {
    color: 'white',
    fontWeight: 'bold',
    margin: 10,
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

export default Authentication;
