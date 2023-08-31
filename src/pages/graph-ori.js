import React, { useEffect, useRef } from "react";
import * as d3 from "d3";

function D3LinkedNodes() {
  const svgRef = useRef(null);


  useEffect(() => {
    const width = 800;
    const height = 800;

    const svg = d3.select(svgRef).append("svg")
    .attr("width", width)  // Set the width of the SVG
    .attr("height", height); // Set the height of the SVG

    // Define node data
    const nodes = [
      { id: "A", x: width/2, y: height/2 },
      { id: "B", x: width/2, y: height/2 },
      { id: "C", x:width/2, y: height/2 },
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
    .attr("r", (d)=>3+d.count)
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
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }



    // Function to handle drag start
    function handleDragStart(event, d) {
      // You can perform actions when dragging starts, if needed
    }

    // Function to handle drag end
    function handleDragEnd(event, d) {
      // You can perform actions when dragging ends, if needed
    }

    // Function to handle drag
    function handleDrag(event, d) {
      // Update the node's position based on mouse drag
      d.x = event.x;
      d.y = event.y;
      d3.select(this).attr("cx", d.x).attr("cy", d.y);

      // Update link positions
      linkElements
        .attr("x1", (link) => nodes.find((node) => node.id === link.source).x)
        .attr("y1", (link) => nodes.find((node) => node.id === link.source).y)
        .attr("x2", (link) => nodes.find((node) => node.id === link.target).x)
        .attr("y2", (link) => nodes.find((node) => node.id === link.target).y);
    }



      

    // You can add more attributes and styles as needed
  }, []); // Run this effect once on component mount

  return (
    <div id="svg-container" ref={svgRef}>
      <svg width="100%" height="100%">
        {/* SVG content */}
      </svg>
    </div>
  );
}

export default D3LinkedNodes;
