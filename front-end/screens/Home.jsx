import { View, StyleSheet, FlatList, Dimensions } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import VideoItem from '../components/VideoItem';
import UserContext from '../components/UserProvider';

const windowHeight = Dimensions.get('window').height;

function Home() {
  const [videoList, setVideoList] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const getSixVideos = async () => {
    const arr = [];
    await axios
      .get(null)
      .then((response) => {
        response.data.forEach((video) => {
          arr.push(video);
          console.log(video.vidUrl);
        });
      })
      .catch((error) => {
        console.log('error fetching data: ', error);
      });
    return arr;
  };

  const handleLoadMore = async () => {
    const urls = await getSixVideos();
    setVideoList((prevList) => [...prevList, ...urls]);
  };

  useEffect(() => {
    handleLoadMore();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={videoList}
        renderItem={({ item }) => <VideoItem videoItem={item} />}
        showsVerticalScrollIndicator={false}
        style={styles.list}
        snapToInterval={windowHeight} // Snap to each item (height of screen)
        snapToAlignment="start" // Start each item from the top of the screen
        decelerationRate="fast" // Fast snapping
        pagingEnabled // Enables paging to make it scroll one item at a time
        scrollEventThrottle={16}
        onEndReached={handleLoadMore} // Load more items when end is reached
        onEndReachedThreshold={0.5} // Trigger when 50% from the end
        extraData={videoList}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
});

export default Home;
