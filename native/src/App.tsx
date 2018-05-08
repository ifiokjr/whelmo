import { configure } from 'mobx';
import { Provider } from 'mobx-react/native';
import { StyleProvider } from 'native-base';
import * as React from 'react';
import CodePush from 'react-native-code-push';
import Navigator from './Navigator';
import { firebaseSettings } from './setup';
import rootStore from './stores';
import getTheme from './theme/components';
import variables from './theme/variables/commonColor';
import { noop } from './utils';

configure({ enforceActions: 'strict' });

@CodePush()
export default class App extends React.Component {
  constructor(props: {}) {
    super(props);
    rootStore.authStore.listenForAuthChanges();
    this.setup().catch(noop);
  }

  private async setup() {
    try {
      await firebaseSettings();
    } catch (e) {}
  }

  public componentWillUnmount() {
    rootStore.authStore.stopListeningForAuthChanges();
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
