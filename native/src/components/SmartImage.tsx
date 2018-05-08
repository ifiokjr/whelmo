import { pickBy, transform } from 'lodash';
import * as React from 'react';
import {
  Animated,
  Image as RNImage,
  ImageProperties,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import { Omit } from '../types';
import { downloadAndCacheImage } from '../utils';

interface SmartImageProps extends Omit<ImageProperties, 'source'> {
  preview?: string;
  url: string;
  showSpinner?: boolean;
}

interface SmartImageState {
  url?: string;
  intensity: Animated.Value;
}

export default class SmartImage extends React.Component<
  SmartImageProps,
  SmartImageState
> {
  public state = {
    url: undefined,
    intensity: new Animated.Value(100),
  };

  public async load({ url }: SmartImageProps): Promise<void> {
    if (url) {
      const path = await downloadAndCacheImage(url);
      if (path) {
        this.setState({ url: path });
      }
    }
  }

  public componentDidMount() {
    this.load(this.props);
  }

  public componentDidUpdate(
    prevProps: SmartImageProps,
    prevState: SmartImageState,
  ) {
    const { preview } = this.props;
    const { url, intensity } = this.state;
    if (this.props.url !== prevProps.url) {
      this.load(this.props);
    } else if (
      url &&
      preview &&
      url !== preview &&
      prevState.url === undefined
    ) {
      Animated.timing(intensity, {
        duration: 300,
        toValue: 0,
        useNativeDriver: Platform.OS === 'android',
      }).start();
    }
  }

  public render() {
    const { preview, style, defaultSource, ...otherProps } = this.props;
    const { url, intensity } = this.state;
    const hasPreview = !!preview;
    const hasURI = !!url;
    const isImageReady = url && url !== preview;
    const opacity = intensity.interpolate({
      inputRange: [0, 100],
      outputRange: [0, 0.5],
    });
    const flattenedStyle = StyleSheet.flatten(style);
    const computedStyle = [
      StyleSheet.absoluteFill,
      transform(
        pickBy(
          flattenedStyle,
          (_value, key) => propsToCopy.indexOf(key) !== -1,
        ),
        (result, value, key) => ({
          ...result,
          [key]:
            typeof value === 'number'
              ? value - (flattenedStyle.borderWidth || 0)
              : value,
        }),
      ),
    ];
    return (
      <View {...{ style }}>
        {defaultSource &&
          !hasPreview &&
          !hasURI && (
            <RNImage
              source={defaultSource}
              style={computedStyle}
              {...otherProps}
            />
          )}
        {hasPreview &&
          !isImageReady && (
            <RNImage
              source={{ uri: preview }}
              resizeMode="cover"
              style={computedStyle}
              blurRadius={Platform.OS === 'android' ? 0.5 : 0}
            />
          )}
        {isImageReady && (
          <RNImage
            source={{ uri: url }}
            style={computedStyle}
            {...otherProps}
          />
        )}
        {hasPreview && (
          <Animated.View
            style={[computedStyle, { backgroundColor: black, opacity }]}
          />
        )}
      </View>
    );
  }
}

const black = 'black';
const propsToCopy = [
  'borderRadius',
  'borderBottomLeftRadius',
  'borderBottomRightRadius',
  'borderTopLeftRadius',
  'borderTopRightRadius',
];
