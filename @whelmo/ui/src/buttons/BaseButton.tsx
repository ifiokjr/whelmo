// import * as PropTypes from 'prop-types';
import * as React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../theme/colors';
import { fonts } from '../theme/fonts';
// import { relativeHeight, relativeWidth, scale } from '../utils/dimensions';

export interface BaseButtonProps {
  backgroundColor?: string;
  fontColor?: string;
  onPress(): void;
  style?: StyleProp<ViewStyle>;

  label: string;
}

class BaseButton extends React.PureComponent<BaseButtonProps> {
  public render() {
    const { onPress, style, label } = this.props;
    return (
      <TouchableOpacity onPress={onPress}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[colors.primaryLight, colors.primary]}
          style={[styles.container, style]}
        >
          <Text style={styles.text}>{label}</Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }
}

const IPHONE_WIDTH = 320;
const IPHONE_7_HEIGHT = 720;
export const IPHONE_7_AND_UP = `@media (min-device-width: ${IPHONE_WIDTH}) and (min-device-height: ${IPHONE_7_HEIGHT})`;

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    height: 40,
    width: 260,
    justifyContent: 'center',
    padding: 10,
  },
  text: {
    backgroundColor: 'transparent',
    ...fonts.regular,
    fontSize: 14,
    color: colors.white,
    textAlign: 'center',
  },
});

export default BaseButton;
