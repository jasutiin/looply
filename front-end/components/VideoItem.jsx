import { View, StyleSheet, Text } from 'react-native'; // without Text import the video doesn't show up lol
import { Dimensions } from 'react-native';
import { useState, useRef } from 'react';
import { Video, ResizeMode } from 'expo-av';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function VideoItem({ url }) {
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
      <Text>{url}hi</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: windowWidth,
    height: windowHeight,
  },
  text: {
    color: 'white',
    marginTop: 10,
  },
  video: {
    flex: 1,
    width: '100%',
    height: 'auto',
  },
});

export default VideoItem;
