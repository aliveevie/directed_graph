import React, { useState, useEffect } from 'react';
import { XYPlot, MarkSeriesCanvas, LineSeriesCanvas } from 'react-vis';
import { Graph }  from 'react-d3-graph';

import data from '../data/data.json'


function ForceDirectedGraph() {

  let newNodes = data.nodes.map((d) => {
    return {
      "id": `country: ${d.country}, code: ${d.code}`
    }
  })

  data.nodes = newNodes;
  console.log(data)
  const options = {
    node: {
      label: 'country',
    },
    link: {
      source: 'source',
      target: 'target',
    },
  };


  return (
    <div style={{ width: '100%', height: '600px' }}>
    <Graph data={data} options={options} />
  </div>
  );
}

export { ForceDirectedGraph };
