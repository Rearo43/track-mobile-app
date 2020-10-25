import React from 'react';
import {  Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import base64 from 'base-64'
import axios from 'axios';

import { connect } from 'react-redux';
import { login, logout } from '../../store/login';

////////////////////////////////////////////////////////////////////
// Login component accepts user properties
// It indexes the database for the username
// Upon successful login, navigates to the map component suite
// Sets the 'state' to logged in with username and color
// Returns the form input fields
function LogIn(props) {

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    
    try {
      const authHeader = 'Basic ' + base64.encode(`${data.username}:${data.password}`);
      const response = await axios.post(
        'https://trackchat.herokuapp.com/signin',
        {},
        {
          headers: {
            authorization: authHeader
          }
        }
  
      )
      if (response.status === 200) {
        props.login({ username: data.username, color: response.data.user.color});
        props.navigation.navigate('Track Chat');
      }
    } catch (error) {
      console.log('User does not exist', error);
    }
  }

  // Bad form input
  const onError = (errors) => {
    console.log('Errors:', errors)
  }

  return (
    <View style={styles.container}>

      <Text>Username:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={ value => onChange(value) }
          value={value}
          placeholder={'Who are you?'}
          />
        )}
        name={'username'}
        rules={{required: true}}
        defaultValue=''
      />
      {errors.username && <Text style={styles.errors}>Please enter your username.</Text>}

      <Text>Password:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
          style={styles.input}
          onBlur={onBlur}
          onChangeText={ value => onChange(value) }
          value={value}
          placeholder={'********'}
          secureTextEntry={true}
          />
        )}
        name={'password'}
        rules={{required: true}}
        defaultValue=''
      />
      {errors.password && <Text style={styles.errors}>Please enter your password.</Text>}

      { !props.loggedIn ?
      
      <TouchableOpacity style={styles.button}>
          <Text
            style={styles.buttonText}
            onPress={handleSubmit(onSubmit, onError)}
            >
              Log In
          </Text>
      </TouchableOpacity> :

      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={() => props.logout()}>
          Log Out
        </Text>
      </TouchableOpacity>
    
      }


      <Text style={styles.loginPrompt}>Don't Have An Account?</Text>

      <Button
        title='Sign Up.'
        onPress={() => props.navigation.navigate('Sign Up')}
      />

    </View>
  )
}
////////////////////////////////////////////////////////////////////
// Styling
let { height } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    height: height,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
  },
  input: {
    height: 25,
    width: 200,
    padding: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#48BBEC',
    marginBottom: 10,
    marginTop: 5,
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center'
  },
  button: {
    height: 36,
    backgroundColor: '#48BBEC',
    borderColor: '#48BBEC',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    width: 100,
    justifyContent: 'center'
  },
  errors: {
    color: 'red',
    marginTop: 2,
    marginBottom: 8,
    textAlign: 'center'
  },
  loginPrompt: {
    marginTop: 20,
  }
});


////////////////////////////////////////////////////////////////////
// Connection to Redux store
const mapStateToProps = store => {
  return {
    loggedIn: store.logReducer.loggedIn,
    username: store.logReducer.username
  }
}
const mapDispatchToProps = { login, logout }

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
