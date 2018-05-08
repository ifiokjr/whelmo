import React, { Component } from 'react';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationInjectedProps } from 'react-navigation';
import { screenRoutes } from '../constants';
import { Theme } from '../theme/components/Theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    marginTop: Theme.spacing.base,
  },
});

export default class FirstPost extends Component<NavigationInjectedProps> {
  public share = () => {
    this.props.navigation.navigate(screenRoutes.Share);
  };

  public render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.share}>
          <Icon name="plus-circle" color={Theme.palette.primary} size={25} />
        </TouchableWithoutFeedback>
        <Text style={styles.text}>
          Looks like you have not shared anything yet. Now is the time to make
          your first post!
        </Text>
      </View>
    );
  }
}
