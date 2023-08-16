import React, { useState, useEffect } from 'react';
import { XYPlot, MarkSeriesCanvas, LineSeriesCanvas } from 'react-vis';
import { forceLink, forceSimulation, forceCenter, forceManyBody } from 'd3';
import PropTypes from 'prop-types';
import data from '../data/data.json'
import '../App.css'

let newNodes = data.nodes.map((d, index) => {
  return {
    "id": index,
    "country": d.country,
    "code": d.code
  }
});



const colors = [
  '#19CDD7',
  '#DDB27C',
  '#88572C',
  '#FF991F',
  '#F15C17',
  '#223F9A',
  '#DA70BF',
  '#4DC19C',
  '#12939A',
  '#B7885E',
  '#FFCB99',
  '#F89570',
  '#E79FD5',
  '#89DAC1'
];


function generateSimulation(data, height, width, maxSteps, strength) {
  if (!data) {
    return { nodes: [], links: [] };
  }

  const nodes = newNodes.map(d => ({ ...d }));
  const links = data.links.map(d => ({ ...d }));

  const simulation = forceSimulation(nodes)
    .force('link', forceLink().id(d => d.id))
    .force('charge', forceManyBody().strength(strength))
    .force('center', forceCenter(width / 2, height / 2))
    .stop();

  simulation.force('link').links(links);

  const upperBound = Math.ceil(Math.log(simulation.alphaMin()) / Math.log(1 - simulation.alphaDecay()));
  for (let i = 0; i < Math.min(maxSteps, upperBound); ++i) {
    simulation.tick();
  }

  return { nodes, links };
}


function ForceDirectedGraph(props) {
  const { className, data, height, width, animation } = props;
  const [simulationData, setSimulationData] = useState(generateSimulation(data, height, width, props.maxSteps, 0.1));

  useEffect(() => {
    setSimulationData(generateSimulation(data, height, width, props.maxSteps, 0.1));
  }, [data, height, width, props.maxSteps]);

  const { nodes, links } = simulationData;


  return (
      <div className='graph-container' > 
        <XYPlot width={width} height={height} className={className}>
      {links.map(({ source, target }, index) => (
        <LineSeriesCanvas
          animation={animation}
          color={'#B3AD9E'}
          key={`link-${index}`}
          opacity={0.3}
          data={[{ ...source, color: null }, { ...target, color: null }]}
          style={{top: 0}}
        />
      ))}
      <MarkSeriesCanvas
        data={nodes}
        animation={animation}
        colorType={'category'}
        stroke={'#ddd'}
        strokeWidth={2}
        colorRange={colors}
      />
    </XYPlot>
      </div>
      
  
  
  );
}

ForceDirectedGraph.defaultProps = {
  className: '',
  data: { nodes: [], links: [] },
  maxSteps: 50,
};

ForceDirectedGraph.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  steps: PropTypes.number,
};


export { ForceDirectedGraph };
