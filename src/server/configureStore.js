import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware, { END } from 'redux-saga';
import { routerMiddleware } from 'connected-react-router/immutable';
import {reducer} from './redux/reducers';

export default function configureStore(initialState = {}, history) {
  const sagaMiddleWare = createSagaMiddleware();
  const middlewares = [
    routerMiddleware(history),
    sagaMiddleWare,
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        shouldHotReload: false,
      })
      : compose;

  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  store.runSaga = sagaMiddleWare.run;
  store.close = () => store.dispatch(END);
//   // Extensions
//   store.injectedReducers = {}; // Reducer registry

//   if (module.hot) {
//     module.hot.accept('./reducers', () => {
//       store.replaceReducer(createRootReducer(store.injectedReducers));
//     });
//   }

  return store;
}