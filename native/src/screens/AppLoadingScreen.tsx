import { when } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { NavigationInjectedProps } from 'react-navigation';
import { screenRoutes, stackRoutes } from '../constants';
import { IAuthStore, IExtras, UserType } from '../types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface AppLoadingScreenProps extends NavigationInjectedProps {
  authStore: IAuthStore;
  extras: IExtras;
}

@inject('authStore', 'extras')
@observer
class AppLoadingScreen extends Component<AppLoadingScreenProps> {
  public componentDidMount() {
    this.bootstrap();
  }

  private async navigate(user: UserType) {
    if (user) {
      await this.props.extras.initAfterAuth();
      this.props.navigation.navigate(screenRoutes.Tabs);
    } else {
      this.props.navigation.navigate(stackRoutes.Auth);
    }
    SplashScreen.hide();
  }

  // Fetch the token from storage then navigate to our appropriate place
  public bootstrap = () => {
    const { authStore } = this.props;
    when(() => !authStore.loading, () => this.navigate(authStore.user));
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
