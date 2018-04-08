import * as React from 'react';
import { View } from 'react-native';
import colors from '../theme/colors';
import BaseText, { BaseTextProps } from './BaseText';

export interface LabelProps extends BaseTextProps {
  title: string;
}

const defaultProps = {
  color: colors.fontSoft,
  fontSize: 14,
};

const Label: React.StatelessComponent<LabelProps> = ({ title, ...props }) => {
  return (
    <View>
      <BaseText {...props}>{title}</BaseText>
    </View>
  );
};

Label.defaultProps = defaultProps;

export default Label;
