import React, { PureComponent } from 'react';
import { SafeAreaView, StyleSheet, View, ViewProps } from 'react-native';
import { Theme } from '../theme/components/Theme';

const styles = StyleSheet.create({
  root: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
  },
});

interface ContainerProps extends ViewProps {
  gutter: number;
}

export default class Container extends PureComponent<ContainerProps> {
  public static defaultProps = {
    gutter: 0,
  };

  public render() {
    const { gutter, children, style } = this.props;
    const containerStyle = [
      styles.container,
      { padding: gutter * Theme.spacing.base },
      style ? style : undefined,
    ];
    return (
      <SafeAreaView style={styles.root}>
        <View style={containerStyle}>{children}</View>
      </SafeAreaView>
    );
  }
}
