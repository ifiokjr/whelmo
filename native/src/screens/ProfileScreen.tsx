import { inject, observer } from 'mobx-react/native';
import React, { Component } from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import Icon from 'react-native-vector-icons/Feather';
import { NavigationInjectedProps } from 'react-navigation';
import { Avatar, Notes, Text } from '../components';
import { NotesStore, UserAccountStore } from '../stores';
import { Theme } from '../theme/components';
import { PopulatedNotedClient } from '../types';

interface ProfileScreenProps extends NavigationInjectedProps {
  userAccountStore: UserAccountStore;
  userNotesStore: NotesStore;
}

const avatarSize = 100;
const { width } = Dimensions.get('window');
const statusBarHeight = getStatusBarHeight(true);
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: width,
  },
  header: {
    marginBottom: avatarSize * 0.5 + Theme.spacing.small,
  },
  cover: {
    width,
    height: width,
  },
  avatar: {
    position: 'absolute',
    right: Theme.spacing.small,
    bottom: -avatarSize * 0.5,
  },
  settings: {
    position: 'absolute',
    top: statusBarHeight + Theme.spacing.small,
    right: Theme.spacing.base,
    backgroundColor: 'transparent',
    zIndex: 10000,
  },
  title: {
    position: 'absolute',
    left: Theme.spacing.small,
    bottom: 50 + Theme.spacing.small,
  },
  about: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  name: {
    color: 'white',
  },
});

@inject('userAccountStore', 'userNotesStore')
@observer
export default class ProfileScreen extends Component<ProfileScreenProps> {
  public componentDidMount() {
    this.props.userNotesStore.checkForNewEntriesInNotes();
  }

  public settings = () => {
    const { userAccount } = this.props.userAccountStore;
    this.props.navigation.navigate('Settings', { userAccount });
  };

  public loadMore = () => {
    this.props.userNotesStore.loadNotes();
  };

  public keyExtractor = (item: PopulatedNotedClient): string => {
    return item.id;
  };

  public render() {
    const { navigation, userNotesStore, userAccountStore } = this.props;
    const { userAccount } = userAccountStore;
    return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#5cc0f1', '#d6ebf4', 'white']}
          style={styles.gradient}
        />
        <Notes
          bounce={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Image
                style={styles.cover}
                source={require('../../assets/images/cover.png')}
              />
              <TouchableOpacity onPress={this.settings} style={styles.settings}>
                <View>
                  <Icon name="settings" size={25} color="white" />
                </View>
              </TouchableOpacity>
              <View style={styles.title}>
                <Text type="large" style={styles.about}>
                  {userAccount.about}
                </Text>
                <Text type="header2" style={styles.name}>
                  {userAccount.name.display}
                </Text>
              </View>
              <Avatar
                size={avatarSize}
                style={styles.avatar}
                {...userAccount.image}
              />
            </View>
          }
          notesStore={userNotesStore}
          navigation={navigation}
        />
      </View>
    );
  }
}
