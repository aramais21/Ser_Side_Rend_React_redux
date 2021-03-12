import 'babel-polyfill';

import historyPkg from 'history';

import {loadOnServer} from 'redux-connect';

import express from 'express';
import Helmet from 'react-helmet';
import {fs} from 'file-system';
import path from 'path';

import mySaga from './sagas.mjs';

import configureStore from './configureStore.js';
import routes from '../routes/routes.js';
import StaticRoutesConfig from '../routes/staticRoutes.js';
import renderReact from './renderReact.js';

const {createMemoryHistory} = historyPkg;

const app = express();

const PORT = process.env.PORT || 3001;

app.use(express.static('./build'));

app.get('*', (req,res) => {
    const url = req.originalUrl || req.url;
    const history = createMemoryHistory({
        initialEntries: [url]
    });
    const helpers = {};
    const indexFile = path.resolve('../build/index.html');

    const store = configureStore({data: []} ,history);
    store.runSaga(mySaga).toPromise().then(() => {
        return loadOnServer({store, location, routes, helpers}).then(() => {
            const context = {};

            if (context.url) {
                req.header('Location', context.url);
                return res.send(302);
            }

            const css = new Set();
            const insertCss = (...styles) => styles.forEach(style => css.add(style._getCss()));
            const dynamicRoutes = [...routes];
            dynamicRoutes[0].routes = [...dynamicRoutes[0].routes, ...StaticRoutesConfig];
            const appContent = renderReact()
            const helmet = Helmet.renderStatic();
            fs.readFile(indexFile, 'urf8', (err, data) => {
                if(err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
                data = data.replace('__STYLES__', [...css].join(''));
                data = data.replace('__LOADER__', '');
                data = data.replace('<div id=app></div>', `<div id=app>${appContent}</div>`);
                data = data.replace('<div id="app"></div>', `<div id="app">${appContent}</div>`);
                data = data.replace('<title></title>', helmet.title.toString());
                data = data.replace('<meta name="description" content=""/>', helmet.meta.toString());
                data = data.replace('<script>__INITIAL_DATA__</script>', `<script>window.__INITIAL_DATA__ = ${JSON.stringify(store.getState())};</script>`);
      
                return res.send(data);
            });
        });
    });
    store.close();
});

app.listen(PORT,() => {
    console.log(`server has started on port ${PORT}`);
})

export default app;