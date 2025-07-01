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
} from "reactflow";
import "reactflow/dist/style.css";
import { LayoutProps } from "./utils/types";
import Header from "./common/Header";

const Layout: React.FC<LayoutProps> = ({
  selectedNode,
  setNodes,
  setSelectedNode,
  handleSave,
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onNodeClick,
  nodeTypes,
  onDragOver,
  onDrop,
}) => {
  const onNodesDelete = useCallback(
    (deletedNodes: any[]) => {
      if (selectedNode && deletedNodes.some((n) => n.id === selectedNode.id)) {
        setSelectedNode(null);
      }
    },
    [selectedNode, setSelectedNode]
  );

  // Close settings panel if nothing is selected
  useOnSelectionChange({
    onChange: useCallback(
      ({ nodes }) => {
        if (!nodes.length) {
          setSelectedNode(null);
        }
      },
      [setSelectedNode]
    ),
  });

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
              onClose={() => setSelectedNode(null)}
            />
          ) : (
            <NodesPanel setNodes={setNodes} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Layout;
