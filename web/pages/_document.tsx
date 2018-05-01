import firebase from 'firebase';
import { Context } from 'next';
import Document, { Head, Main, NextScript } from 'next/document';
import React from 'react';
import { AppRegistry } from 'react-native-web';

let index = 0;

// Force Next-generated DOM elements to fill their parent's height.
// Not required for using of react-native-web, but helps normalize
// layout for top-level wrapping elements.
const normalizeNextElements = `
  body > div:first-child,
  #__next {
    height: 100%;
  }
`;

export default class MyDocument extends Document {
  public static async getInitialProps({ renderPage }: Context) {
    AppRegistry.registerComponent('Main', () => Main);
    const { getStyleElement } = AppRegistry.getApplication('Main');
    const page = renderPage();
    const styles = [
      <style
        key={index++}
        dangerouslySetInnerHTML={{ __html: normalizeNextElements }}
      />,
      getStyleElement(),
    ];
    return { ...page, styles };
  }

  public render() {
    return (
      <html style={{ height: '100%', width: '100%' }}>
        <Head>
          <title>react-native-web</title>
        </Head>
        <body style={{ height: '100%', width: '100%', overflowY: 'scroll' }}>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
