import { Lambda, observe } from 'mobx';
import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import { ActivityIndicator, StatusBar, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { UserStore } from '../stores';

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

  // Fetch the token from storage then navigate to our appropriate place
  public bootstrap = () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    const dispose = observe(this.props.userStore, 'loading', change => {
      if (change.newValue === false) {
        this.props.navigation.navigate(
          this.props.userStore.user ? 'App' : 'Auth',
        );
        dispose();
      }
    });
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
