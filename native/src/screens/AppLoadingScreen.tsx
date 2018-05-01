import { when } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationInjectedProps } from 'react-navigation';
import { screenRoutes, stackRoutes } from '../constants';
import { UserStore } from '../stores';
import { UserType } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface AppLoadingScreenProps extends NavigationInjectedProps {
  userStore: UserStore;
}

@inject('userStore')
@observer
class AppLoadingScreen extends Component<AppLoadingScreenProps> {
  public componentDidMount() {
    this.bootstrap();
  }

  private navigate(user: UserType) {
    this.props.navigation.navigate(user ? screenRoutes.Tabs : stackRoutes.Auth);
    SplashScreen.hide();
  }

  // Fetch the token from storage then navigate to our appropriate place
  public bootstrap = () => {
    // const { loading, user } = this.props.userStore;
    const { userStore } = this.props;
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    when(() => !userStore.loading, () => this.navigate(userStore.user));
    // if (loading) {
    //   const dispose = observe(this.props.userStore, 'loading', change => {
    //     if (change.newValue === false) {
    //       this.navigate(this.props.userStore.user);
    //       dispose();
    //     }
    //   });
    // } else {
    //   this.navigate(user);
    // }
  };

  // Render any loading content that you like here
  public render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default AppLoadingScreen;
