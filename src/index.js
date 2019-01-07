import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './common/css/reset.css'
import { Route,BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import Index from './components/Index';
import Login from './components/Login';
import Goods from './components/Goods';
import MyHeader from './common/component/MyHeader';
import Cart from './components/Cart';
import hwApp from './reducers';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore(hwApp);

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <div>
                <MyHeader store={store}></MyHeader>
                <div id="main">
                    <Route exact path="/" component={Index} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/goods" component={Goods} />
                    <Route exact path="/cart" component={Cart} />
                </div>
            </div>
        </BrowserRouter>
    </Provider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
