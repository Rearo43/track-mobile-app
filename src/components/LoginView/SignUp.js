import React from 'react';
import { Button, Dimensions, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import RadioForm, { RadioButton, RadioButtonInput } from 'react-native-simple-radio-button';

import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';


// REDUX
import { connect } from 'react-redux';
import { login, logout } from '../../store/login';



////////////////////////////////////////////////////////////////////
// SignUp component adds a user to the database based on user input
// if all input rules are followed, and if there are no duplicate 
// usernames, emails, or phone numbers.
// Returns the rendered form
// Redirects to the map component suite and updates the state to
// logged in upon successful sign up
function SignUp(props) {

  const radio_props = [
    { label: '#1C1D21', value: 0 },
    { label: '#999999', value: 1 },
    { label: '#8AC926', value: 2 },
    { label: '#5DB4EA', value: 3 },
    { label: '#DE70FF', value: 4 },
    { label: '#FFADE7', value: 5 },
    { label: '#FF595E', value: 6 },
    { label: '#FFCA3A', value: 7 },
  ];

  const { control, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {

    data.color = radio_props[data.color].label;

    try {
      const response = await axios({
        method: 'post',
        url: 'https://trackchat.herokuapp.com/signup',
        data: data,
      })
      if (response.data === 'used name') {
        console.log('used name, try another');
      }
      if (response.data === 'used email') {
        console.log('used email, try another');
      }
      if (response.data === 'used phone number') {
        console.log('used phone number, try another');
      }

      if (response.data === 'success') {

        // REDUX
        props.login({ username: data.username, color: data.color });

        // ROUTE
        props.navigation.navigate('Track Chat');

      }
    } catch (error) {
      console.log('error trying to save to database', error);
    }
  }

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
            onChangeText={value => onChange(value)}
            value={value}
            placeholder={'Up to 20 characters'}
          />
        )}
        name={'username'}
        rules={{ required: true, maxLength: 20 }}
        defaultValue=''
      />
      {errors.username && <Text style={styles.errors}>You'll need a username!</Text>}

      <Text>Phone Number:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder={'Digits Only Please'}
          />
        )}
        name={'phoneNumber'}
        rules={{ required: true, maxLength: 10, pattern: /[\d]{10}/g }}
        defaultValue=''
      />
      {errors.phone && <Text style={styles.errors}>Please enter 10 digit phone number with no spaces, parentheses, or dashes.</Text>}

      <Text>Email:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder={'email@domain.com'}
          />
        )}
        name={'email'}
        rules={{ required: true }}
        defaultValue=''
      />
      {errors.email && <Text style={styles.errors}>Please enter a valid email address</Text>}

      <Text>Password:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput
            style={styles.input}
            onBlur={onBlur}
            onChangeText={value => onChange(value)}
            value={value}
            placeholder={'********'}
            secureTextEntry={true}
          />
        )}
        name={'password'}
        rules={{ required: true, minLength: 6 }}
        defaultValue=''
      />
      {errors.password && <Text style={styles.errors}>Please enter a password that is at least 6 characters long.</Text>}

      <Text>Choose Your Icon Color:</Text>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <RadioForm
            formHorizontal={true}
            animation={true}
          >
            {
              radio_props.map((obj, i) => (
                <RadioButton labelHorizontal={true} key={i} >
                  <RadioButtonInput
                    obj={obj}
                    index={i}
                    onBlur={onBlur}
                    onPress={value => onChange(value)}
                    value={value}
                    isSelected={(obj.value === value)}
                    buttonInnerColor={obj.value === i ? obj.label : '#efefef'}
                    buttonOuterColor={obj.label}
                    buttonStyle={{}}
                    buttonWrapStyle={{ marginLeft: 10, marginTop: 5, marginBottom: 20 }}
                  />
                </RadioButton>
              ))
            }
          </RadioForm>
        )}
        name={'color'}
        rules={{ required: true }}
        defaultValue={0}
      />


      { !props.loggedIn ? 
      
      <TouchableOpacity style={styles.button}>
        <Text
          style={styles.buttonText}
          onPress={handleSubmit(onSubmit, onError)}
        >
          Sign Up
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

      <Text style={styles.loginPrompt}>Already Signed Up?</Text>

      <Button
        title='Log In Instead.'
        onPress={() => props.navigation.navigate('Log In')}
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
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
