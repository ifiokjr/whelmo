declare module 'next' {
  export interface Context {
    pathname: string;
    query: string;
    asPath: string;
    req: {
      locale: string;
      localeDataScript: string;
      messages: object;
      antdLocale: object;
    };
    res?: object;
    renderPage: () => object;
  }
}
