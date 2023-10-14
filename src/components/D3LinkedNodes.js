import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import styles from "./D3LinkedNodes.module.css";

function D3LinkedNodes() {
  const svgRef = useRef(null);
  let containerWidth = null;
  let containerHeight = null;
  let currentNode = null;

  const { addressId } = useParams();
  const navigate = useNavigate();
  const [nodes, setWalletData] = useState(null);

  console.log(addressId);

  function fetchWalletData(addressId) {
    axios
      .get(`http://127.0.0.1:8000/wallet/${addressId}`)
      .then((response) => {
        setWalletData(response.data);
      })
      .catch((error) => {
        console.error(error);

        navigate("/error505");
      });
  }

  useEffect(() => {
    fetchWalletData(addressId);
  }, []);

  if (nodes) {
    currentNode = nodes[0].id;
  }

  useEffect(() => {
    if (nodes) {
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
          ...currentNodeObj.transactionsOut.map((transaction) => transaction.id),
          ...currentNodeObj.transactionsIn.map((transaction) => transaction.id),
          ...links.filter((link) => link.target === currentNode).map((link) => link.source), // Add nodes connected through incoming links
        ];

        const filteredNodes = [
          currentNodeObj,
          ...nodes.filter((node) => connectedNodeIds.includes(node.id)),
        ];

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

        const links = [
          ...currentNodeObj.transactionsOut.map((node) => ({
            source: currentNode,
            target: node.id,
          })),
          ...currentNodeObj.transactionsIn.map((node) => ({
            source: node.id,
            target: currentNode,
          })),
        ];

        return links;
      }

      const nodeSize = 25;
      // Define link data (connections between nodes)

      function redrawGraph(currentNode) {
        svg.selectAll("*").remove();

        let links = [...getLinksForCurrentNode(currentNode, nodes)];
        console.log(links);
        console.log(getUniqueFilteredNodes(currentNode, nodes, links));
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
          .attr("class", styles.pointer)
          .append("g")
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

        // Add text labels to nodes
        let text = svg
          .append("g")
          .attr("class", "labels")
          .selectAll("text")
          .data(nodes)
          .enter()
          .append("text")
          .attr("dx", -25)
          .attr("dy", 50)
          .text(function (d) {
            return d.name;
          });

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

          text
            .attr("x", (d) => d.x) // Adjust the x position of the text relative to the node
            .attr("y", (d) => d.y);
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
          currentNode = fetchWalletData(d.addressId); // Update the currently selected node
          navigate(`/wallet/${d.addressId}`);
          setWalletData(null);
          // Update the circle sizes based on the new currentNodeId
          node.attr("r", (nodeData) => (nodeData.id === currentNode ? nodeSize * 1.3 : nodeSize));
          // redrawGraph(currentNode);

          simulation.alpha(1).restart();
        });
      }

      redrawGraph(currentNode);
    }
  }, [currentNode, nodes]);

  return (
    <>
      {nodes ? (
        <>
          <svg width="100%" height="100%" ref={svgRef}>
            {/* SVG content */}
          </svg>
          <p>Note: Play with the nodes!</p>
        </>
      ) : (
        <h1 className={styles.load}>Loading...</h1>
      )}
    </>
  );
}

export default D3LinkedNodes;
