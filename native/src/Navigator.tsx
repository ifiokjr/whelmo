// tslint:disable:no-object-literal-type-assertion
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  HeaderMode,
  NavigationTabScreenOptions,
  StackNavigator,
  SwitchNavigator,
  TabNavigator,
} from 'react-navigation';
import { screenRoutes, stackRoutes } from './constants';
import {
  AppLoadingScreen,
  HomeScreen,
  ProfileScreen,
  ShareScreen,
  SignInScreen,
} from './screens';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
const headerMode: HeaderMode = 'none';
const defaultNavigatorOptions = {
  headerMode,
  cardStyle: {
    backgroundColor: 'white',
  },
};
const HomeStack = StackNavigator(
  { [screenRoutes.Home]: HomeScreen },
  defaultNavigatorOptions,
);
const AuthStack = StackNavigator(
  { [screenRoutes.SignIn]: SignInScreen },
  defaultNavigatorOptions,
);
const ShareStack = StackNavigator(
  { [screenRoutes.Share]: ShareScreen },
  defaultNavigatorOptions,
);
const ProfileStack = StackNavigator(
  {
    [screenRoutes.ProfileScreen]: ProfileScreen,
  },
  defaultNavigatorOptions,
);

const HomeTabs = TabNavigator(
  {
    Home: {
      screen: HomeStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor as string} size={25} />
        ),
      } as NavigationTabScreenOptions,
    },
    Share: {
      screen: ShareStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="trending-up" color={tintColor as string} size={25} />
        ),
      } as NavigationTabScreenOptions,
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor as string} size={25} />
        ),
      } as NavigationTabScreenOptions,
    },
  },
  {
    animationEnabled: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
    },
  },
);

export default SwitchNavigator(
  {
    [screenRoutes.AppLoading]: AppLoadingScreen,
    [screenRoutes.Tabs]: HomeTabs,
    [stackRoutes.Auth]: AuthStack,
  },
  {
    initialRouteName: screenRoutes.AppLoading,
  },
);
