import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState, useRef } from 'react';

function Login() {
  const [text, onChangeText] = useState('Enter email address');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder="Enter email address"
          placeholderTextColor={'#6c6c6c'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeText}
          placeholder="Enter password"
          placeholderTextColor={'#6c6c6c'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Log in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212',
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
  inputContainer: {
    marginLeft: 20,
    marginVertical: 10,
  },
  textInput: {
    color: '#6c6c6c',
  },
  buttonContainer: {
    marginTop: 50,
    alignItems: 'center',
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
});

export default Login;
