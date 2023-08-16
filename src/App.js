import './App.css';

import { useState, useRef, useEffect } from 'react';
import { ForceDirectedGraph } from './componentss/forceDirectedGraph';

import data from './data/data.json'

function App() {
  
 
 
   

  const [strength, setStrength] = useState({ strength: Math.random() * 60 - 30});
  
  return (
   
    
        <ForceDirectedGraph
          data={data}
          height={300}
          width={300}
          animation
          strength={strength}
        />
  )
}

export default App;