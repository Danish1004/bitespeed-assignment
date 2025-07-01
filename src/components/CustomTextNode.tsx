import { MessageCircleMore, MessageSquare } from "lucide-react";
import React from "react";
import { Handle, Position, NodeProps } from "reactflow";

const CustomTextNode = ({ data, selected }: NodeProps) => {
  return (
    <div
      className={`rounded-lg shadow-md w-64 border transition-colors duration-200 ${
        selected ? "shadow-md shadow-tertiary" : ""
      } bg-white`}
    >
      <div className="flex items-center gap-2 bg-[#C1E8FF] rounded-t-lg px-3 py-1 shadow-sm shadow-tertiary">
        <MessageCircleMore className="text-tertiary" size={16} />
        <span className="font-medium text-sm text-primaryText">
          Send Message
        </span>
      </div>

      <div className="px-2 py-3 text-sm text-placeholderText break-words min-h-[32px]">
        {data.label}
      </div>

      <Handle
        type="target"
        position={Position.Left}
        id="left"
        className="w-4 h-4 bg-gray-400 border-2 border-white rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        className="w-4 h-4 bg-gray-400 border-2 border-white rounded-full"
      />
    </div>
  );
};

export default CustomTextNode;
