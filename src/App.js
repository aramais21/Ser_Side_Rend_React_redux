import {Provider} from 'react-redux';

import store from './redux/store/';
import List from './components/List';

import './App.css';

function App() {
  return (
    <Provider store = {store}>
      <div className='wrapper'>
        <div className='title' >server side rendering done using react and express</div>
        <List />
      </div>
    </Provider>
  );
}

export default App;
