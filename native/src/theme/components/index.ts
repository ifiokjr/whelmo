import { forEach } from 'lodash';
import variable from './../variables/platform';
import badgeTheme from './Badge';
import buttonTheme from './Button';
import cardTheme from './Card';
import cardItemTheme from './CardItem';
import checkBoxTheme from './CheckBox';
import containerTheme from './Container';
import contentTheme from './Content';
import fabTheme from './Fab';
import footerTheme from './Footer';
import footerTabTheme from './FooterTab';
import formTheme from './Form';
import h1Theme from './H1';
import h2Theme from './H2';
import h3Theme from './H3';
import headerTheme from './Header';
import iconTheme from './Icon';
import inputTheme from './Input';
import inputGroupTheme from './InputGroup';
import itemTheme from './Item';
import labelTheme from './Label';
import listItemTheme from './ListItem';
import radioTheme from './Radio';
import segmentTheme from './Segment';
import separatorTheme from './Separator';
import spinnerTheme from './Spinner';
import tabTheme from './Tab';
import tabBarTheme from './TabBar';
import tabContainerTheme from './TabContainer';
import tabHeadingTheme from './TabHeading';
import textTheme from './Text';
import textAreaTheme from './Textarea';
import titleTheme from './Title';
import toastTheme from './Toast';
import viewTheme from './View';
export { Theme } from './Theme';

export default (variables = variable) => {
  const theme = {
    variables,
    'NativeBase.Left': {
      flex: 1,
      alignSelf: 'center',
      alignItems: 'flex-start',
    },
    'NativeBase.Right': {
      'NativeBase.Button': {
        alignSelf: null,
      },
      flex: 1,
      alignSelf: 'center',
      alignItems: 'flex-end',
    },
    'NativeBase.Body': {
      flex: 1,
      alignItems: 'center',
      alignSelf: 'center',
    },

    'NativeBase.Header': {
      ...headerTheme(variables),
    },

    'NativeBase.Button': {
      ...buttonTheme(variables),
    },

    'NativeBase.Title': {
      ...titleTheme(variables),
    },

    'NativeBase.InputGroup': {
      ...inputGroupTheme(variables),
    },

    'NativeBase.Input': {
      ...inputTheme(variables),
    },

    'NativeBase.Badge': {
      ...badgeTheme(variables),
    },

    'NativeBase.CheckBox': {
      ...checkBoxTheme(variables),
    },

    'NativeBase.Radio': {
      ...radioTheme(variables),
    },

    'NativeBase.Card': {
      ...cardTheme(),
    },

    'NativeBase.CardItem': {
      ...cardItemTheme(variables),
      '.cardBody': {
        padding: -5,
        'NativeBase.Text': {
          marginTop: 5,
        },
      },
      flexDirection: 'row',
      alignItems: 'center',
    },

    'NativeBase.CardItem1': {
      ...cardItemTheme(variables),
    },

    'NativeBase.Toast': {
      ...toastTheme(variables),
    },

    'NativeBase.H1': {
      ...h1Theme(variables),
    },
    'NativeBase.H2': {
      ...h2Theme(variables),
    },
    'NativeBase.H3': {
      ...h3Theme(variables),
    },
    'NativeBase.Form': {
      ...formTheme(),
    },

    'NativeBase.Container': {
      ...containerTheme(),
    },
    'NativeBase.Content': {
      ...contentTheme(variables),
    },

    'NativeBase.Footer': {
      ...footerTheme(variables),
    },
    'NativeBase.FooterTab': {
      ...footerTabTheme(variables),
    },

    'NativeBase.ListItem': {
      ...listItemTheme(variables),
      'NativeBase.CheckBox': {
        marginLeft: -10,
        marginRight: 10,
      },
      'NativeBase.Text': {
        '.note': {
          color: variables.listNoteColor,
          fontWeight: '200',
        },
        alignSelf: 'center',
      },
    },

    'NativeBase.ListItem1': {
      ...listItemTheme(variables),
    },

    'NativeBase.Icon': {
      ...iconTheme(variables),
    },
    'NativeBase.IconNB': {
      ...iconTheme(variables),
    },
    'NativeBase.Text': {
      ...textTheme(variables),
    },
    'NativeBase.Spinner': {
      ...spinnerTheme(variables),
    },

    'NativeBase.Fab': {
      ...fabTheme(variables),
    },

    'NativeBase.Item': {
      ...itemTheme(variables),
    },

    'NativeBase.Label': {
      ...labelTheme(variables),
    },

    'NativeBase.Textarea': {
      ...textAreaTheme(variables),
    },

    'NativeBase.PickerNB': {
      'NativeBase.Button': {
        'NativeBase.Text': {},
      },
    },

    'NativeBase.Tab': {
      ...tabTheme(variables),
    },

    'NativeBase.Segment': {
      ...segmentTheme(variables),
    },

    'NativeBase.STabs': {
      flex: 1,
    },

    'NativeBase.TabBar': {
      ...tabBarTheme(variables),
    },
    'NativeBase.ViewNB': {
      ...viewTheme(variables),
    },
    'NativeBase.TabHeading': {
      ...tabHeadingTheme(variables),
    },
    'NativeBase.TabContainer': {
      ...tabContainerTheme(variables),
    },
    'NativeBase.Switch': {
      marginVertical: -5,
    },
    'NativeBase.Separator': {
      ...separatorTheme(variables),
    },
    'NativeBase.Tabs': {},
    'NativeBase.Thumbnail': {
      '.square': {
        borderRadius: 0,
      },
      '.small': {
        width: 36,
        height: 36,
        borderRadius: 18,
      },
      '.large': {
        width: 80,
        height: 80,
        borderRadius: 40,
      },
      width: 56,
      height: 56,
      borderRadius: 28,
    },
  };

  // tslint:disable:no-any
  const cssifyTheme = (grandparent: any, parent: any, parentKey: string) => {
    // tslint:disable-next-line:no-any
    forEach(parent, (style: any, styleName: string) => {
      // console.log('styleName', styleName);
      // console.log('parentKey', parentKey);
      if (
        styleName.indexOf('.') === 0 &&
        parentKey &&
        parentKey.indexOf('.') === 0
      ) {
        if (grandparent) {
          if (!grandparent[styleName]) {
            grandparent[styleName] = {};
          } else {
            grandparent[styleName][parentKey] = style;
          }
        }
      }
      if (style && typeof style === 'object') {
        cssifyTheme(parent, style, styleName);
      }
    });
  };

  cssifyTheme(null, theme, '');

  return theme;
};
