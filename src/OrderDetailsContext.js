import React, { PureComponent } from 'react';

const defaultValue = {
  orderDetails: null,
  isFetching: false,
  getOrderDetails: (v) => { }
};

const OrderDetailsContext = React.createContext(defaultValue);

function withProvider(WrappedComponent) {
  class OrderDetailsProviderWrapper extends PureComponent {
    constructor(props) {
      super(props);
      this.state = { 
        ...defaultValue, 
        getOrderDetails: this.getOrderDetails 
      };
    }

    getOrderDetails = async () => {
      this.setState({ 
        orderDetails: null,
        isFetching: true 
      });
      
      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState({ isFetching: false });

      await new Promise(resolve => setTimeout(resolve, 1000));

      this.setState({
        orderDetails: { id: Math.floor(Math.random() * 10000) }
      });
    };

    render() {
      console.log('+++ OrderDetailsContext.render', this.state);
      return (
        <OrderDetailsContext.Provider value={this.state}>
          <WrappedComponent {...this.props} />
        </OrderDetailsContext.Provider>
      );
    }
  }

  return OrderDetailsProviderWrapper;
}

function withContext(WrappedComponent) {
  return function WithContextWrapper(props) {
    return (
      <OrderDetailsContext.Consumer>
        {(contextValue = {}) => (
          <WrappedComponent {...props} {...contextValue} />
        )}
      </OrderDetailsContext.Consumer>
    );
  };
}

export default {
  withProvider,
  withContext
};
