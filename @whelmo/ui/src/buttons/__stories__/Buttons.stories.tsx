import { storiesOf } from '@storybook/react';
import * as React from 'react';
import { wInfo } from '../../utils/stories';
import BaseButton from '../BaseButton';

const onButtonPressed = () => {
  alert('Button Pressed!');
};
storiesOf('Universal Components', module).add(
  'BaseButton',
  wInfo(`
  ### Notes

  This is a simple button.

  ### Usage
  ~~~ts
  <BaseButton
    onPress={onButtonPressed}
    label="Press Me!"
  />
  ~~~
`)(() => {
    return <BaseButton label="Press Me!" onPress={onButtonPressed} />;
  }),
);
