import { ArrowLeft } from "lucide-react";
import React from "react";
import { Node } from "reactflow";

type Props = {
  node: Node;
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>;
  onClose: () => void;
};

const SettingsPanel = ({ node, setNodes, onClose }: Props) => {
  const updateLabel = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;

    setNodes((nds) =>
      nds.map((n) =>
        n.id === node.id ? { ...n, data: { ...n.data, label: value } } : n
      )
    );

    // Update selected node directly if needed (optional)
    node.data.label = value;
  };

  return (
    <div className="w-full h-full">
      <div className="relative mb-2 px-2 py-2 border-b shadow-md bg-white">
        <button
          onClick={onClose}
          className="absolute left-2 top-3 text-secondaryText hover:text-black text-lg"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-center text-lg font-medium">Message</h2>
      </div>

      <div className="py-6 px-4">
        <label className="text-sm text-placeholderText mb-2 block">Text</label>
        <textarea
          value={node.data.label}
          onChange={updateLabel}
          rows={4}
          className="w-full border border-shadow rounded p-2 resize-y"
          placeholder="Enter message..."
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
