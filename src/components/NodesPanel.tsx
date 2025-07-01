import React from "react";
import { Node } from "reactflow";
import { handleAddNode } from "../utils/nodes";
import { MessageSquare } from "lucide-react";

type Props = {
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  nodeTypeList: any[];
};

const NodesPanel = ({ setNodes, nodeTypeList }: Props) => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full py-6 px-4">
      {nodeTypeList.map((node) => (
        <button
          key={node.type}
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData(
              "application/reactflow",
              JSON.stringify({
                type: node.type,
                label: node.label,
              })
            );
            event.dataTransfer.effectAllowed = "move";
          }}
          onClick={() =>
            node.onAdd(setNodes, node.type, node.label, {
              x: Math.floor(Math.random() * 500) + 100,
              y: Math.floor(Math.random() * 300) + 100,
            })
          }
          className="border-2 border-primaryBlue text-primaryBlue bg-white px-4 py-2 w-full rounded-lg flex flex-col items-center justify-center font-medium text-lg hover:shadow-md transition-shadow duration-300"
        >
          <span className="mb-2 text-secondary">{node.icon}</span>
          <span className="text-sm">{node.label}</span>
        </button>
      ))}
    </div>
  );
};

export default NodesPanel;
