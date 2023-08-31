import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function D3LinkedNodes() {
  const svgRef = useRef(null);
  let containerWidth = null;
  let containerHeight = null;

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
      { id: "A", x: 100, y: 100 },
      { id: "B", x: 200, y: 200 },
      { id: "C", x: 300, y: 300 },
    ];
    // Define link data (connections between nodes)
    const links = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "A" },
    ];

    const simulation = d3.forceSimulation(nodes)
  .force('charge', d3.forceManyBody().strength(-200)) // Repulsion force between nodes
  .force('link', d3.forceLink(links).id(d => d.id).distance(50)) // Attraction along links
  .force('center', d3.forceCenter(containerWidth / 2,con / 2)); // Centering force

    const link = svg
    .selectAll("line")
    .data(links)
    .enter()
    .append("line")
    .attr("stroke", "gray")
    .attr("stroke-width", 2)
    .attr("x1", (d) => nodes.find((node) => node.id === d.source).x)
    .attr("y1", (d) => nodes.find((node) => node.id === d.source).y)
    .attr("x2", (d) => nodes.find((node) => node.id === d.target).x)
    .attr("y2", (d) => nodes.find((node) => node.id === d.target).y);

  // Create nodes
  const node = svg
    .selectAll("circle")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("r", 20)
    .attr("fill", "blue")
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
  }, []);
  
  return (
      <svg width="100%" height="100%" ref={svgRef}>
        {/* SVG content */}
      </svg>
  );
}

export default D3LinkedNodes;
