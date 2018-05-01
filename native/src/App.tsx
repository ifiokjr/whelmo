import { configure } from 'mobx';
import { Provider } from 'mobx-react/native';
import { getTheme, StyleProvider, variables } from 'native-base';
import * as React from 'react';
import CodePush from 'react-native-code-push';
import Navigator from './Navigator';
import { firebaseSettings } from './setup';
import rootStore from './stores';
import { noop } from './utils';

configure({ enforceActions: 'strict' });

@CodePush()
export default class App extends React.Component {
  constructor(props: {}) {
    super(props);
    rootStore.userStore.listenForAuthChanges();
    this.setup().catch(noop);
  }

  private async setup() {
    try {
      await firebaseSettings();
    } catch (e) {}
  }

  public componentWillUnmount() {
    rootStore.userStore.stopListeningForAuthChanges();
  }

  public render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider {...rootStore}>
          <Navigator />
        </Provider>
      </StyleProvider>
    );
  }
}
