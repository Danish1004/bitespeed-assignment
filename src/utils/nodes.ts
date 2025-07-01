import { Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";

export function createNode(
  type: string,
  label: string,
  extraData: Record<string, any> = {}
): Node {
  return {
    id: uuidv4(),
    type,
    data: { label, ...extraData },
    position: { x: Math.random() * 400, y: Math.random() * 400 },
    style: {
      borderRadius: "8px",
    },
  };
}

export function handleAddNode(
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  type: string,
  label: string
) {
  switch (type) {
    case "textNode":
      setNodes((nds) => [...nds, createNode(type, label)]);
      break;
    case "actionNode":
      setNodes((nds) => [...nds, createNode(type, label + " (Action)")]);
      break;
    default:
      setNodes((nds) => [...nds, createNode(type, label)]);
  }
}
