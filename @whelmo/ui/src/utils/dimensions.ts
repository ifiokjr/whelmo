import { Dimensions } from 'react-native';
import { BASE_DESIGN_HEIGHT, BASE_DESIGN_WIDTH } from '../constants';

const { height, width } = Dimensions.get('screen');

/**
 * Generates a responsive height in pixels from provided percentage.
 *
 * @param {Number} percent - percentage of device height
 * @return {Number}
 */
export const responsiveHeight = (percent?: number) => {
  if (percent === 100 || !isFinite(percent || NaN) || !percent) {
    return height;
  }
  return Math.round(height * (percent / 100));
};

/**
 * Generates a responsive width in pixels from provided percentage.
 *
 * @param {Number} w - percentage of device width
 * @return {Number}
 */
export const responsiveWidth = (percent?: number) => {
  if (percent === 100 || !Number.isFinite(percent || NaN) || !percent) {
    return width;
  }
  return Math.round(width * (percent / 100));
};

/**
 * @param y - the distance from top
 */
export const distanceFromBottomOfScreenToY = (y: number) => height - y;

/**
 * Converts the pixel unit (e.g. value from design file) to a screen
 * width relative unit.
 *
 * @param unit value passed to be used as base value
 */
export function relativeWidth(unit: number, rounding: boolean = true) {
  const value = unit / BASE_DESIGN_WIDTH * width;
  return rounding ? Math.round(value) : value;
}

/**
 * For greater control of sizing, scales the base design implementation to a desired factor.
 *
 * Very useful in creating consistent fontSizes.
 *
 * @param unit value passed to be used as base value
 */
export function scaleWidth(size: number, factor: number = 0.5) {
  if (!isFinite(factor)) {
    return relativeWidth(size);
  }
  return Math.round(size + (relativeWidth(size, false) - size) * factor);
}

/**
 * Converts the pixel unit (e.g. value from design file) to a screen
 * height relative unit.
 *
 * @param unit value passed to be used as base value
 */
export function relativeHeight(unit: number) {
  const value = unit / BASE_DESIGN_HEIGHT * height;
  return Math.round(value);
}

/**
 * Converts the pixel unit (e.g. value from design file) to a screen
 * diagonal relative unit.
 *
 * @param unit value passed to be used as base value
 */
export function relativeDiagonal(unit: number, rounding: boolean = true) {
  const defaultHypotenuse = Math.sqrt(
    BASE_DESIGN_HEIGHT ** 2 + BASE_DESIGN_WIDTH ** 2,
  );
  const deviceHypotenuse = Math.sqrt(height ** 2 + width ** 2);
  const ratio = deviceHypotenuse / defaultHypotenuse;
  const value = ratio * unit;
  return rounding ? Math.round(value) : value;
}

/**
 * For greater control of sizing, scales the base design implementation to a desired factor.
 *
 * Very useful in creating consistent fontSizes.
 *
 * @param unit value passed to be used as base value
 */
export function scale(unit: number, factor: number = 0.7) {
  if (!isFinite(factor)) {
    return relativeDiagonal(unit);
  }
  return Math.round(unit + (relativeDiagonal(unit, false) - unit) * factor);
}
