import React from 'react'

export default function DropDown({changeCurrency}) {
  return (
    <div className="dropdown">
      <a className="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
        Currency
      </a>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
        <li><a onClick={() => changeCurrency('ETH-USD')} className="dropdown-item" href="#">ETH-USD</a></li>
        <li><a onClick={() => changeCurrency('BTC-USD')} className="dropdown-item" href="#">BTC-USD</a></li>
        <li><a onClick={() => changeCurrency('LTC-USD')} className="dropdown-item" href="#">LTC-USD</a></li>
        <li><a onClick={() => changeCurrency('BCH-USD')} className="dropdown-item" href="#">BCH-USD</a></li>
      </ul>
    </div>
  )
}
