import React, { useCallback } from "react";
import NodesPanel from "./components/NodesPanel";
import SettingsPanel from "./components/SettingsPanel";
import {
  ReactFlowProvider,
  MiniMap,
  Controls,
  Background,
  ReactFlow,
  useOnSelectionChange,
  useReactFlow,
} from "reactflow";
import "reactflow/dist/style.css";
import { LayoutProps } from "./utils/types";
import Header from "./common/Header";

const Layout: React.FC<LayoutProps> = ({
  selectedNodeId,
  setNodes,
  setSelectedNodeId,
  handleSave,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  nodeTypes,
  nodeTypeList,
}) => {
  const reactFlowInstance = useReactFlow();

  // Find the selected node from the nodes array
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) || null;

  // Memoized callback to handle node deletion and update selected node
  const onNodesDelete = useCallback(
    (deletedNodes: any[]) => {
      if (selectedNodeId && deletedNodes.some((n) => n.id === selectedNodeId)) {
        setSelectedNodeId(null);
      }
    },
    [selectedNodeId, setSelectedNodeId]
  );

  // Close settings panel if nothing is selected
  useOnSelectionChange({
    onChange: useCallback(
      ({ nodes }) => {
        if (!nodes.length) {
          setSelectedNodeId(null);
        }
      },
      [setSelectedNodeId]
    ),
  });

  // Handles drag over event for node drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  // Handles drop event to add a new node using flow coordinates
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const data = event.dataTransfer.getData("application/reactflow");
      if (!data) return;
      const { type, label } = JSON.parse(data);
      const flowBounds = (
        event.target as HTMLDivElement
      ).getBoundingClientRect();
      // Calculate position in screen coordinates
      const position = reactFlowInstance.project({
        x: event.clientX - flowBounds.left,
        y: event.clientY - flowBounds.top,
      });
      // Find the node type's onAdd handler from nodeTypeList
      const nodeType = nodeTypeList.find((n: any) => n.type === type);
      if (nodeType && nodeType.onAdd) {
        nodeType.onAdd(setNodes, type, label, position);
      }
    },
    [setNodes, nodeTypeList, reactFlowInstance]
  );

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-50">
      <Header onSave={handleSave} />
      <div className="flex flex-1 h-full">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-[90vh]">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              nodeTypes={nodeTypes}
              fitView
              onDragOver={onDragOver}
              onDrop={onDrop}
              onNodesDelete={onNodesDelete}
            >
              <MiniMap />
              <Controls />
              <Background />
            </ReactFlow>
          </div>
        </div>
        <div className="w-1/4 flex flex-col items-center  border-l bg-white h-full">
          {selectedNode ? (
            <SettingsPanel
              node={selectedNode}
              setNodes={setNodes}
              onClose={() => setSelectedNodeId(null)}
            />
          ) : (
            <NodesPanel setNodes={setNodes} nodeTypeList={nodeTypeList} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
