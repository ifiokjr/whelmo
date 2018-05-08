import { observer } from 'mobx-react/native';
import React, { Component } from 'react';
import {
  FlatList,
  FlatListProperties,
  ListRenderItem,
  SafeAreaView,
  ScrollViewProperties,
  StyleSheet,
  View,
} from 'react-native';
import { BallIndicator } from 'react-native-indicators';
import { NavigationInjectedProps } from 'react-navigation';
import { NotesStore } from '../stores';
import { Theme } from '../theme/components';
import FirstNote from './FirstNote';
import Note from './Note';

import { INotePopulated } from '../types';

interface NotesProps extends NavigationInjectedProps {
  notesStore: NotesStore;
  onScroll?: ScrollViewProperties['onScroll'];
  bounce?: boolean;
  ListHeaderComponent: FlatListProperties<
    INotePopulated
  >['ListHeaderComponent'];
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  note: {
    paddingHorizontal: Theme.spacing.small,
  },
});

@observer
class Notes extends Component<NotesProps> {
  public keyExtractor = (item: INotePopulated): string => {
    return item.id;
  };

  public loadMore = () => {
    this.props.notesStore.loadNotes();
  };

  public renderItem: ListRenderItem<INotePopulated> = ({ item: note }) => {
    const { navigation, notesStore } = this.props;
    return (
      <View style={styles.note}>
        <Note
          navigation={navigation}
          notesStore={notesStore}
          note={note}
          userAccount={note.user}
        />
      </View>
    );
  };

  public render() {
    const {
      onScroll,
      notesStore,
      navigation,
      ListHeaderComponent,
      ...props
    } = this.props;
    const { notes, loading } = notesStore;
    return (
      <SafeAreaView style={styles.list}>
        <FlatList
          showsVerticalScrollIndicator={true}
          data={notes}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          onEndReachedThreshold={0.5}
          onEndReached={this.loadMore}
          ListEmptyComponent={
            <View style={styles.note}>
              {loading ? <BallIndicator /> : <FirstNote {...{ navigation }} />}
            </View>
          }
          onScroll={onScroll}
          ListHeaderComponent={ListHeaderComponent}
          {...props}
        />
      </SafeAreaView>
    );
  }
}

export default Notes;
