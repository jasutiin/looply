import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Text, View, Pressable } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import UserContext from './UserProvider';
import { useContext } from 'react';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Post from '../screens/Post';

import { COLORS } from '../constants/constants';

const Tab = createBottomTabNavigator();

function HomeHeaderTitle() {
  return (
    <View style={styles.homeHeaderMid}>
      <Pressable>
        <Text style={styles.headerText}>For You</Text>
      </Pressable>
    </View>
  );
}

function Navigation() {
  const [user, setUser] = useContext(UserContext);

  function Logout() {
    setUser({
      _id: null,
      bio: null,
      createdVideos: [],
      email: null,
      followersCount: 0,
      followersList: [],
      followingCount: 0,
      followingList: [],
      likedVideos: [],
      likesCount: 0,
      name: null,
      profilePicture: null,
      savedVideos: [],
      username: null,
    });
  }

  return (
    <>
      <NavigationContainer style={styles.container}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarActiveTintColor: 'white',
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopColor:
                route.name === 'Profile' || route.name === 'Post'
                  ? COLORS.darkModeBackground
                  : 'grey',
            },
          })}
        >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              headerTransparent: true,
              headerTitleAlign: 'center',
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons name="home" color={color} size={30} />
              ),
              headerTitle: (props) => <HomeHeaderTitle {...props} />,
            }}
            backgroundColor="black"
          />
          <Tab.Screen
            name="Post"
            component={Post}
            options={{
              headerTransparent: false,
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: COLORS.darkModeBackground,
                shadowColor: 'transparent',
                elevation: 0,
              },
              tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="plus-square" color={color} size={22} />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              headerTransparent: false,
              headerTitleAlign: 'center',
              headerTintColor: 'white',
              headerStyle: {
                backgroundColor: COLORS.darkModeBackground,
                shadowColor: 'transparent',
                elevation: 0,
              },
              headerRight: () => {
                return user.name !== null ? (
                  <Pressable onPress={Logout}>
                    <Text style={styles.logoutText}>Logout</Text>
                  </Pressable>
                ) : null;
              },
              headerTitle: user.name !== null ? user.name : 'Profile',
              tabBarIcon: ({ color, size }) => (
                <FontAwesome6 name="user-large" color={color} size={22} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  homeHeaderMid: {
    flexDirection: 'row',
    gap: 20,
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
  logoutText: {
    fontSize: 13,
    color: '#4493F8',
    marginRight: 20,
  },
});

export default Navigation;
