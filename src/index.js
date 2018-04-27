import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';

import { hot } from 'react-hot-loader';
import OrdersView from './OrdersView';

const renderApp = () => 
  render(
    <OrdersView />,
    document.getElementById('app_root')
  );

renderApp();

export default hot(module)(renderApp);
