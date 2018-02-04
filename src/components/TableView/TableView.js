import React from 'react';
import PropTypes from 'prop-types';
import './TableView.css'

class TableView extends React.Component {
  static propTypes = {
    tableValues: PropTypes.arrayOf(
      PropTypes.shape({
        ticker: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        timeStamp: PropTypes.number.isRequired,
        priceChange: PropTypes.number
      }),
    ).isRequired,
  };
  getTimeString(timeStamp) {
    const nowDate = new Date();
    const diff = nowDate.getTime() - timeStamp;
    return (diff < 60*1000) ? 'A few seconds ago' :
      `${nowDate.getDate()}  / ${nowDate.getMonth()} / ${nowDate.getFullYear()}  ${nowDate.getHours()} : ${nowDate.getMinutes()} : ${nowDate.getSeconds()}`
    }
  getBg(priceChange) {
    switch (priceChange) {
      case -1:
        return 'red';
      case 0:
        return 'white'
      case 1:
        return 'green'
      default:
        return 'white'
    }
  }
  render() {
    const { tableValues = [] } = this.props;
   return (
      <table>
        <tr>
          <th>Ticker</th>
          <th>Price</th>
          <th>Last Updated</th>
        </tr>
        {tableValues.map((elem, ind) => {
          const { ticker, price, timeStamp, priceChange} = elem;
          return (
            <tr key={ind}>
              <td>{ticker}</td>
              <td style={{backgroundColor: this.getBg(priceChange)}}>
                <div>
                  {price}
                </div>
              </td>
              <td>{this.getTimeString(timeStamp)}</td>
            </tr>
          )
        })}
      </table>
    );
  }
}

export default TableView;