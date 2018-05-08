import { isIOS } from '../../utils';
import { Dimensions } from 'react-native';

const deviceHeight = Dimensions.get('window').height;
export default () => {
  const theme = {
    flex: 1,
    height: isIOS ? deviceHeight : deviceHeight - 20,
  };

  return theme;
};
