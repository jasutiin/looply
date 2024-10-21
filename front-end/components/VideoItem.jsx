import { View, StyleSheet, Text, Dimensions } from 'react-native'; // without Text import the video doesn't show up lol
import { useState, useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';

import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome6 from 'react-native-vector-icons/Ionicons';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function VideoItem({ url, likes }) {
  const video = useRef(null);
  const [status, setStatus] = useState({});

  return (
    <View style={styles.container}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: url,
        }}
        resizeMode={ResizeMode.COVER}
        isLooping
        shouldPlay={true}
        onPlaybackStatusUpdate={(status) => {
          setStatus(() => status);
        }}
      />
      <View style={styles.overlay}>
        <View style={styles.overlayItem}>
          <Octicons name="heart-fill" color="white" size={30} />
          <Text style={styles.overlayText}>1000</Text>
        </View>
        <View style={styles.overlayItem}>
          <MaterialCommunityIcons
            name="comment-processing"
            color="white"
            size={30}
          />
          <Text style={styles.overlayText}>1000</Text>
        </View>
        <View style={styles.overlayItem}>
          <FontAwesome6 name="bookmark" color="white" size={30} />
          <Text style={styles.overlayText}>1000</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  video: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
  overlay: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    bottom: 260,
    right: 15,
    borderRadius: 5,
  },
  overlayItem: {
    margin: 5,
  },
  overlayText: {
    color: 'white',
    fontSize: 12,
  },
});

export default VideoItem;
