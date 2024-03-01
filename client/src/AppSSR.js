import React from 'react';
import App from './App';

// eslint-disable-next-line react/prop-types
const AppSSR = ({ bootStrapCSS }) => {
  return (
    <html>
    <head>
      <meta charSet='utf-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <base href='/' />
      <title>SSR React 18 example</title>
      <link rel='stylesheet' href='../../public/index.css' />
      <link rel='stylesheet'
            href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css'
      />
      {
        // eslint-disable-next-line react/prop-types
        bootStrapCSS.map(cssPath => <link key={cssPath} rel='stylesheet' href={cssPath}></link>)
      }
    </head>
    <body>
    <div id='root'>
      <App />
    </div>
    </body>
    </html>
  );
};

export default AppSSR;