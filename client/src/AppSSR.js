import React from 'react';
import App from './App';

// eslint-disable-next-line react/prop-types
const AppSSR = ({ bootStrapCSS }) => {
  return (
    <html>
      <head>
        <meta charSet="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <base href="/"/>
        <title>SSR React 18 example</title>
        {
          // eslint-disable-next-line react/prop-types
          bootStrapCSS.map(cssPath => <link key={cssPath} rel="stylesheet" href={cssPath}></link>)
        }
      </head>
      <body>
        <div id="root">
          <App/>
        </div>
      </body>
    </html>
  )
}

export default AppSSR;