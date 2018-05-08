import { formatDistance } from 'date-fns';
import React, { Component } from 'react';
import { Dimensions, Platform, StyleSheet, View } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import { NotesStore } from '../stores';
import { Theme } from '../theme/components/Theme';
import { INote, IUserAccount } from '../types';
import Avatar from './Avatar';
import Text from './Text';

interface NoteProps extends NavigationInjectedProps {
  note: INote;
  userAccount: IUserAccount;
  notesStore: NotesStore;
}

interface NoteState {
  note: INote;
  userAccount: IUserAccount;
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.14,
    shadowRadius: 6,
    borderColor: Theme.palette.borderColor,
    borderWidth: Platform.OS === 'ios' ? 0 : 1,
    marginVertical: Theme.spacing.small,
    backgroundColor: 'white',
  },
  content: {
    padding: Theme.spacing.small,
  },
  header: {
    flexDirection: 'row',
    marginBottom: Theme.spacing.small,
  },
  metadata: {
    marginLeft: Theme.spacing.small,
  },
  name: {
    color: 'black',
  },
  text: {
    flexWrap: 'wrap',
  },
  picture: {
    height: width,
    borderRadius: 5,
  },
});

export default class Note extends Component<NoteProps, NoteState> {
  public unsubscribeToPost!: () => void;
  public unsubscribeToProfile!: () => void;

  public static getDerivedStateFromProps({
    userAccount,
    note,
  }: NoteProps): NoteState {
    return { note, userAccount };
  }

  public componentDidMount() {
    const { note, notesStore } = this.props;
    this.unsubscribeToPost = notesStore.subscribeToNote(note.id, newNote =>
      this.setState({ note: newNote }),
    );
    // eslint-disable-next-line max-len
    this.unsubscribeToProfile = notesStore.subscribeToUserAccount(
      note.ownerId,
      newProfile => this.setState({ userAccount: newProfile }),
    );
  }

  public componentWillUnmount() {
    this.unsubscribeToPost();
    this.unsubscribeToProfile();
  }

  public render() {
    const { note, userAccount } = this.state;
    const contentStyle = [styles.content];
    const textStyle = [styles.text];
    return (
      <View style={styles.container}>
        <View style={contentStyle}>
          <View style={styles.header}>
            <Avatar {...userAccount.image} />
            <View style={styles.metadata}>
              <Text style={styles.name}>{userAccount.name}</Text>
              <Text>{formatDistance(Date.now(), note.createdAt)}</Text>
            </View>
          </View>
          <View>
            <Text style={textStyle} gutterBottom={true}>
              {note.message}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
