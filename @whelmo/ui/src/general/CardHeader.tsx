import * as React from 'react';
import { StyleSheet, View, ViewProperties } from 'react-native';
import colors from '../theme/colors';
import BaseText from './BaseText';
import Icon, { IconProps } from './Icon';

export interface CardHeaderProps extends ViewProperties {
  title: string;

  iconLeft?: IconProps;

  iconRight?: IconProps;
}

const defaultProps = {
  iconLeft: {
    name: 'ios-lock-outline',
    color: colors.primary,
  },
  iconRight: {
    name: 'ios-close-circle-outline',
    color: colors.error,
  },
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    // height: 42,
    flexDirection: 'row',
    flexWrap: 'nowrap',
    paddingTop: 8,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderDivider,
  },
  leftIconWrapper: { marginRight: 10 },
  titleWrapper: {},
  rightIconWrapper: { alignItems: 'flex-end', flex: 1 },
});

const CardHeader: React.SFC<CardHeaderProps> = ({
  title,
  iconLeft = defaultProps.iconLeft,
  iconRight = defaultProps.iconRight,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftIconWrapper}>
        <Icon {...iconLeft} />
      </View>
      <View style={styles.titleWrapper}>
        <BaseText color={colors.primary}>{title}</BaseText>
      </View>
      <View style={styles.rightIconWrapper}>
        <Icon {...iconRight} />
      </View>
    </View>
  );
};

CardHeader.defaultProps = defaultProps;

export default CardHeader;
