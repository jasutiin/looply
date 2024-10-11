import { View, Text, StyleSheet } from 'react-native';

function Post() {
  return (
    <View style={styles.container}>
      <Text>Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Post;
