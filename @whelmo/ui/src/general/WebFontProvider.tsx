import * as FontFaceObserver from 'fontfaceobserver';
import * as React from 'react';

const fonts = () => {
  const link = document.createElement('link');
  link.href =
    'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,900';
  link.rel = 'stylesheet';

  document.head.appendChild(link);

  const roboto = new FontFaceObserver('Roboto');

  roboto.load().then(() => {
    document.documentElement.classList.add('fonts-loaded');
  });
};

/**
 * Taken from https://github.com/zeit/next.js/issues/512#issuecomment-322026199
 *
 * This is useful for next.js deployments to avoid the flash of unstyled content.
 */
class WebFontProvider extends React.Component {
  public componentDidMount() {
    fonts();
  }

  public render() {
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default WebFontProvider;
