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
      { id: "A", x: containerWidth/2, y: containerHeight/2 },
      { id: "B", x: containerWidth/2 - 50, y: containerHeight/2 - 50},
      { id: "C", x: containerWidth/2 + 50, y: containerHeight/2 + 50 },
    ];
    // Define link data (connections between nodes)
    const links = [
      { source: "A", target: "B" },
      { source: "B", target: "C" },
      { source: "C", target: "A" },
    ];
    const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody())
    .force("x", d3.forceX().strength(0.05))
    .force("y", d3.forceY().strength(0.08));

    // Create links
    const link = svg.append("g")
      .attr("stroke", "#ccc")
      .attr("stroke-opacity", 0.6)
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
    .attr("r", 20)
    .attr("fill", "red")
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
