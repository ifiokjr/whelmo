import { inject } from 'mobx-react/native';
import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { screenRoutes } from '../constants';
import { UserStore } from '../stores';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface SignInScreenProps extends NavigationInjectedProps {
  userStore: UserStore;
}

@inject('userStore')
class SignInScreen extends Component<SignInScreenProps> {
  public static navigationOptions = {
    title: 'Login Screen',
  };

  public render() {
    return (
      <View style={styles.container}>
        <Button title="Login Anonymously!" onPress={this.signInAsync} />
      </View>
    );
  }

  private signInAsync = async () => {
    try {
      await this.props.userStore.signInAnonymously();
      this.props.navigation.navigate(screenRoutes.Tabs);
    } catch (e) {}
  };
}

export default SignInScreen;
