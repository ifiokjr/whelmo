// import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { View } from 'react-native';
import colors from '../../theme/colors';
// import colors from '../../theme/colors';
import { wInfo } from '../../utils/stories';
import Card from '../Card';
import CardHeader from '../CardHeader';
import Label from '../Label';

storiesOf('Cards', module)
  .addDecorator(story => <View>{story()}</View>)
  .add(
    'Card',
    wInfo(`
    ### Description
    Here is a list of all the cards being used.
    `)(() => {
      return (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            backgroundColor: colors.backgroundStories,
          }}
        >
          <View style={{ padding: 10 }}>
            <Card />
          </View>
          <View style={{ padding: 10 }} />
          <View style={{ padding: 10 }} />
          <View style={{ padding: 10 }} />
        </View>
      );
    }),
  )
  .add('LoginCard', () => (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        alignItems: 'center',
        paddingVertical: 20,
        // flexDirection: 'row',
        height: 500,
        backgroundColor: colors.backgroundStories,
      }}
    >
      <Card height={400} width={320}>
        <CardHeader title="Login" />
        <View style={{ padding: 30, height: '100%' }}>
          <View>
            <Label title="Email ID" />
          </View>
        </View>
      </Card>
    </View>
  ));
