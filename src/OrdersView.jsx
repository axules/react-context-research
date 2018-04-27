import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import OrdersViewRow from './OrdersViewRow';
import OrderDetailsView from './OrderDetailsView';
import OrderDetailsContext from './OrderDetailsContext';

class OrdersView extends PureComponent {
  state = {
    viewDetailsOrder: null
  };

  closeDetails = () => this.setState({ viewDetailsOrder: null });
  openDetails = () => this.setState(
    { viewDetailsOrder: this.props.order }
  );

  render() {
    const { viewDetailsOrder } = this.state;
    const { order } = this.props;
    
    return (
      <div>
        {/* It is working */}
        {/* {!!viewDetailsOrder &&
          <OrderDetailsView 
            order={viewDetailsOrder}
            close={this.closeDetails}
          />
        } */}
      
        <table>
          <tbody>
            <OrdersViewRow 
              key={order.id} 
              order={order}
              onView={this.openDetails}
            />
          </tbody>
        </table>

        {/* It is not working. Move it to the top for good working */}
        {!!viewDetailsOrder &&
          <OrderDetailsView 
            order={viewDetailsOrder}
            close={this.closeDetails}
          />
        }
      </div>
    );
  }
}

OrdersView.propTypes = {
  order: PropTypes.object
};

OrdersView.defaultProps = {
  order: { id: 123123 }
};

export default OrderDetailsContext.withProvider(OrdersView);
