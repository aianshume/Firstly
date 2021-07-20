import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TouchableWithoutFeedback } from 'react-native';
import { Button, Input, Layout, StyleService, Text, useStyleSheet, Icon } from '@ui-kitten/components';
import { KeyboardAvoidingView } from './extra/3rd-party';
import { PersonIcon } from './extra/icons';
import Loading from '../Loading'
import firebase from 'firebase';

const Landing = ({navigation}) => {
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(false)

		const styles = useStyleSheet(themedStyles);

		const onSignUpButtonPress = () => {
	    navigation && navigation.navigate('SignUp');
	  };

	  const onForgotPasswordButtonPress = () => {
	    navigation && navigation.navigate('ForgotPassword');
	  };

	  const onPasswordIconPress = () => {
	    setPasswordVisible(!passwordVisible);
	  };

	  const renderPasswordIcon = (props) => (
	    <TouchableWithoutFeedback onPress={onPasswordIconPress}>
	      <Icon {...props} name={passwordVisible ? 'eye-off' : 'eye'} />
	    </TouchableWithoutFeedback>
  	);

    const onSignInButtonPress = () => {
      setLoading(true)
      firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        console.log(error.message)
    // ..
      });
    }

    if (loading == true){
      return <Loading/>
    } else {

	return (
	<KeyboardAvoidingView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          category='h1'
          status='control'>
          Hello
        </Text>
        <Text
          style={styles.signInLabel}
          category='s1'
          status='control'>
          Sign in to your account
        </Text>
      </View>
      <Layout
        style={styles.formContainer}
        level='1'>
        <Input
          placeholder='Email'
          accessoryRight={PersonIcon}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={styles.passwordInput}
          placeholder='Password'
          accessoryRight={renderPasswordIcon}
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <View style={styles.forgotPasswordContainer}>
          <Button
            style={styles.forgotPasswordButton}
            appearance='ghost'
            status='basic'
            onPress={onForgotPasswordButtonPress}>
            Forgot your password?
          </Button>
        </View>
      </Layout>
      <Button
        style={styles.signInButton}
        onPress={onSignInButtonPress}
        size='giant'>
        SIGN IN
      </Button>
      <Button
        style={styles.signUpButton}
        appearance='ghost'
        status='basic'
        onPress={onSignUpButtonPress}>
        Don't have an account? Create
      </Button>
    </KeyboardAvoidingView>
  );
}
}

const themedStyles = StyleService.create({
  container: {
    backgroundColor: 'background-basic-color-1',
  },
  headerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 216,
    backgroundColor: 'color-primary-default',
  },
  formContainer: {
    flex: 1,
    paddingTop: 32,
    paddingHorizontal: 16,
  },
  signInLabel: {
    marginTop: 16,
  },
  signInButton: {
    marginHorizontal: 16,
  },
  signUpButton: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  forgotPasswordContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  passwordInput: {
    marginTop: 16,
  },
  forgotPasswordButton: {
    paddingHorizontal: 0,
  },
});

export default Landing;