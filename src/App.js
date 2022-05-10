import React, { useState, useEffect } from "react";
import Chart from "./components/Chart";
import DropDown from "./components/DropDown";

function App() {

  const [bestBid, setBestBid] = useState([{price: null, size: null}]);
  const [bestAsk, setBestAsk] = useState([{price: null, size: null}]);
  const [currency, setCurrency] = useState('ETH-USD');
    
  useEffect(() => {
    const ws = new WebSocket("wss://ws-feed.exchange.coinbase.com");

    const apiCall = {
      type: "subscribe",
      product_ids: [
          "ETH-USD",
          "BTC-USD",
          "LTC-USD",
          "BCH-USD"
      ],
      channels: ["level2"]
    };
  
    ws.onopen = (event) => {
      ws.send(JSON.stringify(apiCall));
    };
  
    ws.onmessage = function (event) {
      const json = JSON.parse(event.data);

      if(json.type === 'l2update' && json.product_id === currency){
        const changes = json.changes[0][0];
        const newInfo = {price: json.changes[0][1], size: json.changes[0][2]};
        
        if(changes === 'buy'){
          setBestBid(prevState => [...prevState, newInfo]);
        }

        else if(changes === 'sell'){
          setBestAsk(prevState => [...prevState, newInfo]);
        }
      }  
    }   
  }, [currency])

  function changeCurrency(selection) {
    setCurrency(selection);
  }

  return (
    <div>
      <DropDown changeCurrency={changeCurrency} />
      <h1 style={{textAlign: 'center'}}>{currency}</h1>
      <div className="container mb-5">
        <div className="row">
          <div className="col">
            <h3>Best Bid</h3>
            <h6>Bid Price</h6>
            {bestBid[bestBid.length - 1].price}
            <h6>Bid Size</h6>
            {bestBid[bestBid.length - 1].size}
          </div>
          <div className="col">
            <h3>Best Ask</h3>
            <h6>Ask Price</h6>
            {bestAsk[bestAsk.length - 1].price}
            <h6>Ask Size</h6>
            {bestAsk[bestAsk.length - 1].size}
          </div> 
        </div>
      </div>
      <Chart bestBid={bestBid} bestAsk={bestAsk} />
      <div className="container">
        <div className="row">
          <div className="col">
            <span style={{marginRight: '70px'}}><b>Bid</b></span>
            <span><b>Size</b></span>
            {bestBid.slice(bestBid.length - 10, bestBid.length).map(bid => (
              <div><span style={{marginRight: '40px'}}>{bid.price}</span><span>{bid.size}</span></div>
            ))}
          </div>
          <div className="col">
            <span style={{marginRight: '70px'}}><b>Bid</b></span>
            <span><b>Size</b></span>
            {bestAsk.slice(bestAsk.length - 10, bestAsk.length).map(ask => (
              <div><span style={{marginRight: '40px'}}>{ask.price}</span><span>{ask.size}</span></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
