import * as React from 'react';
import { StyleSheet, View, ViewProperties, ViewStyle } from 'react-native';
import colors from '../theme/colors';

export interface CardProps extends ViewProperties {
  backgroundColor?: string;
  height?: ViewStyle['height'];
  width?: ViewStyle['width'];
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 4,
    borderColor: colors.borderCard,
    borderWidth: 1,
    // padding: 10,
    elevation: 10,
  },
});

class Card extends React.Component<CardProps> {
  public static defaultProps = {
    height: 110,
    width: 300,
    backgroundColor: colors.white,
  };

  public render() {
    const { width, height, backgroundColor, style, ...props } = this.props;
    const containerStyles = [
      styles.container,
      // style,
      { width, height, backgroundColor },
    ];

    return <View style={containerStyles} {...props} />;
  }
}

export default Card;
