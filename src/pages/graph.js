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
    const svg = d3
      .select(svgRef.current)
      .append("svg")
      .attr("width", containerWidth)
      .attr("height", containerHeight);

    function getUniqueFilteredNodes(currentNode, nodes, links) {
      const currentNodeObj = nodes.find((node) => node.id === currentNode);
      // Create an array of node IDs involved in transactions with the current node
      const connectedNodeIds = [
        ...currentNodeObj.transactionsOut, // Add nodes connected through transactionsOut
        ...links.filter((link) => link.target === currentNode).map((link) => link.source), // Add nodes connected through incoming links
      ];
      const filteredNodes = [
        currentNodeObj,
        ...nodes.filter((node) => connectedNodeIds.includes(node.id)),
      ];
      // Ensure unique nodes in the filteredNodes array
      return Array.from(new Set(filteredNodes));
    }

    function getLinksForCurrentNode(currentNode, nodes) {
      // Find the current node in the nodes array
      const currentNodeObj = nodes.find((node) => node.id === currentNode);

      if (!currentNodeObj) {
        // If the current node is not found, return an empty array
        return [];
      }

      // Extract transactionsOut from the current node
      const transactionsOut = currentNodeObj.transactionsOut;

      // Generate links based on transactionsOut
      const links = transactionsOut.map((targetNodeId) => ({
        source: targetNodeId,
        target: currentNode,
      }));

      return links;
    }

    // Define node data
    const nodes = [
      {
        id: "A",
        size: 25,
        transactionsIn: [],
        transactionsOut: ["B", "C", "D", "E"],
      },
      {
        id: "B",
        size: 25,
        transactionsIn: [],
        transactionsOut: ["A", "C"],
      },
      {
        id: "C",
        size: 25,
        transactionsIn: [],
        transactionsOut: ["C", "D", "E"],
      },
      {
        id: "D",
        size: 25,
        transactionsIn: [],
        transactionsOut: ["D"],
      },
      {
        id: "E",
        size: 25,
        transactionsIn: [],
        transactionsOut: ["A", "B"],
      },
    ];

    nodes2 = {
      main: {
        id: null,
        addressId: "0x58f56615180a8eea4c462235d9e215f72484b4a3",
        name: null,
        type: "eoa",
        dateCreated: null,
        transactionsIn: [],
        transactionsOut: [
          {
            hash: "0xa1822e68a736bcdb57d05b2679260904813efdd17df62ede1d716dec9eeb4e8c",
            value: "6947000000000000000000",
            input: null,
            transaction: null,
            gas: 21000,
            gas_used: 21000,
            gas_price: 8459936485,
            transaction_fee: 177658666185000,
            block_number: 15878603,
            block_timestamp: 1667347031,
          },
        ],
      },
      connected: [
        {
          addressId: "0x58f56615180a8eea4c462235d9e215f72484b4a3",
          name: null,
        },
      ],
    };

    let currentNode = "A";

    // Define link data (connections between nodes)

    function redrawGraph(currentNode) {
      svg.selectAll("*").remove();

      let links = [...getLinksForCurrentNode(currentNode, nodes)];
      // Create links
      const link = svg
        .append("g")
        .attr("stroke", "gray")
        .attr("stroke-width", 2)
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke-width", (d) => Math.sqrt(d.value));

      // Create nodes
      let node = svg
        .attr("stroke", "#fff")
        .attr("stroke-width", 1)
        .selectAll("circle")
        .data(getUniqueFilteredNodes(currentNode, nodes, links))
        .join("circle")
        .attr("r", (d) => (d.id === currentNode ? d.size * 1.2 : d.size))
        .attr("fill", (d) => (d.id === currentNode ? "blue" : "cyan"))
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

      const simulation = d3
        .forceSimulation(nodes)
        .force("charge", d3.forceManyBody().strength(-200)) // Repulsion force between nodes
        .force(
          "link",
          d3
            .forceLink(links)
            .id((d) => d.id)
            .distance(200)
        ) // Attraction along links
        .force("x", d3.forceX().strength(0.0))
        .force("y", d3.forceY().strength(0.0))
        .force("center", d3.forceCenter(containerWidth / 2, containerHeight / 2));

      // Inside your useEffect or wherever you want to create links and nodes:

      simulation.on("tick", () => {
        link
          .attr("x1", (d) => d.source.x)
          .attr("y1", (d) => d.source.y)
          .attr("x2", (d) => d.target.x)
          .attr("y2", (d) => d.target.y);

        node.attr("cx", (d) => d.x).attr("cy", (d) => d.y);
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

      node.on("click", (event, d) => {
        currentNode = d.id; // Update the currently selected node

        // Update the circle sizes based on the new currentNodeId
        node.attr("r", (nodeData) =>
          nodeData.id === currentNode ? nodeData.size * 1.3 : nodeData.size
        );
        redrawGraph(currentNode);

        simulation.alpha(1).restart();
      });
    }

    redrawGraph(currentNode);
  }, [currentNode]);

  return (
    <>
      <svg width="100%" height="100%" ref={svgRef}>
        {/* SVG content */}
      </svg>
      <p>Note: Play with the nodes!</p>
    </>
  );
}

export default D3LinkedNodes;
