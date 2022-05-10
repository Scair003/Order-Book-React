import React, { useState } from 'react'
import { LineChart, Line, CartesianGrid, XAxis, YAxis } from 'recharts';

export default function Chart({bestBid}) {

    const renderLineChart = (
        <LineChart width={1000} height={500} data={bestBid.slice(bestBid.length - 10, bestBid.length)}>
          <Line type="monotone" dataKey="price" stroke="#8884d8" />
          <Line type="monotone" dataKey="" stroke="#82ca9d" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="name" />
          <YAxis />
        </LineChart>
      );  

  return (
    <div>
        {renderLineChart}
    </div>
  )
}
