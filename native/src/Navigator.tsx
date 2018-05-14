// tslint:disable:no-object-literal-type-assertion
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';
import {
  DrawerNavigator,
  HeaderMode,
  NavigationTabScreenOptions,
  StackNavigator,
  StackNavigatorConfig,
  SwitchNavigator,
  TabBarBottom,
  TabNavigator,
} from 'react-navigation';
import { screenRoutes, stackRoutes } from './constants';
import {
  AppLoadingScreen,
  EditNoteScreen,
  LatestScreen,
  ProfileScreen,
  ShareScreen,
  SignInScreen,
} from './screens';
// import { Fab } from 'native-base';

// Implementation of HomeScreen, OtherScreen, SignInScreen, AuthLoadingScreen
// goes here.
const headerMode: HeaderMode = 'none';
const defaultNavigatorOptions: StackNavigatorConfig = {
  headerMode,
  navigationOptions: {
    gesturesEnabled: false,
  },
  cardStyle: {
    backgroundColor: 'white',
  },
};
const LatestStack = StackNavigator(
  {
    [screenRoutes.Latest]: LatestScreen,
  },
  {
    cardStyle: {
      backgroundColor: 'white',
    },
  },
);

const EditNoteStack = StackNavigator(
  {
    [screenRoutes.EditNote]: {
      screen: EditNoteScreen,
    },
  },
  {
    headerMode,
    cardStyle: {
      backgroundColor: 'white',
    },
  },
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
      screen: LatestStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" color={tintColor as string} size={25} />
        ),
        header: null,
      } as NavigationTabScreenOptions,
    },
    Share: {
      screen: ShareStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="trending-up" color={tintColor as string} size={25} />
        ),
        header: null,
      } as NavigationTabScreenOptions,
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" color={tintColor as string} size={25} />
        ),
        header: null,
      } as NavigationTabScreenOptions,
    },
  },
  {
    tabBarComponent: TabBarBottom,
    animationEnabled: true,
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    tabBarOptions: {
      showLabel: false,
    },
  },
);

// const HomeTabsWithFab: React.StatelessComponent<{}> = ({
//   children,
//   ...props
// }) => (
//   <HomeTabs {...props}>
//     <Fab
//       direction="up"
//       containerStyle={{}}
//       style={{ backgroundColor: Theme.palette.primary }}
//       position="bottomRight"
//       onPress={this.onPressNewNote}
//     >
//       <Icon name="plus" size={30} />
//     </Fab>
//   </HomeTabs>
// );

const MainStack = StackNavigator(
  {
    MainTabs: { screen: HomeTabs },
    EditNote: { screen: EditNoteStack },
  },
  {
    initialRouteName: 'MainTabs',
  },
);

const HomeDrawer = DrawerNavigator(
  {
    MainStack: { screen: MainStack },
    // EditNote: { screen: EditNoteStack },
  },
  {
    initialRouteName: 'MainStack',
    navigationOptions: {
      gestureResponseDistance: { horizontal: 100, vertical: 100 },
      gesturesEnabled: true,
    },
  },
);

export default SwitchNavigator(
  {
    [screenRoutes.AppLoading]: AppLoadingScreen,
    [screenRoutes.Tabs]: HomeDrawer,
    [stackRoutes.Auth]: AuthStack,
  },
  {
    initialRouteName: screenRoutes.AppLoading,
  },
);
