/* tslint:disable:no-var-requires */
import * as React from 'react';
import { IconProps as RNVIconProps } from 'react-native-vector-icons/Icon';
import { isReactNative } from '../utils/checks';

// This project uses ionicons

export interface IconProps extends RNVIconProps {
  /**
   * This is information.
   *
   * @default 20
   */
  size?: number;
}

let RNVIcon: React.ComponentClass<IconProps>;

if (!isReactNative) {
  RNVIcon = require('react-native-vector-icons/dist/Ionicons').default;
  const iconFont = require('./Ionicons.ttf');
  const iconFontStyles = `@font-face {
    src: url(${iconFont});
    font-family: Ionicons;
  }`;
  const style = document.createElement('style');
  style.id = 'does-this-work';
  style.type = 'text/css';
  style.appendChild(document.createTextNode(iconFontStyles));

  // Inject stylesheet
  document.head.appendChild(style);
} else {
  RNVIcon = require('react-native-vector-icons/Ionicons').default;
}

class Icon extends React.Component<IconProps> {
  public static defaultProps = {
    size: 30,
  };

  public render() {
    return <RNVIcon {...this.props} />;
  }
}

export default Icon;
