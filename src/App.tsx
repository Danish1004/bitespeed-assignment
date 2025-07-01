import React, { useCallback, useState } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import CustomTextNode from "./components/CustomTextNode";
import Layout from "./Layout";
import { handleAddNode } from "./utils/nodes";

// Register custom node type outside the component to avoid recreation on every render
const nodeTypes = {
  textNode: CustomTextNode,
};

function App() {
  // State for nodes, edges, and selected node
  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  // Called when user connects two nodes
  const onConnect = useCallback(
    (params: Connection) => {
      const sourceUsed = edges.some((edge) => edge.source === params.source);
      if (sourceUsed) return; // enforce only one edge per source handle
      setEdges((eds) => addEdge(params, eds));
    },
    [edges]
  );

  // When user clicks a node, open settings panel
  const onNodeClick = useCallback((_: unknown, node: Node) => {
    setSelectedNode(node);
  }, []);

  // Save button logic with validation
  const handleSave = () => {
    if (nodes.length > 1) {
      const sourceIds = edges.map((e) => e.source);
      const noOutgoingNodes = nodes.filter(
        (node) => !sourceIds.includes(node.id)
      );
      if (noOutgoingNodes.length > 1) {
        alert("Error: More than one node is missing an outgoing connection.");
        return;
      }
    }
    console.log("Flow saved:", { nodes, edges });
    alert("Saved successfully! Check console.");
  };

  // Handles drag over event for node drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handles drop event to add a new node
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const { type, label } = JSON.parse(data);
      const bounds = (event.target as HTMLDivElement).getBoundingClientRect();
      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      handleAddNode(setNodes, type, label, position);
    },
    [setNodes]
  );

  return (
    <ReactFlowProvider>
      <Layout
        selectedNode={selectedNode}
        setNodes={setNodes}
        handleSave={handleSave}
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        setSelectedNode={setSelectedNode}
        onDrop={onDrop}
        onDragOver={onDragOver}
      />
    </ReactFlowProvider>
  );
}

export default App;
