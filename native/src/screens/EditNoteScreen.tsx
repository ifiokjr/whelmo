import { inject, observer } from 'mobx-react/native';
import { Button } from 'native-base';
import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import {
  RichTextEditor,
  RichTextToolbar,
} from 'react-native-zss-rich-text-editor';
import { NavigationInjectedProps } from 'react-navigation';
import { Text } from '../components';
import {
  EditNoteParams,
  GenericInjectedNavigationProp,
  IExtras,
  INoteStore,
  NoteStatus,
} from '../types';
import { responsiveHeight } from '../utils';

const styles = StyleSheet.create({
  container: {},
  textEditorContainer: {
    paddingTop: 20,
    height: responsiveHeight(60),
    width: '100%',
  },
});

interface EditNoteScreenProps
  extends GenericInjectedNavigationProp<EditNoteParams> {
  extras: IExtras;
}

interface EditNoteScreenState {
  noteStore: INoteStore;
  editorInitialized: boolean;
}

@inject('extras')
@observer
class EditNoteScreen extends Component<
  EditNoteScreenProps,
  EditNoteScreenState
> {
  public static navigationOptions = {
    title: 'Add Note',
  };

  constructor(props: EditNoteScreenProps) {
    super(props);
    const { extras, navigation } = this.props;
    const note = navigation.getParam('note');
    const noteStore: INoteStore = note
      ? extras.editNote(note)
      : extras.createNote();
    this.state = {
      noteStore,
      editorInitialized: false,
    };
  }
  private editorRef = React.createRef<RichTextEditor>();

  private getEditor = () => this.editorRef.current;

  public onEditorInitialized = () => {
    this.setState({ editorInitialized: true });
  };

  private save = async (publish?: boolean) => {
    const { current: editor } = this.editorRef;
    const { noteStore } = this.state;
    if (editor && noteStore && noteStore.note) {
      const message = await editor.getContentHtml();
      const title = await editor.getTitleText();
      const status = publish ? { status: 'published' as NoteStatus } : {};
      await noteStore.updateNote({ message, title, ...status });
    }
  };

  private saveNote = async () => {
    await this.save();
  };

  private publishNote = async () => {
    await this.save(true);
  };

  public render() {
    const { noteStore } = this.state;
    const { loading, note } = noteStore;
    const editor = !loading ? (
      <React.Fragment>
        <RichTextEditor
          ref={this.editorRef}
          titlePlaceholder="New note"
          initialTitleHTML={note.title}
          initialContentHTML={note.message}
          editorInitializedCallback={this.onEditorInitialized}
        />
        <RichTextToolbar getEditor={this.getEditor} />
      </React.Fragment>
    ) : (
      <ActivityIndicator size="large" />
    );
    return (
      <View style={styles.container}>
        <Button primary={true} onPress={this.saveNote}>
          <Text>Save</Text>
        </Button>
        <Button success={true} onPress={this.publishNote}>
          <Text>Publish</Text>
        </Button>
        <View style={styles.textEditorContainer}>{editor}</View>
      </View>
    );
  }
}

export default EditNoteScreen;
