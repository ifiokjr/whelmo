import * as React from 'react';
import { StyleSheet, Text, TextProperties, TextStyle } from 'react-native';
import colors from '../theme/colors';
import { fonts, FontWeightType } from '../theme/fonts';

const LINE_HEIGHT_MULTIPLIER = 1.5;

/**
 * Props used for the base text component.
 *
 * @export
 * @interface BaseTextProps
 */
export interface BaseTextProps extends TextProperties {
  /**
   * Color of the text.
   * @default colors.darkFont
   */
  color?: string;

  /**
   * Determines whether or not text should automatically wrap.
   */
  wrap?: boolean;

  /**
   * Font size.
   * @default 'normal'
   */
  fontSize?: number;

  lineHeight?: number;

  underline?: boolean;

  weight?: FontWeightType;

  /* Styles */
  padding?: TextStyle['padding'];
  paddingHorizontal?: TextStyle['paddingHorizontal'];
  paddingVertical?: TextStyle['paddingVertical'];
  paddingLeft?: TextStyle['paddingLeft'];
  paddingRight?: TextStyle['paddingRight'];
  paddingTop?: TextStyle['paddingTop'];
  paddingBottom?: TextStyle['paddingBottom'];
  textAlign?: TextStyle['textAlign'];
}

const BaseText: React.StatelessComponent<BaseTextProps> = ({
  color = colors.fontDark,
  fontSize = 16,
  weight = 'regular',
  lineHeight = Math.round(LINE_HEIGHT_MULTIPLIER * fontSize),
  underline = false,
  textAlign = 'left',
  style,
  padding,
  paddingHorizontal,
  paddingVertical,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingBottom,
  wrap = false,
  allowFontScaling = false,
  ...props
}) => {
  const mainFontStyle = fonts[weight];
  const extraFontStyles = StyleSheet.create({
    main: {
      padding,
      paddingHorizontal,
      paddingVertical,
      paddingLeft,
      paddingRight,
      paddingTop,
      paddingBottom,
      textAlign,
      color,
      lineHeight,
      fontSize,
      flexWrap: wrap ? 'wrap' : undefined,
      textDecorationLine: underline ? 'underline' : undefined,
    },
  });
  return (
    <Text
      {...props}
      allowFontScaling={allowFontScaling}
      style={[mainFontStyle, extraFontStyles.main, style && style]}
    />
  );
};

export default BaseText;
