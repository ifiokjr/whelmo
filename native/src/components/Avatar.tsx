import React, { PureComponent } from 'react';
import { ImageProperties } from 'react-native';
import { Omit } from '../types';
import SmartImage from './SmartImage';

interface AvatarProps extends Omit<ImageProperties, 'source'> {
  url: string;
  size?: number;
}

export default class Avatar extends PureComponent<AvatarProps> {
  public static defaultProps = {
    size: 50,
  };

  public render() {
    const { url, style, size = Avatar.defaultProps.size } = this.props;
    const computedStyle = {
      height: size,
      width: size,
      borderRadius: size / 2,
    };
    return (
      <SmartImage
        style={[style, computedStyle]}
        showSpinner={false}
        url={url}
      />
    );
  }
}
