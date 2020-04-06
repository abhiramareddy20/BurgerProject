import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import { Route, Switch } from 'react-router-dom';

import BurgerBuilder from '../src/Containers/BurgerBuilder/BurgerBuilder';
import Checkout from './Containers/Checkout/Checkout';
import Orders from './Containers/Orders/Orders';

class App extends Component {

  state = {
    show: true
  };

  render() {
    return (
      <div>
        <Layout>
          <Switch>
          <Route path ="/checkout" component ={Checkout} />
          <Route path ="/orders" exact component ={Orders} />
          <Route path ="/" exact component ={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
