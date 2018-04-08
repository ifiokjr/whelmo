import { withInfo, WrapStoryProps } from '@storybook/addon-info';
import * as React from 'react';
import colors from '../theme/colors';

const wInfoStyle = {
  header: {
    h1: {
      marginRight: '20px',
      fontSize: '25px',
      display: 'inline',
    },
    body: {
      paddingTop: 0,
      paddingBottom: 0,
      // color: colors.fontDark,
      fontFamily: 'Roboto',
    },
    h2: {
      display: 'inline',
      color: colors.fontDark,
    },
  },
  infoBody: {
    fontFamily: 'Roboto',
    backgroundColor: colors.backgroundLight,
    padding: '0px 5px',
    lineHeight: '2',
  },
};
export const wInfo: WithInfo = (text: string) =>
  withInfo({ inline: true, styles: wInfoStyle, text });

export type WithInfo = (
  text: string,
) => (
  storyFn: () =>
    | React.ComponentClass<{}>
    | React.StatelessComponent<{}>
    | JSX.Element
    | Array<
        React.ComponentClass<{}> | React.StatelessComponent<{}> | JSX.Element
      >,
) => () => React.ReactElement<WrapStoryProps>;
