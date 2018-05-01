import { inject } from 'mobx-react/native';
import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { UserStore } from '../stores';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface HomeScreenProps extends NavigationInjectedProps {
  userStore: UserStore;
}

@inject('userStore')
class HomeScreen extends Component<HomeScreenProps> {
  public static navigationOptions = {
    title: 'Welcome to the app!',
  };

  public render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this.showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this.signOutAsync} />
      </View>
    );
  }

  private showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  private signOutAsync = async () => {
    try {
      await this.props.userStore.signOut();
      this.props.navigation.navigate('Auth');
    } catch (e) {}
  };
}

export default HomeScreen;
