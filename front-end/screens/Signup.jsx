import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Alert,
} from 'react-native';
import { useState } from 'react';
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
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (!username) {
      errors.username = 'Username is required';
    } else if (username.length < 5) {
      errors.username = 'Username must be more than 4 characters';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 5) {
      errors.password = 'Password must be more than 4 characters';
    } else if (
      !/(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/.test(password)
    ) {
      errors.password =
        'Password must have at least one number and one special character';
    }

    if (!name) {
      errors.name = 'Name is required';
    } else if (name.length < 5) {
      errors.name = 'Name must be more than 4 characters';
    }

    return errors;
  }

  const createNewUser = async (email, username, password, name) => {
    try {
      const response = await axios.post(`${ADDR}/user/createNewUser`, {
        email,
        username,
        name,
        password,
      });
      return response.data;
    } catch (error) {
      if (error.response) {
        console.error('Error creating user:', error.response.data);
        throw new Error(error.response.data.message || 'User creation failed');
      } else {
        console.error('Error:', error.message);
        throw new Error('User creation failed');
      }
    }
  };

  const handleSignup = async () => {
    const errors = validateInputs();

    if (Object.keys(errors).length > 0) {
      console.log('Validation errors:', errors);
      Alert.alert('Error', 'Please fix the errors before proceeding.');
    } else {
      try {
        const result = await createNewUser(email, username, password, name);
        console.log('User created successfully:', result);

        onChangeEmail('');
        onChangePassword('');
        onChangeUsername('');
        onChangeName('');

        navigation.navigate('Authentication');
      } catch (error) {
        console.log('Signup error:', error.message);
        Alert.alert('Signup Failed', error.message);
      }
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
          secureTextEntry
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
        <Pressable style={styles.button} onPress={handleSignup}>
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
