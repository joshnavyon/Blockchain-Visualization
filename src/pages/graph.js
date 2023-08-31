import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function D3LinkedNodes() {
  const svgRef = useRef(null);
  let containerWidth = null;
  let containerHeight = null;
  let currentNode = null;

  useEffect(() => {
    if (svgRef.current) {
      containerWidth = svgRef.current.getBoundingClientRect().width;
      containerHeight = svgRef.current.getBoundingClientRect().height;
    }
    const svg = d3.select(svgRef.current).append('svg')
    .attr('width', containerWidth)
    .attr('height', containerHeight);

    // Define node data
    const nodes = [
      { id: "A", x: containerWidth/2, y: containerHeight/2, size: 30 },
      { id: "B", x: containerWidth/2 - 50, y: containerHeight/2 + 50, size: 30},
      { id: "C", x: containerWidth/2 + 50, y: containerHeight/2 + 50, size: 30 },
      { id: "D", x: containerWidth/2 - 50, y: containerHeight/2 - 50, size: 30 },
      { id: "E", x: containerWidth/2 + 50, y: containerHeight/2 - 50, size: 30 },
    ];

    let currentNode = "A";

    // Define link data (connections between nodes)
    const links = [
      { source: "B", target: currentNode },
      { source: "C", target: currentNode},
      { source: "D", target: currentNode },
      { source: "E", target: currentNode },
    ];
    const simulation = d3.forceSimulation(nodes)
    .force('charge', d3.forceManyBody().strength(-200)) // Repulsion force between nodes
    .force('link', d3.forceLink(links).id(d => d.id).distance(200)) // Attraction along links
    .force("x", d3.forceX().strength(0.0))
    .force("y", d3.forceY().strength(0.0));

    // Create links
    const link = svg.append("g")
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .selectAll("line")
    .data(links)
    .join("line")
    .attr("stroke-width", d => Math.sqrt(d.value));

    // Create nodes
    const node = svg
    .attr("stroke", "#fff")
    .attr("stroke-width", 1)
    .selectAll("circle")
    .data(nodes)
    .join("circle")
    .attr("r", (d) => (d.id === currentNode ? d.size * 1.3 : d.size))
    .attr("fill", (d) => (d.id === currentNode ? "blue" : "purple"))
    .attr("cx", (d) => d.x)
    .attr("cy", (d) => d.y)
    .call(
      d3
      .drag()
      .subject(function (d) {
        return d;
      })
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended)
      );
      
    simulation.on("tick", () => {
      link
          .attr("x1", d => d.source.x)
          .attr("y1", d => d.source.y)
          .attr("x2", d => d.target.x)
          .attr("y2", d => d.target.y);
  
      node
          .attr("cx", d => d.x)
          .attr("cy", d => d.y);
    });

    // Define the dragstarted, dragged, and dragended functions
    function dragstarted(event, d) {
      if (!event.active) 
        simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) 
        simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    node.on("click", (event, d) => {
      currentNode = d.id; // Update the currently selected node
    
      // Update the circle sizes based on the new currentNodeId
      node.attr("r", (nodeData) => (nodeData.id === currentNode ? nodeData.size * 2 : nodeData.size));
    
      // Center the selected node
      node.attr("cx", (nodeData) => (nodeData.id === currentNode ? containerWidth / 2 : nodeData.x));
      node.attr("cy", (nodeData) => (nodeData.id === currentNode ? containerHeight / 2 : nodeData.y));


      const updatedLinks = nodes.map((node) => {
        if (node.id !== currentNode) {
          return { source: node.id, target: currentNode };
        }
        return null; // currentNode should not target itself
      }).filter((link) => link !== null);
  
      // Redraw links based on updated link data
      const linkElements = svg.selectAll("line").data(updatedLinks);
      linkElements.exit().remove();
      linkElements
        .enter()
        .append("line")
        .attr("stroke", "#ccc")
        .attr("stroke-opacity", 0.6)
        .attr("x1", (link) => link.source.x)
        .attr("y1", (link) => link.source.y)
        .attr("x2", (link) => link.target.x)
        .attr("y2", (link) => link.target.y);
    });
    
  }, [currentNode]);
  
  return (
      <svg width="100%" height="100%" ref={svgRef}>
        {/* SVG content */}
      </svg>
  );
}

export default D3LinkedNodes;
