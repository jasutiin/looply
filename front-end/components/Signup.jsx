import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { useState, useRef } from 'react';
import axios from 'axios';
import { ADDR } from '@env';

function Signup({ navigation }) {
  const [email, onChangeEmail] = useState('');
  const [username, onChangeUsername] = useState('');
  const [password, onChangePassword] = useState('');
  const [name, onChangeName] = useState('');

  function validateInputs() {
    const errors = {};

    if (!email) {
      errors.email = 'email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'invalid email format';
    }

    if (!username) {
      errors.username = 'username is required';
    } else if (username.length < 5) {
      errors.username = 'username has to be more than 4 characters';
    }

    if (!password) {
      errors.password = 'password is required';
    } else if (password.length < 5) {
      errors.password = 'password has to be more than 4 characters';
    } else if (
      !/(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)
    ) {
      errors.password =
        'password must have at least one number and one special character';
    }

    if (!name) {
      errors.name = 'name is required';
    } else if (name.length < 5) {
      errors.name = 'name has to be more than 4 characters';
    }

    return errors;
  }

  const findUserByEmail = async (email) => {
    try {
      const response = await axios.post('/findUserByEmail', { email });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error finding user:', error.response.data);
      } else {
        console.error('Error:', error.message);
      }
      throw error;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Email</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeEmail}
          placeholder="Enter email address"
          placeholderTextColor={'#6c6c6c'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Username</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeUsername}
          placeholder="Enter username"
          placeholderTextColor={'#6c6c6c'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangePassword}
          placeholder="Enter password"
          placeholderTextColor={'#6c6c6c'}
        />
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.text}>Name</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={onChangeName}
          placeholder="Enter name"
          placeholderTextColor={'#6c6c6c'}
        />
      </View>
      <View style={styles.buttonContainer}>
        <Pressable
          style={styles.button}
          onPress={() => {
            const errors = validateInputs();

            if (Object.keys(errors).length > 0) {
              console.log('Validation errors:', errors);
            } else {
              //createUser();
              navigation.navigate('Login');
            }
          }}
        >
          <Text style={styles.buttonText}>Create an account</Text>
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

export default Signup;
