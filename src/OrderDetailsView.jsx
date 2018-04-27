import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import OrderDetailsContext from './OrderDetailsContext';

class OrderDetailsView extends PureComponent {
  componentDidMount() {
    this.props.getOrderDetails(this.props.order.id);
  }

  render() {
    const { isFetching, orderDetails } = this.props;
    console.log('??? OrderDetailsView.render', isFetching, orderDetails);

    return (
      <div>
        {Math.random()} & {`Order id = ${(orderDetails || {}).id}`}
        <div>
          {isFetching 
            ? 'Loading...'
            : <button type="button" onClick={this.props.close}>Close</button>
          }
        </div>
      </div>
    );
  }
}

OrderDetailsView.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  orderDetails: PropTypes.object,
  getOrderDetails: PropTypes.func.isRequired,
  close: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired
};

OrderDetailsView.defaultProps = {
  orderDetails: null
};

export default OrderDetailsContext.withContext(
  OrderDetailsView
);
