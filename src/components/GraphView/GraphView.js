import React from 'react';
import PropTypes from 'prop-types';
import { BarChart } from 'react-d3-components';

export default class GraphView extends React.Component {
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
    render() {
        const tableValues = [];
        this.props.tableValues.forEach((elem) => {
            const { ticker, price } = elem;
            tableValues.push({
                x: ticker,
                y: price,
            });
          });
        const data = [{
            label: 'Stock App',
            values: tableValues
        }];
        const width = tableValues.length*80;
        return (
            <BarChart
            data={data}
            width={width}
            height={400}
            margin={{top: 10, bottom: 50, left: 50, right: 10}}/>
        );
    }
}
