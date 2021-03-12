const StyleContext = require('isomorphic-style-loader/StyleContext');
const {StaticRouter} = require ('react-router-dom');
const ReactDOMServer = require('react-dom/server');

const {ReduxAsyncConnect} = require ('redux-connect');
const {Provider} = require ('react-redux');

const renderReact = () => ReactDOMServer.renderToString(
    <StyleContext.Provider value={{insertCss}} >
        <Provider store = {store} >
            <StaticRouter location={location} context={context} >
                <ReduxAsyncConnect routes={dynamicRoutes} helpers = {helpers} />
            </StaticRouter>
        </Provider>
    </StyleContext.Provider>
);

module.exports = renderReact;