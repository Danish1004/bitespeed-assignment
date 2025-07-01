import { Node } from "reactflow";
import { v4 as uuidv4 } from "uuid";

export function createNode(
  type: string,
  label: string,
  extraData: Record<string, any> = {},
  position: { x: number; y: number }
): Node {
  return {
    id: uuidv4(),
    type,
    data: { label, ...extraData },
    position,
    style: { borderRadius: "8px" },
  };
}

export function handleAddNode(
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>,
  type: string,
  label: string,
  position: { x: number; y: number } = {
    x: Math.random() * 10,
    y: Math.random() * 10,
  }
) {
  const node =
    type === "actionNode"
      ? createNode(type, label + " (Action)", {}, position)
      : createNode(type, label, {}, position);

  setNodes((nds) => [...nds, node]);
}
