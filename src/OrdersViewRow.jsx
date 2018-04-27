import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class OrdersViewRow extends PureComponent {
  render() {
    return (
      <tr>
        <td>
          <button 
            type="button" 
            onClick={this.props.onView}
          >
            View
          </button>
        </td>
        <td>Remove this td and I will work!</td>
      </tr>
    );
  }
}

OrdersViewRow.propTypes = {
  onView: PropTypes.func.isRequired
};

OrdersViewRow.defaultProps = {
};

export default OrdersViewRow;
