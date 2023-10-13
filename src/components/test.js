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
      const transactionsOut = currentNodeObj.transactionsOut.map((node) => node.id);
      console.log(transactionsOut);

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
        id: "1",
        addressId: "0x8d08aad4b2bac2bb761ac4781cf62468c9ec47b4",
        name: "Felix",
        type: "eoa",
        dateCreated: "1682226334",
        transactionsIn: [
          {
            id: "4",
            hash: "0xa43beda2d8739c679012b26b8b5f66dc4b7196eb31e39d6f7cdbede134e19720",
            value: "20000000000000000000",
            input: null,
            transaction: null,
            gas: 21000,
            gas_used: 21000,
            gas_price: 11283747363,
            transaction_fee: 236958694623000,
            block_number: 15878986,
            block_timestamp: 1667351687,
          },
        ],
        transactionsOut: [
          {
            id: "2",
            hash: "0xdd608c8c4e8d8529967955d89f9e71842e80c3c84d592c72054f68090a5a102c",
            value: "9080186758793618211636",
            input: null,
            transaction: null,
            gas: 21000,
            gas_used: 21000,
            gas_price: 12241050449,
            transaction_fee: 257062059429000,
            block_number: 15878752,
            block_timestamp: 1667348843,
          },
          {
            id: "3",
            hash: "0x3ce66ee43f23b037aa64440f1e545c574ce779876aeefccf8b0905b74392215b",
            value: "0",
            input: null,
            transaction: null,
            gas: 1219186,
            gas_used: 935469,
            gas_price: 10580392185,
            transaction_fee: 9897628896909765,
            block_number: 15878617,
            block_timestamp: 1667347211,
          },
        ],
      },
      {
        id: "4",
        addressId: "0x58f56615180a8eea4c462235d9e215f72484b4a3",
        name: "Darrell",
      },
      {
        id: "2",
        addressId: "0xb0606f433496bf66338b8ad6b6d51fc4d84a44cd",
        name: "Susanto",
      },
      {
        id: "3",
        addressId: "0x68b3465833fb72a70ecdf485e0e4c7bd8665fc45",
        name: "Haryanto",
      },
    ];

    let currentNode = "1";
    const nodeSize = 25;
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
        .attr("r", (d) => (d.id === currentNode ? nodeSize * 1.2 : nodeSize))
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
        node.attr("r", (nodeData) => (nodeData.id === currentNode ? nodeSize * 1.3 : nodeSize));
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
