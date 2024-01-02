import App from "./App";

const AppSSR = ({ bootStrapCSS }) => {
    console.log('Rendering App component on server-side');
    return (
        <html>
        <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <title>SSR React 18 example</title>
            {
                bootStrapCSS.map(cssPath => <link key={cssPath} rel="stylesheet" href={cssPath}></link>)
            }
        </head>
        <body>
        <div id="root">
            <App />
        </div>
        </body>
        </html>
    )
}

export default AppSSR;