import { isIOS } from '../../utils';

export default () => {
  const pickerTheme = isIOS
    ? {}
    : {
        '.note': {
          color: '#8F8E95',
        },
        width: 90,
        marginRight: -4,
      };

  return pickerTheme;
};
