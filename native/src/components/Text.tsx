import React, { PureComponent } from 'react';
import { Text as RNText, TextProperties } from 'react-native';
import { Theme } from '../theme/components/Theme';

type TextType =
  | 'header1'
  | 'header2'
  | 'header3'
  | 'large'
  | 'regular'
  | 'small'
  | 'micro';

interface TypographyProps extends TextProperties {
  type?: TextType;
  numberOfLines?: number;
  gutterBottom?: boolean;
}

class Text extends PureComponent<TypographyProps> {
  public static defaultProps = {
    type: 'regular',
  };

  public render() {
    const { type = 'regular', style, gutterBottom, ...props } = this.props;
    const isHeader = type.startsWith('header');
    const defaultStyle = [
      Theme.typography[type],
      {
        backgroundColor: 'transparent',
        color: isHeader
          ? 'black'
          : type === 'large'
            ? Theme.palette.lightGray
            : Theme.typography.color,
        // eslint-disable-next-line no-nested-ternary
        marginBottom: gutterBottom
          ? isHeader
            ? Theme.spacing.base
            : Theme.spacing.small
          : 0,
      },
      style ? style : undefined,
    ];
    return <RNText style={defaultStyle} {...props} />;
  }
}

export default Text;
