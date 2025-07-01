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
import { MessageSquare } from "lucide-react";
import Toast from "./common/Toast";
import { toast } from "react-toastify";

// Register custom node type outside the component to avoid recreation on every render
const nodeTypes = {
  textNode: CustomTextNode,
};

// List of available node types for panel and drag/drop
const nodeTypeList = [
  {
    type: "textNode",
    label: "Message",
    icon: <MessageSquare />,
    onAdd: handleAddNode,
  },
];

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
        toast.error("More than one node is missing an outgoing connection.");
        return;
      }
    }
    console.log("Flow saved:", { nodes, edges });
    toast.success("Saved successfully! Check console.");
  };

  return (
    <ReactFlowProvider>
      <Toast />
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
        nodeTypeList={nodeTypeList}
        setSelectedNode={setSelectedNode}
      />
    </ReactFlowProvider>
  );
}

export default App;
