import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import GraphView from './components/GraphView';
import TableView from './components/TableView';

class App extends Component {
  constructor(props) {
    super(props);
    this.visibilityFilters = ["TABLE_VIEW", "GRAPH_VIEW"];
    this.state = {
        visibilityFilter: "TABLE_VIEW",
        tableValues : [],
    };
}

componentDidMount(){
    this.ws = new WebSocket('ws://stocks.mnet.website')
    this.ws.onmessage = e => {this.processStockPrices(e.data)}
    this.ws.onerror = () => {}
    this.ws.onclose = () => {}
}

processStockPrices(dataStr){
    const aoStockObj = [];
    const data = JSON.parse(dataStr);
    data.forEach((elem) => {
      const tempObj = {};
      tempObj.ticker = elem[0];
      tempObj.price = elem[1];
      tempObj.timeStamp = new Date().getTime();
      aoStockObj.push(tempObj);
    });
    this.updateData(aoStockObj);
  }
  /**
   * This method compares incoming stock prices with previous list of stock details
   * If the ticker is already present, find the change in price and update
   * Or Add as a new item to the list
   * and Change the state
   * @param  {} newStockPrices (Processed new list of stock details from server)
   */
  updateData(newStockPrices){ 
    const { tableValues } = this.state;
    newStockPrices.forEach((stock) => {
      const updatedStock = tableValues.find((obj) => obj.ticker === stock.ticker);
      if(updatedStock){               // The ticker item is already present, then update
        updatedStock.priceChange = (updatedStock.price < stock.price) ? -1 : 1;
        updatedStock.price = stock.price;
        updatedStock.timeStamp = stock.timeStamp;
    }else{                          // New item , so add to the list
        tableValues.push(stock);
      }
    });
     this.setState({
      tableValues
    })
  }
changeVisibilityFilter = visibilityFilter => {
    this.setState({ visibilityFilter });
}

render() {
    const{ tableValues, visibilityFilter } = this.state;
    // console.log(tableValues)
    return (
        <div>
            <Header></Header>
            <div>
                {
                    this.visibilityFilters.map(
                        filter =>
                            <button
                                key={filter}
                                onClick={() => this.changeVisibilityFilter(filter)}>
                                    {filter.replace("_", " ")}
                            </button>
                    )
                }
            </div>
            {visibilityFilter === 'TABLE_VIEW' ?
            <TableView tableValues={tableValues} /> :
            <GraphView tableValues={tableValues} />}
        </div>
    );
}
}

export default App;
