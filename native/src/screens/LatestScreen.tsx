import { inject } from 'mobx-react/native';
import { Fab, Icon } from 'native-base';
import React, { Component } from 'react';
import { Button, StyleSheet, View } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import { NavigationInjectedProps } from 'react-navigation';
import { screenRoutes } from '../constants';
import { AuthStore } from '../stores';
import { Theme } from '../theme/components';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface LatestScreenProps extends NavigationInjectedProps {
  authStore: AuthStore;
}

@inject('authStore')
class LatestScreen extends Component<LatestScreenProps> {
  public static navigationOptions = {
    // title: 'Welcome to the app!',
    header: null,
  };

  private onPressNewNote = () => {
    this.props.navigation.navigate(screenRoutes.EditNote, { type: 'new' });
  };

  public render() {
    return (
      <View style={styles.container}>
        <Button title="Show me more of the app" onPress={this.showMoreApp} />
        <Button title="Actually, sign me out :)" onPress={this.signOutAsync} />
        <Fab
          direction="up"
          containerStyle={{}}
          style={{ backgroundColor: Theme.palette.primary }}
          position="bottomRight"
          onPress={this.onPressNewNote}
        >
          <Icon name="plus" type="Feather" />
        </Fab>
      </View>
    );
  }

  private showMoreApp = () => {
    this.props.navigation.navigate('Other');
  };

  private signOutAsync = async () => {
    try {
      await this.props.authStore.signOut();
      this.props.navigation.navigate('Auth');
    } catch (e) {}
  };
}

export default LatestScreen;
