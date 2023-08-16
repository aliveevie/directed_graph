import './App.css';

import { useState, useRef, useEffect } from 'react';
import { ForceDirectedGraph } from './componentss/forceDirectedGraph';
import { Graph } from 'react-d3-graph';

import data from './data/data.json'

let newNodes = data.nodes.map((d, index) => {
  return {
    "id": index,
    "country": d.country,
    "code": d.code
  }
});

// Assuming data is your input object


// Create a map to easily access country names using node IDs
const idToCountryMap = new Map(newNodes.map(node => [node.id, node.country]));

// Convert the links array to use country names as source and target
const newLinks = data.links.map(link => ({
  source: idToCountryMap.get(link.source),
  target: idToCountryMap.get(link.target)
}));

data.links = newLinks

const newData = data;
console.log(newData)


function App() {
  const [strength, setStrength] = useState({ strength: Math.random() * 60 - 30 });

  return (
    <div className='App' >
      <div className='App-header' >
          <Graph 
          data={newData}
          />
    </div>
    </div>
      
  )
}

export default App;