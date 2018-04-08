import { isAndroid } from '../utils/checks';
import colors from './colors';

export const fontFamily = 'Roboto';

const color = colors.fontDark;

export enum FontWeights {
  thin = '100',
  extraLight = '200',
  light = '300',
  regular = '400',
  medium = '500',
  semiBold = '600',
  bold = '700',
  extraBold = '800',
  black = '900',
}

export type FontWeightType = keyof typeof FontWeights;

export const fontConfig = {
  thin: {
    weight: FontWeights.thin,
    name: isAndroid ? `${fontFamily}-Thin` : fontFamily,
  },
  extraLight: {
    weight: FontWeights.extraLight,
    name: isAndroid ? `${fontFamily}-ExtraLight` : fontFamily,
  },
  light: {
    weight: FontWeights.light,
    name: isAndroid ? `${fontFamily}-Light` : fontFamily,
  },
  regular: {
    weight: FontWeights.regular,
    name: isAndroid ? `${fontFamily}-Regular` : fontFamily,
  },
  medium: {
    weight: FontWeights.medium,
    name: isAndroid ? `${fontFamily}-Medium` : fontFamily,
  },
  semiBold: {
    weight: FontWeights.semiBold,
    name: isAndroid ? `${fontFamily}-SemiBold` : fontFamily,
  },
  bold: {
    weight: FontWeights.bold,
    name: isAndroid ? `${fontFamily}-Bold` : fontFamily,
  },
  extraBold: {
    weight: FontWeights.extraBold,
    name: isAndroid ? `${fontFamily}-ExtraBold` : fontFamily,
  },
  black: {
    weight: FontWeights.black,
    name: isAndroid ? `${fontFamily}-Black` : fontFamily,
  },
};

export const fonts = {
  thin: {
    color,
    fontFamily: fontConfig.thin.name,
    fontWeight: fontConfig.thin.weight,
  },
  extraLight: {
    color,
    fontFamily: fontConfig.extraLight.name,
    fontWeight: fontConfig.extraLight.weight,
  },
  light: {
    color,
    fontFamily: fontConfig.light.name,
    fontWeight: fontConfig.light.weight,
  },
  regular: {
    color,
    fontFamily: fontConfig.regular.name,
    fontWeight: fontConfig.regular.weight,
  },
  medium: {
    color,
    fontFamily: fontConfig.medium.name,
    fontWeight: fontConfig.medium.weight,
  },
  semiBold: {
    color,
    fontFamily: fontConfig.semiBold.name,
    fontWeight: fontConfig.semiBold.weight,
  },
  bold: {
    color,
    fontFamily: fontConfig.bold.name,
    fontWeight: fontConfig.bold.weight,
  },
  extraBold: {
    color,
    fontFamily: fontConfig.extraBold.name,
    fontWeight: fontConfig.extraBold.weight,
  },
  black: {
    color,
    fontFamily: fontConfig.black.name,
    fontWeight: fontConfig.black.weight,
  },
};
