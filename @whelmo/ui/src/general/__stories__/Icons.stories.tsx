// import { withInfo } from '@storybook/addon-info';
import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { View } from 'react-native';
import colors from '../../theme/colors';
import { wInfo } from '../../utils/stories';
import Icon from '../Icon';

storiesOf('Icons', module)
  .addDecorator(story => <View>{story()}</View>)
  .add(
    'Icon',
    wInfo(`
    ### Description
    Here is a list of all the currently used icons.
    `)(() => {
      return (
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ padding: 10 }}>
            <Icon name="ios-close-circle-outline" color={colors.error} />
          </View>
          <View style={{ padding: 10 }}>
            <Icon name="ios-lock-outline" color={colors.primary} />
          </View>
          <View style={{ padding: 10 }}>
            <Icon name="md-alert" color={colors.primary} />
          </View>
          <View style={{ padding: 10 }}>
            <Icon name="md-heart" color={colors.like} />
          </View>
        </View>
      );
    }),
  );
